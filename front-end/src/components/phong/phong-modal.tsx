import { Button, Group, Modal, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPhong, updatePhong, getPhongById } from "apis/phong";
import { QUERY_PHONGS } from "lib/constants";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { z } from "zod";

export const schemaPhong = z.object({
  ten: z.string().min(2, "Tên phòng phải có ít nhất 2 ký tự"),
  tenVietTat: z.string().min(2, "Tên viết tắt phải có ít nhất 2 ký tự"),
  soThuTu: z.number().min(0, "Số thứ tự phải lớn hơn hoặc bằng 0"),
});

type PhongFormData = z.infer<typeof schemaPhong>;

interface Props {
  opened: boolean;
  close: () => void;
  type: "create" | "edit";
  id?: number; // bắt buộc khi type = "edit"
}

export function PhongModal({ opened, close, type, id }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<PhongFormData>({
    initialValues: {
      ten: "",
      tenVietTat: "",
      soThuTu: 0,
    },
    validate: zod4Resolver(schemaPhong),
  });

  // Query khi edit
  const { data: phongData, isFetching } = useQuery({
    queryKey: [QUERY_PHONGS, id],
    queryFn: () => getPhongById(id!),
    enabled: type === "edit" && !!id && opened, // chỉ fetch khi edit + id tồn tại + modal mở
  });

  // Cập nhật form khi load data edit
  useEffect(() => {
    if (type === "edit" && phongData) {
      form.setValues({
        ten: phongData.ten,
        tenVietTat: phongData.tenVietTat,
        soThuTu: phongData.soThuTu,
      });
    }
  }, [phongData, type]);
  // Reset form khi chuyển sang create
  useEffect(() => {
    if (type === "create" && opened) {
      form.reset(); // trở về initialValues
    }
  }, [type, opened]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: PhongFormData) => {
      if (type === "create") {
        return addPhong(values);
      } else {
        return updatePhong(id!, values);
      }
    },
  });

  const handleSubmit = (values: PhongFormData) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        close();
        notifications.show({
          title: "Thông báo!",
          message:
            type === "create"
              ? "Thêm dữ liệu thành công"
              : "Cập nhật dữ liệu thành công",
          color: "green",
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_PHONGS] });
      },
      onError: () => {
        notifications.show({
          title: "Thông báo!",
          message:
            type === "create"
              ? "Thêm dữ liệu thất bại"
              : "Cập nhật dữ liệu thất bại",
          color: "red",
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      title={type === "create" ? "Thêm mới Phòng" : "Chỉnh sửa Phòng"}
    >
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Tên phòng"
          withAsterisk
          placeholder="Nhập tên phòng"
          {...form.getInputProps("ten")}
        />

        <TextInput
          label="Tên viết tắt"
          withAsterisk
          placeholder="Nhập tên viết tắt"
          {...form.getInputProps("tenVietTat")}
        />

        <NumberInput
          label="Số thứ tự"
          withAsterisk
          placeholder="Nhập số thứ tự"
          min={0}
          {...form.getInputProps("soThuTu")}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={close}>
            Hủy
          </Button>
          <Button loading={isPending || isFetching} type="submit">
            {type === "create" ? "Thêm" : "Lưu"}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

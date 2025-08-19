import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChucVus } from "apis/chuc-vu";
import { createNhanVien, getNhanVien, updateNhanVien } from "apis/nhan-vien";
import { getPhongs } from "apis/phong";
import {
  showNotificationError,
  showNotificationSuccess,
} from "components/common/notifacation";
import { QUERY_CHUC_VUS, QUERY_NHAN_VIENS, QUERY_PHONGS } from "lib/constants";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { z } from "zod";

interface Props {
  opened: boolean;
  close: () => void;
  type: "create" | "edit";
  id?: number; // bắt buộc khi type = "edit"
}

export const schemaNhanVien = z.object({
  ten: z.string().min(1, "Tên không được để trống"),
  phongId: z.string().min(1, "Phòng không để trống"),
  chucVuId: z.string().min(1, "Chức vụ không để trống"),
  soThuTu: z.number().min(1, "Số thứ tự phải lớn hơn hoặc bằng 0"),
  isActive: z.boolean().default(true),
  isVhsc: z.boolean().default(false),
});

export type NhanVienFormData = z.infer<typeof schemaNhanVien>;

export function NhanVienModal({ opened, close, type, id }: Props) {
  const queryClient = useQueryClient();
  // Query khi edit
  const { data: nhanVienData, isFetching } = useQuery({
    queryKey: [QUERY_NHAN_VIENS, id],
    queryFn: () => getNhanVien(id!),
    enabled: type === "edit" && !!id && opened, // chỉ fetch khi edit + id tồn tại + modal mở
  });
  const { data: phongResponse } = useQuery({
    queryKey: [QUERY_PHONGS],
    queryFn: () => getPhongs(),
  });
  const { data: chucVuResponse } = useQuery({
    queryKey: [QUERY_CHUC_VUS],
    queryFn: () => getChucVus(),
  });

  const form = useForm<NhanVienFormData>({
    initialValues: {
      ten: "",
      phongId: "0",
      chucVuId: "0",
      soThuTu: 0,
      isActive: true,
      isVhsc: false,
    },
    validate: zod4Resolver(schemaNhanVien),
  });

  const phongOptions =
    phongResponse?.map((phong) => ({
      value: phong.id.toString(),
      label: phong.ten,
    })) || [];
  const chucVuOptions =
    chucVuResponse?.map((chucVu) => ({
      value: chucVu.id.toString(),
      label: chucVu.ten,
    })) || [];

  // Cập nhật form khi load data edit
  useEffect(() => {
    if (type === "edit" && nhanVienData) {
      form.setValues({
        ten: nhanVienData.ten,
        phongId: nhanVienData.phongId.toString(),
        chucVuId: nhanVienData.chucVuId.toString(),
        soThuTu: nhanVienData.soThuTu,
        isActive: nhanVienData.isActive,
        isVhsc: nhanVienData.isVhsc,
      });
    }
  }, [nhanVienData, type]);
  // Reset form khi chuyển sang create
  useEffect(() => {
    if (type === "create" && opened) {
      form.reset(); // trở về initialValues
    }
  }, [type, opened]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: NhanVienFormData) => {
      if (type === "create") {
        return createNhanVien(values);
      } else {
        return updateNhanVien(id!, values);
      }
    },
  });

  const handleSubmit = async (values: NhanVienFormData) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        close();
        showNotificationSuccess();
        queryClient.invalidateQueries({ queryKey: [QUERY_NHAN_VIENS] });
      },
      onError: () => {
        showNotificationError();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      title={type === "create" ? "Thêm mới Nhân viên" : "Chỉnh sửa Nhân viên"}
    >
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Tên CBNV"
          withAsterisk
          {...form.getInputProps("ten")}
        />
        <Select
          label="Phòng"
          placeholder="Chọn phòng"
          data={phongOptions}
          withAsterisk
          searchable
          {...form.getInputProps("phongId")}
        />
        <Select
          label="Chức vụ"
          placeholder="Chọn chức vụ"
          data={chucVuOptions}
          withAsterisk
          searchable
          {...form.getInputProps("chucVuId")}
        />
        <NumberInput
          label="Số thứ tự"
          withAsterisk
          min={0}
          {...form.getInputProps("soThuTu")}
        />
        <Switch
          label="Trạng thái"
          defaultChecked
          {...form.getInputProps("isActive", { type: "checkbox" })}
        />
        <Switch
          label="Có phải là nhân viên vận hành, sửa chữa"
          {...form.getInputProps("isVhsc", { type: "checkbox" })}
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

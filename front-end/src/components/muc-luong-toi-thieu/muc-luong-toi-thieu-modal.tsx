import { Button, Group, Modal, NumberInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMucLuongToiThieu,
  getMucLuongToiThieu,
  updateMucLuongToiThieu,
} from "apis/muc-luong-toi-thieu";
import {
  showNotificationError,
  showNotificationSuccess,
} from "components/common/notifacation";
import dayjs from "dayjs";
import {
  QUERY_MUC_LUONG_TOI_THIEU,
  QUERY_MUC_LUONG_TOI_THIEUS,
} from "lib/constants";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { z } from "zod";

export const schemaMucLuongToiThieu = z.object({
  mucLuong: z.number().min(0),
  thoiGianApdung: z.union([z.string(), z.date()]),
  canCuPhapLy: z.string().nullable(),
});

export type MucLuongToiThieuFormData = z.infer<typeof schemaMucLuongToiThieu>;

interface Props {
  opened: boolean;
  close: () => void;
  type: "create" | "edit";
  id?: number; // bắt buộc khi type = "edit"
}

export function MucLuongToiThieuModal({ opened, close, type, id }: Props) {
  const queryClient = useQueryClient();

  const form = useForm<MucLuongToiThieuFormData>({
    initialValues: {
      mucLuong: 0,
      thoiGianApdung: new Date(),
      canCuPhapLy: "",
    },
    validate: zod4Resolver(schemaMucLuongToiThieu),
  });

  // Query khi edit
  const { data: mucLuongData, isFetching } = useQuery({
    queryKey: [QUERY_MUC_LUONG_TOI_THIEU, id],
    queryFn: () => getMucLuongToiThieu(id!),
    enabled: type === "edit" && !!id && opened, // chỉ fetch khi edit + id tồn tại + modal mở
  });

  // Cập nhật form khi load data edit
  useEffect(() => {
    if (type === "edit" && mucLuongData) {
      form.setValues({
        mucLuong: mucLuongData.mucLuong,
        thoiGianApdung: mucLuongData.thoiGianApdung,
        canCuPhapLy: mucLuongData.canCuPhapLy,
      });
    }
  }, [mucLuongData, type]);
  // Reset form khi chuyển sang create
  useEffect(() => {
    if (type === "create" && opened) {
      form.reset(); // trở về initialValues
    }
  }, [type, opened]);

  const { mutate, isPending } = useMutation({
    mutationFn: (apiData: MucLuongToiThieuFormData) => {
      if (type === "create") {
        return createMucLuongToiThieu(apiData);
      } else {
        return updateMucLuongToiThieu(id!, apiData);
      }
    },
  });

  const handleSubmit = (values: MucLuongToiThieuFormData) => {
    // Chuyển đổi Date thành ISO string với múi giờ +7
    const apiData = {
      ...values,
      thoiGianApdung: dayjs(values.thoiGianApdung)
        .tz("Asia/Ho_Chi_Minh")
        .format(),
    };

    mutate(apiData, {
      onSuccess: () => {
        form.reset();
        close();
        showNotificationSuccess();
        queryClient.invalidateQueries({
          queryKey: [QUERY_MUC_LUONG_TOI_THIEUS],
        });
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
      title={type === "create" ? "Thêm mới Mức lương" : "Chỉnh sửa Mức lương"}
    >
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <NumberInput
          label="Mức lương"
          withAsterisk
          placeholder="Nhập mức lương"
          thousandSeparator=" "
          {...form.getInputProps("mucLuong")}
        />

        <DateInput
          label="Thời gian áp dụng"
          withAsterisk
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps("thoiGianApdung")}
        />

        <Textarea
          label="Căn cứ pháp lý"
          {...form.getInputProps("canCuPhapLy")}
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

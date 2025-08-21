import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { IconCalendar } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { xacNhanNghiViec } from "apis/thong-tin-nghi-viec";
import { useNavigate } from "react-router";
import {
  showNotificationError,
  showNotificationSuccess,
} from "components/common/notifacation";

interface Props {
  id: number;
  opened: boolean;
  close: () => void;
}

export const schema = z.object({
  thoiGianKetThuc: z.string().nullable(),
  thongTinKhac: z.string(),
});

export function ModalXacNhanNghiViec({ id, opened, close }: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof schema>) => xacNhanNghiViec(id, values),
  });
  const queryClient = useQueryClient();
  const router = useNavigate();

  const form = useForm({
    initialValues: {
      thoiGianKetThuc: null,
      thongTinKhac: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);

    mutate(values, {
      onSuccess: () => {
        showNotificationSuccess();
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["theo-doi-nghi-viecs"] });
        close();
        router("/theo-doi-nghi-viec");
      },
      onError: () => {
        showNotificationError();
      },
    });
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      title="Cập nhật thông tin"
    >
      <form onSubmit={handleSubmit}>
        <DatePickerInput
          leftSection={<IconCalendar size={18} stroke={1.5} />}
          // leftSectionPointerEvents="none"
          clearable
          label="Chọn thời gian bắt đầu nghỉ"
          key={form.key("thoiGianKetThuc")}
          valueFormat="DD/MM/YYYY"
          {...form.getInputProps("thoiGianKetThuc")}
        />
        <TextInput
          label="Thông tin khác"
          key={form.key("thongTinKhac")}
          {...form.getInputProps("thongTinKhac")}
        />
        <Group mt="md">
          <Button type="submit" loading={isPending}>
            Xác nhận
          </Button>
          <Button variant="outline" onClick={close}>
            Hủy
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

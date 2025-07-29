import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import "dayjs/locale/vi";
import { IconCalendar } from "@tabler/icons-react";

interface Props {
  id: number;
  opened: boolean;
  close: () => void;
}

export function ModalXacNhanNghiViec({ id, opened, close }: Props) {
  const form = useForm({
    initialValues: {
      thoiGianKetThuc: null,
      thongTinKhac: "",
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    console.log(values);
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      title="Cập nhật thông tin"
    >
      <form onSubmit={handleSubmit}>
        <DatesProvider settings={{ locale: "vi" }}>
          <DatePickerInput
            leftSection={<IconCalendar size={18} stroke={1.5} />}
            leftSectionPointerEvents="none"
            clearable
            label="Chọn thời gian bắt đầu nghỉ"
            placeholder="DD/MM/YYYY"
            valueFormat="DD/MM/YYYY"
            {...form.getInputProps("thoiGianKetThuc")}
          />
        </DatesProvider>
        <TextInput
          label="Thông tin khác"
          {...form.getInputProps("thongTinKhac")}
        />
        <Group mt="md">
          <Button type="submit">Xác nhận</Button>
          <Button variant="outline" onClick={close}>
            Hủy
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

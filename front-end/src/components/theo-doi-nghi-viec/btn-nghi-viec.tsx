import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalXacNhanNghiViec } from "./nghi-viec-modal-xac-nhan";

export function BtnNghiViec({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button
        color="orange"
        onClick={() => open()}
        //   loading={handleXacNhan.isPending}
      >
        Xác nhận nghỉ chế độ / nghỉ việc
      </Button>
      <ModalXacNhanNghiViec opened={opened} close={close} id={id} />
    </>
  );
}

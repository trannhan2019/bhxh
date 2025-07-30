import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { xacNhanNangLuong } from "apis/thong-tin-bhxh";
import { tinhSoNgayNangBacConLai } from "lib/util";
import type { ThongTinBHXHResponse } from "types/thong-tin-bhxh";

export function BtnXacNhan({
  data,
}: {
  data: ThongTinBHXHResponse | undefined;
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => xacNhanNangLuong(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theo-doi-bhxhs"] });
      queryClient.invalidateQueries({ queryKey: ["theo-doi-bhxh", data?.id] });
      queryClient.invalidateQueries({
        queryKey: ["theo-doi-bhxh-notifacation"],
      });
      queryClient.invalidateQueries({
        queryKey: ["lich-su-bhxh", data?.nhanVienId],
      });
      notifications.show({
        title: "Thông báo!",
        message: "Xác nhân nâng lương thành công",
      });
    },
    onError: () => {
      notifications.show({
        title: "Thông báo!",
        message: "Xác nhân nâng lương không thành công",
        color: "red",
      });
    },
  });
  const handleXacNhan = () =>
    modals.openConfirmModal({
      title: "Xác nhận nâng lương",
      children: (
        <Text>
          Thời gian còn{" "}
          {tinhSoNgayNangBacConLai(
            data?.ngayApDung,
            data?.bacLuong?.thoiGianNangBac || 0
          )}{" "}
          ngày
        </Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Hủy" },
      onConfirm: () => mutate(data?.id || 0),
    });

  return (
    <Button
      mt={"md"}
      variant="outline"
      color="red"
      onClick={() => handleXacNhan()}
      loading={isPending}
    >
      Xác nhận nâng bậc tiếp theo: Thời gian còn{" "}
      {tinhSoNgayNangBacConLai(
        data?.ngayApDung,
        data?.bacLuong?.thoiGianNangBac || 0
      )}{" "}
      ngày
    </Button>
  );
}

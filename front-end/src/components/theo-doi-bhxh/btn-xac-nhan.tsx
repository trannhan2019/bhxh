import { Button } from "@mantine/core";
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
  const handleXacNhan = useMutation({
    mutationFn: (id: number) => xacNhanNangLuong(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["theo-doi-bhxh", data?.id] });
      queryClient.invalidateQueries({ queryKey: ["theo-doi-bhxhs"] });
      queryClient.invalidateQueries({
        queryKey: ["theo-doi-bhxh-notifacation"],
      });
      alert("Xác nhận nâng lương thành công");
    },
    onError: (error) => {
      console.log(error);
      alert("Không thể xác nhân. Vui liệu thử lại.");
    },
  });
  // console.log("btn xac nhan", data);

  return (
    <Button
      mt={"md"}
      variant="outline"
      color="red"
      onClick={() => handleXacNhan.mutate(data?.id || 0)}
      loading={handleXacNhan.isPending}
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

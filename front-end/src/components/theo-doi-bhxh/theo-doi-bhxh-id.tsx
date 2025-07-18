import { Card, List, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getTheoDoiBHXH } from "apis/thong-tin-bhxh";

export function TheoDoiBhxhChiTiet({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["theo-doi-bhxh", id],
    queryFn: () => getTheoDoiBHXH(id),
    retry: false,
  });
  return (
    <Card shadow="md" radius={"md"}>
      <Text>Họ và tên: {data?.nhanVien?.ten}</Text>
      <Text>Phòng/Đơn vị: {data?.nhanVien?.phong.ten}</Text>
      <Text>Chức vụ: </Text>
      <List size="sm">
        {data?.phuCap && (
          <List.Item>
            {data.phuCap.chucDanh}, hệ số{" "}
            {data.phuCap.heSo.toLocaleString("vi-VN")}
          </List.Item>
        )}
        {data?.trachNhiem && (
          <List.Item>
            {data.trachNhiem.chucDanh}, hệ số{" "}
            {data.trachNhiem.heSo.toLocaleString("vi-VN")}
          </List.Item>
        )}
        <List.Item>
          {data?.bacNgachLuong.ngach.chucDanh}, bậc {data?.bacNgachLuong.bac},
          hệ số {data?.bacNgachLuong.heSo.toLocaleString("vi-VN")}
        </List.Item>
      </List>
    </Card>
  );
}

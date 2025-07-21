import { Badge, Card, List, Text, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBacLuongMax } from "apis/bac-luong-max";
import { getBacNgachLuongTiepTheo } from "apis/bac-ngach-luong";
import { getMucLuongToiThieus } from "apis/muc-luong-toi-thieu";
import { getTheoDoiBHXH } from "apis/thong-tin-bhxh";
import {
  calculateTotalSalary,
  formatNgayApDungTiepTheo,
  formatNgayVN,
  isBacLuongMax,
} from "lib/util";

export function TheoDoiBhxhChiTiet({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["theo-doi-bhxh", id],
    queryFn: () => getTheoDoiBHXH(id),
    retry: false,
  });
  const { data: mucLuongToiThieu } = useQuery({
    queryKey: ["mucLuongToiThieus"],
    queryFn: () => getMucLuongToiThieus(),
    placeholderData: keepPreviousData,
    retry: false,
  });
  const mucLuong = mucLuongToiThieu?.data[0]?.mucLuong || 0;
  const { data: bacLuongMax } = useQuery({
    queryKey: ["bacLuongMaxs"],
    queryFn: () => getBacLuongMax(),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const { data: bacLuongTiepTheo } = useQuery({
    queryKey: ["bacLuongTiepTheo"],
    queryFn: () =>
      getBacNgachLuongTiepTheo(
        data?.bacNgachLuong?.bac,
        data?.bacNgachLuong?.ngach?.id
      ),
    placeholderData: keepPreviousData,
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
      <Text>
        Mức lương hiện tại:{" "}
        {calculateTotalSalary(data, mucLuong).toLocaleString("vi-VN")} đồng
      </Text>
      <Text>Thời gian áp dụng: {formatNgayVN(data?.ngayApDung)}</Text>
      <Title order={3}>Thông tin nâng bậc tiếp theo: </Title>
      {isBacLuongMax(data?.bacNgachLuong, bacLuongMax?.data) ? (
        <Badge variant="outline" color="green">
          Đã max bậc
        </Badge>
      ) : (
        <div>
          <Text>
            Thời gian nâng bậc tiếp theo:{" "}
            {formatNgayApDungTiepTheo(
              data?.ngayApDung,
              data?.bacNgachLuong?.thoiGianNangBac || 0
            )}
          </Text>
          <Text>Hệ số tiếp theo:</Text>
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
              {bacLuongTiepTheo?.data?.ngach.chucDanh}, bậc{" "}
              {bacLuongTiepTheo?.data?.bac}, hệ số{" "}
              {bacLuongTiepTheo?.data?.heSo.toLocaleString("vi-VN")}
            </List.Item>
          </List>
        </div>
      )}
    </Card>
  );
}

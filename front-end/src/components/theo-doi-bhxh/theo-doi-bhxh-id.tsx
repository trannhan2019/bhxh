import { Badge, Card, Divider, List, Text, Title } from "@mantine/core";
import { isGanDenHanNangBac, formatNgayVN } from "lib/util";
import { BtnXacNhan } from "./btn-xac-nhan";
import type { ThongTinBHXHResponse } from "types/thong-tin-bhxh";
import { IconCalendar } from "@tabler/icons-react";

export function TheoDoiBhxhChiTiet({
  data,
}: {
  data: ThongTinBHXHResponse | undefined;
}) {
  return (
    <Card shadow="md" radius="md">
      <Text>
        Họ và tên: <span className="font-semibold">{data?.nhanVien.ten}</span>
      </Text>

      <Text>
        Phòng: <span className="font-semibold">{data?.nhanVien.phong.ten}</span>
      </Text>

      <List size="md">
        {data?.phuCap && (
          <List.Item>
            {data?.phuCap.chucDanh}, hệ số{" "}
            {data?.phuCap.heSo.toLocaleString("vi-VN")}
          </List.Item>
        )}
        {data?.trachNhiem && (
          <List.Item>
            {data?.trachNhiem.chucDanh}, hệ số{" "}
            {data?.trachNhiem.heSo.toLocaleString("vi-VN")}
          </List.Item>
        )}
        <List.Item>
          {data?.ngachLuong.maNgach} - {data?.ngachLuong.chucDanh}, bậc{" "}
          {data?.bacLuong.bac}, hệ số{" "}
          {data?.bacLuong.heSo.toLocaleString("vi-VN")}
        </List.Item>
      </List>

      <Text>
        Mức lương:{" "}
        <span className="font-semibold">
          {data?.mucLuong.toLocaleString("vi-VN")} đồng
        </span>
      </Text>
      <Text>
        Ngày áp dụng:{" "}
        <span className="font-semibold">{formatNgayVN(data?.ngayApDung)}</span>
      </Text>
      <Divider my="md" />

      <div className="flex items-center gap-2 mb-3">
        <IconCalendar size={30} color="green" />
        <Title order={4} c="blue.6">
          Thông tin nâng bậc tiếp theo
        </Title>
      </div>
      {data?.daMaxBac ? (
        <Badge variant="outline" color="green">
          Đã max bậc
        </Badge>
      ) : (
        <div>
          <Text>
            Thời gian nâng bậc tiếp theo:{" "}
            <span className="font-semibold">
              {formatNgayVN(data?.ngayNangBacNext)}
            </span>
          </Text>
          <List size="md">
            {data?.phuCapNext && (
              <List.Item>
                {data?.phuCapNext?.chucDanh}, hệ số{" "}
                {data?.phuCapNext?.heSo.toLocaleString("vi-VN")}
              </List.Item>
            )}
            {data?.trachNhiemNext && (
              <List.Item>
                {data?.trachNhiemNext.chucDanh}, hệ số{" "}
                {data?.trachNhiemNext.heSo.toLocaleString("vi-VN")}
              </List.Item>
            )}
            <List.Item>
              {data?.ngachLuongNext?.chucDanh}, bậc {data?.bacLuongNext?.bac},
              hệ số {data?.bacLuongNext?.heSo.toLocaleString("vi-VN")}
            </List.Item>
          </List>
          <Text>
            Mức lương:{" "}
            <span className="font-semibold">
              {data?.mucLuongNext?.toLocaleString("vi-VN")} || 0 đồng
            </span>
          </Text>
          {isGanDenHanNangBac(
            data?.ngayApDung,
            data?.bacLuong?.thoiGianNangBac || 0
          ) && <BtnXacNhan data={data} />}
        </div>
      )}
    </Card>
  );
}

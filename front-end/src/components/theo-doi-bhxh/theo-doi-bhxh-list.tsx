import { Anchor, Badge, List, Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getMucLuongToiThieuMoiNhat } from "apis/muc-luong-toi-thieu";
import {
  calculateTotalSalary,
  formatColorTheoNgayApDung,
  formatNgayApDungTiepTheo,
  formatNgayVN,
  isBacLuongMax,
} from "lib/util";
import { Link } from "react-router";
import type { ThongTinBHXHResponse } from "types/thong-tin-bhxh";

export function TheoDoiBHXHList({ data }: { data: ThongTinBHXHResponse[] }) {
  const { data: mucLuongToiThieu } = useQuery({
    queryKey: ["mucLuongToiThieu"],
    queryFn: () => getMucLuongToiThieuMoiNhat(),
    placeholderData: keepPreviousData,
  });

  return (
    <Table highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Họ và tên</Table.Th>
          <Table.Th>Phòng</Table.Th>
          <Table.Th>Chức danh</Table.Th>
          <Table.Th>Mức lương (đồng)</Table.Th>
          <Table.Th>Thời gian áp dụng</Table.Th>
          <Table.Th>Thời gian nâng bậc tiếp theo</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((item, index) => (
          <Table.Tr key={item.id}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>
              <Anchor
                component={Link}
                to={`/theo-doi-bhxh/${item.id}`}
                c="gray.9"
                fz="sm"
              >
                {item.nhanVien.ten}
              </Anchor>
            </Table.Td>
            <Table.Td>{item.nhanVien.phong.ten}</Table.Td>
            <Table.Td>
              <List size="sm">
                {item.phuCap && (
                  <List.Item>
                    {item.phuCap.chucDanh}, hệ số{" "}
                    {item.phuCap.heSo.toLocaleString("vi-VN")}
                  </List.Item>
                )}
                {item.trachNhiem && (
                  <List.Item>
                    {item.trachNhiem.chucDanh}, hệ số{" "}
                    {item.trachNhiem.heSo.toLocaleString("vi-VN")}
                  </List.Item>
                )}
                <List.Item>
                  {item.ngachLuong.chucDanh}, bậc {item.bacLuong.bac}, hệ số{" "}
                  {item.bacLuong.heSo.toLocaleString("vi-VN")}
                </List.Item>
              </List>
            </Table.Td>
            <Table.Td>
              {calculateTotalSalary(
                item?.phuCap?.heSo,
                item?.trachNhiem?.heSo,
                item?.bacLuong,
                mucLuongToiThieu?.mucLuong || 0
              ).toLocaleString("vi-VN")}
            </Table.Td>
            <Table.Td>{formatNgayVN(item?.ngayApDung)}</Table.Td>
            <Table.Td>
              {isBacLuongMax(
                item?.bacLuong,
                item?.ngachLuong.bacLuong || []
              ) ? (
                <Badge variant="outline" color="green">
                  Đã max bậc
                </Badge>
              ) : (
                <Badge
                  color={formatColorTheoNgayApDung(
                    item?.ngayApDung,
                    item?.bacLuong.thoiGianNangBac
                  )}
                >
                  {formatNgayApDungTiepTheo(
                    item?.ngayApDung,
                    item?.bacLuong.thoiGianNangBac
                  )}
                </Badge>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

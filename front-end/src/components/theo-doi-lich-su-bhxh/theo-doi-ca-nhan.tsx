import { Group, List, Paper, Table, Title } from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getLichSuBhxhByNhanVien } from "apis/lich-su-bhxh";
import { calculateTotalSalary, formatNgayVN } from "lib/util";

export function TheoDoiLichSuCaNhan({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["lich-su-bhxh", id],
    queryFn: () => getLichSuBhxhByNhanVien(id),
  });

  return (
    <Paper shadow="md" radius="md" mt={"md"}>
      <Group mb="md">
        <IconHistory color="red" />
        <Title order={4}>Lịch sử nâng lương BHXH</Title>
      </Group>
      <Table highlightOnHover withTableBorder>
        <Table.Thead fw={700}>
          <Table.Tr>
            <Table.Td>STT</Table.Td>
            <Table.Td>Ngày áp dụng</Table.Td>
            <Table.Td>Bậc lương</Table.Td>
            <Table.Td>Mức lương tối thiểu vùng áp dụng (đồng)</Table.Td>
            <Table.Td>Mức lương (đồng/tháng)</Table.Td>
            <Table.Td>Thông tin Quyết định nâng lương</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{formatNgayVN(item.ngayApDung)}</Table.Td>
              <Table.Td>
                <List size="sm">
                  <List.Item>
                    {item.bacLuong.ngachLuong.maNgach} -{" "}
                    {item.bacLuong.ngachLuong.chucDanh} - bậc:{" "}
                    {item.bacLuong.bac} - hệ số:{" "}
                    {item.bacLuong.heSo.toLocaleString("vi-VN")}
                  </List.Item>
                  {item.phuCap && (
                    <List.Item>
                      {item.phuCap.chucDanh} - hệ số:{" "}
                      {item.phuCap.heSo.toLocaleString("vi-VN")}
                    </List.Item>
                  )}
                  {item.trachNhiem && (
                    <List.Item>
                      {item.trachNhiem.chucDanh} - hệ số:{" "}
                      {item.trachNhiem.heSo.toLocaleString("vi-VN")}
                    </List.Item>
                  )}
                </List>
              </Table.Td>
              <Table.Td>
                {item.mucLuongToiThieuVung.mucLuong.toLocaleString("vi-VN")}
              </Table.Td>
              <Table.Td>
                {calculateTotalSalary(
                  item?.phuCap?.heSo,
                  item.trachNhiem?.heSo,
                  item?.bacLuong,
                  item.mucLuongToiThieuVung.mucLuong
                ).toLocaleString("vi-VN")}
              </Table.Td>

              <Table.Td>{item.thongTinQD}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

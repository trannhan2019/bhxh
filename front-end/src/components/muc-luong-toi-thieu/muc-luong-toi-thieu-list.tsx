import { Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMucLuongToiThieus } from "apis/muc-luong-toi-thieu";

export function MucLuongToiThieuList() {
  const { data: mucLuongToiThieus } = useQuery({
    queryKey: ["muc-luong-toi-thieus"],
    queryFn: () => getMucLuongToiThieus(),
    placeholderData: keepPreviousData,
  });
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Mức lương tối thiểu (đồng/tháng)</Table.Th>
            <Table.Th>Thời gian áp dụng</Table.Th>
            <Table.Th>Căn cứ pháp lý</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mucLuongToiThieus?.data?.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.mucLuong.toLocaleString("vi-VN")}</Table.Td>
              <Table.Td>
                {new Date(item.thoiGianApdung).toLocaleDateString("vi-VN")}
              </Table.Td>
              <Table.Td>{item.canCuPhapLy}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

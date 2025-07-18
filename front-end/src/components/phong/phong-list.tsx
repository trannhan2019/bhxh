import { Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPhongs } from "apis/phong";

export function PhongList() {
  const { data: phongs } = useQuery({
    queryKey: ["phongs"],
    queryFn: () => getPhongs(),
    placeholderData: keepPreviousData,
    retry: false,
  });
  return (
    <Table withTableBorder highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Tên phòng</Table.Th>
          <Table.Th>Tên viết tắt</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {phongs?.data?.map((item, index) => (
          <Table.Tr key={item.id}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{item.ten}</Table.Td>
            <Table.Td>{item.tenVietTat}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

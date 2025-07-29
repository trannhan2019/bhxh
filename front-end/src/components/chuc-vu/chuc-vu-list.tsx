import { Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getChucVus } from "apis/chuc-vu";

export function ChucVuList() {
  const { data: chucVus } = useQuery({
    queryKey: ["chuc-vus"],
    queryFn: () => getChucVus(),
    placeholderData: keepPreviousData,
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
        {chucVus?.data?.map((item, index) => (
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

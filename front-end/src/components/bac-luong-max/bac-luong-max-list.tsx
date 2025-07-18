import { Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBacLuongMax } from "apis/bac-luong-max";

export function BacLuongMaxList() {
  const { data: bacLuongMaxs } = useQuery({
    queryKey: ["bacLuongMaxs"],
    queryFn: () => getBacLuongMax(),
    placeholderData: keepPreviousData,
    retry: false,
  });
  return (
    <Table withTableBorder highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Mã Ngạch</Table.Th>
          <Table.Th>Bậc max</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {bacLuongMaxs?.data?.map((element, idx) => (
          <Table.Tr key={element.id}>
            <Table.Td>{idx + 1}</Table.Td>
            <Table.Td>{element.maNgach}</Table.Td>
            <Table.Td>{element.bacMax}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

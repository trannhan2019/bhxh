import { Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHeSoPhuCaps } from "apis/he-so-phu-cap";
import { getHeSoTrachNhiems } from "apis/he-so-trach-nhiem";

export function HeSoPhuCapList() {
  const { data: heSoPhuCaps } = useQuery({
    // Luôn lấy error để debug nếu cần
    queryKey: ["he-so-phu-caps"],
    queryFn: getHeSoPhuCaps, // Không cần bọc trong arrow function nếu hàm không có tham số và không cần truyền thêm gì
    placeholderData: keepPreviousData,
  });

  const { data: heSoTrachNhiems } = useQuery({
    queryKey: ["he-so-trach-nhiems"],
    queryFn: () => getHeSoTrachNhiems(),
    placeholderData: keepPreviousData,
  });

  const phuCapTable = (
    <Table highlightOnHover withRowBorders withTableBorder captionSide="top">
      <Table.Caption className="font-bold uppercase">
        Hệ số phụ cấp
      </Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Chức danh</Table.Th>
          <Table.Th>Hệ số</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {heSoPhuCaps?.map((item, index) => (
          <Table.Tr key={item.id}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{item.chucDanh}</Table.Td>
            <Table.Td>{item.heSo.toLocaleString("vi-VN")}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  const heSoTrachNhiemTable = (
    <Table highlightOnHover withRowBorders withTableBorder captionSide="top">
      <Table.Caption className="font-bold uppercase">
        Hệ số trách nhiệm
      </Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>STT</Table.Th>
          <Table.Th>Chức danh</Table.Th>
          <Table.Th>Hệ số</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {heSoTrachNhiems?.map((item, index) => (
          <Table.Tr key={item.id}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{item.chucDanh}</Table.Td>
            <Table.Td>{item.heSo.toLocaleString("vi-VN")}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  return (
    <div className="flex flex-col md:flex-row gap-7">
      <div className="w-full">{phuCapTable}</div>
      <div className="w-full">{heSoTrachNhiemTable}</div>
    </div>
  );
}

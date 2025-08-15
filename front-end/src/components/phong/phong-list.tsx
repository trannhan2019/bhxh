import { Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPhongs } from "apis/phong";
import { PhongModal } from "./phong-modal";

export function PhongList() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: phongs } = useQuery({
    queryKey: ["phongs"],
    queryFn: () => getPhongs(),
    placeholderData: keepPreviousData,
  });
  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <Button onClick={open}>Thêm mới</Button>
      </div>

      <PhongModal opened={opened} close={close} />

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
    </div>
  );
}

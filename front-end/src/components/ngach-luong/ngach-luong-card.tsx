import { Card, Table, Text } from "@mantine/core";
import type { NgachLuongWithBac } from "types/ngach-luong";

interface Props {
  data: NgachLuongWithBac;
}

export function NgachLuongCard({ data }: Props) {
  return (
    <Card withBorder shadow="md" radius={"md"}>
      <Card.Section withBorder inheritPadding py="md" bg={"blue.6"}>
        <Text fw={500} c={"white"}>{`${data.chucDanh} - ${data.maNgach}`}</Text>
      </Card.Section>
      <Card.Section>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Bậc</Table.Th>
              <Table.Th>Hệ số</Table.Th>
              <Table.Th>Thời gian nâng bậc (ngày)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.bacLuongs.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>{item.bac}</Table.Td>
                <Table.Td>{item.heSo.toLocaleString("vi-VN")}</Table.Td>
                <Table.Td>{item.thoiGianNangBac}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card.Section>
    </Card>
  );
}

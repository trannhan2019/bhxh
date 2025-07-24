import { Badge, Group, Pagination, Select, Table } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNhanViens } from "apis/nhan-vien";
import { usePhanTrang } from "hooks/phan-trang";
import { useSearchParams } from "react-router";

export function NhanVienList() {
  //get search params
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10", 10);

  const { data: nhanViens } = useQuery({
    queryKey: ["nhanViens", pageParam, pageSizeParam],
    queryFn: () => getNhanViens({ page: pageParam, pageSize: pageSizeParam }),
    placeholderData: keepPreviousData,
  });

  // const {
  //   currentPage,
  //   pageSize,
  //   totalPages,
  //   handlePageChange,
  //   handlePageSizeChange,
  // } = usePhanTrang(nhanViens?.data.total || 0);

  const rows = nhanViens?.data?.map((element, idx) => (
    <Table.Tr key={element.id}>
      {/* <Table.Td>{(currentPage - 1) * pageSize + idx + 1}</Table.Td> */}
      <Table.Td>{element.ten}</Table.Td>
      <Table.Td>{element.phong.ten}</Table.Td>
      <Table.Td>{element.chucVu.ten}</Table.Td>
      <Table.Td>
        {element.isActive ? (
          <Badge color="green">Hoạt động</Badge>
        ) : (
          <Badge color="red">Ngừng hoạt động</Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div>
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Họ và tên</Table.Th>
            <Table.Th>Phòng</Table.Th>
            <Table.Th>Chức vụ</Table.Th>
            <Table.Th>Tình trạng</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* <Group mt="md" justify="flex-end">
        <Select
          data={["5", "10", "20", "50"]}
          value={String(pageSize)}
          onChange={handlePageSizeChange}
          w={80}
        />
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
      </Group> */}
    </div>
  );
}

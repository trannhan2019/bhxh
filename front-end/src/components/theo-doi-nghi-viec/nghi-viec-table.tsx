import { Table, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getTheoDoiNghiViecs } from "apis/thong-tin-nghi-viec";
import { formatNgayVN } from "lib/util";

export function TheoDoiNghiViecTable() {
  const { data } = useQuery({
    queryKey: ["theo-doi-nghi-viecs"],
    queryFn: () => getTheoDoiNghiViecs(),
  });
  return (
    <div>
      <Title mb={"md"} order={3}>
        Thông tin CBNV đã nghỉ chế độ/ nghỉ việc
      </Title>
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Họ và tên</Table.Th>
            <Table.Th>Phòng</Table.Th>
            <Table.Th>Chức vụ</Table.Th>
            <Table.Th>Thời gian nghỉ việc</Table.Th>
            <Table.Th>Thông tin khác</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.nhanVien.ten}</Table.Td>
              <Table.Td>{item.nhanVien.phong.ten}</Table.Td>
              <Table.Td>{item.nhanVien.chucVu.ten}</Table.Td>
              <Table.Td>{formatNgayVN(item.thoiGianKetThuc)}</Table.Td>
              <Table.Td>{item.thongTinKhac}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

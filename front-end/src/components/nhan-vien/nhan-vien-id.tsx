import { Button, Card, Text, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getNhanVien } from "apis/nhan-vien";
import { BtnNghiViec } from "components/theo-doi-nghi-viec/btn-nghi-viec";
import { Link, useParams } from "react-router";

export function NhanVienChiTiet() {
  let { id } = useParams();
  useDocumentTitle("SBA | Chi tiết thông tin nhân viên");
  const { data } = useQuery({
    queryKey: ["nhan-vien", Number(id)],
    queryFn: () => getNhanVien(Number(id)),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-4">
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            leftSection={<IconArrowLeft />}
            component={Link}
            to="/quan-ly-phong-nhanvien-chucvu"
          ></Button>
          <Title order={3} c="gray.8">
            Bảng theo chi tiết thông tin CBNV
          </Title>
        </div>
        {data?.daNghiViec === null && <BtnNghiViec id={Number(id)} />}
      </div>
      <Card shadow="md" radius="md">
        <Text>
          Họ và tên: <span className="font-semibold">{data?.ten}</span>
        </Text>
        <Text>
          Phòng: <span className="font-semibold">{data?.phong.ten}</span>
        </Text>
        <Text>
          Chức vụ: <span className="font-semibold">{data?.chucVu.ten}</span>
        </Text>
      </Card>
    </div>
  );
}

import { Button, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getTheoDoiBHXH } from "apis/thong-tin-bhxh";
import { BtnExcel } from "components/theo-doi-bhxh/btn-excel";
import { TheoDoiBhxhChiTiet } from "components/theo-doi-bhxh/theo-doi-bhxh-id";
import { TheoDoiLichSuCaNhan } from "components/theo-doi-lich-su-bhxh/theo-doi-ca-nhan";
import { Link, useParams } from "react-router";

export default function TheoDoiBhxhId() {
  useDocumentTitle("SBA | Chi tiết Theo dõi BHXH");
  let { id } = useParams();
  // console.log("id:1", id);

  const { data } = useQuery({
    queryKey: ["theo-doi-bhxh", Number(id)],
    queryFn: () => getTheoDoiBHXH(Number(id)),
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
            to="/theo-doi-bhxh"
          ></Button>
          <Title order={3} c="gray.8">
            Bảng theo dõi chi tiết BHXH
          </Title>
        </div>
        <BtnExcel id={Number(id)} />
      </div>
      <TheoDoiBhxhChiTiet data={data} />
      <TheoDoiLichSuCaNhan id={Number(data?.nhanVienId)} />
    </div>
  );
}

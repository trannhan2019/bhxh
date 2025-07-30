import { Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTheoDoiBHXHs } from "apis/thong-tin-bhxh";
import { TheoDoiBHXHList } from "components/theo-doi-bhxh/theo-doi-bhxh-list";

export default function TheoDoiBhxh() {
  useDocumentTitle("SBA | Theo dõi BHXH");
  const { data: dataBHXH } = useQuery({
    queryKey: ["theo-doi-bhxhs"],
    queryFn: () => getTheoDoiBHXHs(),
    placeholderData: keepPreviousData,
  });
  return (
    <div>
      <Title order={2} mb="md">
        Theo dõi BHXH
      </Title>
      <TheoDoiBHXHList data={dataBHXH?.data || []} />
    </div>
  );
}

import { Card, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getLichSuBhxhByNhanVien } from "apis/lich-su-bhxh";

export function TheoDoiLichSuCaNhan({ id }: { id: number }) {
  const { data } = useQuery({
    queryKey: ["lich-su-bhxh", id],
    queryFn: () => getLichSuBhxhByNhanVien(id),
  });
  console.log(data);

  return (
    <Card shadow="md" radius="md" mt={"md"}>
      <Title order={4}>Lịch sử nâng lương BHXH</Title>
    </Card>
  );
}

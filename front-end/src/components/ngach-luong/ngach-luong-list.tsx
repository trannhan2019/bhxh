import { NgachLuongCard } from "./ngach-luong-card";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNgachLuongs } from "apis/ngach-luong";

export function NgachLuongList() {
  const { data } = useQuery({
    queryKey: ["ngachLuongs"],
    queryFn: () => getNgachLuongs(),
    placeholderData: keepPreviousData,
    retry: false,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.data?.map((item) => (
        <NgachLuongCard key={item.id} data={item} />
      ))}
    </div>
  );
}

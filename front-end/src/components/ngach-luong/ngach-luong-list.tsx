import { NgachLuongCard } from "./ngach-luong-card";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNgachLuongBacLuongs } from "apis/ngach-luong";

export function NgachLuongList() {
  const { data } = useQuery({
    queryKey: ["ngachLuongBacLuongs"],
    queryFn: () => getNgachLuongBacLuongs(),
    placeholderData: keepPreviousData,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((item) => (
        <NgachLuongCard key={item.id} data={item} />
      ))}
    </div>
  );
}

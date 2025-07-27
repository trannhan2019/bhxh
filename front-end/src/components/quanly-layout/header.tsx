import { useQuery } from "@tanstack/react-query";
import { HeaderNotifacation } from "./header-notifacation";
import { HeaderUser } from "./header-user";
import { getBhxhNotifacationEmail } from "apis/thong-tin-bhxh";
import { Alert } from "@mantine/core";

export function Header() {
  const { data } = useQuery({
    queryKey: ["theo-doi-bhxh-notifacation"],
    queryFn: () => getBhxhNotifacationEmail(),
  });
  return (
    <>
      {data && data.length > 0 && (
        <Alert title="Thông báo" color="red">
          Có {data.length} CBNV gần đến hạn nâng lương BHXH.
        </Alert>
      )}

      <div className="flex items-center gap-5 mr-5">
        <HeaderNotifacation data={data} />
        <HeaderUser />
      </div>
    </>
  );
}

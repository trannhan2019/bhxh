import { useQuery } from "@tanstack/react-query";
import { HeaderNotifacation } from "./header-notifacation";
import { HeaderUser } from "./header-user";
import { getBhxhNotificationEmail } from "apis/thong-tin-bhxh";
import { Alert } from "@mantine/core";
import { useEffect, useState } from "react";

export function Header() {
  const { data } = useQuery({
    queryKey: ["theo-doi-bhxh-notifacation"],
    queryFn: () => getBhxhNotificationEmail(),
  });
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(Boolean(data && data.length > 0));
  }, [data]);
  return (
    <>
      {showAlert && (
        <Alert
          title="Thông báo"
          color="red"
          onClose={() => setShowAlert(false)}
          withCloseButton
        >
          Có {data?.length} CBNV gần đến hạn nâng lương BHXH.
        </Alert>
      )}

      <div className="flex items-center gap-5 mr-5">
        <HeaderNotifacation data={data} />
        <HeaderUser />
      </div>
    </>
  );
}

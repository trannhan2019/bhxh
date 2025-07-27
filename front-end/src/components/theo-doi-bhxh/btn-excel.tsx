import { Button } from "@mantine/core";
import { IconFileExcel } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { reportExcel } from "apis/thong-tin-bhxh";

export function BtnExcel({ id }: { id: number }) {
  const handleXuatExcel = useMutation({
    mutationFn: (id: number) => reportExcel(id),
    onSuccess: (data) => {
      const blob = data;
      //   console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report_bhxh.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.log(error);
      alert("Không thể tải file. Vui lòng thử lại.");
    },
  });
  return (
    <Button
      loading={handleXuatExcel.isPending}
      onClick={() => handleXuatExcel.mutate(id)}
      color="green"
      leftSection={<IconFileExcel />}
    >
      Xuất thông tin Excel
    </Button>
  );
}

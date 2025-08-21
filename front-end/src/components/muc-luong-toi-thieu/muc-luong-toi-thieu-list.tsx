import { Button, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteMucLuongToiThieu,
  getMucLuongToiThieus,
} from "apis/muc-luong-toi-thieu";
import { QUERY_MUC_LUONG_TOI_THIEUS } from "lib/constants";
import { useState } from "react";
import { MucLuongToiThieuModal } from "./muc-luong-toi-thieu-modal";
import { modals } from "@mantine/modals";
import {
  showNotificationError,
  showNotificationSuccess,
} from "components/common/notifacation";

export function MucLuongToiThieuList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: mucLuongToiThieus } = useQuery({
    queryKey: [QUERY_MUC_LUONG_TOI_THIEUS],
    queryFn: () => getMucLuongToiThieus(),
    placeholderData: keepPreviousData,
  });

  // mở modal create
  const openCreateModal = () => {
    setModalType("create");
    setSelectedId(null);
    open();
  };
  // mở modal edit
  const openEditModal = (id: number) => {
    setModalType("edit");
    setSelectedId(id);
    open();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deleteMucLuongToiThieu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_MUC_LUONG_TOI_THIEUS] });
      showNotificationSuccess();
    },
    onError: () => {
      showNotificationError();
    },
  });

  const handleDelete = (id: number) => {
    modals.openConfirmModal({
      title: "Xác nhận xóa phòng",
      children: <Text size="sm">Bạn có muốn xóa phòng dữ liệu này không?</Text>,
      labels: { confirm: "Xác nhận", cancel: "Hủy" },
      onConfirm: () => mutate(id),
    });
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <Button onClick={openCreateModal}>Thêm mới</Button>
      </div>

      <MucLuongToiThieuModal
        type={modalType}
        id={selectedId ?? undefined}
        opened={opened}
        close={close}
      />

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Mức lương tối thiểu (đồng/tháng)</Table.Th>
            <Table.Th>Thời gian áp dụng</Table.Th>
            <Table.Th>Căn cứ pháp lý</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mucLuongToiThieus?.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.mucLuong.toLocaleString("vi-VN")}</Table.Td>
              <Table.Td>
                {new Date(item.thoiGianApdung).toLocaleDateString("vi-VN")}
              </Table.Td>
              <Table.Td>{item.canCuPhapLy}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

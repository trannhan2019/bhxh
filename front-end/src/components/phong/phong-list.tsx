import { ActionIcon, Button, Group, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPhongs, deletePhong } from "apis/phong";
import { PhongModal } from "./phong-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { QUERY_PHONGS } from "lib/constants";
import { modals } from "@mantine/modals";

export function PhongList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: phongs } = useQuery({
    queryKey: ["phongs"],
    queryFn: () => getPhongs(),
    placeholderData: keepPreviousData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deletePhong(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_PHONGS] });
      notifications.show({
        title: "Thông báo!",
        message: "Xóa dữ liệu thành công",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Thông báo!",
        message: "Xóa dữ liệu thất bại",
        color: "red",
      });
    },
  });

  const handleDelete = (id: number) => {
    modals.openConfirmModal({
      title: "Xác nhận xóa phòng",
      children: (
        <Text size="sm">
          Bạn có muốn xóa phòng{" "}
          <b>{phongs?.data.find((p) => p.id === id)?.ten}</b> không?
        </Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Hủy" },
      onConfirm: () => mutate(id),
    });
  };

  // mở modal create
  const handleAdd = () => {
    setModalType("create");
    setSelectedId(null);
    open();
  };
  // mở modal edit
  const handleEdit = (id: number) => {
    setModalType("edit");
    setSelectedId(id);
    open();
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd}>Thêm mới</Button>
      </div>

      <PhongModal
        type={modalType}
        id={selectedId ?? undefined}
        opened={opened}
        close={close}
      />

      <Table withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Tên phòng</Table.Th>
            <Table.Th>Tên viết tắt</Table.Th>
            <Table.Th>Thao tác</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {phongs?.data?.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.ten}</Table.Td>
              <Table.Td>{item.tenVietTat}</Table.Td>
              <Table.Td>
                <Group>
                  <ActionIcon
                    size={"sm"}
                    variant="subtle"
                    onClick={() => handleEdit(item.id)}
                  >
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon
                    size={"sm"}
                    color="red"
                    variant="subtle"
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

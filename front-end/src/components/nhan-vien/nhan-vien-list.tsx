import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteNhanVien, getNhanViens } from "apis/nhan-vien";
import { usePhanTrang } from "hooks/phan-trang";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { NhanVienModal } from "./nhan-vien-modal";
import {
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { QUERY_NHAN_VIENS } from "lib/constants";
import {
  showNotificationDelete,
  showNotificationSuccess,
} from "components/common/notifacation";
import { modals } from "@mantine/modals";

export function NhanVienList() {
  //get search params
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchParam = searchParams.get("search") || "";

  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: nhanViens } = useQuery({
    queryKey: ["nhan-viens", pageParam, pageSizeParam, searchParam],
    queryFn: () =>
      getNhanViens({
        page: pageParam,
        pageSize: pageSizeParam,
        search: searchParam,
      }),
    placeholderData: keepPreviousData,
  });

  const {
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    searchKey,
    handleSearchSubmit,
    setSearchKey,
  } = usePhanTrang(nhanViens?.total || 0);

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

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteNhanVien(id),
  });

  const handleDelete = (id: number) => {
    modals.openConfirmModal({
      title: "Xác nhận xóa phòng",
      children: (
        <Text size="sm">
          Bạn có muốn xóa nhân viên{" "}
          <b>{nhanViens?.data.find((p) => p.id === id)?.ten}</b> không?
        </Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Hủy" },
      onConfirm: () =>
        mutate(id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_NHAN_VIENS] });
            showNotificationSuccess();
          },
          onError: () => {
            showNotificationDelete();
          },
        }),
    });
  };

  const rows = nhanViens?.data?.map((element, idx) => (
    <Table.Tr key={element.id}>
      <Table.Td>{(currentPage - 1) * pageSize + idx + 1}</Table.Td>
      <Table.Td className="hover:underline hover:text-blue-500">
        <Link to={`/nhan-vien/${element.id}`}>{element.ten}</Link>
      </Table.Td>
      <Table.Td>{element.phong.ten}</Table.Td>
      <Table.Td>{element.chucVu.ten}</Table.Td>
      <Table.Td>
        {element.isActive ? (
          <Badge color="green">Hoạt động</Badge>
        ) : (
          <Badge color="red">Ngừng hoạt động</Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Menu>
          <Menu.Target>
            <ActionIcon variant="transparent" size="md" color="black">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={20} />}
              onClick={() => openEditModal(element.id)}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash color="red" size={20} />}
              onClick={() => handleDelete(element.id)}
            >
              Xóa
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(searchKey); // khi submit form search
          }}
        >
          <Group>
            <TextInput
              type="text"
              placeholder="Tìm kiếm theo tên"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              rightSection={
                searchKey && (
                  <IconX
                    color="red"
                    onClick={() => {
                      setSearchKey("");
                      handleSearchSubmit("");
                    }}
                  />
                )
              }
            />
            <Button leftSection={<IconSearch />} type="submit">
              Tìm kiếm
            </Button>
          </Group>
        </form>
        <Button leftSection={<IconPlus />} onClick={openCreateModal}>
          Thêm mới
        </Button>
      </div>

      <NhanVienModal
        type={modalType}
        id={selectedId ?? undefined}
        opened={opened}
        close={close}
      />

      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>STT</Table.Th>
            <Table.Th>Họ và tên</Table.Th>
            <Table.Th>Phòng</Table.Th>
            <Table.Th>Chức vụ</Table.Th>
            <Table.Th>Tình trạng</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Group mt="md" justify="flex-end">
        <Select
          data={["10", "20", "30", "50"]}
          value={String(pageSize)}
          onChange={handlePageSizeChange}
          w={80}
        />
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
        />
      </Group>
    </div>
  );
}

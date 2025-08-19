import { notifications } from "@mantine/notifications";

export function showNotificationSuccess() {
  notifications.show({
    title: "Thông báo!",
    message: "Cập nhật dữ liệu thành công",
    color: "green",
  });
}

export function showNotificationError() {
  notifications.show({
    title: "Thông báo!",
    message: "Cập nhật dữ liệu thất bại",
    color: "red",
  });
}

export function showNotificationDelete() {
  notifications.show({
    title: "Thông báo!",
    message: "Xoá dữ liệu thất bại",
    color: "red",
  });
}

export function showNotificationDeleteSuccess() {
  notifications.show({
    title: "Thông báo!",
    message: "Xoá dữ liệu thành công",
    color: "green",
  });
}

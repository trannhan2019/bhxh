import { ActionIcon, Menu } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

export function HeaderUser() {
  return (
    <Menu width={150}>
      <Menu.Target>
        <ActionIcon size={"lg"} variant="subtle" radius={"lg"}>
          <IconUser />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Tài khoản</Menu.Label>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group } from "@mantine/core";
import { Sidebar } from "./sidebar";
import { Outlet } from "react-router";
import { Header } from "./header";

export default function QuanLyLayout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className="flex items-center justify-between px-5">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <span className="font-bold text-3xl text-blue-700">SBA</span>
          <span className="text-2xl">-</span>
          <span className="text-2xl font-semibold">Quản lý BHXH</span>
        </Group>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      {/* <AppShell.Main>{children}</AppShell.Main> */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

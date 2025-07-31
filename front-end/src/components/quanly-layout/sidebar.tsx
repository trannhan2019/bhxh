import { SegmentedControl } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import {
  IconBellRinging,
  IconLicense,
  IconMessages,
  IconShoppingCart,
} from "@tabler/icons-react";
import classes from "./sidebar.module.css";

// Menu items.
const tabs = {
  main: [
    {
      link: "/theo-doi-bhxh",
      label: "Theo dõi thông tin BHXH",
      icon: IconBellRinging,
    },
    {
      link: "/theo-doi-nghi-viec",
      label: "Theo dõi thông tin nghỉ việc",
      icon: IconMessages,
    },
  ],
  quanly: [
    {
      link: "/quan-ly-phong-nhanvien-chucvu",
      label: "Phòng, Nhân viên, Chức vụ",
      icon: IconShoppingCart,
    },
    {
      link: "/quan-ly-ngach-bac-luong",
      label: "Bậc, ngạch lương",
      icon: IconLicense,
    },
  ],
};

export function Sidebar() {
  const pathname = useLocation().pathname;
  const [section, setSection] = useState<"main" | "quanly">("main");
  useEffect(() => {
    if (pathname.startsWith("/quan-ly")) {
      setSection("quanly");
    } else {
      setSection("main");
    }
  }, [pathname]);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const links = tabs[section].map((item) => (
    <Link
      className={classes.link}
      data-active={isActive(item.link) || undefined}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <SegmentedControl
          value={section}
          onChange={(value: string) => setSection(value as "main" | "quanly")}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Menu Theo dõi", value: "main" },
            { label: "Menu Quản lý", value: "quanly" },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      {/* <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div> */}
    </nav>
  );
}

import { ActionIcon, Indicator, Menu } from "@mantine/core";
import { IconBellRinging } from "@tabler/icons-react";
import { tinhSoNgayNangBacConLai } from "lib/util";
import { Link } from "react-router";
import type { ThongTinBHXHWithNhanVienNgachLuongBacLuong } from "types/thong-tin-bhxh";

interface Props {
  data: ThongTinBHXHWithNhanVienNgachLuongBacLuong[] | undefined;
}

export function HeaderNotifacation({ data }: Props) {
  return (
    <Menu width={300}>
      <Menu.Target>
        <Indicator
          color="red"
          disabled={data?.length === 0 || undefined}
          processing
          inline
          label={data?.length}
          size={14}
        >
          <ActionIcon variant="subtle" size={"lg"}>
            <IconBellRinging />
          </ActionIcon>
        </Indicator>
      </Menu.Target>
      <Menu.Dropdown className="h-[400px] overflow-y-scroll">
        <Menu.Label>Notifications</Menu.Label>
        {data?.map((item) => (
          <Menu.Item
            key={item.id}
            component={Link}
            to={`/theo-doi-bhxh/${item.id}`}
          >
            {item.nhanVien.ten} còn{" "}
            {tinhSoNgayNangBacConLai(
              item.ngayApDung,
              item.bacLuong.thoiGianNangBac
            )}{" "}
            ngày đến hạn nâng lương BHXH
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

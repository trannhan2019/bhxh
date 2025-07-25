import { Tabs } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { HeSoPhuCapList } from "components/he-so-phu-cap/he-so-phu-cap-list";
import { MucLuongToiThieuList } from "components/muc-luong-toi-thieu/muc-luong-toi-thieu-list";
import { NgachLuongList } from "components/ngach-luong/ngach-luong-list";

export default function QuanLyBacNgachLuong() {
  useDocumentTitle("SBA | Quản lý bậc, ngạch lương");
  return (
    <Tabs defaultValue="ngachBacLuong">
      <Tabs.List mb={"md"}>
        <Tabs.Tab value="ngachBacLuong">Ngạch, bậc lương</Tabs.Tab>
        <Tabs.Tab value="phuCap">Hệ số phụ cấp, trách nhiệm</Tabs.Tab>
        <Tabs.Tab value="mucLuongToiThieu">Mức lương tối thiểu vùng</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="ngachBacLuong">
        <NgachLuongList />
      </Tabs.Panel>
      <Tabs.Panel value="phuCap">
        <HeSoPhuCapList />
      </Tabs.Panel>
      <Tabs.Panel value="mucLuongToiThieu">
        <MucLuongToiThieuList />
      </Tabs.Panel>
    </Tabs>
  );
}

import { Tabs } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { ChucVuList } from "components/chuc-vu/chuc-vu-list";
import { NhanVienList } from "components/nhan-vien/nhan-vien-list";
import { PhongList } from "components/phong/phong-list";

export default function QuanLyPhongNhanVienChucVu() {
  useDocumentTitle("SBA | Quản lý phòng, nhân viên, chức vụ");
  return (
    <div>
      <Tabs defaultValue={"phong"}>
        <Tabs.List>
          <Tabs.Tab value="phong">Phòng</Tabs.Tab>
          <Tabs.Tab value="nhanvien">Nhân viên</Tabs.Tab>
          <Tabs.Tab value="chucvu">Chức vụ</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="phong">
          <PhongList />
        </Tabs.Panel>
        <Tabs.Panel value="nhanvien">
          <NhanVienList />
        </Tabs.Panel>
        <Tabs.Panel value="chucvu">
          <ChucVuList />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

import { useDocumentTitle } from "@mantine/hooks";
import QuanLyLayout from "components/quanly-layout";
import QuanLyPhongNhanVienChucVu from "pages/quan-ly-phong-nhanvien-chucvu";
import { Navigate, Route, Routes } from "react-router";
import TheoDoiBhxh from "./pages/theo-doi-bhxh";
import TheoDoiBhxhId from "pages/theo-doi-bhxh/id";
import QuanLyBacNgachLuong from "pages/quan-ly-bac-ngach-luong";

function App() {
  useDocumentTitle("Quản lý BHXH");
  return (
    <Routes>
      <Route index element={<Navigate to="/theo-doi-bhxh" />} />
      <Route element={<QuanLyLayout />}>
        <Route path="/theo-doi-bhxh" element={<TheoDoiBhxh />} />
        <Route path="theo-doi-bhxh/:id" element={<TheoDoiBhxhId />} />

        <Route
          path="/quan-ly-phong-nhanvien-chucvu"
          element={<QuanLyPhongNhanVienChucVu />}
        />
        <Route
          path="/quan-ly-ngach-bac-luong"
          element={<QuanLyBacNgachLuong />}
        />
      </Route>
    </Routes>
  );
}

export default App;

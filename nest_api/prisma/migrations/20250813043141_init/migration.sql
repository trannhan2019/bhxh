-- CreateTable
CREATE TABLE "Phong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "tenVietTat" TEXT NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ChucVu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "tenVietTat" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NhanVien" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ten" TEXT NOT NULL,
    "phongId" INTEGER NOT NULL,
    "chucVuId" INTEGER NOT NULL,
    "soThuTu" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "daNghiViec" DATETIME,
    CONSTRAINT "NhanVien_phongId_fkey" FOREIGN KEY ("phongId") REFERENCES "Phong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "NhanVien_chucVuId_fkey" FOREIGN KEY ("chucVuId") REFERENCES "ChucVu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MucLuongToiThieuVung" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mucLuong" INTEGER NOT NULL,
    "thoiGianApdung" DATETIME NOT NULL,
    "canCuPhapLy" TEXT
);

-- CreateTable
CREATE TABLE "HeSoPhuCap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chucDanh" TEXT NOT NULL,
    "heSo" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "HeSoTrachNhiem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chucDanh" TEXT NOT NULL,
    "heSo" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "NgachLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "maNgach" TEXT NOT NULL,
    "chucDanh" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BacLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bac" INTEGER NOT NULL,
    "heSo" REAL NOT NULL,
    "thoiGianNangBac" INTEGER NOT NULL,
    "ngachLuongId" INTEGER NOT NULL,
    CONSTRAINT "BacLuong_ngachLuongId_fkey" FOREIGN KEY ("ngachLuongId") REFERENCES "NgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ThongTinBhxh" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhanVienId" INTEGER NOT NULL,
    "ngachLuongId" INTEGER NOT NULL,
    "bacLuongId" INTEGER NOT NULL,
    "phuCapId" INTEGER,
    "trachNhiemId" INTEGER,
    "mucLuong" INTEGER NOT NULL,
    "ngayApDung" DATETIME NOT NULL,
    "thongTin" TEXT,
    "ngachLuongNextId" INTEGER,
    "bacLuongNextId" INTEGER,
    "phuCapNextId" INTEGER,
    "trachNhiemNextId" INTEGER,
    "mucLuongNext" INTEGER,
    "ngayNangBacNext" DATETIME,
    "daMaxBac" BOOLEAN NOT NULL DEFAULT false,
    "lastEmailSentAt" DATETIME,
    CONSTRAINT "ThongTinBhxh_nhanVienId_fkey" FOREIGN KEY ("nhanVienId") REFERENCES "NhanVien" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_ngachLuongId_fkey" FOREIGN KEY ("ngachLuongId") REFERENCES "NgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_bacLuongId_fkey" FOREIGN KEY ("bacLuongId") REFERENCES "BacLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_phuCapId_fkey" FOREIGN KEY ("phuCapId") REFERENCES "HeSoPhuCap" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_trachNhiemId_fkey" FOREIGN KEY ("trachNhiemId") REFERENCES "HeSoTrachNhiem" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_ngachLuongNextId_fkey" FOREIGN KEY ("ngachLuongNextId") REFERENCES "NgachLuong" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_bacLuongNextId_fkey" FOREIGN KEY ("bacLuongNextId") REFERENCES "BacLuong" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_phuCapNextId_fkey" FOREIGN KEY ("phuCapNextId") REFERENCES "HeSoPhuCap" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBhxh_trachNhiemNextId_fkey" FOREIGN KEY ("trachNhiemNextId") REFERENCES "HeSoTrachNhiem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LichSuBhxh" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhanVienId" INTEGER NOT NULL,
    "bacLuongId" INTEGER NOT NULL,
    "phuCapId" INTEGER,
    "trachNhiemId" INTEGER,
    "mucLuongToiThieuVungId" INTEGER NOT NULL,
    "ngayApDung" DATETIME,
    "thongTinQD" TEXT,
    CONSTRAINT "LichSuBhxh_nhanVienId_fkey" FOREIGN KEY ("nhanVienId") REFERENCES "NhanVien" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LichSuBhxh_bacLuongId_fkey" FOREIGN KEY ("bacLuongId") REFERENCES "BacLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LichSuBhxh_phuCapId_fkey" FOREIGN KEY ("phuCapId") REFERENCES "HeSoPhuCap" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LichSuBhxh_trachNhiemId_fkey" FOREIGN KEY ("trachNhiemId") REFERENCES "HeSoTrachNhiem" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LichSuBhxh_mucLuongToiThieuVungId_fkey" FOREIGN KEY ("mucLuongToiThieuVungId") REFERENCES "MucLuongToiThieuVung" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ThongTinNghiViec" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhanVienId" INTEGER NOT NULL,
    "thoiGianKetThuc" DATETIME NOT NULL,
    "thongTinKhac" TEXT,
    CONSTRAINT "ThongTinNghiViec_nhanVienId_fkey" FOREIGN KEY ("nhanVienId") REFERENCES "NhanVien" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NgachLuong_maNgach_key" ON "NgachLuong"("maNgach");

-- CreateIndex
CREATE UNIQUE INDEX "ThongTinBhxh_nhanVienId_key" ON "ThongTinBhxh"("nhanVienId");

-- CreateIndex
CREATE UNIQUE INDEX "ThongTinNghiViec_nhanVienId_key" ON "ThongTinNghiViec"("nhanVienId");

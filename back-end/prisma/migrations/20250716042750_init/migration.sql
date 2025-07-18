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
CREATE TABLE "BacNgachLuong" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bac" INTEGER NOT NULL,
    "heSo" REAL NOT NULL,
    "thoiGianNangBac" INTEGER NOT NULL,
    "ngachId" INTEGER NOT NULL,
    CONSTRAINT "BacNgachLuong_ngachId_fkey" FOREIGN KEY ("ngachId") REFERENCES "NgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BacLuongMax" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "maNgach" TEXT NOT NULL,
    "bacMax" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ThongTinBHXH" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhanVienId" INTEGER NOT NULL,
    "bacNgachLuongId" INTEGER NOT NULL,
    "phuCapId" INTEGER,
    "trachNhiemId" INTEGER,
    "ngayApDung" DATETIME NOT NULL,
    "thongTin" TEXT,
    "isMaxBac" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ThongTinBHXH_nhanVienId_fkey" FOREIGN KEY ("nhanVienId") REFERENCES "NhanVien" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBHXH_bacNgachLuongId_fkey" FOREIGN KEY ("bacNgachLuongId") REFERENCES "BacNgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBHXH_phuCapId_fkey" FOREIGN KEY ("phuCapId") REFERENCES "HeSoPhuCap" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ThongTinBHXH_trachNhiemId_fkey" FOREIGN KEY ("trachNhiemId") REFERENCES "HeSoTrachNhiem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LichSuBHXH" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nhanVienId" INTEGER NOT NULL,
    "bacLuongId" INTEGER NOT NULL,
    "phuCapId" INTEGER,
    "trachNhiemId" INTEGER,
    "mucLuongToiThieuVungId" INTEGER NOT NULL,
    "ngayApDung" DATETIME,
    "thongTinQD" TEXT,
    CONSTRAINT "LichSuBHXH_nhanVienId_fkey" FOREIGN KEY ("nhanVienId") REFERENCES "NhanVien" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LichSuBHXH_bacLuongId_fkey" FOREIGN KEY ("bacLuongId") REFERENCES "BacNgachLuong" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LichSuBHXH_phuCapId_fkey" FOREIGN KEY ("phuCapId") REFERENCES "HeSoPhuCap" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LichSuBHXH_trachNhiemId_fkey" FOREIGN KEY ("trachNhiemId") REFERENCES "HeSoTrachNhiem" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LichSuBHXH_mucLuongToiThieuVungId_fkey" FOREIGN KEY ("mucLuongToiThieuVungId") REFERENCES "MucLuongToiThieuVung" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NgachLuong_maNgach_key" ON "NgachLuong"("maNgach");

-- CreateIndex
CREATE UNIQUE INDEX "ThongTinBHXH_nhanVienId_key" ON "ThongTinBHXH"("nhanVienId");

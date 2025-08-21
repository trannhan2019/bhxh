export type MucLuongToiThieu = {
  id: number;
  mucLuong: number;
  thoiGianApdung: string; // API trả về string
  canCuPhapLy: string | null;
};

// Type cho API request (khi gửi data lên server)
export type MucLuongToiThieuRequest = Omit<MucLuongToiThieu, "id">;

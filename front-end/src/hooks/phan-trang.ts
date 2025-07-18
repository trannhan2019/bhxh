import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export function usePhanTrang(total: number) {
  const navigate = useNavigate();
  // Lấy page và pageSize từ URL, nếu không có thì dùng mặc định
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "10", 10);

  const [currentPage, setCurrentPage] = useState(pageParam);
  const [pageSize, setPageSize] = useState(pageSizeParam);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  useEffect(() => {
    setPageSize(pageSizeParam);
  }, [pageSizeParam]);

  const totalPages = Math.ceil(total / pageSize);

  const updateParams = (page: number, size: number) => {
    const newSearch = new URLSearchParams();
    newSearch.set("page", String(page));
    newSearch.set("pageSize", String(size));
    navigate(`?${newSearch.toString()}`);
  };
  const handlePageChange = (page: number) => {
    updateParams(page, pageSize);
  };

  const handlePageSizeChange = (value: string | null) => {
    const newSize = parseInt(value || "10", 10);
    updateParams(1, newSize); // Reset về trang 1 khi thay đổi size
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  };
}

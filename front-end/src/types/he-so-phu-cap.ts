export type HeSoPhuCap = {
  id: number;
  chucDanh: string;
  heSo: number;
  createdAt: Date;
  updatedAt: Date;
};

export type HeSoPhuCapWithTrachNhiem = {
  heSoPhuCap: HeSoPhuCap[];
  heSoTrachNhiem: HeSoPhuCap[];
};

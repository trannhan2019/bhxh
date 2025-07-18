export type HeSoPhuCap = {
  id: number;
  chucDanh: string;
  heSo: number;
};

export type HeSoPhuCapWithTrachNhiem = {
  heSoPhuCap: HeSoPhuCap[];
  heSoTrachNhiem: HeSoPhuCap[];
};

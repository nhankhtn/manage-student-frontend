export interface FilterConfigProps {
  [key: string]: {
    value: string;
    label: string;
  }[];
}

export const getFilterConfig = (options: FilterConfigProps) => [
  {
    label: "Trạng thái",
    key: "status",
    options: options["status"],
    xs: 6,
  },
  {
    label: "Khoa",
    key: "faculty",
    options: options["faculty"],
    xs: 6,
  },
];

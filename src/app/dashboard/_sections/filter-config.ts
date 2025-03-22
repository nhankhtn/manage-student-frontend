export interface FilterConfigProps {
  [key: string]: {
    value: string;
    label: string;
  }[];
}

export const getFilterConfig = (options: FilterConfigProps) => [
  {
    label: "Trạng thái",
    key: "status_name",
    options: options["status"],
    xs: 6,
  },
  {
    label: "Khoa",
    key: "faculty_name",
    options: options["faculty"],
    xs: 6,
  },
];

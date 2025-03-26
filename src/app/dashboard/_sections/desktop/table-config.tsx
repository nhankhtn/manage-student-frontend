import { CustomTableConfig } from "@/components/custom-table";
import { mappingGender, Student } from "@/types/student";
import { Typography } from "@mui/material";
import { parseStringToAddress } from "../../_components/drawer-update-student/drawer-update-student";

export function objectToAddress(address: any) {
  return Object.entries(address)
    .map(([, value]) => value)
    .filter(Boolean)
    .reverse()
    .join(", ");
}

export const getTableConfig = (): CustomTableConfig<
  Student["id"],
  Student
>[] => [
  {
    key: "mssv",
    headerLabel: "Mã số sinh viên",
    type: "string",
    headerCellProps: {
      sx: {
        position: "sticky",
        backgroundColor: "white",
      },
    },
    renderCell: (data) => <Typography variant='body2'>{data.id}</Typography>,
  },
  {
    key: "name",
    headerLabel: "Họ và tên",
    type: "string",
    headerCellProps: {
      sx: {
        position: "sticky",
        backgroundColor: "white",
      },
    },
    renderCell: (data) => <Typography variant='body2'>{data.name}</Typography>,
  },
  {
    key: "dob",
    headerLabel: "Ngày sinh",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>{data.date_of_birth}</Typography>
    ),
  },
  {
    key: "gender",
    headerLabel: "Giới tính",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>{mappingGender[data.gender]}</Typography>
    ),
  },
  {
    key: "email",
    headerLabel: "Email",
    type: "string",
    renderCell: (data) => <Typography variant='body2'>{data.email}</Typography>,
  },
  {
    key: "phone",
    headerLabel: "Số điện thoại",
    type: "string",
    renderCell: (data) => <Typography variant='body2'>{data.phone}</Typography>,
  },
  {
    key: "permanent_address",
    headerLabel: "Địa chỉ thường trú",
    type: "string",
    renderCell: (data) => {
      const address = parseStringToAddress(data.permanent_address);
      return (
        <Typography variant='body2' width={300} whiteSpace={"normal"}>
          {objectToAddress(address)}
        </Typography>
      );
    },
  },
  {
    key: "temporary_address",
    headerLabel: "Địa chị tạm trú",
    type: "string",
    renderCell: (data) => {
      const address = parseStringToAddress(data.temporary_address);
      return (
        <Typography variant='body2' width={300} whiteSpace={"normal"}>
          {data.temporary_address ? objectToAddress(address) : "Trống"}
        </Typography>
      );
    },
  },
  {
    key: "mailing_address",
    headerLabel: "Địa chỉ nhận thư",
    type: "string",
    renderCell: (data) => {
      const address = parseStringToAddress(data.mailing_address);
      return (
        <Typography variant='body2'>
          {data.mailing_address ? objectToAddress(address) : "Trống"}
        </Typography>
      );
    },
  },
  {
    key: "faculty",
    headerLabel: "Khoa",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>{data.faculty}</Typography>
    ),
  },
  {
    key: "course",
    headerLabel: "Khoá",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>{data.course}</Typography>
    ),
  },
  {
    key: "program",
    headerLabel: "Chương trình",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>{data.program}</Typography>
    ),
  },
  {
    key: "status",
    headerLabel: "Trạng thái",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>{data.status}</Typography>
    ),
  },
];

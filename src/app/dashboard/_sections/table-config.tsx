import { CustomTableConfig } from "@/components/custom-table";
import {
  Faculty,
  mappingGender,
  Program,
  Status,
  Student,
} from "@/types/student";
import { Typography } from "@mui/material";
import { parseStringToAddress } from "../_components/drawer-update-student/drawer-update-student";

export function objectToAddress(address: any) {
  return Object.entries(address)
    .map(([, value]) => value)
    .filter(Boolean)
    .join(", ");
}

export const getTableConfig = ({
  programs,
  statuses,
  faculties,
}: {
  programs: Program[];
  statuses: Status[];
  faculties: Faculty[];
}): CustomTableConfig<Student["id"], Student>[] => [
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
      <Typography variant='body2'>{data.dateOfBirth}</Typography>
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
      const address = parseStringToAddress(data.permanentAddress);
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
      const address = parseStringToAddress(data.temporaryAddress);
      return (
        <Typography variant='body2' width={300} whiteSpace={"normal"}>
          {data.temporaryAddress ? objectToAddress(address) : "Trống"}
        </Typography>
      );
    },
  },
  {
    key: "mailing_address",
    headerLabel: "Địa chỉ nhận thư",
    type: "string",
    renderCell: (data) => {
      const address = parseStringToAddress(data.mailingAddress);
      return (
        <Typography variant='body2'>
          {data.mailingAddress ? objectToAddress(address) : "Trống"}
        </Typography>
      );
    },
  },
  {
    key: "faculty",
    headerLabel: "Khoa",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>
        {faculties.find((f) => f.id === data.faculty)?.name}
      </Typography>
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
      <Typography variant='body2'>
        {programs.find((p) => p.id === data.program)?.name}
      </Typography>
    ),
  },
  {
    key: "status",
    headerLabel: "Trạng thái",
    type: "string",
    renderCell: (data) => (
      <Typography variant='body2'>
        {statuses.find((s) => s.id === data.status)?.name}
      </Typography>
    ),
  },
];

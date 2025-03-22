"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
  Typography,
  Drawer,
  Stack,
  Divider,
} from "@mui/material";
import {
  COUNTRY_DEFAULT,
  Faculty,
  Gender,
  Program,
  Status,
  Student,
  validationStudent,
} from "../../../../types/student";
import { useFormik } from "formik";
import RowStack from "@/components/row-stack";
import AddressStudentForm from "./address-student-form";
import AdditionalInformationForm from "./addtional-infomation-form";
import { useMainContext } from "@/context";

const formatDate = (date: Date) => {
  return date && !isNaN(new Date(date).getTime())
    ? new Date(date).toISOString().split("T")[0]
    : "";
};

export const parseStringToAddress = (addressString?: string) => {
  if (!addressString)
    return {
      detail: "",
      ward: "",
      district: "",
      province: "",
      country: COUNTRY_DEFAULT,
    };
  try {
    return JSON.parse(addressString);
  } catch (e) {
    return {
      detail: addressString,
      ward: "",
      district: "",
      province: "",
      country: COUNTRY_DEFAULT,
    };
  }
};

interface DrawerUpdateStudentProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (student: Student | Omit<Student,'email'>) => Promise<void>;
  faculties: Faculty[];
  statuses: Status[];
  programs: Program[];
}

export const IDENTITY_TYPES = [
  {
    key: "CCCD",
    name: "Căn cước nhân dân",
  },
  {
    key: "CMND",
    name: "Chứng minh nhân dân",
  },
  {
    key: "Passport",
    name: "Hộ chiếu",
  },
];

function DrawerUpdateStudent({
  student,
  open,
  onClose,
  addStudent,
  updateStudent,
  faculties,
  statuses,
  programs,
}: DrawerUpdateStudentProps) {
  const { countries } = useMainContext();

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const permanentAddress = parseStringToAddress(student?.permanentAddress);
  const temporaryAddress = parseStringToAddress(student?.temporaryAddress);
  const mailingAddress = parseStringToAddress(student?.mailingAddress);

  const handleSubmit = useCallback(
    async (values: any) => {
      onClose();
      const permanentAddress = {
        country: values.permanentCountry,
        province: values.permanentProvince,
        district: values.permanentDistrict,
        ward: values.permanentWard,
        detail: values.permanentDetail,
      };

      // Optional addresses
      let temporaryAddress;
      if (values.useTemporaryAddress) {
        temporaryAddress = {
          country: values.temporaryCountry,
          province: values.temporaryProvince,
          district: values.temporaryDistrict,
          ward: values.temporaryWard,
          detail: values.temporaryDetail,
        };
      }

      let mailingAddress;
      if (values.useMailingAddress) {
        mailingAddress = {
          country: values.mailingCountry,
          province: values.mailingProvince,
          district: values.mailingDistrict,
          ward: values.mailingWard,
          detail: values.mailingDetail,
        };
      }

      // Construct identity object
      const identity = {
        type: values.identityType,
        documentNumber: values.identityDocumentNumber,
        issueDate: new Date(values.identityIssueDate),
        issuePlace: values.identityIssuePlace,
        expiryDate: new Date(values.identityExpiryDate),
        countryIssue: values.identityCountry,
        isChip: values.identityIsChip,
        notes: values.identityNotes,
      };

      // Construct student object
      const studentData: Student = {
        id: values.id,
        name: values.name,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        email: values.email,
        permanentAddress: JSON.stringify(permanentAddress),
        temporaryAddress: values.useTemporaryAddress
          ? JSON.stringify(temporaryAddress)
          : "",
        mailingAddress: values.useMailingAddress
          ? JSON.stringify(mailingAddress)
          : "",
        faculty: values.faculty,
        course: values.course,
        program: values.program,
        phone: values.phone,
        status: values.status,
        identity: identity,
        nationality: values.nationality,
      };

      if (student) {
        
        if (studentData.email === student.email) {
          const { email, ...studentDataWithoutEmail } = studentData;
          await updateStudent(studentDataWithoutEmail);
        } else {
          await updateStudent(studentData);
        }
      } else {
        await addStudent(studentData);
      }
    },
    [updateStudent, addStudent, student, onClose]
  );

  const initialValues = useMemo(
    () => ({
      id: student?.id || "",
      name: student?.name || "",
      dateOfBirth: student?.dateOfBirth.split("T")[0] || "",
      gender: student?.gender || Gender.Male,
      email: student?.email || "",

      // Permanent address
      permanentCountry: permanentAddress.country || COUNTRY_DEFAULT,
      permanentProvince: permanentAddress.province || "",
      permanentDistrict: permanentAddress.district || "",
      permanentWard: permanentAddress.ward || "",
      permanentDetail: permanentAddress.detail || "",

      // Temporary address
      useTemporaryAddress: !!student?.temporaryAddress,
      temporaryCountry: temporaryAddress.country || COUNTRY_DEFAULT,
      temporaryProvince: temporaryAddress.province || "",
      temporaryDistrict: temporaryAddress.district || "",
      temporaryWard: temporaryAddress.ward || "",
      temporaryDetail: temporaryAddress.detail || "",

      // Mailing address
      useMailingAddress: !!student?.mailingAddress,
      mailingCountry: mailingAddress.country || COUNTRY_DEFAULT,
      mailingProvince: mailingAddress.province || "",
      mailingDistrict: mailingAddress.district || "",
      mailingWard: mailingAddress.ward || "",
      mailingDetail: mailingAddress.detail || "",

      // Academic info
      faculty: faculties.find((f) => f.id === student?.faculty)?.id || "",
      course: student?.course || 0,
      program: programs.find((p) => p.id === student?.program)?.id || "",
      phone: student?.phone || "",
      status: statuses.find((s) => s.id === student?.status)?.id || "",

      // Identity info
      identityType: student?.identity.type || 0,
      identityDocumentNumber: student?.identity.documentNumber || "",
      identityIssueDate: formatDate(student?.identity.issueDate || new Date()),
      identityIssuePlace: student?.identity.issuePlace || "",
      identityExpiryDate: formatDate(
        student?.identity.expiryDate || new Date()
      ),
      identityCountry: student?.identity.countryIssue || COUNTRY_DEFAULT,
      identityIsChip: !!student?.identity.isChip,
      identityNotes: student?.identity.notes || "",
      nationality: student?.nationality || COUNTRY_DEFAULT,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [student, faculties, programs, statuses]
  );
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationStudent,
    onSubmit: handleSubmit,
  });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor='right'
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", md: "50%" },
            pb: 2,
          },
        },
      }}
    >
      <Stack px={3} py={2} spacing={2} sx={{ overflowY: "auto" }}>
        <RowStack justifyContent='space-between' alignItems='center'>
          <Typography variant='h5'>
            {student ? "Cập nhật sinh viên" : "Thêm sinh viên"}
          </Typography>
          <RowStack gap={1.5}>
            <Button onClick={onClose} color='inherit' variant='outlined'>
              Hủy
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              color='primary'
              variant='contained'
            >
              {student ? "Cập nhật" : "Thêm"}
            </Button>
          </RowStack>
        </RowStack>

        <Divider />

        {/* Basic Information */}
        <Typography variant='h6'>Thông tin cơ bản</Typography>
        <Grid2 container spacing={2}>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              autoFocus
              id='name'
              label='Họ và tên'
              fullWidth
              variant='outlined'
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={
                formik.touched.name && String(formik.errors.name || "")
              }
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              id='email'
              label='Email'
              type='email'
              fullWidth
              variant='outlined'
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email && String(formik.errors.email || "")
              }
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              id='dateOfBirth'
              label='Ngày tháng năm sinh'
              type='date'
              fullWidth
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              {...formik.getFieldProps("dateOfBirth")}
              error={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              helperText={
                formik.touched.dateOfBirth &&
                String(formik.errors.dateOfBirth || "")
              }
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                id='gender'
                label='Giới tính'
                {...formik.getFieldProps("gender")}
              >
                <MenuItem value={Gender.Male}>Nam</MenuItem>
                <MenuItem value={Gender.Female}>Nữ</MenuItem>
                <MenuItem value={Gender.Other}>Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              id='phone'
              label='Số điện thoại liên hệ'
              fullWidth
              variant='outlined'
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={
                formik.touched.phone && String(formik.errors.phone || "")
              }
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Quốc tịch</InputLabel>
              <Select
                id='nationality'
                label='Quốc tịch'
                {...formik.getFieldProps("nationality")}
              >
                {countries.map((country) => (
                  <MenuItem key={country.name} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>

        <Divider />

        <AddressStudentForm formik={formik} open={open} countries={countries} />

        <Divider />

        <AdditionalInformationForm
          formik={formik}
          countries={countries}
          programs={programs}
          faculties={faculties}
          statuses={statuses}
        />
      </Stack>
    </Drawer>
  );
}

export default DrawerUpdateStudent;

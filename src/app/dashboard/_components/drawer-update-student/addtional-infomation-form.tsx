"use client";
import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
  Typography,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { faculties, programs, statuses } from "@/types/student";
import { Country } from "@/types/address";
import { IDENTITY_TYPES } from "./drawer-update-student";

const AdditionalInformationForm = ({
  formik,
  countries,
}: {
  formik: any;
  countries: Country[];
}) => {
  console.log("formik", formik);
  return (
    <>
      {/* Academic Information */}
      <Typography variant='h6'>Thông tin học tập</Typography>
      <Grid2 container spacing={2}>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Khoa</InputLabel>
            <Select
              id='faculty'
              label='Khoa'
              {...formik.getFieldProps("faculty")}
              error={formik.touched.faculty && Boolean(formik.errors.faculty)}
            >
              {faculties.map((faculty) => (
                <MenuItem key={faculty.name} value={faculty.name}>
                  {faculty.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.faculty && formik.errors.faculty && (
              <FormHelperText error>{formik.errors.faculty}</FormHelperText>
            )}
          </FormControl>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Chương trình</InputLabel>
            <Select
              id='program'
              label='Chương trình'
              {...formik.getFieldProps("program")}
              error={formik.touched.program && Boolean(formik.errors.program)}
            >
              {programs.map((program) => (
                <MenuItem key={program.name} value={program.name}>
                  {program.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.program && formik.errors.program && (
              <FormHelperText error>{formik.errors.program}</FormHelperText>
            )}
          </FormControl>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <TextField
            id='course'
            label='Khóa'
            type='number'
            fullWidth
            variant='outlined'
            {...formik.getFieldProps("course")}
            error={formik.touched.course && Boolean(formik.errors.course)}
            helperText={formik.touched.course && formik.errors.course}
          />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Tình trạng sinh viên</InputLabel>
            <Select
              id='status'
              label='Tình trạng sinh viên'
              {...formik.getFieldProps("status")}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              {statuses.map((status) => (
                <MenuItem key={status.name} value={status.name}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.status && formik.errors.status && (
              <FormHelperText error>{formik.errors.status}</FormHelperText>
            )}
          </FormControl>
        </Grid2>
      </Grid2>
    </>
  );
};

export default AdditionalInformationForm;

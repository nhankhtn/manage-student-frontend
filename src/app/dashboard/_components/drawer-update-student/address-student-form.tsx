"use client";

import { AddressApi } from "@/api/address";
import RowStack from "@/components/row-stack";
import { useMainContext } from "@/context";
import useFunction from "@/hooks/use-function";
import { Country } from "@/types/address";
import { COUNTRY_DEFAULT } from "@/types/student";
import { InfoOutlined } from "@mui/icons-material";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
  Typography,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Box,
  Tooltip,
} from "@mui/material";
import { useEffect, useMemo } from "react";

const AddressStudentForm = ({
  formik,
  open,
  countries,
}: {
  formik: any;
  open: boolean;
  countries: Country[];
}) => {
  const { provinces } = useMainContext();
  const getProvincesByIdPAApi = useFunction(AddressApi.getProvincesById);
  const getProvincesByIdTAApi = useFunction(AddressApi.getProvincesById);
  const getProvincesByIdMAApi = useFunction(AddressApi.getProvincesById);

  const districtsPA = useMemo(
    () => getProvincesByIdPAApi.data?.districts || [],
    [getProvincesByIdPAApi.data]
  );
  const districtsTA = useMemo(
    () => getProvincesByIdTAApi.data?.districts || [],
    [getProvincesByIdTAApi.data]
  );

  const districtsMA = useMemo(
    () => getProvincesByIdMAApi.data?.districts || [],
    [getProvincesByIdMAApi.data]
  );

  const wardsPA = useMemo(
    () =>
      districtsPA.find((d) => d.name === formik.values.permanentDistrict)
        ?.wards || [],
    [districtsPA, formik.values.permanentDistrict]
  );

  const wardsTA = useMemo(
    () =>
      districtsTA.find((d) => d.name === formik.values.temporaryDistrict)
        ?.wards || [],
    [districtsTA, formik.values.temporaryDistrict]
  );

  const wardsMA = useMemo(
    () =>
      districtsMA.find((d) => d.name === formik.values.mailingDistrict)
        ?.wards || [],
    [districtsMA, formik.values.mailingDistrict]
  );

  useEffect(() => {
    if (formik.values.permanentProvince) {
      const province = provinces.find(
        (province) => province.name === formik.values.permanentProvince
      );
      if (!province) return;

      getProvincesByIdPAApi.call({ province_code: province.code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.permanentProvince, provinces]);
  useEffect(() => {
    if (formik.values.temporaryProvince) {
      const province = provinces.find(
        (province) => province.name === formik.values.temporaryProvince
      );
      if (!province) return;

      getProvincesByIdTAApi.call({ province_code: province.code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.temporaryProvince, provinces]);

  useEffect(() => {
    if (formik.values.mailingProvince) {
      const province = provinces.find(
        (province) => province.name === formik.values.mailingProvince
      );
      if (!province) return;

      getProvincesByIdMAApi.call({ province_code: province.code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.mailingProvince, provinces]);

  return (
    <>
      <Typography variant='h6'>Địa chỉ thường trú</Typography>
      <Grid2 container spacing={2}>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Quốc gia</InputLabel>
            <Select
              id='permanentCountry'
              label='Quốc gia'
              {...formik.getFieldProps("permanentCountry")}
            >
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Autocomplete
            freeSolo={formik.values.permanentCountry !== COUNTRY_DEFAULT}
            id='permanentProvince'
            options={provinces}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            value={
              provinces.find(
                (p) => p.name === formik.values.permanentProvince
              ) || null
            }
            onChange={(_, newValue) => {
              formik.setFieldValue(
                "permanentProvince",
                newValue
                  ? typeof newValue === "string"
                    ? newValue
                    : newValue.name
                  : ""
              );
              formik.setFieldValue("permanentDistrict", "");
              formik.setFieldValue("permanentWard", "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Tỉnh/Thành phố'
                error={
                  formik.touched.permanentProvince &&
                  Boolean(formik.errors.permanentProvince)
                }
                helperText={
                  formik.touched.permanentProvince &&
                  String(formik.errors.permanentProvince || "")
                }
              />
            )}
          />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Autocomplete
            freeSolo={formik.values.permanentCountry !== COUNTRY_DEFAULT}
            id='permanentDistrict'
            options={districtsPA}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            value={
              districtsPA.find(
                (d) => d.name === formik.values.permanentDistrict
              ) || null
            }
            onChange={(_, newValue) => {
              formik.setFieldValue(
                "permanentDistrict",
                newValue
                  ? typeof newValue === "string"
                    ? newValue
                    : newValue.name
                  : ""
              );
              formik.setFieldValue("permanentWard", "");
            }}
            disabled={
              !formik.values.permanentProvince &&
              formik.values.permanentCountry === COUNTRY_DEFAULT
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Quận/Huyện'
                error={
                  formik.touched.permanentDistrict &&
                  Boolean(formik.errors.permanentDistrict)
                }
                helperText={
                  formik.touched.permanentDistrict &&
                  String(formik.errors.permanentDistrict || "")
                }
              />
            )}
          />
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Autocomplete
            freeSolo={formik.values.permanentCountry !== COUNTRY_DEFAULT}
            id='permanentWard'
            options={wardsPA}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            value={
              wardsPA.find((w) => w.name === formik.values.permanentWard) ||
              null
            }
            onChange={(_, newValue) => {
              formik.setFieldValue(
                "permanentWard",
                newValue
                  ? typeof newValue === "string"
                    ? newValue
                    : newValue.name
                  : ""
              );
            }}
            disabled={
              !formik.values.permanentDistrict &&
              formik.values.permanentCountry === COUNTRY_DEFAULT
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label='Phường/Xã'
                error={
                  formik.touched.permanentWard &&
                  Boolean(formik.errors.permanentWard)
                }
                helperText={
                  formik.touched.permanentWard &&
                  String(formik.errors.permanentWard || "")
                }
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            id='permanentDetail'
            label='Địa chỉ chi tiết (số nhà, đường, thôn, xóm...)'
            fullWidth
            variant='outlined'
            placeholder='Ví dụ: Tổ 2, thôn Vĩnh Xuân'
            {...formik.getFieldProps("permanentDetail")}
            error={
              formik.touched.permanentDetail &&
              Boolean(formik.errors.permanentDetail)
            }
            helperText={
              formik.touched.permanentDetail &&
              String(formik.errors.permanentDetail || "")
            }
          />
        </Grid2>
      </Grid2>

      {/* Temporary Address */}
      <Box>
        <RowStack>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.useTemporaryAddress}
                onChange={() => {
                  formik.setFieldValue(
                    "useTemporaryAddress",
                    !formik.values.useTemporaryAddress
                  );
                  formik.validateForm();
                }}
                name='useTemporaryAddress'
              />
            }
            label='Thêm địa chỉ tạm trú'
          />
          <Tooltip
            title='Địa chỉ tạm trú là địa chỉ bạn đang ở hiện tại, nếu khác với địa chỉ thường trú'
            placement='top'
          >
            <InfoOutlined
              sx={{
                color: "action.active",
              }}
            />
          </Tooltip>
        </RowStack>

        {formik.values.useTemporaryAddress && (
          <Grid2 container spacing={2} sx={{ mt: 1 }}>
            <Grid2 size={12}>
              <Typography variant='subtitle1'>Địa chỉ tạm trú</Typography>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Quốc gia</InputLabel>
                <Select
                  id='temporaryCountry'
                  label='Quốc gia'
                  {...formik.getFieldProps("temporaryCountry")}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Autocomplete
                freeSolo={formik.values.temporaryCountry !== COUNTRY_DEFAULT}
                id='temporaryProvince'
                options={provinces}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  provinces.find(
                    (p) => p.name === formik.values.temporaryProvince
                  ) || null
                }
                onChange={(_, newValue) => {
                  formik.setFieldValue(
                    "temporaryProvince",
                    newValue
                      ? typeof newValue === "string"
                        ? newValue
                        : newValue.name
                      : ""
                  );
                  formik.setFieldValue("temporaryDistrict", "");
                  formik.setFieldValue("temporaryWard", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Tỉnh/Thành phố'
                    error={
                      formik.touched.temporaryProvince &&
                      Boolean(formik.errors.temporaryProvince)
                    }
                    helperText={
                      formik.touched.temporaryProvince &&
                      String(formik.errors.temporaryProvince || "")
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Autocomplete
                id='temporaryDistrict'
                options={districtsTA}
                freeSolo={formik.values.temporaryCountry !== COUNTRY_DEFAULT}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  districtsTA.find(
                    (d) => d.name === formik.values.temporaryDistrict
                  ) || null
                }
                onChange={(_, newValue) => {
                  formik.setFieldValue(
                    "temporaryDistrict",
                    newValue
                      ? typeof newValue === "string"
                        ? newValue
                        : newValue.name
                      : ""
                  );
                  formik.setFieldValue("temporaryWard", "");
                }}
                disabled={
                  !formik.values.temporaryProvince &&
                  formik.values.temporaryCountry === COUNTRY_DEFAULT
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Quận/Huyện'
                    error={
                      formik.touched.temporaryDistrict &&
                      Boolean(formik.errors.temporaryDistrict)
                    }
                    helperText={
                      formik.touched.temporaryDistrict &&
                      String(formik.errors.temporaryDistrict || "")
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Autocomplete
                id='temporaryWard'
                freeSolo={formik.values.temporaryCountry !== COUNTRY_DEFAULT}
                options={wardsTA}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  wardsTA.find((w) => w.name === formik.values.temporaryWard) ||
                  null
                }
                onChange={(_, newValue) => {
                  formik.setFieldValue(
                    "temporaryWard",
                    newValue
                      ? typeof newValue === "string"
                        ? newValue
                        : newValue.name
                      : ""
                  );
                }}
                disabled={
                  !formik.values.temporaryDistrict &&
                  formik.values.temporaryCountry === COUNTRY_DEFAULT
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Phường/Xã'
                    error={
                      formik.touched.temporaryWard &&
                      Boolean(formik.errors.temporaryWard)
                    }
                    helperText={
                      formik.touched.temporaryWard &&
                      String(formik.errors.temporaryWard || "")
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id='temporaryDetail'
                label='Địa chỉ chi tiết (số nhà, đường, thôn, xóm...)'
                fullWidth
                variant='outlined'
                placeholder='Ví dụ: Tổ 2, thôn Vĩnh Xuân'
                {...formik.getFieldProps("temporaryDetail")}
                error={
                  formik.touched.temporaryDetail &&
                  Boolean(formik.errors.temporaryDetail)
                }
                helperText={
                  formik.touched.temporaryDetail &&
                  String(formik.errors.temporaryDetail || "")
                }
              />
            </Grid2>
          </Grid2>
        )}
      </Box>

      {/* Mailing Address */}
      <Box>
        <RowStack>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.useMailingAddress}
                onChange={() => {
                  formik.setFieldValue(
                    "useMailingAddress",
                    !formik.values.useMailingAddress
                  );
                  formik.validateForm();
                }}
                name='useMailingAddress'
              />
            }
            label='Thêm địa chỉ nhận thư'
          />
          <Tooltip
            title='Địa chỉ nhận thư là địa chỉ bạn nhận thư từ trường, nếu khác với địa chỉ thường trú'
            placement='top'
          >
            <InfoOutlined
              sx={{
                color: "action.active",
              }}
            />
          </Tooltip>
        </RowStack>

        {formik.values.useMailingAddress && (
          <Grid2 container spacing={2} sx={{ mt: 1 }}>
            <Grid2 size={12}>
              <Typography variant='subtitle1'>Địa chỉ nhận thư</Typography>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Quốc gia</InputLabel>
                <Select
                  id='mailingCountry'
                  label='Quốc gia'
                  {...formik.getFieldProps("mailingCountry")}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Autocomplete
                id='mailingProvince'
                freeSolo={formik.values.mailingCountry !== COUNTRY_DEFAULT}
                options={provinces}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  provinces.find(
                    (p) => p.name === formik.values.mailingProvince
                  ) || null
                }
                onChange={(_, newValue) => {
                  formik.setFieldValue(
                    "mailingProvince",
                    newValue
                      ? typeof newValue === "string"
                        ? newValue
                        : newValue.name
                      : ""
                  );
                  formik.setFieldValue("mailingDistrict", "");
                  formik.setFieldValue("mailingWard", "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Tỉnh/Thành phố'
                    error={
                      formik.touched.mailingProvince &&
                      Boolean(formik.errors.mailingProvince)
                    }
                    helperText={
                      formik.touched.mailingProvince &&
                      String(formik.errors.mailingProvince || "")
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Autocomplete
                id='mailingDistrict'
                options={districtsMA}
                freeSolo={formik.values.mailingCountry !== COUNTRY_DEFAULT}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  districtsMA.find(
                    (d) => d.name === formik.values.mailingDistrict
                  ) || null
                }
                onChange={(_, newValue) => {
                  formik.setFieldValue(
                    "mailingDistrict",
                    newValue
                      ? typeof newValue === "string"
                        ? newValue
                        : newValue.name
                      : ""
                  );
                  formik.setFieldValue("mailingWard", "");
                }}
                disabled={
                  !formik.values.mailingProvince &&
                  formik.values.mailingCountry === COUNTRY_DEFAULT
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Quận/Huyện'
                    error={
                      formik.touched.mailingDistrict &&
                      Boolean(formik.errors.mailingDistrict)
                    }
                    helperText={
                      formik.touched.mailingDistrict &&
                      String(formik.errors.mailingDistrict || "")
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Autocomplete
                id='mailingWard'
                options={wardsMA}
                freeSolo={formik.values.mailingCountry !== COUNTRY_DEFAULT}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  wardsMA.find((w) => w.name === formik.values.mailingWard) ||
                  null
                }
                onChange={(_, newValue) => {
                  formik.setFieldValue(
                    "mailingWard",
                    newValue
                      ? typeof newValue === "string"
                        ? newValue
                        : newValue.name
                      : ""
                  );
                }}
                disabled={
                  !formik.values.mailingDistrict &&
                  formik.values.mailingCountry === COUNTRY_DEFAULT
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Phường/Xã'
                    error={
                      formik.touched.mailingWard &&
                      Boolean(formik.errors.mailingWard)
                    }
                    helperText={
                      formik.touched.mailingWard &&
                      String(formik.errors.mailingWard || "")
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                id='mailingDetail'
                label='Địa chỉ chi tiết (số nhà, đường, thôn, xóm...)'
                fullWidth
                variant='outlined'
                placeholder='Ví dụ: Tổ 2, thôn Vĩnh Xuân'
                {...formik.getFieldProps("mailingDetail")}
                error={
                  formik.touched.mailingDetail &&
                  Boolean(formik.errors.mailingDetail)
                }
                helperText={
                  formik.touched.mailingDetail &&
                  String(formik.errors.mailingDetail || "")
                }
              />
            </Grid2>
          </Grid2>
        )}
      </Box>
    </>
  );
};

export default AddressStudentForm;

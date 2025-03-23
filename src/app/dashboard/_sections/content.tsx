"use client";
import React, { useCallback } from "react";
import { Student } from "@/types/student";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { People as PeopleIcon, Add as AddIcon } from "@mui/icons-material";
import SearchBar from "@/app/dashboard/_components/search-bar";
import RowStack from "@/components/row-stack";
import DialogConfirmDelete from "../_components/dialog-confirm-delete";
import useDashboardSearch from "./use-dashboard-search";
import { CustomTable } from "@/components/custom-table";
import CustomPagination from "@/components/custom-pagination";
import SelectFilter from "../_components/select-filter";
import { getTableConfig } from "./table-config";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawerUpdateStudent from "../_components/drawer-update-student/drawer-update-student";

const Content = () => {
  const {
    dialog,
    dialogConfirmDelete,
    getStudentsApi,
    deleteStudentsApi,
    createStudentsApi,
    updateStudentsApi,
    students,
    setFilter,
    pagination,
    filterConfig,
    filter,
  } = useDashboardSearch();

  const handleAddStudent = useCallback(
    async (student: Student) => {
      await createStudentsApi.call(student);
    },
    [createStudentsApi]
  );

  const handleUpdateStudent = useCallback(
    async (student: Student | Omit<Student, "email">) => {
      await updateStudentsApi.call({
        id: student.id as string,
        student,
      });
    },
    [updateStudentsApi]
  );

  const handleDeleteStudent = useCallback(
    (studentId: string) => {
      deleteStudentsApi.call(studentId);
    },
    [deleteStudentsApi]
  );

  function parseAddress(address: string) {
    const parts = address.split(",").map((part) => part.trim());
    const len = parts.length;
    return {
      detail: parts.slice(0, len - 4).join(", "),
      ward: parts[len - 4] || "",
      district: parts[len - 3] || "",
      provinces: parts[len - 2] || "",
      contry: parts[len - 1] || "",
    };
  }

  return (
    <Box sx={{ p: 3, maxWidth: "100%" }}>
      <RowStack
        sx={{
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant='h5' fontWeight='bold'>
          Danh sách sinh viên
        </Typography>
        <RowStack sx={{ gap: 1 }}>
          <Button
            variant='contained'
            color='success'
            startIcon={<AddIcon />}
            sx={{ borderRadius: "20px" }}
            onClick={() => dialog.handleOpen()}
          >
            Thêm sinh viên
          </Button>
        </RowStack>
      </RowStack>
      <RowStack mb={3} gap={2}>
        <Stack>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              border: "1px solid #f0f7ff",
              width: 250,
            }}
          >
            <RowStack
              sx={{
                bgcolor: "#f0f7ff",
                borderRadius: "50%",
                width: 50,
                height: 50,
                justifyContent: "center",
                mr: 2,
              }}
            >
              <PeopleIcon sx={{ color: "#1976d2", fontSize: 30 }} />
            </RowStack>
            <Box>
              <Typography variant='body2' color='text.secondary'>
                Tổng số sinh viên
              </Typography>
              <Typography variant='h5' fontWeight='bold'>
                {getStudentsApi.data?.total || 0}
              </Typography>
            </Box>
          </Paper>
        </Stack>
        <Stack width={500}>
          <SelectFilter
            configs={filterConfig}
            filter={filter as any}
            onChange={(key: string, value: string) => {
              setFilter((prev) => ({
                ...prev,
                [key]: value,
              }));
            }}
          />
        </Stack>

        <Stack flex={1}>
          <SearchBar
            onSearch={(value: string) =>
              setFilter((prev) => ({
                ...prev,
                key: value,
              }))
            }
          />
        </Stack>
      </RowStack>
      <Stack height={300}>
        <CustomTable
          configs={getTableConfig()}
          rows={students}
          loading={getStudentsApi.loading}
          emptyState={<Typography>Không có dữ liệu</Typography>}
          renderRowActions={(row: Student) => {
            return (
              <RowStack gap={1}>
                <Button
                  variant='outlined'
                  size='small'
                  sx={{ borderRadius: "20px", whiteSpace: "nowrap" }}
                  onClick={() => dialog.handleOpen(row)}
                >
                  Chỉnh sửa
                </Button>
                <IconButton
                  size='small'
                  color='error'
                  onClick={() => dialogConfirmDelete.handleOpen(row)}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </RowStack>
            );
          }}
        />
        {students.length > 0 && (
          <CustomPagination
            pagination={pagination}
            justifyContent='end'
            px={2}
            pt={2}
            borderTop={1}
            borderColor={"divider"}
            rowsPerPageOptions={[10, 15, 20]}
          />
        )}
      </Stack>
      <DrawerUpdateStudent
        open={dialog.open}
        student={dialog.data || null}
        onClose={dialog.handleClose}
        addStudent={handleAddStudent}
        updateStudent={handleUpdateStudent}
      />
      {dialogConfirmDelete.data && (
        <DialogConfirmDelete
          open={dialogConfirmDelete.open}
          onClose={dialogConfirmDelete.handleClose}
          onConfirm={() => {
            handleDeleteStudent(dialogConfirmDelete.data?.id as string);
            dialogConfirmDelete.handleClose();
          }}
          data={dialogConfirmDelete.data}
        />
      )}
    </Box>
  );
};

export default Content;

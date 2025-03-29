"use client";
import React, { useCallback, useState } from "react";
import { Student } from "@/types/student";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import {
  People as PeopleIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import SearchBar from "@/app/dashboard/_components/search-bar";
import RowStack from "@/components/row-stack";
import DialogConfirmDelete from "../../_components/dialog-confirm-delete";
import useDashboardSearch from "../use-dashboard-search";
import CustomPagination from "@/components/custom-pagination";
import SelectFilter from "../../../../components/select-filter";
import { objectToAddress } from "../desktop/table-config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DrawerUpdateStudent from "../../_components/drawer-update-student/drawer-update-student";
import { parseStringToAddress } from "../../_components/drawer-update-student/drawer-update-student";

const ContentMobile = () => {
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

  const [showFilters, setShowFilters] = useState(false);

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

  return (
    <Box sx={{ p: 2, maxWidth: "100%" }}>
      {/* Header */}
      <RowStack
        sx={{
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Danh sách sinh viên
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          size="small"
          sx={{ borderRadius: "20px" }}
          onClick={() => dialog.handleOpen()}
        >
          Thêm
        </Button>
      </RowStack>

      {/* Stats Card */}
      <Paper
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          border: "1px solid #f0f7ff",
          mb: 2,
        }}
      >
        <RowStack
          sx={{
            bgcolor: "#f0f7ff",
            borderRadius: "50%",
            width: 40,
            height: 40,
            justifyContent: "center",
            mr: 2,
          }}
        >
          <PeopleIcon sx={{ color: "#1976d2", fontSize: 24 }} />
        </RowStack>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Tổng số sinh viên
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {getStudentsApi.data?.total || 0}
          </Typography>
        </Box>
      </Paper>

      {/* Search and Filter */}
      <Stack spacing={1.5} mb={2}>
        <SearchBar
          onSearch={(value: string) =>
            setFilter((prev) => ({
              ...prev,
              key: value,
            }))
          }
        />
        
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          fullWidth
          onClick={() => setShowFilters(!showFilters)}
        >
          Bộ lọc
        </Button>
        
        {showFilters && (
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
        )}
      </Stack>

      {/* Student List */}
      <Stack spacing={2} mb={2}>
        {getStudentsApi.loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : students.length === 0 ? (
          <Typography align="center" py={4}>Không có dữ liệu</Typography>
        ) : (
          students.map((student) => (
            <Card key={student.id} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <RowStack justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {student.name}
                  </Typography>
                  <Chip 
                    label={student.status} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </RowStack>
                
                <Typography variant="body2" color="text.secondary" mb={1}>
                  MSSV: {student.id}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Accordion disableGutters elevation={0} sx={{ 
                  '&:before': { display: 'none' },
                  border: 'none'
                }}>
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ p: 0, minHeight: 36 }}
                  >
                    <Typography variant="body2">Xem chi tiết</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, pt: 1 }}>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>Email:</strong> {student.email}
                      </Typography>
                      <Typography variant="body2">
                        <strong>SĐT:</strong> {student.phone}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Ngày sinh:</strong> {student.date_of_birth}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Khoa:</strong> {student.faculty}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Chương trình:</strong> {student.program}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Địa chỉ:</strong> {objectToAddress(parseStringToAddress(student.permanent_address))}
                      </Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                
                <Divider sx={{ my: 1 }} />
                
                <RowStack justifyContent="flex-end" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => dialog.handleOpen(student)}
                  >
                    Sửa
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => dialogConfirmDelete.handleOpen(student)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </RowStack>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      {/* Pagination */}
      {students.length > 0 && (
        <CustomPagination
          pagination={pagination}
          justifyContent="center"
          pt={1}
          pb={2}
          rowsPerPageOptions={[5, 10, 15]}
        />
      )}

      {/* Dialogs */}
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

export default ContentMobile;

"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  Check as CheckIcon,
  Close,
} from "@mui/icons-material";
import useFunction from "@/hooks/use-function";
import { Faculty, Program, Status } from "@/types/student";
import RowStack from "@/components/row-stack";

type Item = Status | Program | Faculty;

interface DialogManagementProps {
  open: boolean;
  onClose: () => void;
  type: string;
  items: Item[];
  handleAddItem: (item: Item) => void;
  handleEditItem: (item: Item) => void;
  handleDeleteItem: (itemId: string) => void;
  handleUpdateItem: (item: Item) => void;
}

export default function DialogManagement({
  open,
  onClose,
  type,
  items,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
}: DialogManagementProps) {
  const [newItemName, setNewItemName] = useState<string|null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  const getTitle = () => {
    switch (type) {
      case "faculty":
        return "Cài đặt khoa";
      case "program":
        return "Cài đặt chương trình";
      case "status":
        return "Cài đặt trạng thái";
      default:
        return "Cài đặt";
    }
  };

  const handleEditClick = (item: Item) => {
    setItemToEdit(item);
    setEditingItem(item);
  };

  const handleConfirmEdit = () => {
    if (!editingItem) return;
    handleEditItem(editingItem);
    setConfirmDialogOpen(false);
    setEditingItem(null);
    setItemToEdit(null);
  };

  const handleSaveEdit = () => {
    setConfirmDialogOpen(true);
  };

  const handleCancelAction = () => {
    setConfirmDialogOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
    setEditingItem(null);
  };

  const handleDeleteClick = (itemId: string) => {
    setItemToDelete(itemId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      handleDeleteItem(itemToDelete);
      setConfirmDialogOpen(false);
      setItemToDelete(null);
    }
  };
  const resetAll = () => {
    setNewItemName(null);
    setEditingItem(null);
    setConfirmDialogOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);

  };
  useEffect(() => {
    if (!open) {
      resetAll();
    }
  }, [open]);
  const handleAddClick = () => {
    if (newItemName==null || newItemName.trim() === "") return;

    const newItem = {
      id: "",
      name: newItemName,
    };
    handleAddItem(newItem);
    setNewItemName(null);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {getTitle()}
            <IconButton onClick={onClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ width: "100%" }}>
            {items.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  py: 1,
                  borderRadius: 1,
                }}
              >
                <Box
                  width={"8px"}
                  height={"8px"}
                  borderRadius={"50%"}
                  bgcolor={"text.secondary"}
                  mr={1}
                />
                <RowStack gap={1} flex={1}>
                  {editingItem?.id === item.id ? (
                    <RowStack gap={1} flex={1}>
                      <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        size='small'
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            name: e.target.value,
                          })
                        }
                        autoFocus
                      />
                      <IconButton
                        size='small'
                        color='success'
                        onClick={handleSaveEdit}
                      >
                        <CheckIcon />
                      </IconButton>

                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => {
                          setEditingItem(null);
                          setItemToEdit(null);
                        }}
                      >
                        <Close />
                      </IconButton>
                    </RowStack>
                  ) : (
                    <Box sx={{ flexGrow: 1 }}>
                      <ListItemText primary={item.name} />
                    </Box>
                  )}
                  {editingItem?.id !== item.id && (
                    <>
                      <IconButton
                        size='small'
                        sx={{ color: "primary.main" }}
                        onClick={() => handleEditClick(item)}
                      >
                        <EditIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        sx={{ color: "error.main" }}
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </>
                  )}
                </RowStack>
              </ListItem>
            ))}
          </List>
          {newItemName ===null && (
            <RowStack gap={1} sx={{ mt: 3, justifyContent: "flex-end" }}>
              <Button
                variant='outlined'
                startIcon={<AddIcon />}
                onClick={() => setNewItemName("Nhóm mới")}
              >
                Thêm mới
              </Button>
              <Button variant='contained' color='secondary' onClick={onClose}>
                Đóng
              </Button>
            </RowStack>
          )}
          {newItemName !==null && (
            <Box
              sx={{ mt: 2, p: 2, border: "1px solid #e0e0e0", borderRadius: 1 }}
            >
              <TextField
                fullWidth
                size='small'
                margin='dense'
                variant='outlined'
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                autoFocus
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button variant='outlined' onClick={() => setNewItemName(null)}>
                  Hủy
                </Button>
                <Button
                  variant='contained'
                  onClick={handleAddClick}
                  disabled={!newItemName.trim()}
                >
                  Thêm
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelAction}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>
          {itemToDelete ? "Xác nhận xóa" : "Xác nhận chỉnh sửa"}
        </DialogTitle>
        <DialogContent>
          {itemToDelete ? (
            <Alert severity='warning' sx={{ mb: 2 }}>
              Bạn có chắc chắn muốn xóa mục này không? Hành động này không thể
              hoàn tác.
            </Alert>
          ) : (
            <Typography>
              Bạn có chắc chắn muốn chỉnh sửa mục `&quot;`{itemToEdit?.name}
              `&quot;` không?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAction} color='inherit'>
            Hủy
          </Button>
          <Button
            onClick={itemToDelete ? handleConfirmDelete : handleConfirmEdit}
            color={itemToDelete ? "error" : "primary"}
            variant='contained'
            autoFocus
          >
            {itemToDelete ? "Xóa" : "Chỉnh sửa"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

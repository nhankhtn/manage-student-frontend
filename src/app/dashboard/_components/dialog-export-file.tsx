import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Typography,
  SelectChangeEvent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";

interface DialogExportFileProps {
  open: boolean;
  onClose: () => void;
  onExport: ({ format, rows }: { format: string; rows: number }) => void;
  totalRows?: number;
}

const DialogExportFile = ({
  open,
  onClose,
  onExport,
  totalRows = 100,
}: DialogExportFileProps) => {
  const [fileFormat, setFileFormat] = useState("excel");
  const [rowCount, setRowCount] = useState(totalRows);

  const handleRowCountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value);
      if (!isNaN(value) && value > 0) {
        setRowCount(Math.min(value, totalRows));
      } else {
        setRowCount(0);
      }
    },
    [totalRows]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h6'>Xuất dữ liệu</Typography>
          <IconButton aria-label='close' onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id='file-format-label'>Định dạng file</InputLabel>
            <Select
              labelId='file-format-label'
              id='file-format'
              value={fileFormat}
              onChange={(event: SelectChangeEvent) => {
                setFileFormat(event.target.value);
              }}
              label='Định dạng file'
            >
              <MenuItem value='excel'>Excel (.xlsx)</MenuItem>
              <MenuItem value='csv'>CSV (.csv)</MenuItem>
              {/* <MenuItem value='pdf'>PDF (.pdf)</MenuItem> */}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label='Số dòng xuất'
              type='number'
              value={rowCount}
              onChange={handleRowCountChange}
              inputProps={{
                min: 1,
                max: totalRows,
              }}
              helperText={`Tối đa ${totalRows} dòng`}
            />
          </FormControl>

          <Box sx={{ px: 1.5, bgcolor: "primary.lighter", borderRadius: 1 }}>
            <Typography variant='body2' color='primary.main'>
              Dữ liệu sẽ được xuất theo bộ lọc hiện tại và sắp xếp hiện tại.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color='inherit' variant='outlined'>
          Hủy
        </Button>
        <Button
          onClick={() => {
            onExport({ format: fileFormat, rows: rowCount });
            onClose();
          }}
          variant='contained'
          startIcon={<DownloadIcon />}
          disabled={rowCount <= 0}
        >
          Xuất dữ liệu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExportFile;

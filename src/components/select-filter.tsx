import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface SelectFilterProps {
  configs: {
    label: string;
    xs: number;
    key: string;
    options: {
      value: string;
      label: string;
    }[];
  }[];
  filter: {
    [key: string]: string;
  };
  onChange: (key: string, value: string) => void;
}

const SelectFilter = ({ configs, filter, onChange }: SelectFilterProps) => {
  return (
    <Grid2 container spacing={1.5}>
      {configs.map(({ label, xs, key }, index) => (
        <Grid2 size={{ xs: xs }} key={key}>
          <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
              margin='dense'
              id='status'
              label={label}
              fullWidth
              variant='outlined'
              value={filter[key]}
              onChange={(e) => onChange(key, e.target.value as string)}
            >
              {configs[index].options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default SelectFilter;

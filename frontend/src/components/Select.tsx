import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
} from "@mui/material";
import React, { ChangeEvent, FC, useCallback } from "react";
import { Option } from "src/types";

type SelectProps = Omit<MuiSelectProps, "onChange"> & {
  options: Option[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

const Select: FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  ...rest
}) => {
  const handleChange = useCallback(
    (event: any) => {
      onChange(event);
    },
    [onChange]
  );
  return (
    <FormControl fullWidth error={error}>
      <InputLabel id={name}>{label}</InputLabel>
      <MuiSelect
        displayEmpty
        labelId={name}
        id={name}
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        error={error}
      >
        {options.map((o) => {
          return (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

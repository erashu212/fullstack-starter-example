import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input: FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  ...rest
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;

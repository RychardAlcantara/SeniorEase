import { InputHTMLAttributes, ReactNode } from "react"
import { TextField, InputAdornment } from "@mui/material"

interface AuthInputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  rightElement?: ReactNode
}

export function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  rightElement,
}: AuthInputProps) {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      variant="outlined"
      sx={{ mb: 3 }}
      InputProps={
        rightElement
          ? { endAdornment: <InputAdornment position="end">{rightElement}</InputAdornment> }
          : undefined
      }
    />
  )
}
"use client"

import { useState } from "react"
import { IconButton } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { AuthInput } from "./AuthInput"

interface PasswordInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export function PasswordInput({
  label = "Senha",
  placeholder = "Digite sua senha",
  value,
  onChange,
  error,
}: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <AuthInput
      label={label}
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      rightElement={
        <IconButton onClick={() => setShow((prev) => !prev)} edge="end" size="small">
          {show ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  )
}
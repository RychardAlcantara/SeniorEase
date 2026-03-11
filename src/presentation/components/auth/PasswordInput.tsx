"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
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
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      }
    />
  )
}

"use client"

import { InputHTMLAttributes, ReactNode } from "react"

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  rightElement?: ReactNode
}

export function AuthInput({ label, error, rightElement, className = "", ...props }: AuthInputProps) {
  return (
    <div className="mb-5">
      <label className="block text-gray-600 text-lg mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          className={`
            w-full border rounded-lg p-3 text-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300"}
            ${rightElement ? "pr-12" : ""}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-3">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

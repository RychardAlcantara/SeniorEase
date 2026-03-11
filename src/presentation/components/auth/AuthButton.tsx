"use client"

import { ButtonHTMLAttributes } from "react"

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export function AuthButton({ loading, children, disabled, ...props }: AuthButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className="
        w-full py-3 text-xl font-semibold text-white rounded-lg
        bg-gradient-to-r from-blue-600 to-blue-800
        hover:opacity-90 transition
        disabled:opacity-60 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      "
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}

"use client"

import Link from "next/link"

interface AuthLinkProps {
  href: string
  children: React.ReactNode
}

export function AuthLink({ href, children }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className="text-blue-600 hover:underline cursor-pointer block text-center"
    >
      {children}
    </Link>
  )
}

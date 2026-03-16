import NextLink from "next/link"
import { Link } from "@mui/material"

interface AuthLinkProps {
  href: string
  children: React.ReactNode
}

export function AuthLink({ href, children }: AuthLinkProps) {
  return (
    <Link
      component={NextLink}
      href={href}
      display="block"
      textAlign="center"
      underline="hover"
      sx={{ color: "var(--color-primary)" }}
    >
      {children}
    </Link>
  )
}
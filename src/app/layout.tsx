import "./globals.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"

export const metadata = {
  title: "SeniorEase",
  description: "Plataforma acessível para idosos"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
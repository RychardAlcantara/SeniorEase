import "./globals.css"

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
        {children}
      </body>
    </html>
  )
}
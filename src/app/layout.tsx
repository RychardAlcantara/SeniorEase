import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AuthProvider } from "@/src/infrastructure/AuthContext";

export const metadata = {
  title: "SeniorEase",
  description: "Plataforma acessível para idosos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
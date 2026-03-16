import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { AuthProvider } from "@/src/infrastructure/AuthContext";
import Providers from "./providers"

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
            <Providers>
              {children}
            </Providers>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
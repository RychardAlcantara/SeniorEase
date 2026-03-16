"use client";

import { ConfigProvider } from "@/src/presentation/contexts/ConfigContext";
import { ContrasteProvider } from "@/src/presentation/contexts/ContrasteContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider>
      <ContrasteProvider>
        {children}
      </ContrasteProvider>
    </ConfigProvider>
  );
}

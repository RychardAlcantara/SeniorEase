"use client";

import { ConfigProvider } from "@/src/presentation/contexts/ConfigContext";
import { ContrasteProvider } from "@/src/presentation/contexts/ContrasteContext";
import { ToastProvider } from "@/src/presentation/contexts/ToastContext";
import { ReactNode } from "react";
import { DateProvider } from "../presentation/contexts/DateProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider>
      <ContrasteProvider>
        <ToastProvider>
          <DateProvider>{children}</DateProvider>
        </ToastProvider>
      </ContrasteProvider>
    </ConfigProvider>
  );
}

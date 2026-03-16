"use client";

import { ConfigProvider } from "@/src/presentation/contexts/ConfigContext";
import { ContrasteProvider } from "@/src/presentation/contexts/ContrasteContext";
import { ReactNode } from "react";
import { DateProvider } from "../presentation/contexts/DateProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider>
      <ContrasteProvider>
        <DateProvider>{children}</DateProvider>
      </ContrasteProvider>
    </ConfigProvider>
  );
}

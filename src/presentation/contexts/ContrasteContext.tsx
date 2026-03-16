"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContrasteContextType {
  altoContraste: boolean;
  setAltoContraste: (value: boolean) => void;
}

const ContrasteContext = createContext<ContrasteContextType>({
  altoContraste: false,
  setAltoContraste: () => {},
});

export function ContrasteProvider({ children }: { children: ReactNode }) {
  const [altoContraste, setAltoContraste] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("seniorease-config");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.altoContraste !== undefined) {
            return parsed.altoContraste;
          }
        }
      } catch {
        // ignora
      }
    }
    return false;
  });

  return (
    <ContrasteContext.Provider value={{ altoContraste, setAltoContraste }}>
      {children}
    </ContrasteContext.Provider>
  );
}

export function useContraste() {
  return useContext(ContrasteContext);
}

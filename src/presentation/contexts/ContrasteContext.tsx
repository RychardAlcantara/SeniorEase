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
  const [altoContraste, setAltoContraste] = useState(false);

  return (
    <ContrasteContext.Provider value={{ altoContraste, setAltoContraste }}>
      {children}
    </ContrasteContext.Provider>
  );
}

export function useContraste() {
  return useContext(ContrasteContext);
}

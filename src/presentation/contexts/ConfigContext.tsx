"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppConfig {
  fontSize: number;        // 0 = menor (14px), 1 = normal (16px), 2 = maior (20px)
  espacamento: string;     // "normal" | "ampliado"
  altoContraste: boolean;
  modoVisualizacao: string; // "simplificada" | "avancada"
}

interface ConfigContextType {
  config: AppConfig;
  setConfig: (config: AppConfig) => void;
  salvarConfig: (config: AppConfig) => void;
}

const defaultConfig: AppConfig = {
  fontSize: 1,
  espacamento: "normal",
  altoContraste: false,
  modoVisualizacao: "simplificada",
};

const STORAGE_KEY = "seniorease-config";

const fontSizeMap = ["14px", "16px", "20px"];
const letterSpacingMap: Record<string, string> = { normal: "0px", ampliado: "1px" };

function aplicarConfig(cfg: AppConfig) {
  // Font size
  document.documentElement.style.fontSize = fontSizeMap[cfg.fontSize];

  // Letter spacing
  document.documentElement.style.setProperty("letter-spacing", letterSpacingMap[cfg.espacamento], "important");
  document.body.style.setProperty("letter-spacing", letterSpacingMap[cfg.espacamento], "important");

  const existing = document.getElementById("custom-letter-spacing");
  if (existing) existing.remove();
  const tag = document.createElement("style");
  tag.id = "custom-letter-spacing";
  tag.textContent = `* { letter-spacing: ${letterSpacingMap[cfg.espacamento]} !important; }`;
  document.head.appendChild(tag);
}

const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  setConfig: () => {},
  salvarConfig: () => {},
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved) as AppConfig;
      } catch {
        // ignora
      }
    }
    return defaultConfig;
  });

  // Aplica config sempre que mudar
  useEffect(() => {
    aplicarConfig(config);
  }, [config]);

  function salvarConfig(cfg: AppConfig) {
    setConfig(cfg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    aplicarConfig(cfg);
  }

  return (
    <ConfigContext.Provider value={{ config, setConfig, salvarConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}

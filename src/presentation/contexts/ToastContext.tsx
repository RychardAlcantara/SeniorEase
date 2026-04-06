"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

function SlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

type ToastSeverity = "success" | "error";

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showSuccess: () => {},
  showError: () => {},
});

const styles: Record<ToastSeverity, { bgcolor: string; color: string; borderColor: string; iconColor: string }> = {
  success: {
    bgcolor: "#f0fdf4",
    color: "#166534",
    borderColor: "#86efac",
    iconColor: "#22c55e",
  },
  error: {
    bgcolor: "#fef2f2",
    color: "#991b1b",
    borderColor: "#fca5a5",
    iconColor: "#ef4444",
  },
};

const icons: Record<ToastSeverity, React.ReactNode> = {
  success: <CheckCircleOutline sx={{ fontSize: 22 }} />,
  error: <ErrorOutline sx={{ fontSize: 22 }} />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<ToastSeverity>("success");

  const show = useCallback((msg: string, sev: ToastSeverity) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }, []);

  const showSuccess = useCallback((msg: string) => show(msg, "success"), [show]);
  const showError = useCallback((msg: string) => show(msg, "error"), [show]);

  const s = styles[severity];

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={8000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideDown}
        TransitionProps={{ timeout: 500 }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          icon={icons[severity]}
          sx={{
            width: "100%",
            minWidth: 320,
            fontSize: "0.95rem",
            fontWeight: 500,
            py: 1.2,
            px: 2,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            alignItems: "center",
            bgcolor: s.bgcolor,
            color: s.color,
            border: `1px solid ${s.borderColor}`,
            "& .MuiAlert-icon": { color: s.iconColor, mr: 1 },
            "& .MuiAlert-action": { color: s.color },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

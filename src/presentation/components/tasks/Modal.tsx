"use client";
import ModalProps from "@/src/domain/entities/ModalProps";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  createTaskUseCase,
  updateTaskUseCase,
} from "@/src/infrastructure/container";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useAuth } from "@/src/infrastructure/AuthContext";

export default function Modal({
  type,
  open,
  onClose,
  selectedTask,
  tasks,
  setTasks,
}: ModalProps) {
  dayjs.locale("pt-br");

  const { altoContraste } = useContraste();

  const [title, setTitle] = useState(selectedTask?.title ?? "");
  const [notes, setNotes] = useState(selectedTask?.notes ?? "");
  const [toDoDate, setToDoDate] = useState<Dayjs | null>(
    selectedTask?.expectedToBeDone
      ? dayjs(selectedTask.expectedToBeDone)
      : null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  async function onSave() {
    if (!tasks || !setTasks) return;

    setSaving(true);
    if (type === "create") {
      const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        notes: notes.trim(),
        expectedToBeDone: toDoDate ? toDoDate.toISOString() : null,
        userId: user?.id,
        createdAt: new Date(),
        completed: false,
        concludedAt: null,
      };
      try {
        await createTaskUseCase.execute(newTask);

        setSuccessMessage("Tarefa adicionada com sucesso!");
      } catch {
        setSuccessMessage("Ocorreu um erro ao adicionar a tarefa.");
      }
    } else if (type === "edit" && selectedTask) {
      try {
        const taskToUpdate = {
          ...selectedTask,
          title: title.trim(),
          notes: notes.trim(),
          expectedToBeDone: toDoDate ? toDoDate.toISOString() : null,
        };

        await updateTaskUseCase.execute(taskToUpdate);
        setSuccessMessage("Tarefa editada com sucesso!");
      } catch {
        setSuccessMessage("Ocorreu um erro ao editar a tarefa.");
      }
    } else {
      setSaving(false);
      return;
    }

    // Aguarda um pouco para o usuário ver a mensagem e fecha
    setTimeout(() => {
      setSaving(false);
      onClose();
    }, 1500);
  }

  const modalTitle = type === "create" ? "Criar nova tarefa" : "Editar tarefa";
  const disableInputs = saving || !!successMessage;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: altoContraste
            ? "var(--color-hc-bg)"
            : "var(--color-bg-card)",
          color: altoContraste ? "var(--color-hc-text)" : "inherit",
          border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
          transition: "all 0.3s ease",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: altoContraste ? "var(--color-hc-text)" : "inherit",
          fontWeight: 700,
        }}
      >
        {modalTitle}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          borderColor: altoContraste ? "var(--color-hc-accent)" : undefined,
        }}
      >
        <Stack spacing={2}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <TextField
            label="Título da Tarefa"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={disableInputs}
            sx={{
              "& .MuiInputLabel-root": {
                color: altoContraste ? "var(--color-hc-text)" : undefined,
              },
              "& .MuiOutlinedInput-root": {
                color: altoContraste ? "var(--color-hc-text)" : undefined,
                "& fieldset": {
                  borderColor: altoContraste
                    ? "var(--color-hc-accent)"
                    : undefined,
                },
                "&:hover fieldset": {
                  borderColor: altoContraste
                    ? "var(--color-hc-text)"
                    : undefined,
                },
              },
            }}
          />
          <TextField
            label="Observações"
            fullWidth
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            minRows={3}
            disabled={disableInputs}
            sx={{
              "& .MuiInputLabel-root": {
                color: altoContraste ? "var(--color-hc-text)" : undefined,
              },
              "& .MuiOutlinedInput-root": {
                color: altoContraste ? "var(--color-hc-text)" : undefined,
                "& fieldset": {
                  borderColor: altoContraste
                    ? "var(--color-hc-accent)"
                    : undefined,
                },
                "&:hover fieldset": {
                  borderColor: altoContraste
                    ? "var(--color-hc-text)"
                    : undefined,
                },
              },
            }}
          />
          <DateTimePicker
            label="Para quando é a tarefa?"
            value={toDoDate}
            onChange={(newValue) => setToDoDate(newValue)}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            enableAccessibleFieldDOMStructure={false}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  placeholder="dd/mm/aaaa hh:mm"
                  fullWidth
                  disabled={disableInputs}
                  inputProps={{ ...params.inputProps, inputMode: "numeric" }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: altoContraste
                        ? "var(--color-hc-text)"
                        : "var(--color-text-secondary)",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: altoContraste
                        ? "var(--color-hc-text)"
                        : "var(--color-text-primary)",
                      "& fieldset": {
                        borderColor: altoContraste
                          ? "var(--color-hc-accent)"
                          : "var(--color-text-light)",
                      },
                      "&:hover fieldset": {
                        borderColor: altoContraste
                          ? "var(--color-hc-text)"
                          : "var(--color-text-primary)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: altoContraste
                          ? "var(--color-hc-accent)"
                          : "var(--color-primary)",
                      },
                    },
                    "& .MuiIconButton-root": {
                      color: altoContraste
                        ? "var(--color-hc-text)"
                        : "var(--color-text-secondary)",
                    },
                  }}
                />
              ),
            }}
            slotProps={{
              desktopPaper: {
                sx: {
                  zIndex: 1600,
                  backgroundColor: altoContraste
                    ? "var(--color-hc-bg)"
                    : "var(--color-bg-card)",
                  color: altoContraste
                    ? "var(--color-hc-text)"
                    : "var(--color-text-primary)",
                  border: altoContraste
                    ? "2px solid var(--color-hc-accent)"
                    : undefined,
                  "& .MuiPickersDay-root": {
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "var(--color-text-primary)",
                    "&.Mui-selected": {
                      backgroundColor: altoContraste
                        ? "var(--color-hc-accent)"
                        : "var(--color-primary)",
                      color: altoContraste
                        ? "var(--color-hc-bg)"
                        : "var(--color-text-white)",
                    },
                    "&:hover": {
                      backgroundColor: altoContraste
                        ? "rgba(26,235,255,0.2)"
                        : undefined,
                    },
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-text-secondary)",
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "var(--color-text-primary)",
                  },
                  "& .MuiIconButton-root": {
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "var(--color-text-secondary)",
                  },
                  "& .MuiClock-pin, & .MuiClockPointer-root": {
                    backgroundColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-primary)",
                  },
                  "& .MuiClockPointer-thumb": {
                    backgroundColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-primary)",
                    borderColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-primary)",
                  },
                  "& .MuiClockNumber-root": {
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "var(--color-text-primary)",
                    "&.Mui-selected": {
                      color: altoContraste
                        ? "var(--color-hc-bg)"
                        : "var(--color-text-white)",
                    },
                  },
                  "& .MuiClock-clock": {
                    backgroundColor: altoContraste
                      ? "rgba(26,235,255,0.08)"
                      : undefined,
                  },
                  "& .MuiPickersLayout-actionBar .MuiButton-root": {
                    color: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-primary)",
                  },
                  "& .MuiTabs-root .MuiTab-root": {
                    color: altoContraste
                      ? "var(--color-hc-text)"
                      : "var(--color-text-secondary)",
                    "&.Mui-selected": {
                      color: altoContraste
                        ? "var(--color-hc-accent)"
                        : "var(--color-primary)",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-primary)",
                  },
                  "& .MuiDivider-root, & hr": {
                    borderColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-text-light)",
                  },
                  "& .MuiPickersLayout-contentWrapper": {
                    borderColor: altoContraste
                      ? "var(--color-hc-accent)"
                      : "var(--color-text-light)",
                  },
                },
              },
              popper: {
                disablePortal: false,
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: { padding: 8, altAxis: true },
                  },
                  {
                    name: "flip",
                    options: { fallbackPlacements: ["top", "bottom"] },
                  },
                ],
              },
            }}
            disabled={disableInputs}
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          borderColor: altoContraste ? "var(--color-hc-accent)" : undefined,
        }}
      >
        <Button
          onClick={onClose}
          disabled={disableInputs}
          sx={{
            color: altoContraste ? "var(--color-hc-text)" : "inherit",
          }}
        >
          Fechar
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          disabled={!title.trim() || !toDoDate || disableInputs}
          startIcon={saving ? <CircularProgress size={16} /> : null}
          sx={{
            backgroundImage: altoContraste ? "none" : "var(--gradient-button)",
            backgroundColor: altoContraste
              ? "var(--color-hc-accent)"
              : undefined,
            color: altoContraste
              ? "var(--color-hc-bg)"
              : "var(--color-text-white)",
            "&:hover": {
              backgroundImage: altoContraste
                ? "none"
                : "var(--gradient-button-hover)",
              backgroundColor: altoContraste ? "#15c4d9" : undefined,
            },
            "&.Mui-disabled": {
              backgroundImage: "none",
              backgroundColor: altoContraste
                ? "rgba(255,255,255,0.12)"
                : "rgba(0,0,0,0.12)",
              color: altoContraste
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.26)",
            },
          }}
        >
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

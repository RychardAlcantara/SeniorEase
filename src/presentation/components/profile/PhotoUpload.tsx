"use client"

import { useRef, useState } from "react"
import { Box, Avatar, IconButton, Typography, Tooltip, Button } from "@mui/material"
import { CameraAlt, DeleteOutline } from "@mui/icons-material"
import { AlertMessage } from "@/src/presentation/components/auth/AlertMessage"

const ALLOWED_TYPES = ["image/jpeg", "image/png"]
const MAX_SIZE_MB = 2
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

interface PhotoUploadProps {
  currentPhotoURL?: string
  previewURL?: string
  initials: string
  onFileSelect: (file: File) => void
  onRemove: () => void
}

export function PhotoUpload({ currentPhotoURL, previewURL, initials, onFileSelect, onRemove }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const hasPhoto = !!(previewURL ?? currentPhotoURL)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("")
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato inválido. Envie apenas JPG ou PNG.")
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`A imagem deve ter no máximo ${MAX_SIZE_MB}MB.`)
      return
    }

    onFileSelect(file)
  }

  function handleRemove() {
    setError("")
    onRemove()
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>

      <Box position="relative" display="inline-block">
        <Avatar
          src={previewURL ?? currentPhotoURL}
          sx={{ width: 150, height: 150, fontSize: 36, bgcolor: "#1565c0" }}
        >
          {!hasPhoto && initials}
        </Avatar>

        <Tooltip title="Alterar foto">
          <IconButton
            onClick={() => inputRef.current?.click()}
            size="small"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "white",
              border: "2px solid #e0e0e0",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            <CameraAlt fontSize="small" sx={{ color: "#1565c0" }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="caption" color="text.secondary">
        JPG ou PNG até {MAX_SIZE_MB}MB
      </Typography>

      {hasPhoto && (
        <Button
          size="small"
          startIcon={<DeleteOutline fontSize="small" />}
          onClick={handleRemove}
          sx={{
            color: "#ef5350",
            textTransform: "none",
            fontSize: "0.8rem",
            "&:hover": { bgcolor: "#ffeaea" },
          }}
        >
          Remover foto
        </Button>
      )}

      {error && (
        <Box width="100%" maxWidth={300}>
          <AlertMessage type="error" message={error} />
        </Box>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        hidden
        onChange={handleChange}
      />
    </Box>
  )
}
"use client"

import { useEffect, useState } from "react"
import {
  IconButton, Badge, Popover, Box, Typography,
  List, ListItem, ListItemText, Button, Divider, Tooltip
} from "@mui/material"
import { NotificationsOutlined, DoneAll } from "@mui/icons-material"
import { Notification } from "@/src/domain/entities/Notification"
import {
  getUnreadNotificationsUseCase,
  markNotificationReadUseCase,
  markAllNotificationsReadUseCase,
} from "@/src/infrastructure/container"
import { useAuth } from "@/src/infrastructure/AuthContext"

export function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  async function loadNotifications() {
    if (!user) return
    const data = await getUnreadNotificationsUseCase.execute(user.id)
    setNotifications(data)
  }

  useEffect(() => {
    loadNotifications()
    // Recarrega a cada 60 segundos
    const interval = setInterval(loadNotifications, 60 * 1000)
    return () => clearInterval(interval)
  }, [user])

  async function handleMarkRead(id: string) {
    if (!user) return
    await markNotificationReadUseCase.execute(user.id, id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  async function handleMarkAllRead() {
    if (!user) return
    await markAllNotificationsReadUseCase.execute(user.id)
    setNotifications([])
  }

  const open = Boolean(anchor)

  return (
    <>
      <Tooltip title="Notificações">
        <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ color: "white" }}>
          <Badge badgeContent={notifications.length} color="error" max={99}>
            <NotificationsOutlined />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 360, borderRadius: 2, mt: 1 } }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1.5}
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <Typography fontWeight="bold" fontSize="0.95rem">
            Notificações {notifications.length > 0 && `(${notifications.length})`}
          </Typography>
          {notifications.length > 0 && (
            <Button
              size="small"
              startIcon={<DoneAll fontSize="small" />}
              onClick={handleMarkAllRead}
              sx={{ textTransform: "none", fontSize: "0.8rem", color: "#1565c0" }}
            >
              Marcar todas como lidas
            </Button>
          )}
        </Box>

        {/* Lista */}
        {notifications.length === 0 ? (
          <Box py={4} textAlign="center">
            <NotificationsOutlined sx={{ fontSize: 40, color: "#bdbdbd", mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Nenhuma notificação
            </Typography>
          </Box>
        ) : (
          <List disablePadding sx={{ maxHeight: 360, overflowY: "auto" }}>
            {notifications.map((n, i) => (
              <Box key={n.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: "#f0f7ff",
                    "&:hover": { bgcolor: "#e3f2fd" },
                    cursor: "pointer",
                    gap: 1,
                  }}
                  onClick={() => handleMarkRead(n.id)}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#1565c0",
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography fontSize="0.875rem" fontWeight="bold" color="text.primary">
                        {n.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography fontSize="0.8rem" color="text.secondary">
                          {n.message}
                        </Typography>
                        <Typography fontSize="0.75rem" color="text.disabled" mt={0.5}>
                          {n.createdAt.toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {i < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </Popover>
    </>
  )
}
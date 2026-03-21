import { Avatar, Tooltip } from "@mui/material"
import { UserProfile } from "@/src/domain/entities/UserProfile"

interface UserAvatarProps {
  profile: UserProfile | null
  size?: number
}

function getInitials(profile: UserProfile | null): string {
  if (!profile) return "?"
  const first = profile.firstName?.[0] ?? ""
  const last = profile.lastName?.[0] ?? ""
  return (first + last).toUpperCase() || "?"
}

export function UserAvatar({ profile, size = 38 }: UserAvatarProps) {
  const initials = getInitials(profile)
  const label = profile ? `${profile.firstName} ${profile.lastName}` : "Usuário"

  return (
    <Tooltip title={label}>
      <Avatar
        src={profile?.photoURL}
        alt={label}
        sx={{
          width: size,
          height: size,
          bgcolor: "white",
          color: "#1565c0",
          fontWeight: "bold",
          fontSize: size * 0.38,
          cursor: "pointer",
          border: "2px solid rgba(255,255,255,0.6)",
        }}
      >
        {!profile?.photoURL && initials}
      </Avatar>
    </Tooltip>
  )
}
"use client";

import { useEffect, useState } from "react";
import {
  Home,
  ListTodo,
  Settings,
  LogOut,
  Menu as MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";
import { useAuth } from "@/src/infrastructure/AuthContext";
import {
  signOutUseCase,
  getUserProfileUseCase,
} from "@/src/infrastructure/container";
import { UserAvatar } from "@/src/presentation/components/profile/UserAvatar";
import { UserProfile } from "@/src/domain/entities/UserProfile";

const links = [
  { title: "Início", href: "/dashboard", icon: <Home size={20} /> },
  { title: "Tarefas", href: "/tasks", icon: <ListTodo size={20} /> },
  { title: "Configurações", href: "/settings", icon: <Settings size={20} /> },
];

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const { altoContraste } = useContraste();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const data = await getUserProfileUseCase.execute(user.id);
      setProfile(data);
    }
    loadProfile();
  }, [user]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (href: string) => {
    handleMenuClose();
    router.push(href);
  };

  async function handleSignOut() {
    await signOutUseCase.execute();
    router.replace("/login");
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: altoContraste ? "none" : "var(--gradient-navbar)",
        backgroundColor: altoContraste ? "var(--color-hc-bg)" : undefined,
        boxShadow: 3,
        border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Logo */}
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            sx={{
              fontWeight: 700,
              fontStyle: "italic",
              color: altoContraste
                ? "var(--color-hc-text)"
                : "var(--color-text-white)",
              fontSize: { xs: "1.1rem", sm: "1.5rem" },
            }}
          >
            SeniorEase
          </Typography>

          {/* Navegação Desktop */}
          {!isMobile && (
            <Stack
              direction="row"
              spacing={{ md: 2, lg: 4 }}
              alignItems="center"
            >
              {links.map((link) => (
                <Button
                  key={link.title}
                  component={Link}
                  href={link.href}
                  color="inherit"
                  startIcon={link.icon}
                  sx={{
                    textTransform: "none",
                    color: altoContraste ? "var(--color-hc-text)" : "inherit",
                    fontSize: { md: "0.875rem", lg: "1rem" },
                    px: { md: 1, lg: 2 },
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Stack>
          )}

          {/* Menu Mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{
                color: altoContraste ? "var(--color-hc-text)" : "inherit",
              }}
            >
              <MenuIcon size={24} />
            </IconButton>
          )}

          {/* Ações */}
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
            alignItems="center"
          >
            {/* Avatar com link para perfil */}
            <Box
              component={Link}
              href="/profile"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: { xs: 0.5, sm: 1 },
              }}
            >
              <UserAvatar profile={profile} size={isSmallScreen ? 32 : 40} />
            </Box>

            {!isSmallScreen && (
              <Button
                component={Link}
                href="/help"
                variant="contained"
                sx={{
                  backgroundColor: altoContraste
                    ? "var(--color-hc-accent)"
                    : "var(--color-bg-card)",
                  color: altoContraste
                    ? "var(--color-hc-bg)"
                    : "var(--color-primary)",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  px: { xs: 1, sm: 2 },
                  "&:hover": {
                    backgroundColor: altoContraste
                      ? "#15c4d9"
                      : "var(--color-bg-hover)",
                  },
                }}
              >
                Precisa de ajuda?
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleSignOut}
              startIcon={!isSmallScreen ? <LogOut size={18} /> : undefined}
              sx={{
                backgroundColor: altoContraste
                  ? "var(--color-hc-accent)"
                  : "var(--color-bg-card)",
                color: altoContraste
                  ? "var(--color-hc-bg)"
                  : "var(--color-primary)",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                px: { xs: 1, sm: 2 },
                minWidth: { xs: "auto", sm: "auto" },
                "&:hover": {
                  backgroundColor: altoContraste
                    ? "#15c4d9"
                    : "var(--color-bg-hover)",
                },
              }}
            >
              {!isSmallScreen && "Sair"}
            </Button>
          </Stack>
        </Toolbar>

        {/* Menu Dropdown Mobile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: altoContraste
                ? "var(--color-hc-bg)"
                : "var(--color-bg-card)",
              border: altoContraste
                ? "1px solid var(--color-hc-accent)"
                : "none",
              mt: 1,
            },
          }}
        >
          {links.map((link) => (
            <MenuItem
              key={link.title}
              onClick={() => handleMenuItemClick(link.href)}
              sx={{
                color: altoContraste ? "var(--color-hc-text)" : "inherit",
                "&:hover": {
                  backgroundColor: altoContraste
                    ? "rgba(21, 196, 217, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {link.icon}
                <Typography>{link.title}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
}

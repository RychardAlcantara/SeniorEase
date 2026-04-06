"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Box, Container, Paper, Typography,
  TextField, Button, CircularProgress, Divider, Tab, Tabs
} from "@mui/material"
import { Save, Lock, Person } from "@mui/icons-material"
import { PrivateRoute } from "@/src/presentation/components/PrivateRoute"
import { PhotoUpload } from "@/src/presentation/components/profile/PhotoUpload"
import { PasswordInput } from "@/src/presentation/components/auth/PasswordInput"
import { useAuth } from "@/src/infrastructure/AuthContext"
import { useToast } from "@/src/presentation/contexts/ToastContext"
import {
  getUserProfileUseCase,
  saveUserProfileUseCase,
  changePasswordUseCase,
} from "@/src/infrastructure/container"
import { UserProfile } from "@/src/domain/entities/UserProfile"
import Navbar from "@/src/presentation/components/Navbar"

export default function ProfilePage() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const router = useRouter()
  const [tab, setTab] = useState(0)
 
  // --- estado do perfil ---
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [photoURL, setPhotoURL] = useState<string | undefined>()
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const [previewURL, setPreviewURL] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
 
  // --- estado da senha ---
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)
 
  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      const profile = await getUserProfileUseCase.execute(user.id)
      if (profile) {
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setPhotoURL(profile.photoURL)
      }
      setLoading(false)
    }
    loadProfile()
  }, [user])
 
  function handleFileSelect(file: File) {
    setPhotoFile(file)
    setPreviewURL(URL.createObjectURL(file))
  }
 
  function handleRemovePhoto() {
    setPhotoFile(undefined)
    setPreviewURL(undefined)
    setPhotoURL(undefined)
  }
 
  async function handleSaveProfile() {
    if (!user) return
    setSaving(true)
    try {
      const profile: UserProfile = {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        photoURL,
      }
      await saveUserProfileUseCase.execute(profile, photoFile)
      setPhotoFile(undefined)
      showSuccess("Perfil atualizado com sucesso!")
      setTimeout(() => router.push("/dashboard"), 3000)
    } catch (err: any) {
      showError(err.message || "Erro ao salvar o perfil.")
    } finally {
      setSaving(false)
    }
  }
 
  async function handleChangePassword() {
    setChangingPassword(true)
    try {
      await changePasswordUseCase.execute(currentPassword, newPassword, confirmPassword)
      showSuccess("Senha alterada com sucesso!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      showError(err.message || "Erro ao alterar a senha.")
    } finally {
      setChangingPassword(false)
    }
  }
 
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?"
 
  return (
    <PrivateRoute>
      <Box minHeight="100vh" bgcolor="grey.100">
        <Navbar />
        <Container maxWidth="sm" sx={{ py: 3 }}>
 
          <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
 
            {/* Header do card */}
            <Box
              sx={{
                background: "var(--gradient-navbar)",
                px: 5, pt: 4, pb: 0,
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="white" mb={0.5}>
                Meu Perfil
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }} mb={2}>
                Gerencie suas informações pessoais e segurança
              </Typography>
 
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: "white", height: 3 } }}
                sx={{ "& .MuiTab-root": { color: "rgba(255,255,255,0.7)", textTransform: "none", fontSize: "1rem", fontWeight: 500 }, "& .Mui-selected": { color: "white !important", fontWeight: 700 } }}
              >
                <Tab icon={<Person fontSize="small" />} iconPosition="start" label="Dados Pessoais" />
                <Tab icon={<Lock fontSize="small" />} iconPosition="start" label="Alterar Senha" />
              </Tabs>
            </Box>
 
            {/* Conteúdo */}
            <Box p={5}>
              {loading ? (
                <Box display="flex" justifyContent="center" py={6}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {/* Aba - Dados Pessoais */}
                  {tab === 0 && (
                    <Box display="flex" flexDirection="column" gap={3}>
 
                      <Box display="flex" justifyContent="center">
                        <PhotoUpload
                          currentPhotoURL={photoURL}
                          previewURL={previewURL}
                          initials={initials}
                          onFileSelect={handleFileSelect}
                          onRemove={handleRemovePhoto}
                        />
                      </Box>
 
                      <Divider />
 
                      <TextField
                        label="E-mail"
                        value={user?.email ?? ""}
                        disabled
                        fullWidth
                        variant="outlined"
                        helperText="O e-mail não pode ser alterado"
                      />
 
                      <TextField
                        label="Nome"
                        placeholder="Digite seu nome"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        variant="outlined"
                      />
 
                      <TextField
                        label="Sobrenome"
                        placeholder="Digite seu sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        variant="outlined"
                      />
 
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <Save />}
                        disabled={saving}
                        onClick={handleSaveProfile}
                        sx={{
                          py: 1.5, fontWeight: "bold",
                          background: "linear-gradient(to right, #1565c0, #0d47a1)",
                          borderRadius: 2, textTransform: "none", fontSize: "1rem",
                        }}
                      >
                        {saving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
 
                    </Box>
                  )}
 
                  {/* Aba - Alterar Senha */}
                  {tab === 1 && (
                    <Box display="flex" flexDirection="column" gap={3}>
 
                      <Typography variant="body2" color="text.secondary">
                        Para sua segurança, informe a senha atual antes de definir uma nova.
                      </Typography>
 
                      <PasswordInput
                        label="Senha atual"
                        placeholder="Digite sua senha atual"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                      />
 
                      <PasswordInput
                        label="Nova senha"
                        placeholder="Digite a nova senha"
                        value={newPassword}
                        onChange={setNewPassword}
                      />
 
                      <PasswordInput
                        label="Confirmar nova senha"
                        placeholder="Confirme a nova senha"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                      />
 
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={changingPassword ? <CircularProgress size={18} color="inherit" /> : <Lock />}
                        disabled={changingPassword}
                        onClick={handleChangePassword}
                        sx={{
                          py: 1.5, fontWeight: "bold",
                          background: "linear-gradient(to right, #1565c0, #0d47a1)",
                          borderRadius: 2, textTransform: "none", fontSize: "1rem",
                        }}
                      >
                        {changingPassword ? "Alterando..." : "Alterar Senha"}
                      </Button>
 
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Paper>
 
        </Container>
      </Box>
    </PrivateRoute>
  )
}
"use client"

import { useEffect, useState } from "react"
import {
  Box, Container, Paper, Typography,
  TextField, Button, CircularProgress, Divider, Tab, Tabs
} from "@mui/material"
import { Save, ArrowBack, Lock, Person } from "@mui/icons-material"
import Link from "next/link"
import { PrivateRoute } from "@/src/presentation/components/PrivateRoute"
import { PhotoUpload } from "@/src/presentation/components/profile/PhotoUpload"
import { AlertMessage } from "@/src/presentation/components/auth/AlertMessage"
import { PasswordInput } from "@/src/presentation/components/auth/PasswordInput"
import { useAuth } from "@/src/infrastructure/AuthContext"
import {
  getUserProfileUseCase,
  saveUserProfileUseCase,
  changePasswordUseCase,
} from "@/src/infrastructure/container"
import { UserProfile } from "@/src/domain/entities/UserProfile"

export default function ProfilePage() {
  const { user } = useAuth()
  const [tab, setTab] = useState(0)

  // --- estado do perfil ---
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [photoURL, setPhotoURL] = useState<string | undefined>()
  const [photoFile, setPhotoFile] = useState<File | undefined>()
  const [previewURL, setPreviewURL] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileError, setProfileError] = useState("")
  const [profileSuccess, setProfileSuccess] = useState("")

  // --- estado da senha ---
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

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

  async function handleSaveProfile() {
    if (!user) return
    setProfileError("")
    setProfileSuccess("")
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
      setProfileSuccess("Perfil atualizado com sucesso!")
      setPhotoFile(undefined)
    } catch (err: any) {
      setProfileError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword() {
    setPasswordError("")
    setPasswordSuccess("")
    setChangingPassword(true)
    try {
      await changePasswordUseCase.execute(currentPassword, newPassword, confirmPassword)
      setPasswordSuccess("Senha alterada com sucesso!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setPasswordError(err.message)
    } finally {
      setChangingPassword(false)
    }
  }

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?"

  return (
    <PrivateRoute>
      <Box minHeight="100vh" bgcolor="grey.100">
        <Container maxWidth="sm" sx={{ py: 2 }}>

          <Button
            component={Link}
            href="/dashboard"
            startIcon={<ArrowBack />}
            sx={{ mb: 3, textTransform: "none", color: "#1565c0" }}
          >
            Voltar ao Dashboard
          </Button>

          <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>

            {/* Header do card */}
            <Box
              sx={{
                background: "linear-gradient(to right, #1565c0, #0d47a1)",
                px: 5, pt: 2, pb: 0,
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

                      {profileError && <AlertMessage type="error" message={profileError} />}
                      {profileSuccess && <AlertMessage type="success" message={profileSuccess} />}

                      <Box display="flex" justifyContent="center">
                        <PhotoUpload
                          currentPhotoURL={photoURL}
                          previewURL={previewURL}
                          initials={initials}
                          onFileSelect={handleFileSelect}
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

                      {passwordError && <AlertMessage type="error" message={passwordError} />}
                      {passwordSuccess && <AlertMessage type="success" message={passwordSuccess} />}

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
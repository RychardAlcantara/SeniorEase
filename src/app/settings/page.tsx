"use client"

import Navbar from "@/src/presentation/components/Navbar"
import { useContraste } from "@/src/presentation/contexts/ContrasteContext"
import { useConfig } from "@/src/presentation/contexts/ConfigContext"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useState, useEffect, useRef } from "react"

const fontSizeMap = ["14px", "16px", "20px"]
const letterSpacingMap: Record<string, string> = { normal: "0px", ampliado: "1px" }

function SettingsContent() {
  const { altoContraste, setAltoContraste } = useContraste()
  const { config, salvarConfig } = useConfig()

  // Inicializa com defaults para evitar hydration mismatch
  const [fontSize, setFontSize] = useState(1)
  const [espacamento, setEspacamento] = useState("normal")
  const [modoVisualizacao, setModoVisualizacao] = useState("simplificada")
  const [snackOpen, setSnackOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const configRef = useRef(config)

  // Mantém ref atualizada com o config mais recente
  useEffect(() => {
    configRef.current = config
  }, [config])

  // Sincroniza com config salva após hydration
  useEffect(() => {
    setFontSize(config.fontSize)
    setEspacamento(config.espacamento)
    setModoVisualizacao(config.modoVisualizacao)
    setAltoContraste(config.altoContraste)
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Preview de font-size na tela inteira (sem salvar)
  useEffect(() => {
    if (!mounted) return
    document.documentElement.style.fontSize = fontSizeMap[fontSize]
  }, [fontSize, mounted])

  // Preview de letter-spacing na tela inteira (sem salvar)
  useEffect(() => {
    if (!mounted) return
    const existing = document.getElementById("preview-letter-spacing")
    if (existing) existing.remove()
    const tag = document.createElement("style")
    tag.id = "preview-letter-spacing"
    tag.textContent = `* { letter-spacing: ${letterSpacingMap[espacamento]} !important; }`
    document.head.appendChild(tag)

    return () => {
      const el = document.getElementById("preview-letter-spacing")
      if (el) el.remove()
    }
  }, [espacamento, mounted])

  // Ao sair da página, reverte para os valores SALVOS (não os do preview)
  useEffect(() => {
    return () => {
      const saved = configRef.current
      document.documentElement.style.fontSize = fontSizeMap[saved.fontSize]
      const existing = document.getElementById("preview-letter-spacing")
      if (existing) existing.remove()
      const tag = document.createElement("style")
      tag.id = "preview-letter-spacing"
      tag.textContent = `* { letter-spacing: ${letterSpacingMap[saved.espacamento]} !important; }`
      document.head.appendChild(tag)
    }
  }, [])

  function handleSalvar() {
    const novaConfig = {
      fontSize,
      espacamento,
      altoContraste,
      modoVisualizacao,
    }
    salvarConfig(novaConfig)
    setSnackOpen(true)
  }

  const fontSizes = [
		{ label: "A-", value: 0, desc: "Menor" },
		{ label: "A", value: 1, desc: "Normal" },
		{ label: "A+", value: 2, desc: "Maior" },
  ]

  const hc = altoContraste

  const cardSx = {
		bgcolor: hc ? "var(--color-hc-bg)" : "var(--color-bg-card)",
		border: hc ? "2px solid var(--color-hc-accent)" : "none",
		borderRadius: 3,
		boxShadow: 3,
		transition: "all 0.3s ease",
  }

  const titleSx = {
		fontWeight: 600,
		fontSize: "1.25rem",
		color: hc ? "var(--color-hc-text)" : "inherit",
		mb: 2,
  }

  const radioSx = {
		color: hc ? "var(--color-hc-accent)" : "var(--color-primary)",
		"&.Mui-checked": {
			color: hc ? "var(--color-hc-accent)" : "var(--color-primary)",
		},
  }

  const labelSx = {
		color: hc ? "var(--color-hc-text)" : "var(--color-text-primary)",
		fontSize: "1rem",
  }

  return (
	<Box
	  sx={{
			minHeight: "100vh",
			bgcolor: hc ? "var(--color-hc-bg)" : "var(--color-bg-page)",
			color: hc ? "var(--color-hc-text)" : "inherit",
			transition: "all 0.3s ease",
	  }}
	>
	  <Navbar />

	  <Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography
					variant="h4"
					sx={{
					fontWeight: 700,
					mb: 3,
					color: hc ? "var(--color-hc-text)" : "text.secondary",
				}}
			>
				Configurações
			</Typography>

			<Stack spacing={3}>
				{/* Tamanho da Fonte */}
				<Card sx={cardSx}>
					<CardContent sx={{ p: 3 }}>
						<Typography sx={titleSx}>Tamanho da fonte</Typography>
						<Stack direction="row" spacing={2} alignItems="center">
							{fontSizes.map((fs) => (
								<Stack key={fs.value} alignItems="center" spacing={0.5}>
									<Button
										variant={fontSize === fs.value ? "contained" : "outlined"}
										onClick={() => setFontSize(fs.value)}
										sx={{
											minWidth: 56,
											minHeight: 56,
											fontSize: fs.value === 0 ? "0.875rem" : fs.value === 1 ? "1rem" : "1.25rem",
											fontWeight: 700,
											borderRadius: 2,
											...(fontSize === fs.value
											? {
												bgcolor: hc ? "var(--color-hc-accent)" : "var(--color-primary)",
												color: hc ? "var(--color-hc-bg)" : "#fff",
												"&:hover": {
													bgcolor: hc ? "#15c4d9" : "var(--color-primary-dark)",
												},
												}
											: {
												borderColor: hc ? "var(--color-hc-accent)" : "var(--color-border)",
												color: hc ? "var(--color-hc-text)" : "var(--color-text-primary)",
												"&:hover": {
													borderColor: hc ? "var(--color-hc-accent)" : "var(--color-primary)",
													bgcolor: "transparent",
												},
												}),
										}}
									>
										{fs.label}
									</Button>
									<Typography
										variant="caption"
										sx={{ color: hc ? "var(--color-hc-text)" : "var(--color-text-muted)", fontSize: "0.75rem" }}
									>
										{fs.desc}
									</Typography>
								</Stack>
							))}
						</Stack>
					</CardContent>
				</Card>

				{/* Contraste */}
				<Card sx={cardSx}>
					<CardContent sx={{ p: 3 }}>
						<Typography sx={titleSx}>Contraste</Typography>
						<RadioGroup
						value={hc ? "alto" : "normal"}
						onChange={(e) => setAltoContraste(e.target.value === "alto")}
						>
							<FormControlLabel
								value="normal"
								control={<Radio sx={radioSx} />}
								label={<Typography sx={labelSx}>Normal</Typography>}
							/>
							<FormControlLabel
								value="alto"
								control={<Radio sx={radioSx} />}
								label={<Typography sx={labelSx}>Alto contraste</Typography>}
							/>
						</RadioGroup>
					</CardContent>
				</Card>

				{/* Espaçamento */}
				<Card sx={cardSx}>
					<CardContent sx={{ p: 3 }}>
						<Typography sx={titleSx}>Espaçamento entre letras</Typography>
						<RadioGroup
						value={espacamento}
						onChange={(e) => setEspacamento(e.target.value)}
						>
						<FormControlLabel
							value="normal"
							control={<Radio sx={radioSx} />}
							label={<Typography sx={labelSx}>Normal</Typography>}
						/>
						<FormControlLabel
							value="ampliado"
							control={<Radio sx={radioSx} />}
							label={<Typography sx={labelSx}>Ampliado</Typography>}
						/>
						</RadioGroup>
					</CardContent>
				</Card>

				{/* Modo de Visualização */}
				<Card sx={cardSx}>
					<CardContent sx={{ p: 3 }}>
						<Typography sx={titleSx}>Modo de visualização</Typography>
						<RadioGroup
						value={modoVisualizacao}
						onChange={(e) => setModoVisualizacao(e.target.value)}
						>
						<FormControlLabel
							value="simplificada"
							control={<Radio sx={radioSx} />}
							label={<Typography sx={labelSx}>Simplificada</Typography>}
						/>
						<FormControlLabel
							value="avancada"
							control={<Radio sx={radioSx} />}
							label={<Typography sx={labelSx}>Avançada</Typography>}
						/>
						</RadioGroup>
					</CardContent>
				</Card>
			</Stack>

			{/* Botão Salvar */}
			<Button
				variant="contained"
				onClick={handleSalvar}
				sx={{
					mt: 4,
					width: "100%",
					py: 1.5,
					fontSize: "1.125rem",
					fontWeight: 700,
					borderRadius: 2,
					textTransform: "none",
					backgroundImage: hc ? "none" : "var(--gradient-button)",
					bgcolor: hc ? "var(--color-hc-accent)" : undefined,
					color: hc ? "var(--color-hc-bg)" : "#fff",
					border: hc ? "2px solid var(--color-hc-accent)" : "none",
					"&:hover": {
						backgroundImage: hc ? "none" : "var(--gradient-button-hover)",
						bgcolor: hc ? "#15c4d9" : undefined,
					},
				}}
			>
				Salvar configurações
			</Button>

			<Snackbar
				open={snackOpen}
				autoHideDuration={3000}
				onClose={() => setSnackOpen(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: "100%" }}>
					Configurações salvas com sucesso!
				</Alert>
			</Snackbar>
	  </Container>
	</Box>
  )
}

export default function SettingsPage() {
  return (
	  <SettingsContent />
  )
}

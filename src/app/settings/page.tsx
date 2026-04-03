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

import { PrivateRoute } from "@/src/presentation/components/PrivateRoute"



function SettingsContent() {
  const { altoContraste, setAltoContraste } = useContraste()
  const { config, salvarConfig } = useConfig()

  function updateConfig(changes: Partial<typeof config>) {
    const newConfig = {
      fontSize: config.fontSize,
      espacamento: config.espacamento,
      altoContraste,
      modoVisualizacao: config.modoVisualizacao,
      ...changes,
    }
    if ('altoContraste' in changes) {
      setAltoContraste(!!changes.altoContraste)
    }
    salvarConfig(newConfig)
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
	<PrivateRoute>
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
								variant={config.fontSize === fs.value ? "contained" : "outlined"}
									onClick={() => updateConfig({ fontSize: fs.value })}
										sx={{
											minWidth: 56,
											minHeight: 56,
											fontSize: fs.value === 0 ? "0.875rem" : fs.value === 1 ? "1rem" : "1.25rem",
											fontWeight: 700,
											borderRadius: 2,
											...(config.fontSize === fs.value
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
						onChange={(e) => updateConfig({ altoContraste: e.target.value === "alto" })}
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
						value={config.espacamento}
						onChange={(e) => updateConfig({ espacamento: e.target.value })}
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
						value={config.modoVisualizacao}
						onChange={(e) => updateConfig({ modoVisualizacao: e.target.value })}
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


	  </Container>
	</Box>
	</PrivateRoute>
  )
}

export default function SettingsPage() {
  return (
	  <SettingsContent />
  )
}

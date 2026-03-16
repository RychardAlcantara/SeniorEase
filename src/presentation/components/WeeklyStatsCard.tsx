"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { CheckCircle, Clock } from "lucide-react";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

interface WeeklyStatsCardProps {
	concluidas: number;
	pendentes: number;
}

export default function WeeklyStatsCard({ concluidas, pendentes }: WeeklyStatsCardProps) {
	const { altoContraste } = useContraste();
	const hc = altoContraste;
	const total = concluidas + pendentes;
	const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0;

	return (
		<Card
			sx={{
				borderRadius: 3,
				boxShadow: 3,
				height: "100%",
				bgcolor: hc ? "var(--color-hc-bg)" : "var(--color-bg-card)",
				border: hc ? "2px solid var(--color-hc-accent)" : "none",
				transition: "all 0.3s ease",
			}}
		>
			<CardContent sx={{ p: 2 }}>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 600,
						mb: 2,
						color: hc ? "var(--color-hc-text)" : "inherit",
					}}
				>
					Estatística Semanal
				</Typography>

				<Stack direction="row" spacing={2} sx={{ mb: 2 }}>
					{/* Concluídas */}
					<Box
						sx={{
							flex: 1,
							p: 1.5,
							borderRadius: 2,
							bgcolor: hc ? "rgba(26,235,255,0.1)" : "rgba(34,197,94,0.08)",
							border: hc ? "1px solid var(--color-hc-accent)" : "1px solid rgba(34,197,94,0.2)",
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Box
							sx={{
								width: 36,
								height: 36,
								borderRadius: "50%",
								bgcolor: hc ? "rgba(26,235,255,0.2)" : "rgba(34,197,94,0.15)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<CheckCircle size={18} color={hc ? "#1aebff" : "#22c55e"} />
						</Box>
						<Box>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 700,
									lineHeight: 1,
									color: hc ? "var(--color-hc-accent)" : "#22c55e",
								}}
							>
								{concluidas}
							</Typography>
							<Typography
								variant="caption"
								sx={{
									color: hc ? "var(--color-hc-text)" : "var(--color-text-muted)",
									fontWeight: 500,
								}}
							>
								Concluídas
							</Typography>
						</Box>
					</Box>

					{/* Pendentes */}
					<Box
						sx={{
							flex: 1,
							p: 1.5,
							borderRadius: 2,
							bgcolor: hc ? "rgba(26,235,255,0.1)" : "rgba(234,179,8,0.08)",
							border: hc ? "1px solid var(--color-hc-accent)" : "1px solid rgba(234,179,8,0.2)",
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Box
							sx={{
								width: 36,
								height: 36,
								borderRadius: "50%",
								bgcolor: hc ? "rgba(26,235,255,0.2)" : "rgba(234,179,8,0.15)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Clock size={18} color={hc ? "#1aebff" : "#eab308"} />
						</Box>
						<Box>
							<Typography
								variant="h6"
								sx={{
									fontWeight: 700,
									lineHeight: 1,
									color: hc ? "var(--color-hc-accent)" : "#eab308",
								}}
							>
								{pendentes}
							</Typography>
							<Typography
								variant="caption"
								sx={{
									color: hc ? "var(--color-hc-text)" : "var(--color-text-muted)",
									fontWeight: 500,
								}}
							>
								Pendentes
							</Typography>
						</Box>
					</Box>
				</Stack>

				{/* Barra de progresso */}
				<Box>
					<Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
						<Typography
							variant="body2"
							sx={{
								fontWeight: 600,
								color: hc ? "var(--color-hc-text)" : "var(--color-text-secondary)",
							}}
						>
							Progresso da semana
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontWeight: 700,
								color: hc ? "var(--color-hc-accent)" : "var(--color-primary)",
							}}
						>
							{porcentagem}%
						</Typography>
					</Stack>
					<LinearProgress
						variant="determinate"
						value={porcentagem}
						sx={{
							height: 10,
							borderRadius: 5,
							bgcolor: hc ? "rgba(255,255,255,0.1)" : "rgba(37,99,235,0.1)",
							"& .MuiLinearProgress-bar": {
								borderRadius: 5,
								bgcolor: hc ? "var(--color-hc-accent)" : "var(--color-primary)",
							},
						}}
					/>
				</Box>
			</CardContent>
		</Card>
	);
}

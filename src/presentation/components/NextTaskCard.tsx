"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { Clock, CalendarDays } from "lucide-react";
import { useContraste } from "@/src/presentation/contexts/ContrasteContext";

interface NextTaskCardProps {
	title: string;
	time: string;
	date: string;
}

export default function NextTaskCard({ title, time, date }: NextTaskCardProps) {
	const { altoContraste } = useContraste();
	return (
		<Card
			sx={{
				borderRadius: 3,
				boxShadow: 3,
				mb: 3,
				background: altoContraste
					? "var(--color-hc-bg)"
					: "linear-gradient(135deg, var(--color-primary), var(--color-primary-light))",
				color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-white)",
				border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
				transition: "all 0.3s ease",
			}}
		>
			<CardContent sx={{ p: 3 }}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Box>
						<Typography
							variant="overline"
							sx={{ letterSpacing: 1, opacity: 0.85 }}
						>
							Próxima Tarefa
						</Typography>
						<Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
							{title}
						</Typography>
						<Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
							<Chip
								icon={<Clock size={16} color={altoContraste ? "var(--color-hc-accent)" : "var(--color-text-white)"} />}
								label={time}
								size="small"
								sx={{
									bgcolor: altoContraste ? "rgba(26,235,255,0.2)" : "rgba(255,255,255,0.2)",
									color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-white)",
									fontWeight: 600,
									"& .MuiChip-icon": { color: altoContraste ? "var(--color-hc-accent)" : "var(--color-text-white)" },
								}}
							/>
							<Chip
								icon={<CalendarDays size={16} color={altoContraste ? "var(--color-hc-accent)" : "var(--color-text-white)"} />}
								label={date}
								size="small"
								sx={{
									bgcolor: altoContraste ? "rgba(26,235,255,0.2)" : "rgba(255,255,255,0.2)",
									color: altoContraste ? "var(--color-hc-text)" : "var(--color-text-white)",
									fontWeight: 600,
									"& .MuiChip-icon": { color: altoContraste ? "var(--color-hc-accent)" : "var(--color-text-white)" },
								}}
							/>
						</Stack>
					</Box>
					<Box
						sx={{
							width: 56,
							height: 56,
							borderRadius: "50%",
							bgcolor: altoContraste ? "rgba(26,235,255,0.2)" : "rgba(255,255,255,0.2)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Clock size={28} color={altoContraste ? "var(--color-hc-accent)" : undefined} />
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}

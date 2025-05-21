import { createStyles, Paper } from "@mantine/core";

export interface OutputTextZone {
	translated?: string;
	noTextError?: boolean;
}

const useStyles = createStyles(
	(theme) => ({
		root: {
			zIndex: 10,
			backgroundColor: theme.colors.beige[0],
			margin: "1rem 0",
			width: "100%",
			flex: 1,
			

			// Media query with value from theme
			[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
				width: "auto",
			},
		},
		translatedTextArea: {
			border: `2px solid ${theme.colors.brown[5]}`,
			borderRadius: "0.5rem",
			height: "20vh",
			marginTop: "1rem",
			padding: "1rem",
			fontSize: "1.5rem",

			// Media query with value from theme
			[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
				height: "30vh",
			},
		},
	})
);

export const OutTextZone = ({
	translated,
}: OutputTextZone) => {
	const { classes } = useStyles();

	return (
		<Paper shadow="xl" radius="md" p="md" className={classes.root}>
			<h5 style={{ fontSize: "1.5rem" }}>Medumba</h5>
			<div className={classes.translatedTextArea}>{translated}</div>
		</Paper>
	);
};

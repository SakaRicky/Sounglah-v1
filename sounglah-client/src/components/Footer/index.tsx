import React from "react";
import { createStyles } from "@mantine/core";
import bgPattern from "../../assets/images/Ndop_Patterns_yellow_brown.svg";


const useStyles = createStyles(theme => ({
	footer: {
		color: theme.colors.brown[5],
		marginTop: "auto",
		backgroundImage: `url(${bgPattern})`,
		backgroundRepeat: "repeat-x",
		backgroundSize: "auto 100%",
		height: "80px",

		// Media query with value from theme
		// [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
		// 	width: "auto",
		// },
	},
	container: {
		width: "80%",
		maxWidth: "1200px",
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "1rem",
		minHeight: "3rem",

		// for screens from lg=1200px upwards
		[`@media (max-width: ${theme.breakpoints.lg}px)`]: {
			width: "100%",
		},
	},
}));

export const Footer = () => {
	const { classes } = useStyles();

	return (
		<footer className={classes.footer}>
		</footer>
	);
};

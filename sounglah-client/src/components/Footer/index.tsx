import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(theme => ({
	footer: {
		background: theme.colors.brown[5],
		color: "white",
		marginTop: "auto",

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
			<div className={classes.container}>
				<div>Build by Saka Ricky</div>
				<div>All rights reserved &copy;</div>
			</div>
		</footer>
	);
};

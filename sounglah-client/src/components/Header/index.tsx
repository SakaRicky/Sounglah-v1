import { createStyles } from "@mantine/core";
import React from "react";
import logo from "../../sounglah-logo.svg";

const useStyles = createStyles((theme, _params, getRef) => ({
	header: {
		backgroundColor: "white",
		color: theme.colors.gray[7],
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "1rem 2rem",
		minHeight: "3rem",
		boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",

		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			// Type safe child reference in nested selectors via ref
			[`& .${getRef("child")}`]: {
				fontSize: theme.fontSizes.xs,
			},
		},

		a: {
			fontWeight: "bolder",
			fontStyle: "italic",
			fontSize: "1.5rem",
			textDecoration: "none",
			color: "inherit",
			display: "flex",
			alignItems: "center",
			width: "20%",

			"&:hover": {
				color: "#000",
			},
		},
	},
	container: {
		width: "80%",
		maxWidth: "1200px",
		margin: "0 auto",

		// for screens from lg=1200px upwards
		[`@media (max-width: ${theme.breakpoints.lg}px)`]: {
			width: "100%",
		},
	},
}));

export const Header = () => {
	const { classes } = useStyles();

	return (
		<header className={classes.header}>
			<div className={classes.container}>
				<a href="/">
					<img src={logo} alt="sounglah" />
					SoungLah
				</a>
			</div>
		</header>
	);
};

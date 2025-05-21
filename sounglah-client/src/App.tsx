import { createStyles } from "@mantine/core";
import { Footer, Header } from "./components";
import TranslationBox from "./components/TranslationBox";



const useStyles = createStyles(theme => ({
	body: {
		color: theme.colors.gray[8],
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colors.beige[3],
		overflowX: "hidden",

		h1: {
			textAlign: "center",
			margin: "1.2rem 0",
		},
		p: {
			textAlign: "center",
			lineHeight: 1.4,
			margin: "0.5rem",
		},
		"::before": {
			content: '""',
			position: "fixed",
			top: 0, 
			left: 0,
			width: "100vw",
			height: "100vh",
			backgroundImage: `url('./assets/images/body_pattern.png')`,
			backgroundRepeat: "repeat",
			backgroundSize: "contain",
			opacity: 0.03,
		}
	},

	main: {
		padding: "1rem",

		h1: {},
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

function App() {
	const { classes } = useStyles();

	return (
		<div className={classes.body}>
			<Header />
			<main className={classes.main}>
				<div className={classes.container}>
					<h1>SoungLah Translator</h1>
					<p>
						Just give it a source text and choose the language you want it to be
						translated.
					</p>

					<TranslationBox />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;

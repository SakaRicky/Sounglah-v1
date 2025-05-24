import { Footer, Header, TranslationBox } from "./components";

// Import the CSS module file
import classes from './App.module.scss';

// Remove useStyles definition
// const useStyles = createStyles(...);

function App() {
	// Remove useStyles hook call
	// const { classes } = useStyles();

	return (
		// Apply class from module
		<div className={classes.body}>
			<Header />
			{/* Apply class from module */}
			<main className={classes.main}>
				{/* Apply class from module */}
				<div className={classes.container}>
					<h1>SoungLah Translator</h1>
					<p>
						Just give it a source text and choose the language you want it to be
						translated.
					</p>
					{/* TranslationBox component is assumed to be already converted */}
					<TranslationBox />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App; // Export as default
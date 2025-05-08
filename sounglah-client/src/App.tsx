import React, { ChangeEvent, useState, useEffect } from "react";
import "./App.scss";
import { Button, createStyles, MediaQuery } from "@mantine/core";
import { Footer, Header, TextZone } from "./components";
import { activateModel, translate, Translate } from "./services";
import { DownArrow, RightArrow } from "./components/Arrows";
import { TranslatingLoader } from "./components";

const useStyles = createStyles(theme => ({
	app: {
		color: theme.colors.gray[8],
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colors.gray[1],
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
	},

	body: {
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

	translationArea: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",

		// Media query with value from theme
		[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "center",
			gap: "0.5rem",
		},
	},
	button: {
		display: "block",
		borderRadius: "0.5rem",
		width: "50%",
		maxWidth: "200px",
		margin: "1rem auto",
		backgroundColor: theme.colors.brown[2],
		color: theme.colors.gray[8],
		fontSize: "1.2rem",
		height: "2.5rem",
		padding: "0.5rem 0",
		transition: "all 150ms ease-in",

		"&:hover": {
			backgroundColor: theme.colors.brown[5],
			color: "white",
		},
	},
	arrow: {
		background: "white",
		borderRadius: "50%",
		padding: "0.25rem",
		backgroundColor: theme.colors.green[1],
	},
}));

function App() {
	const { classes } = useStyles();
	const [sourceLanguage, setSourceLanguage] = useState<string>("");
	// const [targetLanguage, setTargetLanguage] = useState<string>("");
	const [sourceText, setSourceText] = useState<string>("");
	const [translatedText, setTranslatedText] = useState<string>("");
	const [isTranslating, setIsTranslating] = useState(false);
	const [noTextError, setNoTextError] = useState(false);
	const [nosourceLanguagetError, setNosourceLanguagetError] = useState(false);

	const sourceLanguageChange = (value: string) => {
		setSourceLanguage(value);
	};

	const sourceTextChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
		const text = event.target.value;
		setSourceText(text);
	};

	const fetchTranslation = async () => {
		if (sourceLanguage === "") {
			setNosourceLanguagetError(true);
		} else if (sourceText === "") {
			setNoTextError(true);
		} else {
			try {
				setIsTranslating(true);
				const translated: Translate | undefined = await translate({
					srcLanguage: sourceLanguage,
					text: sourceText,
				});
				if (translated !== undefined) {
					setTranslatedText(translated.translatedText.join(" "));
					setIsTranslating(false);
				}
			} catch (error) {
				console.log("Error in fetchTranslation App", error);
				setSourceLanguage(sourceLanguage);
				setSourceText(sourceText);
				setTimeout(() => {
					fetchTranslation();
				}, 25000);
			}
		}
	};

	return (
		<div className={classes.app}>
			<Header />
			<body className={classes.body}>
				<div className={classes.container}>
					<h1>SoungLah Translator</h1>
					<p>
						Just give it a source text and choose the language you want it to be
						translated.
					</p>
					<div>
							<div className={classes.translationArea}>
								<TextZone
									type="input"
									sourceLanguageChange={sourceLanguageChange}
									sourceTextChange={sourceTextChange}
									noTextError={noTextError}
									nosourceLanguagetError={nosourceLanguagetError}
									srcLanguage={sourceLanguage}
									sourceText={sourceText}
								/>

								{isTranslating ? (
									<TranslatingLoader />
								) : (
									<div>
										<MediaQuery largerThan="sm" styles={{ display: "none" }}>
											<div className={classes.arrow}>
												<DownArrow />
											</div>
										</MediaQuery>

										<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
											<div className={classes.arrow}>
												<RightArrow />
											</div>
										</MediaQuery>
									</div>
								)}

								<TextZone
									type="output"
									translated={translatedText}
									srcLanguage={sourceLanguage}
									targetLanguage={sourceLanguage}
								/>
							</div>
							<Button className={classes.button} onClick={fetchTranslation}>
								Translate
							</Button>
						</div>
				</div>
			</body>
			<Footer />
		</div>
	);
}

export default App;

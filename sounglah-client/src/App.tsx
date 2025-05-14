import React, { ChangeEvent, useState, useEffect, useCallback } from "react";
import "./App.scss";
import { Button, createStyles, MediaQuery } from "@mantine/core";
import { Footer, Header, TextZone } from "./components";
import { translate, Translate } from "./services";
import { RightArrow } from "./components/Arrows";
import { franc } from 'franc';
import { SourceLanguageCode } from "./types";
import { ScaleLoader } from "react-spinners";
import useTypeWriter from "./hooks/useTypeWriter";

const SUPPORTED_INPUT_LANGUAGES = ['eng', 'fra'];

const useStyles = createStyles(theme => ({
	app: {
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
		backgroundColor: theme.colors.orange[5],
		color: theme.colors.gray[8],
		fontSize: "1.2rem",
		height: "2.5rem",
		padding: "0.5rem 0",
		transition: "all 150ms ease-in",

		"&:hover": {
			backgroundColor: theme.colors.orange[4],
			color: "white"
		},

		// Media query with value from theme
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			width: "100%",
			padding: "0 1rem"
		},
	},
	arrow: {
		background: "white",
		zIndex: 10,
		borderRadius: "50%",
		padding: "0.25rem",
		backgroundColor: theme.colors.green[5],
	},
}));

const langMap: { [key: string]: SourceLanguageCode } = {
	eng: SourceLanguageCode.English,
	fra: SourceLanguageCode.Français,
};

function App() {
	const { classes } = useStyles();
	const [sourceLanguage, setSourceLanguage] = useState<SourceLanguageCode>(SourceLanguageCode.Undetermined); // 'eng', 'fra', or 'und'
	const [sourceText, setSourceText] = useState<string>("");
	const [fullTranslation, setFullTranslation] = useState<string>("");
	const [isTranslating, setIsTranslating] = useState(false);
	const [noTextError, setNoTextError] = useState(false);
	const [nosourceLanguagetError, setNosourceLanguagetError] = useState(false);

	const displayedTranslation = useTypeWriter(fullTranslation);



	const detectedLanguage = useCallback(() => {
		if (sourceText.trim().length < 3) {
			return SourceLanguageCode.Undetermined;
		}

		const langCode = franc(sourceText, {
			minLength: 3,
			only: SUPPORTED_INPUT_LANGUAGES
		});

		return langMap[langCode] || SourceLanguageCode.Undetermined;

	}, [sourceText]);

	useEffect(() => {
		const langCode = detectedLanguage();
		if (langCode !== SourceLanguageCode.Undetermined) {
			setSourceLanguage(langCode);
			setNosourceLanguagetError(false);
		}
	}, [sourceText]);

	 // Dependencies

	const sourceLanguageChange = (value: SourceLanguageCode) => {
		setNosourceLanguagetError(false);
		setSourceLanguage(value);
	};

	const sourceTextChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
		const text = event.target.value;
		setSourceText(text);
		setNoTextError(false);
	};

	const fetchTranslation = async () => {
		setFullTranslation("");
		if (sourceLanguage === "und") {
			setNosourceLanguagetError(true);
			setNoTextError(true);
		} else if (sourceText === "") {
			setNoTextError(true);
		} else {
			setNoTextError(false);
			try {
				setIsTranslating(true);
				const translated: Translate | undefined = await translate({
					srcLanguage: sourceLanguage,
					text: sourceText,
				});

				if (translated !== undefined) {
					setFullTranslation(translated.fullTranslation.join(" "));
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
		<main className={classes.app}>
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
								<ScaleLoader width={"10px"} />
							) : (
								<div>
									<MediaQuery largerThan="sm" styles={{ display: "none" }}>
										<Button className={classes.button} onClick={fetchTranslation}>
											Translate
										</Button>
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
								translated={displayedTranslation}
								srcLanguage={sourceLanguage}
								targetLanguage={sourceLanguage}
							/>
						</div>
						<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
							<Button className={classes.button} onClick={fetchTranslation}>
								Translate
							</Button>
						</MediaQuery>
					</div>
				</div>
			</body>
			<Footer />
		</main>
	);
}

export default App;

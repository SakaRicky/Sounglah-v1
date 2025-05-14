import React, { ChangeEvent, useState, useEffect, useCallback, useRef } from "react";
import "./App.scss";
import { Button, createStyles, MediaQuery } from "@mantine/core";
import { Footer, Header, TextZone } from "./components";
import { translate, Translate } from "./services";
import { RightArrow } from "./components/Arrows";
import { franc } from 'franc';
import { SourceLanguageCode } from "./types";
import { ScaleLoader } from "react-spinners";

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
			backgroundColor: theme.colors.brown[5],
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
		backgroundColor: theme.colors.green[1],
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
	const [displayedTranslation, setDisplayedTranslation] = useState<string>("");
	const [isTranslating, setIsTranslating] = useState(false);
	const [noTextError, setNoTextError] = useState(false);
	const [nosourceLanguagetError, setNosourceLanguagetError] = useState(false);

	const currentIndexRef = useRef(0);
	const animationFrameIdRef = useRef<number | null>(null);
	const lastUpdateTimeRef = useRef(0);
	const fullTextRef = useRef(fullTranslation);

	const CHARS_PER_TICK = 1;
	const TIME_PER_CHAR_MS = 50;

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

	useEffect(() => {
		// --- Start of Effect for a new fullTranslation ---
		console.log(`EFFECT RUNNING for fullTranslation: "${fullTranslation}"`);

		fullTextRef.current = fullTranslation; // Ensure it's updated if fullTranslation itself changes

		// 1. Immediately clear any ongoing animation from a previous fullTranslation
		if (animationFrameIdRef.current !== null) {
			cancelAnimationFrame(animationFrameIdRef.current);
			animationFrameIdRef.current = null;
			console.log("Cancelled previous animation frame");
		}

		// 2. Reset state for the new animation sequence
		setDisplayedTranslation('');
		currentIndexRef.current = 0;
		lastUpdateTimeRef.current = 0;

		// 3. Define the animation function for *this* fullTranslation
		const typeCharacter = (timestamp: number) => {
			// Read from the ref to get the fullTranslation relevant to this animation sequence
			const currentFullText = fullTextRef.current;

			// If fullTranslation became empty/null while this animation was scheduled, stop.
			if (!currentFullText) {
				if (animationFrameIdRef.current !== null) {
					cancelAnimationFrame(animationFrameIdRef.current);
					animationFrameIdRef.current = null;
				}
				return;
			}

			if (!lastUpdateTimeRef.current) {
				lastUpdateTimeRef.current = timestamp;
			}

			const elapsed = timestamp - lastUpdateTimeRef.current;

			if (elapsed > TIME_PER_CHAR_MS) {
				// Check if we are already past the full length
				if (currentIndexRef.current >= currentFullText.length) {
					setDisplayedTranslation(currentFullText);
					if (animationFrameIdRef.current !== null) {
						cancelAnimationFrame(animationFrameIdRef.current);
						animationFrameIdRef.current = null;
					}
					return;
				}

				const charToAdd = currentFullText.substring(
					currentIndexRef.current,
					currentIndexRef.current + CHARS_PER_TICK
				);

				currentIndexRef.current += CHARS_PER_TICK; // Increment for the NEXT tick

				setDisplayedTranslation(prevDisplayedText => {
					// console.log(`prev: "${prevDisplayedText}", adding: "${charToAdd}"`);
					return prevDisplayedText + charToAdd;
				});

				lastUpdateTimeRef.current = timestamp;
			}

			// Schedule next frame if not done
			if (currentIndexRef.current < currentFullText.length) {
				animationFrameIdRef.current = requestAnimationFrame(typeCharacter);
			} else {
				// Animation is complete
				setDisplayedTranslation(currentFullText); // Ensure final text is set
				if (animationFrameIdRef.current !== null) {
					cancelAnimationFrame(animationFrameIdRef.current);
					animationFrameIdRef.current = null;
				}
			}
		};

		// 4. Start the animation if fullTranslation is present
		if (fullTextRef.current && fullTextRef.current.length > 0) {
			console.log(`Starting animation for: "${fullTextRef.current}"`);
			lastUpdateTimeRef.current = 0;
			animationFrameIdRef.current = requestAnimationFrame(typeCharacter);
		} else {
			setDisplayedTranslation(''); // Ensure display is empty if fullTranslation is empty
		}

		// 5. Cleanup function
		return () => {
			if (animationFrameIdRef.current !== null) {
				cancelAnimationFrame(animationFrameIdRef.current);
				animationFrameIdRef.current = null;
			}
		};
	}, [fullTranslation, CHARS_PER_TICK, TIME_PER_CHAR_MS]); // Dependencies

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

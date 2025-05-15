import { ChangeEvent, useState } from 'react';
import { Button, createStyles, MediaQuery } from '@mantine/core';
import { translate, Translate } from "../../services";
import { ScaleLoader } from "react-spinners";
import useLanguageDetection from '../../hooks/useLanguageDetection';
import useTypeWriter from '../../hooks/useTypeWriter';
import { RightArrow } from '../Arrows';
import { InputTextZone } from '../InputText';
import { OutTextZone } from '../OutTextZone';

const useStyles = createStyles(theme => ({
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

const TranslationBox = () => {
    const { classes } = useStyles();
    const [sourceText, setSourceText] = useState<string>("");
    const [fullTranslation, setFullTranslation] = useState<string>("");
    const [isTranslating, setIsTranslating] = useState(false);
    const [noTextError, setNoTextError] = useState(false);
    const { autoDetectedSourceLanguage, handleSourceLanguageChange } = useLanguageDetection(sourceText);

    const displayedTranslation = useTypeWriter(fullTranslation);

    const sourceTextChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value;
        setSourceText(text);
        setNoTextError(false);
    };

    const fetchTranslation = async () => {
        setFullTranslation("");
        if (autoDetectedSourceLanguage === "und") {
            setNoTextError(true);
        } else if (sourceText.trim() === "") {
            setNoTextError(true);
        } else {
            setNoTextError(false);
            try {
                setIsTranslating(true);
                const translated: Translate | undefined = await translate({
                    srcLanguage: autoDetectedSourceLanguage,
                    text: sourceText,
                });

                if (translated !== undefined) {
                    setFullTranslation(translated.fullTranslation.join(" "));
                    setIsTranslating(false);
                }
            } catch (error) {
                console.log("Error in fetchTranslation App", error);
                setSourceText(sourceText);
                setTimeout(() => {
                    fetchTranslation();
                }, 25000);
            }
        }
    };

    return (
        <div>
            <div className={classes.translationArea}>
                <InputTextZone
                    sourceLanguageChange={handleSourceLanguageChange}
                    sourceTextChange={sourceTextChange}
                    noTextError={noTextError}
                    srcLanguage={autoDetectedSourceLanguage}
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
                <OutTextZone
                    translated={displayedTranslation}
                />
            </div>
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Button className={classes.button} onClick={fetchTranslation}>
                    Translate
                </Button>
            </MediaQuery>
        </div>
    );
};

export default TranslationBox;
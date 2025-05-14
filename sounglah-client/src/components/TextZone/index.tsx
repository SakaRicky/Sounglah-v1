import { createStyles, CSSObject, Paper, Select } from "@mantine/core";
import React, { ChangeEvent } from "react";
import { Language, SourceLanguageCode, TargetLanguageCode } from "../../types";

export interface TextZone {
	type: "input" | "output";
	sourceTextChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	sourceLanguageChange?: (value: SourceLanguageCode) => void;
	translated?: string;
	noTextError?: boolean;
	nosourceLanguagetError?: boolean;
	srcLanguage: string;
	targetLanguage?: string;
	sourceText?: string;
}

interface StyleProps {
	noTextError: boolean | undefined;
	nosourceLanguagetError: boolean | undefined;
}

const useStyles = createStyles(
	(theme, { noTextError, nosourceLanguagetError }: StyleProps) => ({
		root: {
			zIndex: 10,
			backgroundColor: theme.colors.beige[0],
			margin: "1rem 0",
			width: "100%",
			flex: 1,
			border: noTextError
				? `2px solid ${theme.colors.red[5]}`
				: `1px solid ${theme.colors.green[2]}`,

			// Media query with value from theme
			[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
				width: "auto",
			},
		},
		select: {
			marginBottom: "0.5rem",
			outline: nosourceLanguagetError
				? `2px solid ${theme.colors.red[5]}`
				: "nine",
		},
		input: {
			backgroundColor: theme.colors.beige?.[0] || '#F9F4EC',
		},
		dropdown: {
			backgroundColor: theme.colors.beige?.[0] || '#F9F4EC',
		},
		textArea: {
			height: "20vh",
			borderRadius: "0.5rem",
			outline: `2px solid ${theme.colors.brown[5]}`,
			border: "none",
			width: "100%",
			fontSize: "1.5rem",
			padding: "1rem",

			// Media query with value from theme
			[`@media (min-width: ${theme.breakpoints.sm}px)`]: {
				height: "30vh",
			},

			textarea: {
				border: "none",
				outline: "none",
				fontSize: "1.5rem",
				width: "100%",
				height: "100%",
				fontFamily: "inherit",
			},
		},
		h5: {
			margin: "0",
			color: "red",
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

export const TextZone = ({
	type,
	sourceTextChange,
	sourceLanguageChange,
	translated,
	noTextError,
	nosourceLanguagetError,
	srcLanguage,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	targetLanguage,
	sourceText,
}: TextZone) => {
	const { classes } = useStyles({ noTextError, nosourceLanguagetError });

	const inputLanguages: Language[] = [
		{ value: SourceLanguageCode.Français, label: "French" },
		{ value: SourceLanguageCode.English, label: "English" },
	];

	const outPutLanguages: Language[] = [
		{ value: TargetLanguageCode.Medumba, label: "Medumba" },
	];

	// used to decide if user can select target language
	// will be useful when we can translate to more than 1 languages like Douala
	const manyTargetLanguages = false;

	if (type === "input") {
		return (
			<Paper shadow="xl" radius="md" p="md" className={classes.root}>
				<Select
					className={classes.select}
					placeholder="Select source language"
					data={inputLanguages}
					radius="sm"
					onChange={sourceLanguageChange}
					value={srcLanguage}
					styles={{
						input: classes.input as unknown as CSSObject,
						dropdown: classes.dropdown as unknown as CSSObject,
					}}
				/>

				<div className={classes.textArea}>
					<textarea
						placeholder="Type to translate"
						required
						onChange={sourceTextChange}
						value={sourceText}
						style={{ backgroundColor: "inherit" }}
					/>
				</div>
			</Paper>
		);
	}

	return (
		<Paper shadow="xl" radius="md" p="md" className={classes.root}>
			{manyTargetLanguages ? (
				<Select
					className={classes.select}
					placeholder="Select target language"
					data={outPutLanguages}
					radius="sm"
				/>
			) : (
				<h5 style={{ fontSize: "1.5rem" }}>Medumba</h5>
			)}

			<div className={classes.translatedTextArea}>{translated}</div>
		</Paper>
	);
};

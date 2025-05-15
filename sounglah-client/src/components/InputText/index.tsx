import { createStyles, CSSObject, Paper, Select } from '@mantine/core';
import { ChangeEvent } from 'react';
import { Language, SourceLanguageCode } from '../../types';


const useStyles = createStyles(
    (theme, noTextError: boolean | undefined) => ({
        root: {
            zIndex: 10,
            backgroundColor: theme.colors.beige[0],
            margin: "1rem 0",
            width: "100%",
            flex: 1,
            border: noTextError
                ? `2px solid ${theme.colors.red[5]}`
                : `1px solid inherit`,

            // Media query with value from theme
            [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                width: "auto",
            },
        },
        select: {
            marginBottom: "0.5rem",
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
        }
    })
);

export interface InputTextZoneProps {
    sourceTextChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    sourceLanguageChange?: (value: SourceLanguageCode) => void;
    noTextError?: boolean;
    srcLanguage: string;
    sourceText?: string;
}

export const InputTextZone = ({ sourceText, noTextError, srcLanguage, sourceLanguageChange, sourceTextChange }: InputTextZoneProps) => {

    const { classes } = useStyles(noTextError);

    const inputLanguages: Language[] = [
        { value: SourceLanguageCode.Français, label: "French" },
        { value: SourceLanguageCode.English, label: "English" },
    ];


    return <Paper shadow="xl" radius="md" p="md" className={classes.root}>
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

        {noTextError ? <p style={{ color: "red", marginBottom: 0 }}>Please enter some text</p> : ""}

    </Paper>;
};
export interface Language {
	value: SourceLanguageCode | TargetLanguageCode;
	label: string;
}

export type SourceLanguageCode = "en" | "fr" | "und";
export type TargetLanguageCode = "med";

export const SourceLanguageCode = {
  English: "en",
  Français: "fr",
  Undetermined: "und",
} as const;

export const TargetLanguageCode = {
  Medumba: "med",
} as const;


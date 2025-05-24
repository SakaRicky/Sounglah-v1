export interface Language {
	value: SourceLanguageCode | TargetLanguageCode;
	label: string;
}

export enum SourceLanguageCode {
	English = "eng",
	Français = "fra",
	Undetermined = "und"
}

export enum TargetLanguageCode {
	Medumba = "med",
}


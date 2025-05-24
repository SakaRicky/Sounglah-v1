// import { NewStudent, Student } from "types";
import axios from "axios";

// const baseURL = "http://10.0.0.73:5000/api";
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";
console.log("🚀 ~ baseURL:", baseURL);

export interface TranslateProps {
	srcLanguage: string;
	text: string;
}

export interface TranslateResponse {
	translate: Translate
}

export interface Translate {
	srcLanguage: string;
	targetLanguage: string;
	srcText: string;
	fullTranslation: string[];
}

export const translate = async ({ srcLanguage, text }: TranslateProps) => {

	try {
		const response = await axios.post<TranslateResponse>(`${baseURL}/translate`, {
			srcLanguage: srcLanguage,
			targetLanguage: "med",
			text: text,
		});
		

		return response.data.translate;
	} catch (error: any) {
		console.log(error);

		throw new Error("Error in translate", error);
	}
};

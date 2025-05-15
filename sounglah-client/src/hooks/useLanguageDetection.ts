import { useCallback, useEffect, useState } from 'react';
import { SourceLanguageCode } from '../types';
import { franc } from 'franc';

const SUPPORTED_INPUT_LANGUAGES = ['eng', 'fra'];

const langMap: { [key: string]: SourceLanguageCode } = {
    eng: SourceLanguageCode.English,
    fra: SourceLanguageCode.Français,
};

// export interface DetectLanguageProps {
//     sourceText: string;
//     sourceLanguageChange: SourceLanguageCode;
// }

const useLanguageDetection = (sourceText: string) => {
    const [autoDetectedSourceLanguage, setDetectedSourceLanguage] = useState<SourceLanguageCode>(SourceLanguageCode.Undetermined);

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
            setDetectedSourceLanguage(langCode);
        }
    }, [sourceText]);

    const handleSourceLanguageChange = (value: SourceLanguageCode) => {
        setDetectedSourceLanguage(value);
    };
    return {autoDetectedSourceLanguage, handleSourceLanguageChange};
};

export default useLanguageDetection;

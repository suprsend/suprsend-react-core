import { useContext, useCallback } from 'react';
import languages from '../languages';
import { I18nContext, DEFAULT_LANGUAGE } from '../context/SuprSendI18nProvider';
import { ITranslations, ILanguages } from '../../interface';

const useTranslation = () => {
  const { language, translations } = useContext(I18nContext);

  const t = useCallback(
    (key: keyof ITranslations) => {
      const finalLanguage =
        language && language in languages
          ? (language as keyof ILanguages)
          : DEFAULT_LANGUAGE;

      // pick from user provided dictionary > pick from internal dictionary > fallback to key
      return (
        translations?.[key] ||
        languages?.[finalLanguage]?.translations?.[key] ||
        key
      );
    },
    [language, translations]
  );

  return { t, language };
};

export default useTranslation;

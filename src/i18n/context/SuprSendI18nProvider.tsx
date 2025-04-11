import React, { createContext } from 'react';
import { I18nContextProps, SuprSendI18nProviderProps } from '../../interface';

export const DEFAULT_LANGUAGE = 'en';

export const I18nContext = createContext<I18nContextProps>({
  locale: DEFAULT_LANGUAGE,
  translations: {},
});

const SuprSendI18nProvider: React.FC<SuprSendI18nProviderProps> = ({
  children,
  locale = DEFAULT_LANGUAGE,
  translations = {},
}) => {
  return (
    <I18nContext.Provider value={{ locale, translations }}>
      {children}
    </I18nContext.Provider>
  );
};

export default SuprSendI18nProvider;

# Internationalization

To enable internationalization in your inbox, you need to wrap your inbox components in `SuprSendI18nProvider`. This provider will take care of loading the translations and providing them to your components.

```javascript
<SuprSendI18nProvider locale="fr">
  <NotificationFeed />
</SuprSendI18nProvider>
```

`locale` is optional param which defaults to English language. We support translations for below languages internally.

- `en` - [English](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/en.ts#L5) (default)
- `fr` - [French](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/fr.ts#L5)
- `de` - [German](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/de.ts#L5)
- `es` - [Spanish](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/es.ts#L5)
- `ar` - [Arabic](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/ar.ts#L5)

If you want to use other languages that are not supported by us or to override strings of existing languages, you can pass `translations` prop to `SuprSendI18nProvider`.

```typescript
interface ITranslations {
  notifications?: string;
  markAllAsRead?: string;
  noNotificationsTitle?: string;
  noNotificationsDescription?: string;
  pinned?: string;
  markAsUnread?: string;
  markAsRead?: string;
  archive?: string;
  expiresIn?: string;
  minute?: string;
  minutes?: string;
  hour?: string;
  hours?: string;
  day?: string;
  days?: string;
  week?: string;
  weeks?: string;
  month?: string;
  months?: string;
  year?: string;
  years?: string;
}
```

```javascript
<SuprSendI18nProvider
  locale="fr"
  translations={{ notifications: 'Test', markAllAsRead: 'Mark All Read' }}
>
  <Inbox />
</SuprSendI18nProvider>
```

### useTranslations

This hook should be used inside `SuprSendI18nProvider` and returns an object that contains `t`, a function used to translate strings based on the locale and translations object you pass as props to `SuprSendI18nProvider`.

```javascript
import { useTranslations, SuprSendI18nProvider } from '@suprsend/react-core';

function ParentComponent() {
  return (
    <SuprSendI18nProvider locale="fr">
      <MyComponent />
    </SuprSendI18nProvider>
  );
}

function MyComponent() {
  const { t } = useTranslations();

  return <p>{t('notifications')}</p>;
}
```

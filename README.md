# SuprSend React Core SDK

This library provides hooks and context providers to intergrate SuprSend features like InApp feed, Preferences etc in react applications. This is a wrapper around the [@suprsend/web-sdk](https://github.com/suprsend/suprsend-web-sdk). Use this library if you want to build UI from scratch. If you want react drop-in UI components, use [@suprsend/react](https://github.com/suprsend/suprsend-react-sdk).

- Refer type definitions for this library [here](https://github.com/suprsend/suprsend-react-core/blob/main/src/interface.ts).

## Installation

```bash
npm install @suprsend/react-core # for npm

yarn add @suprsend/react-core # for yarn
```

## Context Providers

### SuprSendProvider

This provider internally create SuprSend client, identify and reset user. You can access client object using `useSuprSendClient` hook for accessing client methods. Other context providers and hooks must be children of this provider.

```javascript
import { SuprSendProvider } from '@suprsend/react-core';

function Example() {
  return (
    <SuprSendProvider publicApiKey={YOUR_KEY} distinctId={YOUR_DISTINCT_ID}>
      YOUR CODE
    </SuprSendProvider>
  );
}

// props of SuprSendProvider
interface SuprSendProviderProps {
  publicApiKey: string;
  distinctId?: unknown;
  userToken?: string; // jwt token needed when enhanced security mode is enabled
  host?: string; // custom host url
  refreshUserToken?: (
    oldUserToken: string,
    tokenPayload: Dictionary
  ) => Promise<string>; // called after current user token expiry, call your BE api and return new user token
  vapidKey?: string; // for webpush notifications
  swFileName?: string; // for webpush notifications
  userAuthenticationHandler?: ({ response: ApiResponse }) => void; // callback will be called after internally authenticating user.
}
```

## SuprSendFeedProvider

This provider internally creates InApp feed client and remove it on unmount. This should be called inside SuprSendProvider. FeedClient can be accessed using `useFeedClient` hook.

```javascript
import { SuprSendProvider, SuprSendFeedProvider } from '@suprsend/react-core';

function Example() {
  return (
    <SuprSendProvider publicApiKey={YOUR_KEY} distinctId={YOUR_DISTINCT_ID}>
      <SuprSendFeedProvider>Your Feed code</SuprSendFeedProvider>
    </SuprSendProvider>
  );
}

interface SuprSendFeedProviderProps {
  tenantId?: string;
  pageSize?: number;
  stores?: IStore[] | null;
  host?: { socketHost?: string, apiHost?: string };
}

interface IStore {
  storeId: string;
  label: string;
  query?: {
    tags?: string | string[],
    categories?: string | string[],
    read?: boolean,
    archived?: boolean,
  };
}
```

### SuprSendI18nProvider

This provider can be used if you want to use internationalization. Wrap your inbox or feed components inside this. Pass `locale` prop to change language of the suprsend components. It defaults to english language and supports translations of below languages internally.

- `en` - [English](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/en.ts#L5) (default)
- `fr` - [French](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/fr.ts#L5)
- `de` - [German](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/de.ts#L5)
- `es` - [Spanish](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/es.ts#L5)
- `ar` - [Arabic](https://github.com/suprsend/suprsend-react-core/blob/main/src/i18n/languages/ar.ts#L5)

If you want to use other languages that are not supported by us or to override strings of existing languages, you can pass `translations` object as prop to `SuprSendI18nProvider`. View allowed keys inside translations object [here](https://github.com/suprsend/suprsend-react-core/blob/main/src/interface.ts#L69).

```javascript Example
<SuprSendI18nProvider
  locale="fr"
  translations={{ notifications: 'Test', markAllAsRead: 'Mark All Read' }}
>
  <Inbox />
</SuprSendI18nProvider>
```

## Hooks

### useSuprSendClient

This hook is used to get SuprSend client instance. Using this you can access user methods, webpush and preferences methods. Use this hook inside SuprSendProvider.

```javascript
import { useSuprSendClient } from '@suprsend/react-core';

function MyComponent() {
  const suprSendClient = useSuprSendClient();

  return (
    <p
      onClick={() => {
        // suprSendClient.track('testing');
        // suprSendClient.user.setEmail('johndoe@gmail.com')
        // suprSendClient.webpush.registerPush()
        // suprSendClient.user.preferences.getPreferences()
      }}
    >
      Click Me
    </p>
  );
}
```

### useAuthenticateUser

This hook is used to get authenticated user. Use this hook inside SuprSendProvider.

```javascript
import { useAuthenticateUser } from '@suprsend/react-core';

function MyComponent() {
  const { authenticatedUser } = useAuthenticateUser();

  useEffect(() => {
    if (authenticatedUser) {
      console.log('user is authenticated', authenticatedUser);
    }
  }, [authenticatedUser]);

  return <p>Hello world</p>;
}
```

### useFeedClient

This hook is used to get Feed client instance. Using this instance you can access inapp feed methods like mark seen, archive, read etc. Use this hook inside SuprSendFeedProvider.

```javascript
import {
  SuprSendProvider,
  SuprSendFeedProvider,
  useFeedClient,
} from '@suprsend/react-core';

function Example() {
  return (
    <SuprSendProvider publicApiKey={YOUR_KEY} distinctId={YOUR_DISTINCT_ID}>
      <SuprSendFeedProvider>
        <MyComponent />
      </SuprSendFeedProvider>
    </SuprSendProvider>
  );
}

function MyComponent() {
  const feedClient = useFeedClient();

  return (
    <p
      onClick={() => {
        // feedClient.changeActiveStore(storeId);
        // feedClient.markAsSeen(notificationId);
        //
        // feedClient.emitter.on(
        //   'feed.new_notification',
        //   (notificationData: IRemoteNotification) => {
        //    console.log(notificationData)
        //   }
        // );
      }}
    >
      Click Me
    </p>
  );
}
```

### useFeedData

This hooks returns state that contains notification store data which includes notifications list and other meta data. This state gets updated internally when there is any update in store. Use this state to render UI in your application. Use this hook inside SuprSendFeedProvider.

```javascript
import {useFeedData} from "@suprsend/core"

function MyComponent() {
  const feedData = useFeedData();

  const notificationsList = feedData.notifications;
  return <div>{notificationsList.map(notification)=><p>{notification.n_id}</p>}</div>;
}
```

### useTranslations

This should be used inside `SuprSendI18nProvider` and returns object that contains `t` a function that used to translate string based on locale and translations object you pass as props to `SuprSendI18nProvider`.

```javascript
import { useTranslations, SuprSendI18nProvider } from '@suprsend/core';

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

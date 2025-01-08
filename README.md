# SuprSend React Core SDK

This library provides hooks and context providers to intergrate SuprSend features like InApp feed, Preferences etc in react applications.This is a wrapper around the [@suprsend/web-sdk](https://github.com/suprsend/suprsend-web-sdk). Use this library if you want to build UI from scratch. If you want react drop-in UI components, use [@suprsend/react](https://github.com/suprsend/suprsend-react-sdk).

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
import { SuprSendProvider, SuprSendFeedProvider } from '@suprsend/react-core';

function Example() {
  return (
    <SuprSendProvider publicApiKey={YOUR_KEY} distinctId={YOUR_DISTINCT_ID}>
      <SuprSendFeedProvider>Your Feed code</SuprSendFeedProvider>
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
function MyComponent() {
  const feedData = useFeedData();

  const notificationsList = feedData.notifications;
  return <div>{notificationsList.map(notification)=><p>{notification.n_id}</p>}</div>;
}
```

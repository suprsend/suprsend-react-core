# Build your own feed UI (headless)

To implement your own UI for Feed in your react application we provide context providers and hooks.

### Pre-Requisite

- Integrate [SuprSendProvider](../README.md#integration) in your application.

### SuprSendFeedProvider

Wrap your feed component inside `SuprSendFeedProvider`, then use the feed hooks mentioned below to access feed data and methods for building your own feed UI. This provider must be used inside [SuprSendProvider](../README.md#integration). Unmounting this component will remove feed instance and remove active socket connection.

```javascript
import { SuprSendProvider, SuprSendFeedProvider } from '@suprsend/react-core';

function Example() {
  return (
    <SuprSendProvider publicApiKey={YOUR_KEY} distinctId={YOUR_DISTINCT_ID}>
      <SuprSendFeedProvider>Your Feed Component</SuprSendFeedProvider>
    </SuprSendProvider>
  );
}
```

```typescript
interface SuprSendFeedProviderProps {
  tenantId?: string;
  pageSize?: number;
  stores?: IStore[] | null;
  host?: { socketHost?: string; apiHost?: string };
}
```

| Prop       | Description                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tenantId` | Defaults to the active tenant set in `SuprSendProvider`, else the `default` tenant. Passing it pins the feed to that tenant and ignores later tenant changes; without it, the feed re-initializes whenever the active tenant changes. Must match `scope.tenant_id` passed while creating [userToken](https://docs.suprsend.com/docs/client-authentication#2-creating-signed-user-jwt-token), else scope mismatch error is thrown. |
| `pageSize` | Number of notifications fetched per api call. Defaults to 20, maximum is 100.                                                                                                                                                                                                                                                                                                                                                     |
| `stores`   | Pass it to segregate notifications into multiple tabs based on tags, preference categories and notification status like read, archived. [Read more](https://docs.suprsend.com/docs/multi-tabs).                                                                                                                                                                                                                                   |
| `host`     | Overrides the default SuprSend API and socket host URLs, mainly needed in proxy setups.                                                                                                                                                                                                                                                                                                                                           |

### useFeedClient

This hook is used to get Feed client instance created by `SuprSendFeedProvider`. Using this instance you can access feed client methods like mark seen, archive, read etc. Use this hook inside `SuprSendFeedProvider`.

```javascript
// fetch next page of notifications
feedClient.fetchNextPage();

// triggering toast notification when new notification comes when user is active on platform
feedClient.emitter.on(
  'feed.new_notification',
  (notificationData: IRemoteNotification) => {
    // your logic to trigger toast with new notification data
  }
);

// If stores are used, this method will change active store
feedClient.changeActiveStore(storeId: string)

// Used to reset badge count which is shown on bell icon. This count is latest notifications that user received from the last he opened inbox popup.
// call this on click of bell icon
feedClient.resetBadgeCount()

// mark notification as seen
await feedClient.markAsSeen(notificationId: string)

// mark notification as read
await feedClient.markAsRead(notificationId: string)

// mark notification as unread
await feedClient.markAsUnread(notificationId: string)

// mark notification as archived
await feedClient.markAsArchived(notificationId: string)

// mark notification as interacted
await feedClient.markAsInteracted(notificationId: string)

// bulk mark all notifications as read
await feedClient.markAllAsRead()

// bulk mark given notification id's as seen
await feedClient.markBulkAsSeen(notificationIds: string[])
```

```javascript
import { useFeedClient } from '@suprsend/react-core';

function MyComponent() {
  const feedClient = useFeedClient();

  return (
    <p
      onClick={() => {
        feedClient.markAsSeen(notificationId);
      }}
    >
      Click Me
    </p>
  );
}
```

### useFeedData

This hook returns notification store data as react state, which includes the notifications list and other metadata. This state updates automatically whenever notification data changes, so your UI always renders the latest data. Use this hook inside `SuprSendFeedProvider`.

```javascript
import { useFeedData } from '@suprsend/react-core';

function MyComponent() {
  const feedData = useFeedData();

  const notificationsList = feedData.notifications;
  return (
    <div>
      {notificationsList.map((notification) => (
        <p>{notification.n_id}</p>
      ))}
    </div>
  );
}
```

### Understanding Notification Data Structure

This [section](https://github.com/suprsend/suprsend-web-sdk/blob/main/docs/inapp-feed.md#feed-notification-data-structure) explains the structure of a notification object in the feed, which is useful while rendering notifications in your custom UI.

### Example

```javascript
import {
  SuprSendProvider,
  SuprSendFeedProvider,
  useFeedData,
  useFeedClient,
} from '@suprsend/react-core';

function Example() {
  return (
    <SuprSendProvider
      publicApiKey={'YOUR_PUBLIC_API_KEY'}
      distinctId={'YOUR_DISTINCT_ID'}
    >
      <SuprSendFeedProvider>
        <MyFeedComponent />
      </SuprSendFeedProvider>
    </SuprSendProvider>
  );
}

function MyFeedComponent() {
  const feedData = useFeedData();
  const feedClient = useFeedClient();

  if (!feedData) return null;
  if (feedData.apiStatus === 'LOADING') return <p>Loading Data</p>;
  if (feedData.apiStatus === 'SUCCESS' && !feedData?.notifications?.length) {
    return <p>No Notifications</p>;
  }
  if (feedData.notifications) {
    return (
      <div>
        <div>
          {feedData.notifications.map((notification) => {
            return (
              <div
                key={notification.n_id}
                onClick={() => {
                  feedClient.markAsRead(notification.n_id);
                }}
              >
                {notification.n_id}
              </div>
            );
          })}
        </div>
        {feedData.apiStatus === 'FETCHING_MORE' ? (
          <p>Loading More</p>
        ) : (
          <div>
            {feedData.pageInfo.hasMore && (
              <button
                onClick={() => {
                  feedClient.fetchNextPage();
                }}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
}
```

### Using built-in components in headless implementation

We exported drop-in components you can use to save time while building your own UI. If you are using `@suprsend/react-core` and want to use these components please remove that package and install `@suprsend/react`, integration steps remain unchanged other than changing import statements.

#### NotificationCard

This is single notification card component. It will be handy if you want to implement your own UI but want to just use our notification card.

```javascript
import { NotificationCard } from '@suprsend/react';

<NotificationCard notificationData={data} />;

// props for notification card
interface NotificationCardProps {
  notificationData: IRemoteNotification;
  notificationClickHandler?: (notificationData: IRemoteNotification) => void;
  notificationComponent?: React.FC<CustomNotificationCard>;
  hideAvatar?: boolean;
  themeType?: ThemeType;
  primaryActionClickHandler?: (notification: IRemoteNotification) => void;
  secondaryActionClickHandler?: (notification: IRemoteNotification) => void;
  theme?: INotificationCardTheme;
}
```

#### ToastNotificationCard

This component is simplified version of notification card which can be used by your toast library to show toast notification.

```javascript
import { ToastNotificationCard } from '@suprsend/react';

<ToastNotificationCard notificationData={data} />;

// props for toast notification card
interface ToastNotificationProps {
  notificationData: IRemoteNotification;
  hideAvatar?: boolean;
  themeType?: ThemeType;
  theme?: ToastNotificationCardTheme;
}
```

#### BodyMarkdown

This component supports rendering markdown text in UI. Use this in case where you want to implement your custom notification card but dont want to handle adding markdown support manually.

```javascript
import { BodyMarkdown } from '@suprsend/react';

<BodyMarkdown body={markdownText} />;

interface BodyMarkdownProps {
  body: string;
  handleActionClick?: HandleActionClick; // for links, this callback will be executed on click
  style?: NotificationCardBodyTextThemeProps;
}
```

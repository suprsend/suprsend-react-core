import { ILanguage } from '../../interface';

const en: ILanguage = {
  locale: 'en',
  translations: {
    notifications: 'Notifications',
    markAllAsRead: 'Mark all as read',
    noNotificationsTitle: 'No notifications yet',
    noNotificationsDescription:
      "We'll let you know when we've got something new for you.",
    pinned: 'Pinned',
    markAsUnread: 'Mark as unread',
    markAsRead: 'Mark as read',
    archive: 'Archive',
    expiresIn: 'Expires in',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    week: 'week',
    weeks: 'weeks',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years',
    connecting: 'Connecting…',
    connectionIssue:
      'There seems to be a connection issue. New notifications may get delayed or missed.',
    offlineMessage:
      "You're offline. Reload the page to update notifications when your connection is back.",
    authError:
      'Not able to fetch notifications due to authentication or permission issue.',
    reportIssue: 'Report an issue',
    refreshPage: 'Refresh the page',
    issueReported: 'Issue reported',
    reportLimitExceeded: 'Report limit exceeded. Try later.',
  },
};

export default en;

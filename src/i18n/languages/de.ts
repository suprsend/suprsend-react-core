import { ILanguage } from '../../interface';

const de: ILanguage = {
  locale: 'de',
  translations: {
    notifications: 'Benachrichtigungen',
    markAllAsRead: 'Alle als gelesen markieren',
    noNotificationsTitle: 'Noch keine Benachrichtigungen',
    noNotificationsDescription:
      'Wir informieren Sie, wenn wir etwas Neues für Sie haben.',
    pinned: 'Angepinnt',
    markAsUnread: 'Als ungelesen markieren',
    markAsRead: 'Als gelesen markieren',
    archive: 'Archiv',
    expiresIn: 'Läuft ab in',
    minute: 'Minute',
    minutes: 'Minuten',
    hour: 'Stunde',
    hours: 'Stunden',
    day: 'Tag',
    days: 'Tage',
    week: 'Woche',
    weeks: 'Wochen',
    month: 'Monat',
    months: 'Monate',
    year: 'Jahr',
    years: 'Jahre',
    connectionIssue:
      'Es scheint ein Verbindungsproblem zu geben. Neue Benachrichtigungen können verzögert werden oder verloren gehen.',
    offlineMessage:
      'Du bist offline. Benachrichtigungen werden aktualisiert, sobald die Verbindung wieder da ist.',
    reportIssue: 'Problem melden',
  },
};

export default de;

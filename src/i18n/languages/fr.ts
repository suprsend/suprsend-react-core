import { ILanguage } from '../../interface';

const fr: ILanguage = {
  locale: 'fr',
  translations: {
    notifications: 'Notifications',
    markAllAsRead: 'Tout marquer comme lu',
    noNotificationsTitle: 'Pas encore de notifications',
    noNotificationsDescription:
      'Nous vous informerons lorsque nous aurons quelque chose de nouveau pour vous.',
    pinned: 'Épinglé',
    markAsUnread: 'Marquer comme non lu',
    markAsRead: 'Marquer comme lu',
    archive: 'Archiver',
    expiresIn: 'Expire dans',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'heure',
    hours: 'heures',
    day: 'jour',
    days: 'jours',
    week: 'semaine',
    weeks: 'semaines',
    month: 'mois',
    months: 'mois',
    year: 'an',
    years: 'ans',
    connectionIssue:
      'Un problème de connexion semble être survenu. Les nouvelles notifications peuvent être retardées ou perdues.',
    offlineMessage:
      'Vous êtes hors ligne. Les notifications se mettront à jour dès le retour de la connexion.',
    reportIssue: 'Signaler un problème',
  },
};

export default fr;

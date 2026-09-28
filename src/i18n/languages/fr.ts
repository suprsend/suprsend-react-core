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
    connecting: 'Connexion en cours…',
    connectionIssue:
      'Un problème de connexion semble être survenu. Les nouvelles notifications peuvent être retardées ou perdues.',
    offlineMessage:
      'Vous êtes hors ligne. Rechargez la page pour mettre à jour les notifications dès le retour de la connexion.',
    authError:
      'Impossible de récupérer les notifications en raison d’un problème d’authentification ou d’autorisation.',
    reportIssue: 'Signaler un problème',
    refreshPage: 'Actualiser la page',
    issueReported: 'Problème signalé',
    reportLimitExceeded: 'Limite de signalements atteinte. Réessayez plus tard.',
  },
};

export default fr;

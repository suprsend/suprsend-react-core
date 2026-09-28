import { ILanguage } from '../../interface';

const es: ILanguage = {
  locale: 'es',
  translations: {
    notifications: 'Notificaciones',
    markAllAsRead: 'Marcar todo como leído',
    noNotificationsTitle: 'Aún no hay notificaciones',
    noNotificationsDescription:
      'Te avisaremos cuando tengamos algo nuevo para ti.',
    pinned: 'Fijado',
    markAsUnread: 'Marcar como no leído',
    markAsRead: 'Marcar como leído',
    archive: 'Archivo',
    expiresIn: 'Vence en',
    minute: 'minuto',
    minutes: 'minutos',
    hour: 'hora',
    hours: 'horas',
    day: 'día',
    days: 'días',
    week: 'semana',
    weeks: 'semanas',
    month: 'mes',
    months: 'meses',
    year: 'año',
    years: 'años',
    connecting: 'Conectando…',
    connectionIssue:
      'Parece que hay un problema de conexión. Es posible que las notificaciones nuevas se retrasen o no lleguen.',
    offlineMessage:
      'Estás sin conexión. Recarga la página para actualizar las notificaciones cuando vuelva la conexión.',
    authError:
      'No se pueden obtener las notificaciones debido a un problema de autenticación o de permisos.',
    reportIssue: 'Informar de un problema',
    refreshPage: 'Actualizar la página',
    issueReported: 'Problema informado',
    reportLimitExceeded: 'Límite de informes superado. Inténtalo más tarde.',
  },
};

export default es;

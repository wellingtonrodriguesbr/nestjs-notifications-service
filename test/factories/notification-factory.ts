import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'fake-recipient-id',
    category: 'Social',
    content: new Content('Nova solicitação de amizade'),
    ...override,
  });
}

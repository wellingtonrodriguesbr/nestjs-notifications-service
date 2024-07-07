import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async save(notification: Notification) {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    );

    this.items[notificationIndex] = notification;
  }

  async findById(notificationId: string) {
    const notification = this.items.find((item) => item.id === notificationId);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async countManyByRecipientId(recipientId: string) {
    return this.items.filter((item) => item.recipientId === recipientId).length;
  }
}

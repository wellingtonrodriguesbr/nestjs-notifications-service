import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

interface UnreadNotificationUseCaseRequest {
  notificationId: string;
}

type UnreadNotificationUseCaseResponse = void;

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: UnreadNotificationUseCaseRequest): Promise<UnreadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}

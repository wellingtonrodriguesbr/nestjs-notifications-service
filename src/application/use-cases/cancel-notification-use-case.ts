import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

interface CancelNotificationUseCaseRequest {
  notificationId: string;
}

type CancelNotificationUseCaseResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationId,
  }: CancelNotificationUseCaseRequest): Promise<CancelNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}

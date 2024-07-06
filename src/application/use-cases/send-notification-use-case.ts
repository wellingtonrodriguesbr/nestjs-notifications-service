import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationUseCaseResponse {
  notification: Notification;
}

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    category,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}

import { Content } from '../entities/content';
import { Notification } from '../entities/notification';

interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationUseCaseResponse {
  notification: Notification;
}

export class SendNotificationUseCase {
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

    return { notification };
  }
}

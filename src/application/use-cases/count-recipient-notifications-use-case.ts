import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationUseCaseRequest {
  recipientId: string;
}

interface CountRecipientNotificationUseCaseResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationUseCaseRequest): Promise<CountRecipientNotificationUseCaseResponse> {
    const count =
      await this.notificationsRepository.countManyByRecipientId(recipientId);

    return { count };
  }
}

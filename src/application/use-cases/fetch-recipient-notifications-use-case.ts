import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Notification } from '@application/entities/notification';

interface FetchRecipientNotificationsUseCaseRequest {
  recipientId: string;
}

interface FetchRecipientNotificationsUseCaseResponse {
  notifications: Notification[];
}

@Injectable()
export class FetchRecipientNotificationsUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
  }: FetchRecipientNotificationsUseCaseRequest): Promise<FetchRecipientNotificationsUseCaseResponse> {
    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}

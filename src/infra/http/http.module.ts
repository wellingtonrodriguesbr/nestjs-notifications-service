import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotificationUseCase } from '@application/use-cases/send-notification-use-case';
import { DatabaseModule } from '../database/database.module';
import { FetchRecipientNotificationsUseCase } from '@application/use-cases/fetch-recipient-notifications-use-case';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification-use-case';
import { ReadNotificationUseCase } from '@application/use-cases/read-notifications-use-case';
import { UnreadNotificationUseCase } from '@application/use-cases/unread-notifications-use-case';
import { CountRecipientNotificationUseCase } from '@application/use-cases/count-recipient-notifications-use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    FetchRecipientNotificationsUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationUseCase,
  ],
})
export class HttpModule {}

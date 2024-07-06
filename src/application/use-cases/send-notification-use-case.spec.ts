import { SendNotificationUseCase } from './send-notification-use-case';

describe('Send notification use case', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotificationUseCase();
    const { notification } = await sendNotification.execute({
      recipientId: 'fake-recipient-id',
      content: 'Você recebeu uma nova solicitação de amizade.',
      category: 'social',
    });

    expect(notification).toBeTruthy();
  });
});

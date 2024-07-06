import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotificationUseCase } from './send-notification-use-case';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send notification use case', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(notificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sut.execute({
      recipientId: 'fake-recipient-id',
      content: 'Você recebeu uma nova solicitação de amizade.',
      category: 'social',
    });

    expect(notificationsRepository.items).toHaveLength(1);
    expect(notificationsRepository.items[0]).toEqual(notification);
  });
});

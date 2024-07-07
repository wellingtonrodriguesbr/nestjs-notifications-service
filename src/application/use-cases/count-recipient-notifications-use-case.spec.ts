import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotificationUseCase } from './count-recipient-notifications-use-case';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: CountRecipientNotificationUseCase;

describe('Count recipients notifications use case', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new CountRecipientNotificationUseCase(notificationsRepository);
  });

  it('should be able to count recipient notifications', async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id-2' }),
    );

    const { count } = await sut.execute({
      recipientId: 'recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { FetchRecipientNotificationsUseCase } from './fetch-recipient-notifications-use-case';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: FetchRecipientNotificationsUseCase;

describe('Fetch recipient notifications use case', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new FetchRecipientNotificationsUseCase(notificationsRepository);
  });

  it('should be able to fetch a notifications by recipient', async () => {
    await notificationsRepository.create(
      makeNotification({ recipientId: 'fake-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'fake-recipient-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'fake-recipient-id' }),
    );

    const { notifications } = await sut.execute({
      recipientId: 'fake-recipient-id',
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'fake-recipient-id' }),
        expect.objectContaining({ recipientId: 'fake-recipient-id' }),
      ]),
    );
  });
});

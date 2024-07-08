import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationUseCase } from './read-notifications-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read notification use case', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(notificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await sut.execute({ notificationId: notification.id });

    expect(notificationsRepository.items[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', async () => {
    expect(() =>
      sut.execute({ notificationId: 'wrong-notification-id' }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);
  });
});

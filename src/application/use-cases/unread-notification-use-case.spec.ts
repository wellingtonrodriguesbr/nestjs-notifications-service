import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { UnreadNotificationUseCase } from './unread-notifications-use-case';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: UnreadNotificationUseCase;

describe('Unread notification use case', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new UnreadNotificationUseCase(notificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);
    await sut.execute({ notificationId: notification.id });

    expect(notificationsRepository.items[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    expect(() =>
      sut.execute({ notificationId: 'wrong-notification-id' }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);
  });
});

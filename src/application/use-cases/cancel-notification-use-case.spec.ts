import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotificationUseCase } from './cancel-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found-error';
import { makeNotification } from '@test/factories/notification-factory';

let notificationsRepository: InMemoryNotificationsRepository;
let sut: CancelNotificationUseCase;

describe('Cancel notification use case', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new CancelNotificationUseCase(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await sut.execute({ notificationId: notification.id });

    expect(notificationsRepository.items[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    expect(() =>
      sut.execute({ notificationId: 'wrong-notification-id' }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);
  });
});

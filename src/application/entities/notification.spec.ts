import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a new notification', () => {
    const notification = new Notification({
      recipientId: 'fake-recipient-id',
      category: 'Social',
      content: new Content('Você recebeu uma nova solicitação de amizade.'),
    });

    expect(notification.category).toEqual('Social');
  });
});

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMessageDTO from '@shared/container/providers/MailProvider/dtos/IMessageDTO';
interface IMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IMailProvider {
    private messages: IMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({ to, body });
    }
}

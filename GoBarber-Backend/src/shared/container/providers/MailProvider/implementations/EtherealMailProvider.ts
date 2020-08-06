import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IMessage {
    to: string;
    body: string;
}

export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail(to: string, body: string): Promise<void> {
        console.log('Sending email');
        const message = await this.client.sendMail({
            from: 'Equipe GoBarber <equipe@gobarber.com.br>',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        });

        console.log(`Message sent: ${message.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}

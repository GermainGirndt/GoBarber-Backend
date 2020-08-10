import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { injectable, inject } from 'tsyringe';

interface IMessage {
    to: string;
    body: string;
}

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
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

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        console.log('Sending email');
        const message = await this.client.sendMail({
            to: { name: to.name, address: to.email },
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com.be',
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log(`Message sent: ${message.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}

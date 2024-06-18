import ApiError from '../error/ApiError.js';
import nodemailer from 'nodemailer';


class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        });
    };

    async sendActivationMail(user, link) {
        console.log(user, 'user');
        console.log(link, 'link');
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: user.email,
                subject: 'Активация аккаунт' + process.env.API_URL,
                text: '',
                html: 
                `
                    <div>
                        <h1>Добрый день ${user.username}</h1>
                        <p>Для активации перейдите по ссылке</p>
                        <a href="${link}">${link}</a>
                    </div>
                `
            });
        } catch (e) {
            throw ApiError.internal(`Ошибка при отправки сообщение: ${e}`);
        }
    };
};

export default new MailService(); 
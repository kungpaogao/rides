import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from "@sendinblue/client";

const sendInBlueInstance = new TransactionalEmailsApi();

function initSendInBlue() {
  sendInBlueInstance.setApiKey(
    TransactionalEmailsApiApiKeys.apiKey,
    process.env.SENDINBLUE_API_KEY || ""
  );
}

type Email = { name: string; email: string };

async function sendEmail(to: Email, sender: Email, message?: string) {
  initSendInBlue();

  const messageTemplate = `
  <!DOCTYPE html>
  <html>
    <body>
      <p>Hi ${to.name},</p>
      <p>${message}</p>
      <p>Best,</p>
      <p>${sender.name}</p>
    </body>
  </html>
  `;

  const sendSmtpEmail = new SendSmtpEmail();
  sendSmtpEmail.subject = "Cornell Rides - Request to ride";
  // sendSmtpEmail.htmlContent = messageTemplate;
  sendSmtpEmail.sender = sender;
  sendSmtpEmail.replyTo = sender;
  sendSmtpEmail.to = [to];
  sendSmtpEmail.textContent = message;

  return await sendInBlueInstance.sendTransacEmail(sendSmtpEmail);
}

export { sendEmail };

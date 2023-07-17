const nodemailer = require("nodemailer");
const { SMTPUserName, SMTPPassword } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: SMTPUserName,
      pass: SMTPPassword
    }
  });

  const sendEmailWithNodeMail = async(emailData)=>{
    try {
        const mailOption={
            from: SMTPUserName, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        };
    
        const info = await transporter.sendMail(mailOption);
        console.log('Message Sent: %s', info.response);
    } catch (error) {
        console.error('Error from Email file: ', error);
        throw error;
    }
  }

  module.exports = sendEmailWithNodeMail;
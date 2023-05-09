const nodemailer = require ('nodemailer');
const smtpTransport = require ('nodemailer-smtp-transport');

const sendEmail = async (
  subject,
  message,
  send_to,
  sent_from,
  reply_to,
  email_user,
  email_pass,
  email_host
) => {
  try {
    const transporter = nodemailer.createTransport (
      smtpTransport ({
        host: process.env.EMAIL_HOST,

        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    const mailOptions = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
    };

    const info = await transporter.sendMail (mailOptions);
    console.log (`Email sent: ${info.response}`);
  } catch (error) {
    console.log (error);
    throw new Error ('Failed to send email');
  }
};

const transporter = nodemailer.createTransport ({
  service: 'gmail',
  auth: {
    user: 'process.env.EMAIL_USER',
    pass: 'process.env.EMAIL_PASS',
  },
});

const sendResetPasswordEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Please click the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  try {
    const info = await transporter.sendMail (mailOptions);
    console.log (`Email sent: ${info.response}`);
  } catch (error) {
    console.log (error);
    throw new Error ('Failed to send email');
  }
};

const handleEmailSubmit = async (event, email) => {
  event.preventDefault ();

  try {
    const response = await axios.post ('/reset', {email});
    setMessage (response.data);

    const resetUrl = `${window.location.origin}/resetpassword/${response.data.resetToken}`;

    await sendResetPasswordEmail (email, resetUrl);

    window.location.href = '/resetpassword';
  } catch (error) {
    console.log (error);
    setMessage ('An error occurred');
  }
};

module.exports = sendEmail;


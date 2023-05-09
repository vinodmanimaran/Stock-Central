const mongoose = require ('mongoose');
const Token = require('../models/tokenModel');
const nodemailer = require ('nodemailer');
const smtpTransport = require ('nodemailer-smtp-transport');
const crypto = require ('crypto');


let User;

if (mongoose.connection.models.Password) {
  User = mongoose.connection.models.Password;
} else {
  const PasswordSchema = new mongoose.Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
  });

  User = mongoose.model ('Password', PasswordSchema);
}

exports.showResetForm = async (req, res, next) => {
  try {
    const token = await Token.findOne ({token: req.params.token});

    if (!token) {
      return res.status (400).send ('Invalid token');
    }

    const user = await User.findById (token.userId);

    if (!user) {
      return res.status (400).send ('User not found');
    }

    res.render ('resetPassword', {token});
  } catch (error) {
    next (error);
  }
};

exports.handleResetForm = async (req, res, next) => {
  try {
    const token = await Token.findOne ({token: req.params.token});

    if (!token) {
      return res.status (400).send ('Invalid token');
    }

    const user = await User.findById (token.userId);

    if (!user) {
      return res.status (400).send ('User not found');
    }

    user.password = req.body.password;
    await user.save ();

    // Delete the token after the password has been reset
    await token.remove ();

    res.redirect ('/login');
  } catch (error) {
    next (error);
  }
};

const transporter = nodemailer.createTransport (
  smtpTransport ({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })
);

exports.sendResetPasswordEmail = async (email, resetUrl) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
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

exports.handleEmailSubmit = async (req, res, next) => {
  try {
    const {email} = req.body;

    const user = await User.findOne ({email});

    if (!user) {
      return res.status (400).send ('User not found');
    }

    const token = new Token ({
      userId: user._id,
      token: crypto.randomBytes (16).toString ('hex'),
    });
    await token.save ();

    const resetUrl = `http://localhost:5000/reset/${token.token}`;

    // Send email with password reset link
    console.log (
      `Sending password reset email to ${email}. Reset URL: ${resetUrl}`
    );
    await exports.sendResetPasswordEmail (email, resetUrl);

    res.send ('Password reset email sent');
  } catch (error) {
    next (error);
  }
};

const nodemailer = require('nodemailer');
const config = require('../config');

// Crear el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio de correo que estés usando (Gmail en tu caso)
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

// Enviar notificación general
exports.sendNotificationEmail = async (to, subject, text) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};

// Enviar correo de restablecimiento de contraseña
exports.sendResetPasswordEmail = async (to, resetLink) => {
  const mailOptions = {
    from: config.EMAIL_USER,
    to,
    subject: 'Restablecer Contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de restablecimiento enviado');
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
  }
};

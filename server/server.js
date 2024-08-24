import express from 'express';
import nodemailer from 'nodemailer';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import connect from './database/conn.js';
import User from './models/userSchema.js';
import router from './router/route.js';

const app = express();
const port = 5000;

config(); // Load environment variables

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Function to send email using Nodemailer
function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    
    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: 'KODING 101 PASSWORD RECOVERY',
      html: `<html><body><h2>Your OTP is ${OTP}</h2></body></html>`,
    };
    
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: 'An error has occurred' });
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}

app.post('/reset-password', async (req, res) => {
  const { recipient_email, newPassword } = req.body;
  console.log('email', recipient_email);

  // Validate input
  if (!recipient_email || !newPassword) {
    return res.status(400).send({ error: 'Email and new password are required' });
  }

  try {
    const user = await User.findOne({ email: recipient_email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).send({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send({ error: 'An error occurred while resetting the password' });
  }
});

// Endpoint to send recovery email
app.post('/send_recovery_email', (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

// Connect to the database and start the server
connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch(error => {
  console.log("Database connection error:", error);
});

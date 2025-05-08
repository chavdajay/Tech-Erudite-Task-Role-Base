const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { createUser, findUserByEmail, verifyUser } = require('../models/userModel');
const { handleSuccess, handleError } = require('../utils/responseHandler');


const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000); 
};

const sendVerificationEmail = (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Please use the following code to verify your email: ${verificationCode}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

exports.registerUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  if (!first_name || !last_name || !email || !password || !role) {
    return handleError(res, 'All fields are required.', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return handleError(res, 'Invalid email format.', 400);
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return handleError(res, 'User already exists.', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateVerificationCode(); 

  await createUser(first_name, last_name, email, hashedPassword, role, verificationCode);

  sendVerificationEmail(email, verificationCode); 

  return handleSuccess(res, 'Registration successful. Please check your email for verification.', {});
};

exports.verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return handleError(res, 'Email and verification code are required.', 400);
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return handleError(res, 'User not found.', 404);
  }

  if (user.verification_code !== verificationCode) {
    return handleError(res, 'Invalid verification code.', 400);
  }

  await verifyUser(email);
  return handleSuccess(res, 'Email verified successfully.', { role: user.role });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return handleError(res, 'Email and password are required.', 400);
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return handleError(res, 'User not found.', 404);  
  }

  if (user.role !== 'admin') {
    return handleError(res, 'Unauthorized access.', 403);
  }

  if (!user.is_verified) {
    return handleError(res, 'Your account is not verified yet.', 403);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return handleError(res, 'Invalid credentials.', 401);
  }

  const token = jwt.sign(
    { 
      userId: user.id, 
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: '24h' 
    }
  );

  return handleSuccess(res, 'Login successful.', { token });
};


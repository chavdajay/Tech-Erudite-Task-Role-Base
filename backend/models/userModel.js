const db = require('../config/db');

const createUser = async (firstName, lastName, email, password, role, verificationCode) => {
  const [result] = await db.promise().query(
    'INSERT INTO users (first_name, last_name, email, password, role, verification_code) VALUES (?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, password, role, verificationCode]
  );
  return result;
};

const findUserByEmail = async (email) => {
  const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
  return user[0]; 
};

const verifyUser = async (email) => {
  await db.promise().query('UPDATE users SET is_verified = TRUE WHERE email = ?', [email]);
};

module.exports = { createUser, findUserByEmail, verifyUser };

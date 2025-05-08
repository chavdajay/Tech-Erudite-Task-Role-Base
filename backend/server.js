require("dotenv").config(); 
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const {createUserTable} = require('./models/createUserTable');

const app = express();
app.use(cors());
app.use(express.json());  

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
createUserTable();

app.listen(PORT, () => {
  console.log('Server running on port 5000');
});

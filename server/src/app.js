const express = require('express');
const cors = require('cors');
const app = express();

// .env
require('dotenv').config();

// db (sequelize)
const db = require('./config/dbConfig');
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('db Connection Error: ' + err));

// middlewares
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require('./routes/authRoutes');
const popupRoutes = require('./routes/popupRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/popup', popupRoutes);
app.use('/user', userRoutes);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// server start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;
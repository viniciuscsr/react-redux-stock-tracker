const express = require('express');
const app = express();

const dotenv = require('dotenv');

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log('listening on port' + PORT));

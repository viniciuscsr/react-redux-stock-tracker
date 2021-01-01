const express = require('express');
const app = express();

const path = require('path');

const dotenv = require('dotenv');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');

dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/stocks', stockRoutes);

const folder = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(folder, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(folder, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('Server is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log('listening on port ' + PORT));

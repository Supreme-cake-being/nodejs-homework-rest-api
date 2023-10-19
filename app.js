import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import contactsRouter from './routes/api/contacts.js';
import authRouter from './routes/api/auth.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

export default app;

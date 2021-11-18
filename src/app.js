import express from 'express';
import cors from 'cors';

import signUp from './controllers/signUp.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default app;

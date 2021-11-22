import express from 'express';
import cors from 'cors';

import validateToken from './middlewares/validateToken.js';
import signUp from './controllers/signUp.js';
import signIn from './controllers/signIn.js';
import getSubscription from './controllers/getSubscription.js';
import subscribe from './controllers/subscribe.js';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.get('/subscription', validateToken, getSubscription);
app.post('/subscription', validateToken, subscribe);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default app;

import 'reflect-metadata';

import express from 'express';
import routes from './routes'; // eslint-import-resolver-typescript

import './database';

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('Server connected on port 3333 😎');
});

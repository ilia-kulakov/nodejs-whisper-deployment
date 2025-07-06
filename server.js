import express from 'express';
import bodyParser from 'body-parser';
import * as user from './stores/user.js';
import * as whisper from './stores/whisper.js';
import { generateToken, requireAuthentication } from './utils.js';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/about', async (req, res) => {
  const whispers = await whisper.getAll();
  res.render('about', { whispers });
});

app.get('/logout', (req, res) => {
  res.redirect('/login');
});

app.get('/login', async (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await user.getUserByCredentials(username, password);
    const accessToken = generateToken({ username, id: foundUser._id });
    res.json({ accessToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/signup', async (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await user.create(username, password, email);
    const accessToken = generateToken({ username, id: newUser._id });
    res.json({ accessToken });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get('/api/v1/whisper', requireAuthentication, async (req, res) => {
  const storedWhispers = await whisper.getAll();
  res.json(storedWhispers);
});

app.get('/api/v1/whisper/:id', requireAuthentication, async (req, res) => {
  const id = req.params.id;
  const storedWhisper = await whisper.getById(id);
  if (!storedWhisper) {
    res.sendStatus(404);
  } else {
    res.json(storedWhisper);
  }
});

app.post('/api/v1/whisper', requireAuthentication, async (req, res) => {
  const { message } = req.body;
  const user = req.user;
  if (!message) {
    res.sendStatus(400);
  } else {
    const storedWhisper = await whisper.create(message, user.id);
    res.status(201).json(storedWhisper);
  }
});

app.put('/api/v1/whisper/:id', requireAuthentication, async (req, res) => {
  const id = req.params.id;
  const { message } = req.body;

  if (!message) {
    res.sendStatus(400);
  } else {
    const storedWhisper = await whisper.getById(id);

    if (!storedWhisper) {
      res.sendStatus(404);
      return;
    }

    if (storedWhisper.author.id !== req.user.id) {
      res.sendStatus(403);
      return;
    }

    await whisper.updateById(id, message);
    res.sendStatus(200);
  }
});

app.delete('/api/v1/whisper/:id', requireAuthentication, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const storedWhisper = await whisper.getById(id);
  if (!storedWhisper) {
    res.sendStatus(404);
    return;
  }
  if (storedWhisper.author.id !== user.id) {
    res.sendStatus(403);
    return;
  }
  await whisper.deleteById(id);
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  console.error('Middle Error Handler');
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Final Error Handler');
  console.error(err.stack);
  res.status(500).send('Ohh! Server needs love. ' + err);
});

export { app };

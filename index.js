const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const config = require('./dbConfig.json');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('public/images'));

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const userCollection = client.db('recipes').collection('users');

const insertRecipe = async (recipe) => {
  const client = new MongoClient(url);
  try {
    await client.connect();

    const collection = client.db('recipes').collection('example');
    await collection.insertOne(recipe);
  } finally {
    await client.close();
  }
};

const getRecipesFromDB = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const collection = client.db('recipes').collection('example');
    const recipesFromDB = await collection.find().toArray();
    return recipesFromDB;
  } finally {
    await client.close();
  }
};

app.use(async (req, res, next) => {
  try {
    const recipesFromDB = await getRecipesFromDB();
    res.locals.recipes = recipesFromDB; 
    next();
  } catch (error) {
    console.error('Error fetching recipes from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/user', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await userCollection.findOne({token: authToken});
  if(user){
    res.send({username: user.username});
    return;
  }
  res.status(401).send({msg: 'Unauthorized'});
});

app.post('/api/create', async (req, res) => {
  if(await getUser(req.body.username)){
    res.status(409).send({msg: "Username already exists"});
  }else{
    const user = await createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

app.post('/api/login', async (req, res) => {
  const user = await getUser(req.body.username);
  if(user){
    if(await bcrypt.compare(req.body.password, user.password)){
      setAuthCookie(res, user.token);
      res.send({id: user._id});
      return;
    }
  }
  res.status(401).send({msg: 'Unauthorized'});
})

const requireAuth = (req, res, next) => {
  const authToken = req.cookies['token'];
  if(authToken){
    next();
  }else{
    res.status(401).redirect('/public/index.html');
  }
}
// Get Recipes
app.get('/api/recipes', requireAuth, (req, res) => {
  res.json(res.locals.recipes);
});

// Create Recipe
app.post('/api/recipes', requireAuth, async (req, res) => {
  const { title, description, ingredients, instructions, image} = req.body;
  if (!title || !description || !ingredients || !instructions || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newRecipe = { title, description, ingredients, instructions, image};

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'newRecipe', data: newRecipe }));
    }
  });

  await insertRecipe(newRecipe);

  res.status(201).json(newRecipe);
});

// Edit Recipe
app.put('/api/recipes/:recipeId', requireAuth, async (req, res) => {
  const recipeId = req.params.recipeId;

  const { title, description } = req.body;

  const client = new MongoClient(url);
  try {
    await client.connect();
    const collection = client.db('recipes').collection('example');
    await collection.updateOne({ _id: recipeId }, { $set: { title, description } });
  } finally {
    await client.close();
  }

  res.json({ _id: recipeId, title, description });
});

// Delete Recipe
app.delete('/api/recipes/:recipeId', requireAuth, async (req, res) => {
  const recipeId = req.params.recipeId;

  const client = new MongoClient(url);
  try {
    await client.connect();
    const collection = client.db('recipes').collection('example');
    await collection.deleteOne({ _id: recipeId });
  } finally {
    await client.close();
  }
  res.status(204).end();
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.get('public/recupload.html', requireAuth, (req, res) => {
  res.sendFile('recupload.html', { root: 'public' });
});

app.get('public/userprofile.html', requireAuth, (req, res) => {
  res.sendFile('userprofile.html', { root: 'public' });
});

app.use((req, res) => {
  res.sendFile('recreview.html', { root: 'public' });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('close', () => {
    console.log('Websocket closed');
    });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

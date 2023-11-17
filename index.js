const express = require('express');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('public/images'));

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

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
    res.locals.recipes = recipesFromDB; // Store recipes in locals for use in routes
    next();
  } catch (error) {
    console.error('Error fetching recipes from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Recipes
app.get('/api/recipes', (req, res) => {
  res.json(res.locals.recipes);
});

// Create Recipe
app.post('/api/recipes', async (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ error: 'Title, description, and image are required' });
  }

  const newRecipe = { title, description, image };

  await insertRecipe(newRecipe);

  res.status(201).json(newRecipe);
});

// Edit Recipe
app.put('/api/recipes/:recipeId', async (req, res) => {
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
app.delete('/api/recipes/:recipeId', async (req, res) => {
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

app.use((req, res) => {
  res.sendFile('recreview.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));
app.use(express.static('public/images'));

let recipes = [
  { id: 1, 
    title: 'Spaghetti and Meatballs', 
    description: 'Classic Italian pasta dish'
    },
  { id: 2, 
    title: 'Pepperoni', 
    description: 'Quick and easy pizza'
    },
];

var apiRouter = express.Router();
app.use(`/api`, apiRouter)

// Get Recipes
apiRouter.get('/recipes', (req, res) => {
  res.send(recipes);
});

app.use((req, res) => {
    res.sendFile('recreview.html', {root: 'public'})
})

// Create Recipe
apiRouter.post('/recipes', (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ error: 'Title, description and image are required' });
  }
  const newRecipe = { id: recipes.length + 1, title, description };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Edit Recipe
apiRouter.put('/recipes/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const recipe = recipes.find((r) => r.id === recipeId);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  const { title, description } = req.body;
  if (title) recipe.title = title;
  if (description) recipe.description = description;
  res.json(recipe);
});

// Delete Recipe
apiRouter.delete('/recipes/:recipeId', (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  const index = recipes.findIndex((r) => r.id === recipeId);
  if (index === -1) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  recipes.splice(index, 1);
  res.status(204).end();
});

// Start the Express server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
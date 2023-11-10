async function fetchRecipesFromNodeEndpoint() {
      const response = await fetch('/api/recipes');
      if (!response.ok) {
          throw new Error('Failed to fetch recipes');
      }
      const recipes = await response.json();
      return recipes;
}

async function displayRecipes() {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "Fetching recipes..."; 

  try {
      const recipes = await fetchRecipesFromNodeEndpoint();

      recipeList.innerHTML = ""; 
      recipes.forEach((recipe) => {
          const recipeElement = document.createElement("div");
          recipeElement.innerHTML = `
              <p><b>${recipe.title}</b></p>
              <p>${recipe.description}</p>
          `;

          recipeList.appendChild(recipeElement);
      });
  } catch (error) {
      recipeList.innerHTML = "Error fetching recipes";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayRecipes();
});

// Edit Recipe endpoint
function editRecipe(recipeId) {
  console.log('Editing Recipe with ID:', recipeId);
}

// Delete Recipe endpoint
function deleteRecipe(recipeId) {
  fetch(`/api/recipes/${recipeId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 204) {
        console.log('Recipe deleted successfully');
        displayRecipes(); 
      } else {
        console.error('Error deleting the recipe');
      }
    })
}

function displayJoke() {
  
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      const jokeContainer = document.getElementById("jokeContainer");
      jokeContainer.innerHTML = data.value; 
    });
    
}

displayJoke();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#recipeForm");
  const uploadStatus = document.getElementById("uploadStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const recipeTitle = document.getElementById("recipeTitle").value;
    const recipeDescription = document.getElementById("recipeDescription").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const recipeImage = document.getElementById("recipeImage").files[0];
    

    if (!recipeTitle || !recipeDescription || !ingredients || !instructions) {
      uploadStatus.textContent = "Please fill in all fields and choose an image.";
      return;
    }

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: recipeTitle,
          description: recipeDescription,
          ingredients: ingredients,
          instructions: instructions,
          image: recipeImage,
        }),
      });

      if (response.status === 201) {
        console.log("Recipe uploaded successfully")
        //uploadStatus.textContent = "Recipe uploaded successfully!";
        form.reset();
        displayRecipes();
        window.location.href = 'recreview.html';
      } else {
        const errorMessage = await response.text();
        uploadStatus.textContent = `Error uploading the recipe: ${errorMessage}`;
      }
    } catch (error) {
      form.reset();
      window.location.href = 'recreview.html';
    }
  });
});


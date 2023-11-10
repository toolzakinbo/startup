document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const uploadStatus = document.getElementById("uploadStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const recipeTitle = document.getElementById("recipeTitle").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const recipeImage = document.getElementById("recipeImage").files[0];

    if (!recipeTitle || !ingredients || !instructions || !recipeImage) {
      uploadStatus.textContent = "Please fill in all fields and choose an image.";
      return;
    }

    const formData = new FormData();
    formData.append("title", recipeTitle); 
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("image", recipeImage);

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        uploadStatus.textContent = "Recipe uploaded successfully!";
        form.reset(); 
        displayRecipes(); 
      } else {
        uploadStatus.textContent = "Error uploading the recipe.";
      }
    } catch (error) {
      uploadStatus.textContent = "An error occurred while uploading the recipe.";
    }
  });
});

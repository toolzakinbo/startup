import React, { useState } from 'react';
import './upload.css';

const UploadRecipe = () => {
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const recipeTitle = document.getElementById("recipeTitle").value;
    const recipeDescription = document.getElementById("recipeDescription").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const recipeImage = document.getElementById("recipeImage").files[0];

    if (!recipeTitle || !recipeDescription || !ingredients || !instructions) {
      setUploadStatus("Please fill in all fields and choose an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', recipeTitle);
      formData.append('description', recipeDescription);
      formData.append('ingredients', ingredients);
      formData.append('instructions', instructions);
      formData.append('image', recipeImage);

      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        console.log("Recipe uploaded successfully");
        setUploadStatus("Recipe uploaded successfully!");
        // form.reset();
        // displayRecipes();
        window.location.href = 'recreview.html';
      } else {
        const errorMessage = await response.text();
        setUploadStatus(`Error uploading the recipe: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error uploading the recipe:', error.message);
      setUploadStatus('Error uploading the recipe.');
    }
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="recreview.html">Recipe Reviews</a></li>
            <li><a href="recupload.html">Upload Recipe</a></li>
            <li><a href="userprofile.html">User Profile</a></li>
          </ul>
        </nav>
      </header>

      <h1>Upload Your Recipe</h1>
      <form id="recipeForm" onSubmit={handleFormSubmit}>
        <label htmlFor="recipeTitle">Recipe Title:</label><br />
        <input type="text" id="recipeTitle" name="recipeTitle" required /><br />

        <label htmlFor="recipeDescription">Description:</label><br />
        <textarea id="recipeDescription" name="recipeDescription" rows="4"></textarea><br />

        <label htmlFor="ingredients">Ingredients:</label><br />
        <textarea id="ingredients" name="ingredients" rows="4" required></textarea><br />

        <label htmlFor="instructions">Instructions:</label><br />
        <textarea id="instructions" name="instructions" rows="6" required></textarea><br />

        <label htmlFor="recipeImage">Upload Image:</label><br />
        <input type="file" id="recipeImage" name="recipeImage" /><br /><br />

        <button type="submit">Upload Recipe</button>
      </form>

      <p id="uploadStatus">{uploadStatus}</p>
    </>
  );
};

export default UploadRecipe;

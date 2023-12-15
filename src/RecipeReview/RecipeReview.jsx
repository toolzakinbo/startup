import React, { useEffect, useState } from 'react';

const RecReview = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [joke, setJoke] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const sessionCookie = document.cookie.split(';').find((item) => item.trim().startsWith('sessionId='));
      setIsLoggedIn(!!sessionCookie);

      // Replace with the actual username (you need to retrieve this from your server)
      setUsername('John Doe'); // Replace with the actual username
    };

    const displayJoke = async () => {
      try {
        const response = await fetch('https://api.example.com/jokes/random');
        const data = await response.json();
        setJoke(data.value);
      } catch (error) {
        console.error('Error fetching joke:', error.message);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const fetchedRecipes = await response.json();
        setRecipes(fetchedRecipes); // Update recipes state
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    const socket = new WebSocket('wss://startup.recreview.click/');

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'newRecipe') {
        const message = `New recipe added: ${data.data.title}`;
        setRealTimeUpdates((prevUpdates) => [...prevUpdates, message]);
      }
    });

    checkLoginStatus();
    displayJoke();
    fetchRecipes();

    return () => {
      socket.close(); 
    };
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/recreview">Recipe Reviews</a></li>
          <li><a href="/recupload">Upload Recipe</a></li>
          <li><a href="/userprofile">User Profile</a></li>
          {isLoggedIn && <li><button onClick={() => console.log('Logout')}>Logout</button></li>}
        </ul>
      </nav>

      <main>
        <section id="welcomeSection">
          <h2>{isLoggedIn ? `Welcome, ${username}!` : 'Welcome!'}</h2>
          <p>Explore and share your favorite recipes with our community.</p>
        </section>

        <div id="recipeList">
          {/* Display recipes here */}
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <p><b>{recipe.title}</b></p>
              <p>{recipe.description}</p>
              <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '50%', height: 'auto' }} />
            </div>
          ))}
        </div>

        <section>
          <h2>Third Party Service</h2>
          <div id="jokeContainer">{joke}</div>
        </section>

        <section id="real-time-updates">
          <h3>Real-Time Updates</h3>
          <div id="updateContainer">
            {/* Display real-time updates here */}
            {realTimeUpdates.map((update, index) => (
              <div key={index}>{update}</div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <a href="https://github.com/toolzakinbo/startup/tree/main">GitHub</a>
      </footer>
    </>
  );
};

export default RecReview;

import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userProfile = await response.json();
        setUserInfo(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="recreview.html">Recipe Reviews</a></li>
            <li><a href="recupload.html">Upload Recipe</a></li>
          </ul>
        </nav>
      </header>

      <h1>User Profile</h1>

      <section id="user-info">
        <h2>User Information</h2>
        {userInfo ? <p>Welcome, {userInfo.username}!</p> : <p>Error fetching user profile</p>}
      </section>

      <section id="liked-recipes">
        <h2>Liked Recipes</h2>
        <p>NO LIKED RECIPES YET</p>
      </section>

      <section id="user-comments">
        <h2>User Comments</h2>
        <ul>
          <li>
            <h3>Comment on Banana French Toast</h3>
            <p>Comment text...</p>
          </li>
          <li>
            <h3>Comment on Butter Chicken Curry</h3>
            <p>Comment text...</p>
          </li>
        </ul>
      </section>

      <section id="real-time-updates">
        <h2>Real-Time Updates</h2>
        <p>Waiting for real-time data...</p>
      </section>
    </>
  );
};

export default UserProfile;

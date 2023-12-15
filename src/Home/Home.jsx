import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState('loginTab');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const login = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Assuming the server-side login validation is successful, redirect to the recipe review page.
      window.location.href = "recipe-review.html";
    } else {
      // Handle login error (display an error message, for example).
      console.error('Login failed:', data.error);
    }
  };

  const createAccount = async () => {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      // Account creation successful, you may redirect or show a success message
      window.location.href = "recipe-review.html";
      console.log('Account created successfully:', data.message);
    } else {
      // Handle account creation error (display an error message, for example).
      console.error('Account creation failed:', data.error);
    }
  };

  return (
    <>
      <h1>Recipe Review App</h1>

      <div id="tabs">
        <button onClick={() => openTab('loginTab')}>Login</button>
        <br /><br />
        <button onClick={() => openTab('createAccountTab')}>Create Account</button><br /><br />
      </div>

      {/* Login Tab */}
      <div id="loginTab" style={{ display: activeTab === 'loginTab' ? 'block' : 'none' }}>
        <form onSubmit={(e) => { e.preventDefault(); login(); }}>
          <label htmlFor="username">Username:</label><br />
          <input type="text" id="username" name="username" required /><br />

          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" required /><br />

          <button type="submit">Login</button>
        </form>
      </div>

      {/* Create Account Tab */}
      <div id="createAccountTab" style={{ display: activeTab === 'createAccountTab' ? 'block' : 'none' }}>
        <form onSubmit={(e) => { e.preventDefault(); createAccount(); }}>
          <label htmlFor="new-username">Username:</label><br />
          <input type="text" id="new-username" name="new-username" required /><br />

          <label htmlFor="new-password">Password:</label><br />
          <input type="password" id="new-password" name="new-password" required /><br />

          <label htmlFor="confirm-password">Re-enter Password:</label><br />
          <input type="password" id="confirm-password" name="confirm-password" required /><br />

          <button type="submit">Create Account</button>
        </form>
      </div>

      {/* Placeholder for websocket data showing real-time communication */}
      {/* <section id="real-time-updates">
        <h2>Real-Time Updates</h2>
        <p id="websocket-data">Waiting for real-time data...</p>
      </section> */}

      <footer>
        <a href="https://github.com/toolzakinbo/startup/tree/main">GitHub</a>
      </footer>
    </>
  );
}

export default Home;

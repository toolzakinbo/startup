# Recipe Review Application
https://github.com/toolzakinbo/startup/blob/main/notes.md

## Elevator Pitch
Elevate your culinary journey with our Recipe Review App! Imagine a world where you can easily discover, share, and perfect delicious recipes while connecting with a vibrant community of fellow food enthusiasts. With our app, you can browse a vast collection of mouthwatering recipes, each reviewed and rated by our passionate users. Find the perfect recipe for any occasion, from quick weekday dinners to show-stopping holiday feasts. Feeling adventurous? Share your own culinary creations, receive feedback, and become a recognized chef within our community. Join us in the kitchen and let's make cooking an unforgettable experience. Download the Recipe Review App today and unlock a world of flavor and creativity!

## Deliverable Specification
### Design
### Key Features
- Users can create accounts securely and login over HTTPS to protect user data
- Ability to search and filter recipes by various criteria
- Users can rate and review recipes
- Option to leave comments and feedback on recipe experiences
- Ability to upload recipes and add photos and description
- Ability for admins to add, edit, or delete recipes
### Technologies
I am going to be using HTML, CSS, JavaScript, Web Services, WebSocket, React, a DataBase(MongoDB), and React. 
#### HTML
This is going to be used for structure.
- A couple of HTML pages would be used. One would be used for login purposes and for users to create new accounts; a page where users can browse and review recipes; a recipe details page; a recipe upload page, and a user profile page.
- It is responsible for the textual description of each recipe using text
- displaying images for each recipe
- input boxes for the login page and a submit button to initiate login
- fetches recipes and their details from the database
#### CSS
This is going to be used for styling and animation. 
- navigation, header, text content, login page, recipe review page, and responsive styles would be done using CSS.
#### JavaScript
This deliverable is responsible for interactivity.
- It handles user authentication when the Login button is clicked
- It handles recipe uploads when the upload button is clicked
- Uses Websockets to notify users when their recipe receives a comment and update the recipe listing in real time to reflect new uploads.
#### Web Services
This deliverable is responsible for endpoints for retrieving recipe details, ratings, and reviews.
- Recipe data handling
- API endpoints for authentication
- RESTFul API endpoints that serve as the interface between the front-end and backend of the app
#### Database
This deliverable is responsible for storing the data for each recipe. 
- MongoDB is the database used and it stores all the recipe data here.
#### Login
This deliverable associates recipes with a specific user
- It is responsible for user registration
- MongoDB is used to store the users and their recipes
- Associate existing users with their recipes
#### WebSocket 
This deliverable is responsible for real-time updates on the frontend
- Enables instant data exchange between the server and the client which allows users to see updates without refreshing the page.
#### React
This deliverable is going to help with components for various parts of the app
- homepage component
- user profile component
- login component

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home/Home';
import RecReview from './RecipeReview/RecipeReview';
import UploadRecipe from './RecipeUpload/upload';
import UserProfile from './UserProfile/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RecipeReview" element={<RecReview />} />
        <Route path="/upload" component={<UploadRecipe />} />
        <Route path="/UserProfile" component={<UserProfile />} />
      </Routes>

      <footer className='bg-dark text-dark text-muted'>
          <div className='container-fluid'>
            <a className='text-reset' href='https://github.com/toolzakinbo/startup/tree/main'>
              Source
            </a>
          </div>
        </footer>
    </Router>
  );
};

export default App;

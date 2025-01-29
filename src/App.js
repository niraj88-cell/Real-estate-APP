import './App.css';
import HomePage from "./routes/HomePage/HomePage.js";
import ListPage from './routes/ListPage/ListPage.js'; // Assuming you have this component

import ProfilePage  from './routes/ProfilePage/ProfilePage.js'
import Register from './routes/Register/Register.js';
import { RequireAuth,Layout } from './routes/Layout/Layout.js';
 // Assuming you have a Layout component
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SinglePage from './routes/SinglePage/SinglePage.js';
import Login from './routes/Login/Login.js';
import ProfileUpdatePage from './routes/ProfileUpdatepage/ProfileUpdatePage.js';
import NewPostPage from './routes/NewPostPage/NewPostPage.js';
import { SinglePageLoader,ListPageLoader, ProfilePageLoader } from './components/Lib/Loaders.js';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list", // corrected the path to be relative
          element: <ListPage />,
          loader:ListPageLoader
        },
        {
          path: "/:id", // corrected the path to be relative
          element: <SinglePage />,
          loader:SinglePageLoader

        },
       
     
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[

        {
          path: "/profile", // corrected the path to be relative
          element: <ProfilePage/>,
          loader:ProfilePageLoader
        },
        {
          path: "/profile/update", // corrected the path to be relative
          element: <ProfileUpdatePage/>
        },
        {
          path: "/add", // corrected the path to be relative
          element: <NewPostPage/>
        },

      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
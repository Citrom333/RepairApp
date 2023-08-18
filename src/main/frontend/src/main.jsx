import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Vehicles from './Pages/Vehicles'
import './index.css'
import WrongPage from './Pages/WrongPage.jsx';
import NewWork from './Pages/NewWork.jsx';
import NewFixture from './Pages/NewFixture.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/vehicles",
    element: <Vehicles />
  },
  {
    path: "/newWork",
    element: <NewWork />
  },
  {
    path: "/newFixture",
    element: <NewFixture />
  },
  {
    path: "/*",
    element: <WrongPage />
  },



]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

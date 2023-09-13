import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Vehicles from './Pages/Vehicles'
import './index.css'
import WrongPage from './Pages/WrongPage.jsx';
import NewWork from './Pages/NewWork.jsx';
import NewFixture from './Pages/NewFixture.jsx';
import NewVehicle from './Pages/NewVehicle.jsx';
import NewShop from './Pages/NewShop.jsx';
import UpdateVehicle from './Pages/UpdateVehicle.jsx';
import NewEmail from './Pages/NewEmail.jsx';
import DetailsOfWork from './Pages/DetailsOfWork.jsx';
import ListOfShops from './Pages/ListOfShops.jsx';
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
    path: "/newVehicle",
    element: <NewVehicle />
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
    path: "/newShop",
    element: <NewShop />
  },
  {
    path: "/updateVehicle",
    element: <UpdateVehicle />
  },
  {
    path: "/newEmail",
    element: <NewEmail />
  },
  {
    path: "/detailsOfWorks/:id",
    element: <DetailsOfWork />
  },
  {
    path: "/shops",
    element: <ListOfShops />
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


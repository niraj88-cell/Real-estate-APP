import React, { useContext } from 'react';
import "./Layout.scss";
import Navbar from "../../components/navbar/Navbar.js"
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';


const Layout = () => {
  return (
         <div className="Layout">
      <div className="navbar">
      <Navbar/>
      </div>
      <div className="content">

      <Outlet/>
      </div>
   
    </div>
  )
}



const RequireAuth = () => {


  const {currentUser}=useContext(AuthContext);


  return (
    !currentUser ?( <Navigate to="/login"/> ):  (    <div className="Layout">
      <div className="navbar">
      <Navbar/>
      </div>
      <div className="content">

      <Outlet/>
      </div>
   
    </div>
    )
    
  )
}

export  {Layout,RequireAuth};

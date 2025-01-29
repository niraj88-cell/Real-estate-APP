import React, { useContext } from 'react'

import './HomePage.scss';
import { AuthContext } from '../../context/AuthContext.js';
import SearchBar from '../../components/searchBar/SearchBar.js';
const HomePage = () => {

  const  {currentUser}=useContext(AuthContext)

  console.log(currentUser);
  return (
   <div className="homePage">
   
    <div className="textContainer">
        <div className="wrapper">
        <h1>Find Real Estate & Get Your Dream Place</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo aspernatur nihil nam nemo voluptatum unde aperiam inventore totam, molestias sit. Ratione esse incidunt possimus vitae quas dolore cum repellendus autem ipsum assumenda!</p>
         <SearchBar/>
   
        <div className="boxes">
            <div className="box">
            <h1>16+</h1>
            <h2>Years of Experiences</h2>
            </div>

            <div className="box">
            <h1>200</h1>
            <h2>Award Gained</h2>
            </div>

            <div className="box">
            <h1>2000+</h1>
            <h2>Property Ready</h2>
            </div>
         
        </div>
    
        </div>
      

    </div>
    <div className="imgContainer">
       <img src="/bg.png" alt="" />
    </div>
   </div>
  )
}

export default HomePage

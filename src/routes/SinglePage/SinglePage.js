import React, { useContext, useState } from 'react';
import Slider from '../../components/Slider/Slider.js';
import Map from '../../components/Map/Map.js';
import "./SinglePage.scss"
import { useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { AuthContext } from '../../context/AuthContext.js';
import apiRequest from '../../components/Lib/apiRequest.js';

const SinglePage = () => {

  const {currentUser}=useContext(AuthContext);
  const [saved,setSaved]=useState(post.isSaved);
  const navigate=useNavigate();

  
  const post=useLoaderData();
  const handleSave= async()=>{
    setSaved((prev)=>!prev);
    if(!currentUser){
      navigate("/login")
    }

    try{

      await apiRequest.post("/users/save",{psotId:post.id});

    }catch(err){

    }

  }

  



  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">
                  <p>Price: ${post.price}</p>
                </div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt={post.user.username} />
                <p>{post.user.name}</p>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetail.desc)}}>
             
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
         <p className>General</p>
         <div className="listVerticle">
          <div className="feature">
            <img src="/utility.png" alt="" />
            <div className="featureText">
              <span>Utilities</span>
             {
              post.postDetail.utilities==="owner"?(
                <p>Owner is responsible</p>):(
                  <p>Tenant is responsible</p>
              )
             }
            </div>

          </div>

          <div className="feature">
            <img src="/pet.png" alt="" />
            <div className="featureText">
              <span>Pet Policy</span>
              {
              post.postDetail.pet==="allowed"?(
                <p>Pets Allowed</p>):(
                  <p>Pets not Allowed</p>
              )
             }
            </div>

          </div>

          <div className="feature">
            <img src="/fee.png" alt="" />
            <div className="featureText">
              <span>Income Policy</span>
              <p>{post.postDetail.income}</p>
            </div>

          </div>
         </div>
         <p className>Sizes</p>
         <div className="sizes">
         <div className="size">
          <img src="/size.png" alt="" />
          <span>{post.postDetail.size}</span>
         </div>

         <div className="size">
          <img src="/bed.png" alt="" />
          <span>{post.bedroom}</span>
         </div>

         <div className="size">
          <img src="/bath.png" alt="" />
          <span>{post.bathroom}</span>
         </div>

         </div>
         <p className>Nearby Places</p>
         <div className="listHorizontal">


         <div className="feature">
            <img src="/school.png" alt="" />
            <div className="featureText">
              <span>School</span>
              <p>{post.postDetil.school}</p>
            </div>

          </div>

          <div className="feature">
            <img src="/pet.png" alt="" />
            <div className="featureText">
              <span>BUs Stop</span>
              <p>{post.postDetail.bus}</p>
            </div>

          </div>

          <div className="feature">
            <img src="/fee.png" alt="" />
            <div className="featureText">
              <span>Resturant</span>
              <p>{post.postDetail.restaurant}</p>
            </div>

          </div>
         </div>
         <p className>Location</p>
         <div className="mapContainer">
          <Map items={[post]}/>
         </div>
         <div className="buttons">
         <button>
          <img src="/chat.png" alt="" />
          Send a Message

          </button>
          <button onClick={handleSave} style={{backgroundColor:saved ?"#fece51":"white"}}>
          <img src="/save.png" alt="" />
        {saved ? "Place Saved":"Save the place"}

          </button>

         </div>
       
    
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
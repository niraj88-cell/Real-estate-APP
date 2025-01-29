import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';
import { useContext } from 'react';

import apiRequest from '../Lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

const Card = ({ item }) => {
  const [isSaved, setIsSaved] = useState(false);
  const {currentUser}=useContext(AuthContext);


  console.log("user",currentUser);

  

  const handleClick = async (postId) => {
    try {

      console.log("item id",postId);
      const savePosted = await apiRequest.post("/user/save", { postId ,userId:currentUser.id});
      setIsSaved(savePosted.data
        
      );
    } catch (err) {
      console.error(err);
    }
  };

  console.log("isSaved",isSaved);

  useEffect(() => {
    if (!item.id) return;

    const checkIfSaved = async () => {
      try {
        const response = await apiRequest.get(`/user/saved-status?postId=${item.id}`);
        setIsSaved(response.data.saved);
      } catch (err) {
        console.error(err);
      }
    };

    checkIfSaved();
  }, [item.id]);

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images?.[0] || '/placeholder.png'} alt={`Image of ${item.title}`} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location pin" />
          <span>{item.address}</span>
        </p>
        <p className="price">${item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="Number of bedrooms" />
              <span>{item.bedRooms}</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Number of bathrooms" />
              <span>{item.bathRooms}</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon" onClick={() => handleClick(item.id)}>
              <img src={isSaved ? '/saved.png' : '/save.png'} alt="Save post" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from 'react';
import { Link } from 'react-router-dom'; 
import { Marker, Popup } from 'react-leaflet';
import "./Pin.scss";

const Pin = ({ item }) => {


  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          {/* Check if img and title exist */}
          {item.img && <img src={item.img} alt={item.title || 'No title'} />}
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title || 'No title'}</Link>
            <span>{item.bedRooms || 'No bedrooms'} bedroom{item.bedRooms > 1 ? 's' : ''}</span>
            <b>${item.price || 'No price'}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;

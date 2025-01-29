import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from '../Pin/Pin.js';
import "./Map.scss"

const Map = ({ items }) => {
  // Log the items data to verify
 console.log("map ko lagi:",items)

  return (
    <MapContainer center={items.length===1 ?[items[0].latitude,items[0].longitude] :[51.505, -0.09]} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items && items.length > 0 ? (
        items.map(item => {

           return <Pin item={item} key={item.id} />
})
      ) : (
        <p>No items to display</p>
      )}
    </MapContainer>
  );
};

export default Map;
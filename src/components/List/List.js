import React from 'react'
import Card from '../Card/Card.js';
import "./List.scss";

const List = ({posts}) => {
  
  return (
   <div className="list">
    {posts.map(item=>(
        <Card key={item.id} item={item}/>
    ))}

   </div>
  )
}

export default List

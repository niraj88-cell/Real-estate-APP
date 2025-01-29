import React, { Suspense, lazy } from 'react';
import "./ListPage.scss";
import { useLoaderData } from 'react-router-dom';
import Filter from '../../components/Filter/Filter.js';
import Card from '../../components/Card/Card.js';
import Map from '../../components/Map/Map.js';

// Import components lazily if needed
// const Card = lazy(() => import('../../components/Card/Card.js'));
// const Map = lazy(() => import('../../components/Map/Map.js'));

const ListPage = () => {
  const data = useLoaderData();
  
  console.log("Data used in ListPage:", data);  // Confirm data is being used
  console.log("Data",data.postResponse.data)
  return (
    <div className="ListPage">
     <div className="listContainer">
  <div className="wrapper">
    <Filter />
    <Suspense fallback={<p>Loading...</p>}>
  {data?.postResponse.data && Array.isArray(data.postResponse.data) && data.postResponse.data.length > 0 ? (
    data.postResponse.data.map(post => {
      console.log("Rendering post:", post);
      
      return <Card key={post?.id || Math.random()} item={post} />;
    })
  ) : (
    <p>No posts available.</p>
  )}
</Suspense>

  </div>
</div>

    
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
        
      
          {data.postResponse.data ? (
          
            data.postResponse.data.map(data=>{
              console.log("dataddd",data);
           
            return <Map items={data} key={data?.id}/>
          })
          ) : (
            <p>No map data available.</p>
          )}
            
        </Suspense>
        
      </div>
    </div>
  );
}

export default ListPage;
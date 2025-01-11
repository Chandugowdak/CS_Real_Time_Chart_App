import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChartPage = () => {
  const [charts , setcharts] = useState([]);

  const fetchcharts = async () => {
    const response = await axios.get("http://localhost:3000/api/Data");
   setcharts(response.data);
    
  }
  useEffect(() => {
    fetchcharts();
  },[])
  return (
    <div>
      {charts &&
        charts.map((chat) => (
   ////TO MAINTAIN THE UNIQNESS
           <div key={chat._id}>   
            <h1>{chat.chatName}</h1>
          </div>
        ))}
    </div>
  );
}

export default ChartPage

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Test() {

  const [data,setData] = useState([]);
    
  const options = {
    method: 'GET',
    url: ' https://api.imgflip.com/get_memes'
  };
  useEffect(()=>{
    get();
  },[])
   
  const get = async() =>{
    if(data.length>0){
      return;
    }
    await axios.request(options).then(function (response) {
        setData(response.data.data.memes);
        console.log(response.data.data.memes)
    }).catch(function (error) {
      console.error(error);
    });
  }
    return (
        <div>
            <h1 className="w3-center w3-margin-bottom w3-text-white">MEMES</h1>
            <div className="w3-card-4 w3-row w3-light-grey" style={{width:"80%",margin:"auto",overflowY:'auto',height:"600px"}}>

            {
              data && data.map(d=>(
                  <List name={d.name} picture={d.url} key={d.id}/>
              ))
            }
            </div>

        </div>
    )
}

const List = ({name,picture})=>{
  const show = () =>{
    Swal.fire({
      imageUrl:picture,
      imageAlt:name,
      text:name
    })
  }
  return (
    <div onClick={show} 
    className="w3-large w3-border w3-container w3-quarter w3-padding-medium w3-hover-dark" 
    style={{cursor:"pointer",flexDirection:"row",height:"240px",display:"flex",justifyContent:"center",alignItems:"center"}}>
       <img src={picture} className="w3-card-4" alt={name} style={{maxHeight:"200px",maxWidth:"200px"}}/>
    </div>
  );
}


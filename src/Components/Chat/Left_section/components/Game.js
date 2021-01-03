import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../../Firebase'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import './Game/style.css'
import {initiateOnlineOffline, toggleOnlineOffline} from '../../ExtraFunction/FirebaseFunction';

export default function Game() {
    
    return (
        <div className=" w3-padding-large">
                <p className="w3-large w3-red w3-padding-large w3-center">Be Informed <i className="fas fa-info-circle"></i></p>
                <ul className="w3-ul w3-medium w3-white">
                    <li >Keep online for the other player to find you</li>
                    <li >Keep offline when you don't want to play</li>
                </ul>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"30vh",flexDirection:"column"}}>
                <Switch />
            </div>
        </div>
    )
}

const Switch = () =>{
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const firestore = firebase.firestore;
    const [checkBox,setCheckBox] = useState(null);

    //check if the user is active and make it active
    const query = firestore.collection("gameActive").doc(auth.currentUser.uid);
    const [isOnline] = useDocumentData(query);
    useEffect(()=>{
        initiateOnlineOffline(query,auth);
    },[]);

    useEffect(()=>{
        setCheckBox(isOnline?isOnline.online:false);
    },[isOnline]);

    const toggle = ()=>{
        toggleOnlineOffline(checkBox,query);
    }

    return(
        <>  
            {
                isOnline?<><label className="switch animate__animated animate__bounce">
                    <input type="checkbox" onChange={toggle} checked={checkBox}/>
                    <span className="slider round"></span>
                </label>
                {checkBox?<p className="w3-text-green">online</p>:<p className="w3-text-red">offline</p>}</>:null
            }
            
            
        </>
    );
}


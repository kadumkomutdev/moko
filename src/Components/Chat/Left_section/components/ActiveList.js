import React, { useContext, useState } from 'react'
import {FirebaseContext} from '../../../Firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Ripple from '../../../loader/Ripple';
import ChatActive from '../../../Context/ChatActive';
import { useHistory } from 'react-router';
import { navigateProfile } from '../../ExtraFunction/ExtraFunction';
import { connectContact, disconnectContact } from '../../ExtraFunction/FirebaseFunction';


export default function ActiveList() {
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore; 
    const auth = firebase.auth;
    const mainFirebase = firebase.firebase;

    // Firestore query
    //query the users in the database
    const userRef = firestore.collection("contacts").doc(auth.currentUser.uid).collection('userRooms');
    const query = userRef.limit(10);
    
    const [userList,loading] = useCollectionData(query,{idField:"id"});

    // Firestore query
    return (
        <div>
            <div className="w3-padding-medium">
                <h3 className="w3-center w3-padding-large w3-darker ">CONTACTS</h3>
            </div>
            <ul className="w3-ul" style={{padding:"0px 10px"}}>
               {
                    loading?<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"30vh"}}><Ripple/></div>:
                            userList?userList.map(user =>(
                                <List 
                                key={user.id} 
                                messageKey={user.messageKey}
                                firestore={firestore}
                                auth={auth} 
                                firebase={mainFirebase}
                                uid={user.id} 
                                name={user.username} 
                                picture={user.photo}/>  
                            )):null
               }
               
            </ul>
        </div>
    )
}

const List = ({name,picture,uid,auth,firestore,firebase,messageKey}) => {
    const history = useHistory();
    
    const {setActive,setProfileData} = useContext(ChatActive);

    //Connect both the users
    const roomRefAuth = firestore.collection("rooms").doc(auth.currentUser.uid).collection("userRooms");

    
    //hiding the box of the profile that is clicked
    const [ visible, setVisible] = useState("visible");

    //disconnect
    const [disconnect,setDisconnect] = useState("disconnect");
    const [disconnectDisable, setDisconnectDisable] = useState(false);

    //message
    const [message,setMessage] = useState("message");
    const [messageDisable,setMessageDisable] = useState(false);

    const connectT = () =>{
        connectContact(roomRefAuth,uid,setMessageDisable,setMessage,setActive,setProfileData,name,picture,history,firestore,auth,firebase,setVisible,messageKey);
    }

    const deleteContact = () =>{
        disconnectContact(setDisconnectDisable,setMessageDisable,setDisconnect,firestore,auth,uid,setProfileData,name,history);
    }


    return(
        <li className="w3-card w3-animate-bottom w3-white" 
            style={{visibility:visible,display:"flex",justifyContent:"start",alignItems:"space-around"}}>
            <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                <img src={picture} alt={name} width="60px" onClick={()=>navigateProfile(name,picture,uid,history)} style={{cursor:'pointer'}} className="w3-circle w3-hover-sepia w3-margin-right" height="60px"/>
            </div>
            <div  style={{marginTop:"4px",display:"flex",justifyContent:"start",flexDirection:"column",alignItems:"start",overflow:"auto"}}>
                <h3 className="w3-medium" style={{marginBottom:"6px"}}>{name}</h3> 
                <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button  
                        onClick={connectT} 
                        disabled={messageDisable} 
                        className=" w3-round-large w3-small w3-dark w3-block w3-hover-darker w3-button">{message}</button>
                    <button  
                        onClick={deleteContact} 
                        disabled={disconnectDisable} 
                        className="w3-round-large w3-red w3-small w3-hover-dark-red w3-button w3-block w3-margin-left">{disconnect}</button>
                </div>
            </div>
        </li>
    )
}

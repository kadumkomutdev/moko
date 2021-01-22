import React,{useContext} from 'react'
import { FirebaseContext } from '../Firebase';
import Linkify from 'react-linkify';


const ShowMessage = ({msg,from,photo,name}) =>{
    const firebase = useContext(FirebaseContext);
    const messageClass = from===firebase.auth.currentUser.uid?'sent':'recieve';
    const usernameClass = from===firebase.auth.currentUser.uid?'w3-hide':'w3-text-blue';
    return(
        <div className={`message w3-small ${messageClass}`}>
            <img src={photo} alt="message"/>
            <div className="para">
                <p className={`${usernameClass}`} style={{fontWeight:"bolder",fontSize:"14px"}}><b>{name}</b></p>
                <Linkify>
                    {msg}
                </Linkify> 
            </div>   
               
        </div>
    );
}

export default ShowMessage;
import React,{useContext,useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import {useHistory} from 'react-router';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import { showChallengeTicTacToe, tictactoeAccept, tictactoeDecline } from '../Chat/ExtraFunction/FirebaseFunction';

const GameActive = () =>{
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const history = useHistory();   
    const query = firestore.collection("gameActive").doc(firebase.auth.currentUser.uid);
    const [check] = useDocumentData(query);
    return(
        <>
            {
                check?check.challenge?
                        <ShowChallenge 
                            photo={check.photo} 
                            name={check.challengeName} 
                            accept={()=>tictactoeAccept(firestore,check.gameid,check.challenge,auth,history)} 
                            decline={()=>tictactoeDecline(firestore,check.gameid,auth)}/>:
                    null:
                null
            }
        </>
    );
}

const ShowChallenge = ({accept,decline,photo,name}) =>{
    useEffect(()=>{
        showChallengeTicTacToe(accept,decline,photo,name);  
    },[])
    return (
        <></>
    );
}

export default GameActive;
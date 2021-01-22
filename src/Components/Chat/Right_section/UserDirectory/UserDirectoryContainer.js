import React, { useContext,useEffect,useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../../../Firebase'
import Circle from '../../../loader/Circle'
import { useHistory } from 'react-router';
import {navigateProfile} from '../../ExtraFunction/ExtraFunction';
import { addToContact } from '../../ExtraFunction/FirebaseFunction';

export default function UserDirectoryContainer() {
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    const userListRef = firestore.collection('users').where('uid','!=',auth.currentUser.uid).orderBy('uid').limit(30); 
    const [userList,loading] = useCollectionData(userListRef,{idField:"id"});
    return (
        <div className="userDirectory">
            <h2 className="w3-padding-large w3-dark w3-center"><i className="fas fa-user-plus"></i> Connect with friends you know </h2>
            <div className=" userDirectory-user ">
                {
                    loading?<div className="loading"><Circle /></div>:
                    userList.map(user=>(
                        <List firestore={firestore} firebase={firebase.firebase} auth={auth} key={user.id} uid={user.uid} username={user.username} photo={user.photo}/>      
                    ))
                }  
                </div>
            </div>
    )
}

const List = ({photo,username,uid,firestore,auth,firebase}) =>{
    const history = useHistory();
    const ref = React.createRef();
    const [present, setPresent] = useState(true);
    const [disable,setDisable] = useState(false);
    const [buttonText, setButtonText] = useState("Add+");
    const userRef = firestore.collection('contacts').doc(auth.currentUser.uid).collection('userRooms');

    const addContact = () =>{
        addToContact(setDisable,setButtonText,firestore,userRef,uid,username,photo,auth,firebase,setPresent)
    }
    
    useEffect(()=>{
        try{
            userRef.doc(uid).get()
                .then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    setPresent(false);
                }
            });         
        }catch(err){
            // alert("some error occured");
            alert(err);
        }
    },[uid,userRef])
   
    return !present&&(
            <div ref={ref} 
            style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}
            className="w3-round w3-animate-right item w3-padding-large w3-center">
                <div className="w3-hover-sepia" onClick={()=>navigateProfile(username,photo,uid,history)} style={{marginRight:"6px",cursor:"pointer"}}>
                    <img src={photo} alt={username} className="w3-circle" style={{height:"70px",width:"70px"}}/>
                </div>
                <div 
                    className="w3-padding-small" 
                    style={{display:"flex",justifyContent:"space-between",alignItems:"space-evenly",flexDirection:"column"}}>
                    <h3 className="w3-medium w3-text-grey" style={{marginBottom:"6px"}}>{username}</h3>
                    <button 
                        disabled={disable} 
                        onClick={addContact} 
                        className="w3-block w3-small w3-hover-darker w3-button w3-dark  w3-round">
                        {buttonText}
                    </button>
                </div>
            </div>
    );
}

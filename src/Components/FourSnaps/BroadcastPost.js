import React, {useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Ripple from '../loader/Ripple';
import TimeAgo from '../TimeAgo'
import Swal from 'sweetalert2';
import { broadcastText } from './function';
import Linkify from 'react-linkify';
import {navigateProfile} from '../Chat/ExtraFunction/ExtraFunction'
import { useHistory } from 'react-router';

const BroadcastPost = () =>{
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const [text,loader] = useCollectionData(firestore.collection('broadcastText').orderBy('createdAt','desc'),{idField:'id'});

    return (
        <div className="w3-white" style={{
            width:"500px",
            borderRight:"1px solid lightgrey"

        }}>
            <div className="w3-padding-medium w3-border-bottom w3-center">
                <button className="w3-button w3-dark w3-round-large w3-card-2 w3-hover-darker" 
                onClick={()=>broadcastText(firestore,auth,firebase)}><i className="fas fa-text-height"></i> Create Broadcast</button>
            </div>
            {
                loader?<Ripple />:
                    text.map(specificText=>(
                        <List firebase={firebase} id={specificText.id} firestore={firestore} auth={auth} text={specificText.text} key={specificText.id} uid={specificText.uid} date={specificText.createdAt} name={specificText.username} photo={specificText.photo}/>
                    ))
            }
            
        </div>
    );
}

const List = ({text,id,firebase,auth,uid,name,photo,date,firestore})=>{
    const history = useHistory();
    const update = () =>{
        Swal.fire({
            title:"Choose an option",
            showCancelButton:true,
            confirmButtonText:"Update Broadcast",
            cancelButtonText:"Delete Broadcast"
        }).then(res=>{
            if(res.isConfirmed){
                updateText();        
            }else if(res.isDismissed){
                deleteText();
            }
        })
    }
    const updateText = () =>{
        Swal.fire({
            title:"Update Broadcast",
            input:"text",
            inputValidator:(value)=>{
                if(!value) return 'Enter something';
                if(value===text) return 'Its same'
            },
            inputValue:text,
            preConfirm:async(value)=>{
                return await firestore.collection('broadcastText').doc(id).update({
                    text:value,
                    createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()
                })
            },
            showLoaderOnConfirm:true
        }).then(result=>{
            if(result.value){
                Swal.fire('Broadcast Updated','','success')
            }
        })
    }
    const deleteText = () =>{
        Swal.fire({
            title:"Delete Broadcast",
            text:text,
            icon:"question",
            showLoaderOnConfirm:true,
            confirmButtonText:"Delete",
            preConfirm:async()=>{
                return await firestore.collection('broadcastText').doc(id).delete();
            }
        }).then(result=>{
            if(result.value){
                Swal.fire('Broadcast Deleted','','success')
            }
        })
    }
    return(
        <div class=" w3-border-bottom w3-margin-right" 
        style={{
            height:"auto",
            width:"100%",
        }}>
            <div style={{display:'flex',alignItems:"center",padding:'10px'}}>
                <img src={photo} 
                    className="w3-hover-sepia" 
                    alt={name}
                    onClick={()=>navigateProfile(name,photo,uid,history)} 
                    style={{cursor:'pointer',width:'30px',height:'30px',marginRight:"5px",borderRadius:"50%"}}/>
                <h3 className="w3-text-dark" style={{marginRight:'5px'}}>{name}</h3>
                <p className="w3-small" style={{marginRight:'5px'}}>{date&&<TimeAgo date={date.toDate()}/>}</p>
                {auth.currentUser.uid===uid?<i onClick={update} className="fa fa-edit w3-hover-text-blue" style={{float:'right'}}></i>:null}
            </div>
            <div style={{padding:"10px",wordWrap:"break-word"}}>
                <p><Linkify>{text}</Linkify></p>
            </div>
        </div> 
    );
}
 
export default BroadcastPost;
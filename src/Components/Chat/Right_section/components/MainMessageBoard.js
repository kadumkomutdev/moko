import React, { useContext,useState, useRef,useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Linkify from 'react-linkify';
import ChatActive from '../../../Context/ChatActive';
import { FirebaseContext } from '../../../Firebase';
import Ripple from '../../../loader/Ripple';
import TimeAgo from '../../../TimeAgo';
import { deleteSpecificMessage,checkSeen,decrypt} from '../../ExtraFunction/FirebaseFunction';

export default function MainMessageBoard() {
    //getting data from the local state
    const {profileData} = useContext(ChatActive);

    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    //fetching the data
    const messageRef = firestore.collection('messages').doc(profileData.roomid).collection('userMessages').orderBy('createdAt','asc');
    const [messages, loading] = useCollectionData(messageRef,{idField:"id"});

    
    // //seen to be true when this loads
    useEffect(()=>{
        checkSeen(firestore,profileData.roomid,auth);
    },[messages]);

    //creating a ref
    const dummy = useRef();
    // //scroll into the end of the view
    useEffect(()=>{
        dummy.current.scrollIntoView({behavior : 'smooth'});
    },[messages]);

    //ripple styles
    const rippleStyle = {
        height:'80vh',
        width:'100%',
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
    return (
        <div className="main-message-board">
            {
                loading?<div style={rippleStyle}><Ripple /></div>:
                    messages.map(message=>(
                        <ShowMessage 
                            key={message.id}
                            id={message.id}
                            photo={message.photo}
                            type={message.type} 
                            auth={firebase.auth} 
                            msg={message.message}
                            profileData={profileData}
                            firestore={firestore}
                            seen={message.seen}  
                            other={profileData.uid}
                            createdAt={message.createdAt} 
                            roomid={profileData.roomid} 
                            from={message.from}/>
                    ))
            }
            <div ref={dummy}></div>
        </div>
    )
}

const ShowMessage = ({msg,createdAt,auth,from,photo,seen,firestore,id,roomid,other,profileData}) => {
    const [key,setKey] = useState(Array.from(new Set(profileData.name.split(' ')[0]+auth.currentUser.displayName.split(' ')[0])).sort().join(''));
    const messageClass = from===auth.currentUser.uid?'sent w3-animate-left':'recieve w3-animate-zoom';
    const hideTick = from===auth.currentUser.uid?'visible':'hidden';
    const seenTick = seen?'#5DADE2':'grey';
    const dateTime = createdAt?createdAt.toMillis():null;
    
    return (
        <div className={`message  ${messageClass}`}>
            <img src={photo} alt="message"/>
            <div className="para">
                <Linkify>{decrypt(key,msg)}</Linkify> 
                <i className="fas fa-trash-alt hideIcon" 
                onClick={()=>deleteSpecificMessage(firestore,roomid,id,other,auth,key)}></i>
                {
                    createdAt?
                    <div>
                        <span style={{fontSize:"0.58rem"}} className={`${messageClass}`}>{<TimeAgo date={dateTime}/>}</span> &nbsp; 
                            <span style={{visibility:hideTick,fontSize:"1rem",color:seenTick,position:"relative",fontWeight:"bold"}}>
                                &#10003;
                                <span style={{position:"absolute",right:"6px"}}>&#10003;
                            </span>
                        </span>
                    </div>:<div><span style={{color:"grey"}}>&#10003;</span></div>
                }
                
            </div>   
               
        </div>
    );
}
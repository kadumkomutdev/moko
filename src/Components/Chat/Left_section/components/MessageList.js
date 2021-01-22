import React,{useState,useContext,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import MessageListSearchBar from './MessageListSearchBar';
import MessageUser from './MessageUser';
import {useHistory, withRouter} from 'react-router';
import {FirebaseContext} from '../../../Firebase'
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import Ripple from '../../../loader/Ripple';
import { checkChatCount } from '../../ExtraFunction/FirebaseFunction';

function MessageList({match}) {

    return (
        <div>
                <MessageListSearchBar  />
                {/* <!-- users area --> */}
                <div className="user-list">
                    <MessageListUser match={match}/>
                </div>
                {/* <!-- End of users area --> */}

        </div>
    )
}

const MessageListUser = ({match}) =>{
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore; 
    const auth = firebase.auth;

    //getting the users from the room
    const dataRef = firestore.collection('rooms').doc(auth.currentUser.uid).collection('userRooms').orderBy('createdAt','desc');
    const [myData,loading] = useCollectionData(dataRef,{idField:"id"});
    //check seen in the message list of the top chat 
    const [chatCount] = useDocumentData(firestore.collection('notificationCount').doc(auth.currentUser.uid));
    //set the active chat user turn blue
    const [active,setActive] = useState(match.params.id);
    useEffect(()=>{
        setActive(match.params.id?match.params.id:0);
    },[match.params.id])

    useEffect(() => {
        checkChatCount(firestore,auth);
    }, [chatCount])


     // USE HISTory for checking if theurl is not valid , redirect it to the initial value
     const history = useHistory();
     //checking if the url is valid or not
     useEffect(()=>{
         const checkData = async() => {
             if(match.params.id){
                 await  firestore.collection('contacts').doc(auth.currentUser.uid).collection('userRooms').doc(match.params.id).get()
                  .then(function(docSnapshot){
                      if(!docSnapshot.exists){
                          history.push('/home/chat');
                      }
                  });
             }
         }
         checkData();  
     },[myData])
    return(<>
            {loading?
                        <div  style={{display:"flex",justifyContent:"center",alignItems:"center",height:"40vh"}}><Ripple /></div>:
                        myData&&myData.map(user => (
                        <NavLink to={`/home/chat/${user.uid}?name=${user.username}`} key={user.uid} style={{textDecoration:"none"}}>
                            <MessageUser 
                                name={user.username} 
                                key={user.id} 
                                roomid={user.id} 
                                uid={user.uid} 
                                count={user.count}
                                createdAt={user.createdAt}
                                seen={user.seen}
                                photo={user.photo}
                                message={user.message}
                                active={active?user.uid==active?true:false:user.uid==0?true:false}
                            />
                        </NavLink>
                    ))
                }
    </>);
}

export default withRouter(MessageList);
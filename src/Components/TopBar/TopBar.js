import React, { useContext, useEffect, useState } from 'react';
import './topbar.css';
import {NavLink, useHistory} from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import {  useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import Ripple from '../loader/Ripple'
import TimeAgo from '../TimeAgo';
import { myProfile } from '../Chat/ExtraFunction/ExtraFunction';
import { showChallengeTicTacToe, tictactoeAccept, tictactoeDecline } from '../Chat/ExtraFunction/FirebaseFunction';

const TopBar = (props) => {
        const history = useHistory();
        return(
                <div className="top-bar">
                    <div className="main-bar">          
                        <div className="logo-container">
                                <div className="tooltip">
                                    <NavLink to="/home/chat" style={{textDecoration:"none"}}><h1>MO<span>KO</span> </h1></NavLink>
                                <span className="tooltiptext" style={{fontSize:"0.9rem"}}>Developed by Mohit and kadum</span>
                            </div>
                        </div>     
                        <header>
                            <nav>
                                <ul>
                                    <li>
                                        <GameActive />
                                    </li>
                                    <li> 
                                        <NavLink activeStyle={{color:"#4a6e8b"}} className="nav_link" to="/home/chat/">
                                            <div className="tooltip"><i className='fas fa-comment'></i>
                                                <span className="tooltiptext">Chat</span>
                                            </div>
                                        </NavLink>
                            
                                    </li>
                                    <li>
                                        <NavLink to="/home/4snaps" className="nav_link" activeStyle={{color:"#4a6e8b"}} >
                                            <div className="tooltip"><i className="fas fa-border-all"></i>
                                                <span className="tooltiptext">4 Snaps</span>
                                            </div>
                                        </NavLink>
                            
                                    </li>
                                    <li>
                                        <NavLink to="/home/rooms" className="nav_link" activeStyle={{color:"#4a6e8b"}}>
                                            <div className="tooltip"><i className="fa fa-home"></i>
                                                <span className="tooltiptext">Rooms</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/home/typingspeed" className="nav_link" activeStyle={{color:"#4a6e8b"}}>
                                            <div className="tooltip"><i className="fas fa-keyboard"></i>
                                                <span className="tooltiptext w3-padding-small">Typing speed </span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    {/* SHowing the notification */}
                                        <Notification />
                                    </li>
                                    <li onClick={()=>myProfile(props.name,props.picture,history,props.signout)}>
                                        <div className="tooltip">
                                            <img src={props.picture} className="w3-circle" alt={props.name} style={{width:"30px"}} />
                                            <span className="tooltiptext">Logged as : {props.name}</span>
                                        </div>
                            
                                    </li>
                                </ul>
                            </nav>
                        </header>
                    </div>
                </div>
    );
}
//
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
const Notification = () => {
    const [count,setCount] = useState(0);
    const [notificationSideBar,setNotificationSidebar ] = useState(false);

    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const query = firebase.firestore.collection('notificationCount').doc(auth.currentUser.uid);
    const [noti] = useDocumentData(query);
    useEffect(()=>{
        if(noti){
            setCount(noti.count);
        }
    },[noti]);

    const checkNotification = async() =>{
        setNotificationSidebar(true);
        if(noti&&noti.count>0){
            await query.update({
                count : 0
            })
        }
        
    }

    return(<>
            <div className="tooltip" onClick={checkNotification}>
                <span className="val"><i className="fa fa-bell "></i>{count>0?<span>{count}</span>:null}</span>
                <span className="tooltiptext">Notification</span>
            </div>
                {/* Notification bar  */}
                {notificationSideBar?
                 <ShowNotification firebase={firebase} setNotificationSidebar={setNotificationSidebar}/>:null
                }
            </>
    );
}

const ShowNotification = ({setNotificationSidebar,firebase}) =>{
    const closeNotificationMenu = () =>{
        setNotificationSidebar(false);
    }
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const query = firestore.collection('notification').doc(auth.currentUser.uid).collection('userNotification');
    const [notificationList,loading] = useCollectionData(query,{idField:"id"});
    
    return (
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-right w3-white" 
                style={{display:"block",minWidth:"600px",right:"0",top:"0",zIndex:"9999"}}>
                <div className="w3-bar-item w3-padding-large w3-dark" 
                    style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <h1 className="">Notification</h1>
                    <button onClick={closeNotificationMenu} className="w3-button w3-large w3-white">Close &times;</button>
                </div>
                <div className="">
                   {
                       loading?
                        <div className="w3-center"><Ripple /></div>:
                        notificationList?
                            notificationList.map(list=>(
                                <List text={list.text} createdAt={list.createdAt} key={list.id}/>
                            )):null
                   }
                </div>
                
            </div>
    );
}

const List = ({text,createdAt}) =>{
    const img = "https://robohash.org/"+text;
    return (
        <div className="w3-white w3-border-bottom w3-border-light-grey w3-hover-light-grey w3-bar-item"
        style={{display:'flex',justifyContent:"flex-start",alignItems:'center',flexDirection:"row",padding:"20px 20px"}}>
            <img src={img} style={{width:"50px",height:"50px"}} alt={text} className="w3-circle w3-dark w3-margin-right w3-border"/>
            <div style={{alignSelf:"center"}}>
                <p className="w3-large">{text}</p>
                <p className="w3-small w3-text-grey w3-right" ><TimeAgo date={createdAt}/></p>
            </div>
        </div>
    );
}

export default TopBar;
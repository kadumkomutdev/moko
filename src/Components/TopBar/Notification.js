import {useState,useContext,useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import Ripple from '../loader/Ripple'
import TimeAgo from '../TimeAgo';
import {useDocumentData,useCollectionData} from 'react-firebase-hooks/firestore'

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
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-right w3-light-grey" 
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
        style={{display:'flex',justifyContent:"flex-start",alignItems:'center',flexDirection:"row",padding:"15px 15px"}}>
            <img src={img} style={{width:"50px",height:"50px"}} alt={text} className="w3-circle w3-dark w3-margin-right w3-border"/>
            <div style={{alignSelf:"center"}}>
                <p className="w3-large">{text}</p>
                <p className="w3-small w3-text-grey w3-right" ><TimeAgo date={createdAt}/></p>
            </div>
        </div>
    );
}

export default Notification;
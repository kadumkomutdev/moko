import React, { useContext,useState } from 'react'
import './style.css';
import tictactoe from './images/tictactoe.png';
import bingo from './images/bingo-compressed.jpg';
import chess from './images/chess.jpg';
import { useHistory } from 'react-router';
import {FirebaseContext} from '../../../Firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { nanoid } from 'nanoid';    
import { sendChallengeTicTacToe } from '../../ExtraFunction/FirebaseFunction';



export default function GameContainer() {
    const history = useHistory();

    //sidebar
    const [sideBarOnline, setSideBarOnline] = useState(false);
    const openRightMenu = () =>{
        setSideBarOnline(true);
    }
    // -------------
    
    return (
        <div style={{overflow:"auto"}}>
            <h2 className="w3-center w3-green w3-padding-large" style={{position:"sticky",top:0,zIndex:1}}>Wanna Play Games!</h2>
            <div className="w3-margin-top  gameContainer-grid" >
                <div className=" w3-animate-right w3-round-xxlarge  w3-card-2 w3-padding-large w3-white w3-center">
                    <p className="w3-xlarge w3-text-dark"><b>TIC TAC TOE</b></p>
                    <img src={tictactoe} alt="tictactoe" className="w3-margin-top" style={{width:"140px",height:"140px"}}/>
                    <button className="w3-button w3-hover-dark-green w3-block w3-round-large w3-green w3-margin-top" onClick={openRightMenu}> 
                       <i className="fas fa-skull-crossbones"></i> Challenge
                    </button>     
                </div>

                <div className=" w3-animate-right w3-round-xxlarge w3-card-2 w3-padding-large w3-grey w3-center">
                    <p className="w3-xlarge"><b>BINGO</b></p>
                    <img src={bingo} alt="bingo" className="w3-margin-top" style={{width:"140px",height:"140px"}}/>
                    <button className="w3-button w3-block w3-white w3-margin-top" disabled> 
                       <i className="fas fa-truck-loading"></i> UPCOMING...
                    </button>
                </div>

                <div className=" w3-animate-right w3-round-xxlarge w3-padding-large w3-grey w3-center">
                    <p className="w3-xlarge"><b>CHESS</b></p>
                    <img src={chess} alt="chess" className="w3-margin-top" style={{width:"140px",height:"140px"}}/>
                    <button onClick={()=>history.push('/home/chess')} className="w3-button w3-block w3-white w3-margin-top" disabled> 
                        <i className="fas fa-truck-loading"></i> UPCOMING...
                    </button>
                </div>
            </div>
            {/* side bar */}
            {
                sideBarOnline?<SideBar setSideBarOnline={setSideBarOnline}/>:null
            }
            {/* side bar */}
        </div>
    )
}

const SideBar = ({setSideBarOnline}) =>{
    
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const closeRightMenu = () =>{   
        setSideBarOnline(false);
    }

    const query = firestore.collection('gameActive').where('online','==',true).limit(20);
    const [onlineData] = useCollectionData(query,{idField:"id"});

    return (
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-right" 
                style={{display:"block",minWidth:"600px",right:"0",top:"0",zIndex:"999"}}>
                <div className="w3-bar-item w3-padding-large w3-dark" 
                    style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <h1 className="">PLAYERS ONLINE</h1>
                    <button onClick={closeRightMenu} className="w3-button w3-large w3-white">Close &times;</button>
                </div>
                <div className="w3-container w3-margin-top-small">
                    {
                        onlineData && onlineData.map(user=>(
                            <List name={user.name} firebase={firebase.firebase} photo={user.photo} key={user.id} firestore={firestore} auth={auth} uid={user.uid}/>
                        ))
                    }
                    
                </div>
                
            </div>
    );
}

const List = ({name,uid,auth,firestore,photo,firebase}) =>{
    const [challengeButton , setChallengeButton ] = useState("Challenge");
    const text = auth.currentUser.uid===uid?"w3-hide":"";
    const ref = firestore.collection("gameActive").doc(uid);
    const gameid = nanoid();

    const history = useHistory();
    
    const sendChallengeT = ()=>{
        sendChallengeTicTacToe(setChallengeButton,ref,auth,gameid,firestore,uid,name,photo,history,firebase);
    }

    return (
        <>
        <div className={`w3-hover-white w3-button w3-margin-top-small ${text}`} style={{display:'flex',justifyContent:"flex-start",alignItems:"center"}}>          
            <img src={photo} alt={name} className="w3-circle"  style={{width:"70px",height:"70px"}}/>
            <div>
                <p className="w3-margin-left">{name}</p>
                <button className="w3-button w3-margin-top-small w3-tiny w3-round-large w3-hover-dark-red w3-red" 
                    onClick={sendChallengeT}>
                        {challengeButton}
                </button>
            </div>
        </div>            
        </>
    );
}



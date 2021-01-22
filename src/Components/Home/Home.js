import React, { useContext,useState,lazy,Suspense } from 'react';
import TopBar from '../TopBar/TopBar';
import './style.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import ChatActive from '../Context/ChatActive';

//components for firebase
import {FirebaseContext} from '../Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Circle from '../loader/Circle';


const Chat = lazy(()=>import('../Chat/Chat'));
const FourSnaps = lazy(()=>import('../FourSnaps/FourSnaps'));
const Rooms = lazy(()=>import('../Rooms/Rooms'));
const TicTacToe = lazy(()=>import('../TicTacToe/TicTacToe'));
const Profile = lazy(()=>import('../Profile/Profile'));
const TypingSpeed = lazy(()=>import('../TypingSpeed/TypingSpeed'));
const Chess = lazy(()=>import('../Chess/PlayChess'));

//-----------------------------------

// ------------------------------------

const Home = () =>{
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const [user] = useAuthState(auth);
   
    const [active, setActive] = useState(1);
    const [profileData, setProfileData] = useState({
        name:null,
        photo:null,
        uid : null,
        roomid:null,
        messageKey:'-----BEGIN RSA PRIVATE KEY-----MIIBOQIBAAJBAIOYv0b0r+Wcd4w9rEbwpdJoEGxHBAXergQb3IO6G3E0fdnTefMJxkrE1r9juJcAaOn/D4XCGs1w2GbhddfNz3UCAwEAAQJAGrEn0w+cgfk7smFsCTOUntnmwt+grEQfjcvM7ZcZK9vJDrqsxw7/qptXga1iGdhgF1EL8iWhK1eCx5KwulLhwQIhAPbZMaJxtE2OxoaY5RLGa9zZSRljP54jGGfo9AZyI8YxAiEAiHm2yPhpd4xFc25eYAmnDjfv7HuRbN/LFNwIlV/HWIUCIG7m/cnB1APUVZU7NA/PXb6HULQ7RuXBVsG4g4ox1ajBAiBWyoDRwhjgbBZm2FOwY7MXub8c92B+irwN4fibdjPCOQIgTMyvPutXfaRlgd+SKisj+mLXs1A9wXKApu0YYCs0tEg=-----END RSA PRIVATE KEY-----'
    });


    // let query = useQuery();
    if(!user){
        return <Redirect to="/signup"/>
    } 
    const loadStyle = {
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		width:"100vw",
		height:"100vh"
	}
   
    return (
            <div>
                <TopBar 
                signout={firebase.doSignOut} 
                name={auth.currentUser.displayName}
                picture={auth.currentUser.photoURL}
                />
                <ChatActive.Provider value={{active,setActive,profileData,setProfileData}}>
                <Suspense fallback={<div style={loadStyle}><Circle/></div>}>
                 <Switch>   
				    <Route path="/home/chat" exact  component={Chat}/>
                    <Route path="/home/chat/:id"  component={Chat}/>
                    <Route path="/home/profile" exact component={Profile}/>
                    <Route path="/home/profile/:id" component={Profile}/>
                    <Route path="/home/tictactoe/:id" component={TicTacToe}/>
                    <Route path="/home/broadcast" component={FourSnaps}/>
                    <Route path="/home/rooms"   component={Rooms}/>
                    <Route path="/home/typingspeed" component={TypingSpeed}/>
                    <Route path="/home/chess" component={Chess}/>
                    </Switch>
                 </Suspense>
                </ChatActive.Provider>
            </div>	
        )
    
}

export default Home;

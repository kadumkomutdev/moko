import React,{useContext, useState} from 'react';
import Tilt from 'react-tilt';
import './Signup.css';
import { FirebaseContext} from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {useAuthState} from 'react-firebase-hooks/auth'
import { Redirect } from 'react-router';
import Circle from '../loader/Circle';
import mishra from './mishra.jpg';
import mohit from './mohit.jpg';
import kadum from './kadum.jpg';
import { NavLink } from 'react-router-dom';

const Signup = ()=> {
	const [active , setActive] = useState(0);
    
	const firebaseInstance =  useContext(FirebaseContext);	
	const firestore = firebaseInstance.firestore;
	const auth = firebaseInstance.auth;
	const [user, loading,error] = useAuthState(auth);
	const uiConfig = {
		signInFlow : "popup",
		signInOptions : [
				{
				  provider: firebaseInstance.signAuth.GoogleAuthProvider.PROVIDER_ID,
				//   scopes: [
				// 	'https://www.googleapis.com/auth/contacts.readonly'
				//   ],
				  customParameters: {
					// Forces account selection even when one account
					// is available.
					prompt: 'select_account'
				  }
				},
				{
				  provider: firebaseInstance.signAuth.FacebookAuthProvider.PROVIDER_ID,
				//   scopes: [
				// 	'public_profile',
				// 	'email'
				//   ],
				  customParameters: {
					// Forces password re-entry.
					// auth_type: 'reauthenticate'
				  }
				},
			firebaseInstance.signAuth.GithubAuthProvider.PROVIDER_ID,
			firebaseInstance.signAuth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks : {
			signInSuccessWithAuthResult: () => false
		}
	  }
	  
	if(loading){
		  const loadStyle = {
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			width:"100vw",
			height:"100vh"
		  }
		  return <div style={loadStyle}><Circle /></div>
	}
	
	
	if(user){
		//if the user logs in, check if the user exist in the database
		//if the user is first time, the data will not be present in the database;
		try{
			const userRef = firestore.collection('users').doc(auth.currentUser.uid);
			const notificationCount = firestore.collection('notificationCount').doc(auth.currentUser.uid);
            userRef.get()
                .then((docSnapshot) => {
                if (!docSnapshot.exists) {
					var batch = firestore.batch();
                    batch.set(userRef,{
                        username : auth.currentUser.displayName,
                        uid : auth.currentUser.uid,
                        photo : auth.currentUser.photoURL,
                        email : auth.currentUser.email,
					}) // create the document
					batch.set(notificationCount,{count : 0,chatCount:0,roomCount:0,typingCount:0,broadcastCount:0,requestCount:0});
					batch.commit().catch(error=>{
						firebaseInstance.doSignOut();
					})
                }
            });         
            
        }catch(err){
            // alert("some error occured");
        }
		return <Redirect to="/home/chat" />
	}
	
	if(error){
		alert(error);
	}
	
	
	
	return(
		<div>
				<div className="background">
				<div className="triangle-left"></div>
				<div className="triangle-right"></div>
				</div>
			<div className = "Signup">

				
				<Tilt className="Tilt" options={{ max : 3 }}  >
				<div className="signup_container w3-card-4 w3-animate-left">
				<h1 className="signup-logo" style ={{ textAlign:"center"}}>MOKO™</h1>

				<div className="container">
					{active==0?
						<Main uiConfig={uiConfig} firebaseInstance={firebaseInstance.auth}/>:
						active==1?<About />:
						active==2?<Contact />:
						active==3?<Team />:null}
				</div>

				
					<div className="bottom-container">
									  <div className="row">
									  <div className="Bottomcol" onClick={()=>setActive(0)}>
									      <p  className="btn" >Login</p>
									    </div>
									    <div className="Bottomcol" onClick={()=>setActive(1)}>
									      <p  className="btn" >About</p>
									    </div>
									    <div className="Bottomcol" onClick={()=>setActive(2)}>
									      <p  className="btn" >Contact</p>
									    </div>
									    <div className="Bottomcol" onClick={()=>setActive(3)}>
									      <p  className="btn" >Teams</p>
									    </div>
									  </div>
					</div>
				
				</div>
				</Tilt>

				<footer className="w3-text-dark">© 2020 MOKO™ - All Rights Reserved.</footer>

			</div>
		</div>
		);
	
}

//User interface for firebase login buttons
function Main({uiConfig,firebaseInstance}){
	return(

						<div className="row w3-animate-left">
							<StyledFirebaseAuth 
              					uiConfig={uiConfig}
              					firebaseAuth={firebaseInstance}
          					/>
						</div>
	)
}

//about
const About = () =>{
	return(
		<div className="w3-animate-left" style={{letterSpacing:"1px",color:'#4a6e8b'}}>
			<p style={{marginBottom:"4px"}} className="w3-xlarge w3-text-dark"><b>ABOUT</b></p>
			<p><b>MOKO</b> is a chat application with <b>Incredible</b> features such as <b>Messaging</b>, <b>Video calling</b>
			, multiplayer games including<b>Tic Tac Toe</b>, <b>Bingo</b> and <b>Chess</b>. 
			It is <b>Powered</b> by the most <b>Powerfull</b> servers from <b>Google</b> firebase which act as <b>Backend</b> and 
			provides the <b>Best Security</b> known.
			</p>
			<p>You can do much more than <b>Messaging</b>, like <b>Creating rooms</b> with your <b>favorite contacts</b>, uploading pictures of 4 and a word
				which you might have guessed is a version of <b>4 Snaps</b>.<b>Interactivity</b> at its best powered by <b>React's</b> powerfull components to render your <b>Perfect</b> needs.
			</p>
			<p></p>
			<p>And yes, <b>MESSAGES ARE ENCRYPTED!</b></p>
			<h4 style={{marginTop:"8px"}} className="w3-center w3-padding-large w3-orange w3-text-white">Hope You Have A Good Experience with us!</h4>
		</div>
	);
}

//conatct
const Contact = () =>{
	return(
		<div className="w3-animate-left">
			<h2 className="w3-text-dark ">CONTACT</h2>
			<div className="w3-container w3-hover-dark w3-padding-large w3-white  w3-card w3-round-large w3-margin-top">
				<p><b className="w3-text-dark">KADUM KOMUT</b> - kadumkomut2826@gmail.com</p>
			</div>
			<div className="w3-container w3-hover-dark w3-padding-large w3-white w3-card w3-margin-top w3-round-large">
				<p><b className="w3-text-dark">MOHIT PAL</b> - mohit12pal@gmail.com</p>
			</div>
			<div className="w3-container w3-hover-dark w3-padding-large w3-white w3-card w3-margin-top w3-round-large">
				<p><b className="w3-text-dark">AKSHAY MISHRA</b> - AKSHAYMISHRA@gmail.com</p>
			</div>
		</div>
	);
}

//team
const Team = () =>{

	return(
		<div>
			<ul className="w3-ul w3-card-4 w3-animate-left">
    <li className="w3-bar  w3-white w3-border-bottom w3-border-grey " >
	<NavLink to="/kadumkomut">
		<span className="w3-right w3-hover-teal w3-dark w3-button w3-bar-item  w3-margin-top"><b>&#9432;</b></span>
	</NavLink>
      <img src={kadum} className="w3-bar-item w3-circle" alt="kadum komut" width="70px" height="70px"/>
      <div className="w3-bar-item" style={{marginTop:"4px"}}>
        <span className="w3-xlarge w3-text-dark"><b>KADUM KOMUT</b></span><br/>
        <span className="w3-text-grey">Developer</span>
      </div>
    </li>

    <li className="w3-bar w3-white w3-border-bottom w3-border-grey">
	<NavLink to="/mohitpal">
		<span className="w3-right w3-hover-teal w3-button w3-bar-item w3-dark w3-margin-top"><b>&#9432;</b></span>
	</NavLink>
      <img src={mohit} className="w3-bar-item w3-circle" alt="mohit pal" width="70px" height="70px"  />
      <div className="w3-bar-item" style={{marginTop:"4px"}}>
        <span className="w3-xlarge w3-text-dark"><b>MOHIT PAL</b></span><br/>
        <span className="w3-text-grey ">Developer</span>
      </div>
    </li>

    <li className="w3-bar w3-white">
	<NavLink to="/akshaymishra">
		<span className="w3-right w3-hover-teal w3-button w3-bar-item w3-dark w3-margin-top"><b>&#9432;</b></span>
	</NavLink>
      <img src={mishra} className="w3-bar-item w3-circle" alt="akshay mishra" width="70px" height="70px" />
      <div className="w3-bar-item" style={{marginTop:"4px"}}>
        <span className="w3-xlarge w3-text-dark"><b>AKSHAY MISHRA</b></span><br/>
        <span className="w3-text-grey">Developer</span>
      </div>
    </li>
  </ul>
		</div>
	);
}


export default Signup;
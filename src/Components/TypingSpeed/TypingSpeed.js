import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router';
import {quotesArray,random} from './Helper'
import './style/style.css'
import {FirebaseContext} from '../Firebase'
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import TypingSpeedBoard from './TypingSpeedBoard';
import Ripple from '../loader/Ripple'
import {navigateProfile} from '../Chat/ExtraFunction/ExtraFunction'

export default function TypingSpeed() {
    const query = useQuery();
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [score] = useDocumentData(firestore.collection('typingSpeed').doc(auth.currentUser.uid),{idField:"id"});

    const startTypingSpeed = () =>{
        history.push('/home/typingspeed?start=type');
    }


  
    return (
        <div className=" typingspeed-section w3-background">

            <h1 className="w3-padding-large w3-center" style={{background:"#222",color:"lightgrey"}}>
                <button onClick={()=>history.push('/home/typingspeed')} className="w3-round-large w3-button w3-light-grey w3-margin-right">
                    <i className="fa fa-home"></i>
                </button>
                Typing speed 
                <button onClick={()=>history.push('/home/typingspeed?start=ranking')} title="Check your rankings" 
                    className="w3-margin-left w3-button w3-round-large w3-green w3-hover-dark-green">
                   <i className="far fa-chart-bar"></i> Ranking
                </button>
            </h1>    
            {
                query.get('start')==='type'?
                <TypingSpeedBoard score={score} firebase={firebase} history={history} quote={random(quotesArray).quote}/>:
                query.get('start')==='ranking'?<Ranking firebase={firebase}/>:
                <div className="typingspeed-start w3-center  w3-card-4">
                    <h2 className="w3-text-green">LETS DO IT <i className="far fa-hand-peace"></i></h2>
                    <p className="w3-margin-top w3-text-green">Compete with all the typist around moko universe and enroll your name to the list of moko typister.</p>
                    <button onClick={startTypingSpeed} className="btn-circle  w3-large w3-margin-bottom  w3-margin-top">
                        Start
                    </button>

                    <div className="w3-border w3-border-red w3-text-red w3-round-small" style={{padding:"10px 20px",textAlign:"left"}}>
                        <ul>
                            <li>Just <b>start typing</b> and don't use <b>backspace</b> to correct your mistakes.</li> 
                            <li>Your mistakes will be marked in <b>Red color</b> and shown below the writing box. </li>
                            <li><b>Submit your score at the finish point</b> and it will reflect in your rankings </li>
                        </ul>                     
                        <p className="w3-center">Good luck!</p>
                    </div>
                </div>
            }
            {/* <Duration /> */}

        </div>
    )
}
const Ranking = ({firebase}) =>{
    const firestore  = firebase.firestore;
    const rankingRef = firestore.collection('typingSpeed').orderBy('wordPerMinute','desc');
    const [ranking,loading] = useCollectionData(rankingRef,{idField:"id"});
    return (
        <div className="typingspeed-ranking">
          <div className="typingspeed-ranking-container w3-margin-top">
            <ol className="w3-ul">
                {
                    loading?<Ripple />:
                        ranking.map(user=>(
                            <List wpm={user.wordPerMinute} uid={user.uid} accuracy={user.accuracy} key={user.id} photo={user.photo} uid={user.uid} name={user.name}/>
                        ))
                }
            </ol>
          </div>
        </div>
    );
}

const List = ({wpm,name,photo,accuracy,uid})=>{
    const history = useHistory();
    return(
        <li className="w3-hover-light-grey w3-white w3-border-bottom w3-padding-large">
            <img alt={name}  
                onClick={()=>navigateProfile(name,photo,uid,history)} 
                src={photo} 
                className="w3-circle w3-margin-right w3-hover-sepia" style={{width:"50px",height:"50px",cursor:'pointer'}}/>
            <span className="w3-margin-right">{name}</span>
            <span className="w3-margin-right">{wpm}wpm</span>
            <span>{accuracy}%accuracy</span>

        </li>
    );
}


function useQuery() {
    return new URLSearchParams(useLocation().search);
}
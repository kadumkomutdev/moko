import React, { useContext, useEffect } from 'react'
import './style.css';
import Ripple from '../loader/Ripple'
import { FirebaseContext } from '../Firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {  useHistory } from 'react-router';
import { checkAcceptTicTacToe, checkWinTicTacToe, updateUserTurn } from './FirebaseTicTacToe';

const TicTacToe = ({match}) => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const gameId = match.params.id;
    
    const query = firestore.collection('tictactoe').doc(gameId);
    const [game] = useDocumentData(query,{idField:"id"});
    
    useEffect(()=>{
        checkAcceptTicTacToe(game,history);
    },[game])

    return(
        <div className="main-tictactoe">
            <div className="w3-center w3-light-grey  w3-large w3-container w3-padding-medium  ">
               {game?<img src={game.host.photo} alt={game.host.name} className="w3-circle w3-margin-left" style={{width:"50px",height:"50px"}}/>:null} 
               &nbsp;<span> VS </span> &nbsp;
               {game?<img src={game.accepter.photo} alt={game.accepter.name} className="w3-circle w3-margin-right" style={{width:"50px",height:"50px"}}/>:null}
            </div>
            {   game?!game.isPlaying &&<div className="w3-light-grey w3-center waiting">
                <p>Waiting for other player</p>
                    <Ripple />
                </div>:null
            }   
            {
                game?game.isPlaying && 
                <Game game={game} history={history} auth={auth} firestore={firestore}/>:null
            }
        </div>
    );
}

const Game = ({game,auth,firestore,history}) => {

        const value = auth.currentUser.uid===game.host.uid?"X":"O";
        const PlayerTextTurn = auth.currentUser.uid===game.playerturn?"Your turn":"Other player turn";
        const PlayerTextTurnClass = auth.currentUser.uid===game.playerturn&&value==='X'?'w3-green':
            auth.currentUser.uid===game.playerturn&&value==='O'?'w3-red':
            auth.currentUser.uid!==game.playerturn&&value==='X'?'w3-red':
            auth.currentUser.uid!==game.playerturn&&value==='O'?'w3-green':'';

        useEffect(()=>{
            checkWinTicTacToe(game,firestore,history);
        },[game])

        const updateTurn = (val) =>{
            updateUserTurn(auth,game,firestore,val,value);
        }

        return(
            <div className=" w3-margin-top w3-padding-small">
                <div className="w3-card-4 tictactoe-board w3-darker w3-row" style={{maxWidth:"400px",width:"100%",margin:"auto",height:"60vh"}}>
                    {/* 1 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large" onClick={()=>updateTurn('zero')} style={{height:"33%"}}>
                        {game.button.zero.state?<span className={game.button.zero.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.zero.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 2 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large w3-border-left-tic w3-border-right-tic" onClick={()=>updateTurn('one')} style={{height:"33%"}}>
                        {game.button.one.state?<span className={game.button.one.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.one.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 3 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large" onClick={()=>updateTurn('two')} style={{height:"33%"}}>
                    {game.button.two.state?<span className={game.button.two.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.two.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 4 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large w3-border-top-tic w3-border-bottom-tic" onClick={()=>updateTurn('three')} style={{height:"33%"}}>
                    {game.button.three.state?<span className={game.button.three.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.three.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 5 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large w3-border-tic" onClick={()=>updateTurn('four')} style={{height:"33%"}}>
                    {game.button.four.state?<span className={game.button.four.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.four.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 6 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large w3-border-top-tic w3-border-bottom-tic" onClick={()=>updateTurn('five')} style={{height:"33%"}}>
                    {game.button.five.state?<span className={game.button.five.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.five.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 7 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large " onClick={()=>updateTurn('six')} style={{height:"33%"}}>
                    {game.button.six.state?<span className={game.button.six.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.six.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 8 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large w3-border-left-tic w3-border-right-tic" onClick={()=>updateTurn('seven')} style={{height:"33%"}}>
                    {game.button.seven.state?<span className={game.button.seven.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.seven.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    {/* 9 */}
                    <div className="w3-col w3-hover-dark l4 m4 s4 w3-padding-large" onClick={()=>updateTurn('eight')} style={{height:"33%"}}>
                    {game.button.eight.state?<span className={game.button.eight.value==='X'?`w3-text-light-green glowX`:`w3-text-red glowY`}>{game.button.eight.value}</span>:<p className="w3-text-white">{value}</p>}
                    </div>
                    
                </div>
                <div className={`${PlayerTextTurnClass} w3-card-4 w3-xlarge w3-center  w3-margin-top w3-padding-medium`}>
                    <p><b>{PlayerTextTurn}</b></p>
                </div>
            </div>
        );
}

export default TicTacToe;
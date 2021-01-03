import React, {  useContext } from 'react';
import {withRouter} from 'react-router-dom'
import ChatActive from '../../Context/ChatActive';
import MainContainer from './components/MainContainer';
import GameContainer from './Game/GameContainer';
import UserDirectoryContainer from './UserDirectory/UserDirectoryContainer';

const Right = ({match}) => {
        const {active}  = useContext(ChatActive);
        const id = match.params.id?match.params.id:0;
        
        return (
            <div className="middle">
                {
                    // if the url has already a user's id present and 
                    // the active window is the chat bar in the top left
                    id!=0&&active==1?
                        <MainContainer />:
                    //if the url is empty
                    //the active window is the chat bar, show the welcome sign in the right
                    id==0&&active==1?
                    <Welcome />:
                    //if the active window is user directory
                    active==2?
                    <UserDirectoryContainer />:
                    //if the active window is the game
                    active==3?
                    <GameContainer />:
                    null
                }

            </div>
        )
    }

const Welcome = () =>{
    const mokoStyle = {
        padding:"10px",
        borderRadius:"20px"
    }
    return (
        <div style={
            {display:"flex",justifyContent:"center",alignItems:"center",height:"100%",width:"100%"}}>
            <h1 style={{color:"#4a6e8b",fontSize:"60px"}} className="animate__animated animate__bounce w3-center">
                Welcome To <span style={mokoStyle} className="w3-dark">MOKO</span>
            </h1>
        </div>
    );
}


export default withRouter(Right);
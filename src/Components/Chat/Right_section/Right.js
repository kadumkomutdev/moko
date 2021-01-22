import React, {  useContext } from 'react';
import {withRouter} from 'react-router-dom'
import ChatActive from '../../Context/ChatActive';
import MainContainer from './components/MainContainer';
import GameContainer from './Game/GameContainer';
import UserDirectoryContainer from './UserDirectory/UserDirectoryContainer';
import './styles/style.css';

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
        padding:"10px 15px",
        borderRadius:"20px"
    }
    return (
        <div className="chat-welcome w3-light-grey">
            <h1 className="animate__animated animate__bounce w3-center">
                <span style={{alignSelf:'flex-start',marginTop:"10px"}}>Welcome To&nbsp;</span>
                <span className="chat-welcome-moko">
                    <span style={mokoStyle} className="w3-dark">MOKO</span>
                    <p className="chat-welcome-moko-secure w3-text-green" style={{marginTop:'5px'}}>ITS MORE SECURE NOW <i className="fas fa-lock"></i></p>
                </span>
            </h1>
        </div>
    );
}


export default withRouter(Right);
import React from 'react';
import './styles/topbar.css';
import {NavLink, useHistory} from 'react-router-dom';
import { myProfile } from '../Chat/ExtraFunction/ExtraFunction';
import GameActive from './GameActive';
import Notification from './Notification';
import Chat from './Chat';

const TopBar = (props) => {
        const history = useHistory();
        return(
                <div className="top-bar">
                    <div className="main-bar">          
                        <div className="logo-container">
                                <div className="tooltip">
                                    <NavLink to="/home/chat" style={{textDecoration:"none"}}><h1>MO<span>KO</span> </h1></NavLink>
                                <span className="tooltiptext w3-blue" style={{fontSize:"0.9rem"}}>Developed by Mohit and kadum</span>
                            </div>
                        </div>     
                        <header>
                            <nav>
                                <ul>
                                    <li>
                                        <GameActive />
                                    </li>
                                    <li> 
                                        <Chat />

                            
                                    </li>
                                    <li>
                                        <NavLink to="/home/broadcast" className="nav_link" activeStyle={{color:"#4a6e8b"}} >
                                            <div className="tooltip"><i className="fas fa-broadcast-tower"></i>
                                                <span className="tooltiptext">Broadcast</span>
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



export default TopBar;
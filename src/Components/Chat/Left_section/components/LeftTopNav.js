import React from 'react'
import { useHistory } from 'react-router';

const LeftTopNav =({active,setActive})=> {
    const history = useHistory();
    const toggle= (val)=>{
        history.push('/home/chat');
        setActive(val);
    }
    return (
            <div className="message-bar">
                    <nav>
                        <ul >
                            <li title="Chat" className={active===1?"active":null} onClick={()=>toggle(1)}><i className="fas fa-comments"></i></li>
                            <li title="Address book" className={active===2?"active":null} onClick={()=>toggle(2)}><i className="fas fa-address-card"></i></li>
                            <li title="Games" className={active===3?"active":null} onClick={()=>toggle(3)}><i className="fas fa-gamepad"></i></li>
                        </ul>
                    </nav>
                </div> 
    )
}

export default LeftTopNav;
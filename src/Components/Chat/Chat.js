import React from 'react';
import Left from './Left_section/Left';
import Right from './Right_section/Right';
import './styles/chat.css';

 const Chat = () => {
    return (
            <div className="main-layer">
                <div className="sections">
                        <Left/>
                        <Right/>
                </div>
            </div>
    )
    
}

export default Chat;
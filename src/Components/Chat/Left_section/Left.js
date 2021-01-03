import React, {useContext } from 'react'
import MessageList from './components/MessageList';
import ActiveList from './components/ActiveList';
import Game from './components/Game';
import LeftTopNav from './components/LeftTopNav';
import ChatActive from '../../Context/ChatActive';

 const Left = () => {
    const {active, setActive}  = useContext(ChatActive);
    return (
            <div className="left">
                {/* based on the left top nav, the bottom ones will change their display */}
                <LeftTopNav active={active} setActive={setActive}/>  
                {active===1?<MessageList/>:active===2?<ActiveList />:<Game />}        
                {/* closed */}
            </div>
    )
}

export default Left;
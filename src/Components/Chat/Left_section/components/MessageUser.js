import React, { useContext } from 'react'
import ChatActive from '../../../Context/ChatActive';

const MessageUser =({name,roomid,uid,active,message,photo}) => {
    const {setProfileData} = useContext(ChatActive);
    const ref = React.createRef();
    const handleClick = () => {
        setProfileData(
            {
                name:name,
                photo:photo,
                uid : uid,
                roomid:roomid
            }
        )
        ref.current.scrollIntoView({
            behavior:'smooth',
            block : 'center'
        })
    }
    

    return (
        <div className={active?"user activeUser w3-animate-bottom":"user w3-animate-bottom"} ref={ref} onClick={handleClick}>
            <div className="avatar">
                <img src={photo} alt="" width="50px" height="50px"/>
            </div>
            <div className="name-description">
                <h4>{name}</h4>
                <p style={active?{color:"white"}:{color:"grey"}}>{message}</p>
            </div>
        </div>
    )
}

export default MessageUser;
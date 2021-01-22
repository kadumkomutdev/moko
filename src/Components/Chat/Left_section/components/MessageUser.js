import React, { useContext } from 'react'
import ChatActive from '../../../Context/ChatActive';
import TimeAgo from '../../../TimeAgo';
import {capitalizeEachFirstLetter} from '../../ExtraFunction/FirebaseFunction';

const MessageUser =({name,roomid,uid,active,message,photo,seen,createdAt,count}) => {
    const {setProfileData} = useContext(ChatActive);
    const ref = React.createRef();
    const handleClick = () => {
        setProfileData(
            {
                name:name,
                photo:photo,
                uid : uid,
                roomid:roomid,
            }
        )
        ref.current.scrollIntoView({
            behavior:'smooth',
            block : 'center'
        })
    }
    

    return (
        <div className={active?"user activeUser w3-animate-bottom":"user w3-animate-bottom"} ref={ref} onClick={handleClick}>
            <div className="avatar-name-description">
                <div className="avatar">
                    <img src={photo} alt={name} width="50px" height="50px"/>
                </div>
                <div className="name-description">
                    <h4>{capitalizeEachFirstLetter(name)}</h4>
                    <p className="w3-small" style={active?{color:"white"}:seen?{color:"grey"}:{color:"#f44336"}}>
                        <b>{message} &#9679; {(createdAt&&<TimeAgo date={createdAt?createdAt.toMillis():null} />)
                        ||<span> &#183; &#183; &#183;</span>}</b> 
                    </p>
                </div>
            </div>
            <div className="chatCount">
                {active?null:seen?null:<p className="w3-red w3-circle w3-small">{count}</p>}
            </div>
        </div>
    )
}

export default MessageUser;
import React, { useContext} from 'react';
import {useHistory} from 'react-router'
import './style/style.css';
import { createRoom, joinRoom,useQuery} from './RoomFunction'
import {FirebaseContext} from '../Firebase'
import { useCollectionData} from 'react-firebase-hooks/firestore';
import Ripple from '../loader/Ripple';
import List from './List';
import ShowGroup from './ShowGroup';
import ShowHeader from './ShowHeader';

/* 
                Rooms
                  |
        ---------------------
       List                 ShowGroup/ShowHeader
                                |
                            ShowMessage

    <RoomFunction> contain all the function
*/

const Rooms = () => {
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    //querying the database for the user rooms
    const queryData = firestore.collection('universalRoom').doc(auth.currentUser.uid).collection('userRooms');
    const [uRoom,loading] = useCollectionData(queryData,{idField:"id"});

    const history = useHistory();

    let query = useQuery();

    const joinRoomT = () =>{
        joinRoom(firestore,auth,queryData,firebase,history);
    }

    const createRoomT = () =>{
        createRoom(firestore,queryData,firebase,auth,history);
    }

    return (
        <div className="room-section w3-back">
                
            <div className="display-rooms">

                <div className="room-left w3-darker">
                    <ul className="w3-ul w3-hoverable">
                        <li  className="w3-padding-medium  w3-margin-top w3-margin-bottom">
                            <button onClick={()=>history.push('/home/rooms')}
                                title="home" 
                                className="w3-button  w3-hover-blue w3-small w3-dark w3-round-large w3-margin-right">
                                <i className="fa fa-home "></i>
                            </button>
                            <button onClick={joinRoomT}
                                title="Join room" 
                                className="w3-button w3-hover-dark w3-blue w3-round-large w3-small">
                                    <i className="fas fa-bullseye" ></i> Join
                            </button>
                           
                            <button onClick={createRoomT} 
                                title="Create room" 
                                className="w3-margin-left w3-button w3-hover-dark w3-blue w3-round-large w3-small">
                                    <i className="fa fa-edit" ></i> Create
                            </button>
                        </li>
                        {
                            loading?<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Ripple /></div>:uRoom&&uRoom.map(room=>(
                                <List firestore={firestore} firebase={firebase} auth={auth} name={room.roomName} creator={room.roomCreator} id={room.id} key={room.id} photo={room.roomPhoto}/>
                            ))
                        }
                    </ul>
                </div>
                <div className="room-right">
                    {query.get('search')?
                        <ShowGroup firebase={firebase} id={query.get('id')} name={query.get('search')}/>:
                        <ShowHeader />
                    }
                </div>

            </div>

        </div>
        )
}

export default Rooms;

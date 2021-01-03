import React from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import {capitalize,useQuery} from './RoomFunction'
import {nanoid} from 'nanoid'


const List = ({name,photo,id,auth,firestore,firebase}) =>{
    const history = useHistory();
    let query = useQuery();
    const activeClass = query.get('search')===name?'w3-dark':'w3-hover-text-blue';
    const set = () =>{
        history.push(`/home/rooms?search=${name}&id=${id}`)
    }
    const option = () =>{
        Swal.fire({
            title:"Room : "+capitalize(name),
            icon:"question",
            showConfirmButton:true,
            showCancelButton:true,
            cancelButtonText:"Cancel",
            confirmButtonText:"Leave Room"
        }).then(result=>{
            if(result.isConfirmed){
                leaveRoom();
            }
        })
    }
    const leaveRoom = () =>{
        Swal.fire({
            title:"Do you confirm to leave?",
            icon:"question",
            confirmButtonText:"Yes, Leave",
            cancelButtonText:"Cancel",
            showCancelButton:true,
            preConfirm:async()=>{
                var batch = await firestore.batch();
                await batch.delete(firestore.collection('universalRoom').doc(auth.currentUser.uid).collection('userRooms').doc(id));
                await batch.set(firestore.collection('messages').doc(id).collection('userMessages').doc(nanoid()),{
                    message:"Sorry guys, Iam leaving the room babye",
                    from :auth.currentUser.uid,
                    photo : auth.currentUser.photoURL,
                    name:auth.currentUser.displayName,
                    createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()                     
                })
                await batch.update(firestore.collection('universalRoomList').doc(id),{'roomUsers':firebase.firebase.firestore.FieldValue.increment(-1)});
                await batch.commit().then(async()=>{
                    await firestore.collection('universalRoomList').doc(id).get().then(async(snap)=>{
                        if(snap.data().roomUsers===0){
                            await firestore.collection('universalRoomList').doc(id).delete()
                            .catch(err=>{
                                alert(err);
                            });
                        }
                    }).catch(err=>{
                        alert(err);
                    })
                }).catch(err=>{
                    alert(err);
                })
            },
            showLoaderOnConfirm:true
        }).then(res=>{
            if(res.value){
                history.push('/home/rooms');
                Swal.fire('','You left the room!','success');
            }
            
        })
    }
    return (
        <li title={name} onClick={set} className={`${activeClass} w3-padding-medium`} style={{marginBottom:"8px"}}> 
            <img alt={name} src={photo} style={{marginRight:"5px"}} className="w3-circle"/> {name}
            <button onClick={option} className="room-hover-show w3-right w3-button w3-small w3-hover-blue w3-round-large w3-blue" style={{marginTop:"3px"}}>
                <i   className={`fas fa-ellipsis-v w3-ripple w3-right`}></i> 
            </button>
        </li>
    );
}

export default List;
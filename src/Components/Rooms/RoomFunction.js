import Swal from 'sweetalert2';
import {nanoid} from 'nanoid';
import {useLocation} from 'react-router'

//capitalize the first letter
export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

//use query
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

//joined room
export const joinRoom = async(firestore,auth,queryData,firebase,history) =>{
    var id;
        Swal.fire({
            title:"Join Room",
            input:"text",
            inputPlaceholder:"Type room name",
            showConfirmButton:true,
            inputValidator:(value)=>{
                if(!value){
                    return 'Enter some input'
                }
            },
            preConfirm:async(value)=>{
                await firestore.collection('universalRoomList').where('roomName','==',capitalize(value)).limit(1).get()
                .then(async(res)=>{
                    const myData = res;
                    if(res.empty){
                        Swal.showValidationMessage('Room name cannot be found');
                        return false;
                    }else{
                        await firestore.collection('universalRoom').doc(auth.currentUser.uid).collection('userRooms').where('roomName','==',capitalize(value))
                        .limit(1).get()
                        .then(async(snap)=>{ 
                            if(!snap.empty){
                                Swal.showValidationMessage('You have already joined the room');
                                return false;
                            }else{
                                var batch = firestore.batch();
                                await batch.set(queryData.doc(myData.docs[0].id),{
                                    roomName : capitalize(value),
                                    roomPhoto : myData.docs[0].data().roomPhoto,
                                    roomCreator:false,
                                    roomDescription:myData.docs[0].data().roomDescription,
                                    createdAt : myData.docs[0].data().createdAt
                                });
                                const increment = await firebase.firebase.firestore.FieldValue.increment(1);
                                await batch.update(firestore.collection('universalRoomList').doc(myData.docs[0].id),{
                                    "roomUsers":increment
                                });
                                await batch.set(firestore.collection('messages').doc(myData.docs[0].id).collection('userMessages').doc(nanoid()),{
                                    message:"hello guys, I joined the room",
                                    from :auth.currentUser.uid,
                                    photo : auth.currentUser.photoURL,
                                    name:auth.currentUser.displayName,
                                    createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()                                    
                                });
                                await batch.commit().then(()=>{
                                    id=myData.docs[0].id;
                                    return capitalize(value);
                                }).catch(err=>{
                                    alert(err);
                                })
                            }
                        }).catch(err=>{
                            alert(err);
                        })
                    }
                }).catch(err=>{
                    alert(err);
                });
            },
            showLoaderOnConfirm:true,
            denyButtonText:"Cancel",
            showDenyButton:true,
            confirmButtonText:"JOIN"
        }).then(result=>{
            if(result.value){
                history.push(`/home/rooms?search=${result.value}&id=${id}`);
                Swal.fire('','Room joined','success')
            }
        }).catch(err=>{
            alert(err);
        })
}

//create room
export const createRoom = async(firestore,queryData,firebase,auth,history)=>{
    const id = nanoid();
        Swal.fire({
            title:"Create Room",
            input:"text",
            inputPlaceholder:"Type room name",
            showConfirmButton:true,
            showDenyButton:true,
            denyButtonText:"Cancel",
            confirmButtonText:"Create",
            inputValidator:(value)=>{
                if(!value){
                    return 'Room name cannot be empty'
                }
                if(value==='name'){
                    return 'Name already exist'
                }
                if(value.length>20){
                    return 'Length cannot be greater than 20 letters'
                }
            },
            preConfirm:async(value)=>{
                await firestore.collection('universalRoomList').where('roomName','==',capitalize(value)).limit(1).get()
                .then(async (res)=>{
                    if(!res.empty&&res.docs[0].data().roomName===capitalize(value)){
                        Swal.showValidationMessage('Room is already created')
                        return false;
                    }else{
                        var batch = await firestore.batch();
                        await batch.set(queryData.doc(id),{
                            roomName : capitalize(value),
                            roomPhoto : "https://fakeimg.pl/35x35/",
                            roomCreator:true,
                            roomDescription:"",
                            createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()
                        })
                        await batch.set(firestore.collection('universalRoomList').doc(id),{
                            roomName : capitalize(value),
                            roomPhoto : "https://fakeimg.pl/35x35/",
                            roomCreator : auth.currentUser.uid,
                            roomDescription : "",
                            roomUsers:1,
                            createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()
                        })
                        await batch.commit().then(()=>{
                            return value
                        }).catch(error=>{
                            alert(error);
                        })
                    }
                }); 
            },
            showLoaderOnConfirm:true
        }).then(result=>{
            if(result.value){
                history.push(`/home/rooms?search=${capitalize(result.value)}&id=${id}`)
                Swal.fire('','Room Created','success');
            }
        })
}

//send message
export const sendMessage = async(form,setFormDisable,firebase,id,setForm,) =>{
    if(form===""){
        return;
    }
    setFormDisable(true);
    await firebase.firestore.collection('messages').doc(id).collection('userMessages').add({
        message:form,
        from :firebase.auth.currentUser.uid,
        photo : firebase.auth.currentUser.photoURL,
        name:firebase.auth.currentUser.displayName,
        createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
        setForm("");
        setFormDisable(false);
    }).catch(err=>{
        setForm("");
        setFormDisable(false);
    });    
}
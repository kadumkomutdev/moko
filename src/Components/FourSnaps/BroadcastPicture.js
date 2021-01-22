import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import { FirebaseContext } from '../Firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Ripple from '../loader/Ripple'


const BroadcastPicture = () => {
    
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth =firebase.auth;

    const ref = firestore.collection('broadcast').orderBy('createdAt','desc');
    const [posts,loading] = useCollectionData(ref,{idField:"id"});

    return (
        <div className="broadCastImage">
        <ul>
            {
                loading?<Ripple />:posts.map(post=>(
                    <List firestore={firestore} key={post.id} id={post.id} auth={auth} name={post.username} uid={post.uid} url={post.url} text={post.text}/>
                ))
            }
            <li></li>
        </ul>
        </div>
    )
}

const List = ({id,url,text,name,uid,auth,firestore}) =>{
    const showImage = () => {
        Swal.fire({
            title:text,
            imageUrl:url,
            text:name,
            confirmButtonText:"Delete",
            showCancelButton:true,
            showConfirmButton:auth.currentUser.uid===uid?true:false,
            confirmButtonColor:"red",
            cancelButtonText:"OK",
            focusCancel:true,
            reverseButtons:true,
            preConfirm:async()=>{
                return await firestore.collection('broadcast').doc(id).delete();
            },
            showLoaderOnConfirm:true
        }).then(res=>{
            if(res.value){
                Swal.fire('Broadcast Deleted','','success');
            }
        })
    }
    return (
        <li onClick={showImage} className="">
            <img src={url} className="  " alt="hello"/>
        </li>
    );
}

export default BroadcastPicture;
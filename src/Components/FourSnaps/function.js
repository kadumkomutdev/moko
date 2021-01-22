import {useLocation} from 'react-router';
import Swal from 'sweetalert2';
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const broadcastText = (firestore,auth,firebase) =>{
    Swal.fire({
        title:"Broadcast Text",
        input:"text",
        inputPlaceholder:'type something...',
        showLoaderOnConfirm:true,
        showCancelButton:true,
        inputValidator:(value)=>{
            if(!value) return("Enter something");
        },
        preConfirm:async(val)=>{
            return await firestore.collection('broadcastText').add({
                text:val,
                uid:auth.currentUser.uid,
                username:auth.currentUser.displayName,
                photo:auth.currentUser.photoURL,
                createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()
            }).then(res=>{
                return 'somethings';
            })
        }
    }).then(res=>{
        if(res.value){
            Swal.fire('Broadcasted','','success');
        }
    })
}

export const uploadFirebase = async(imageURL,inputText,auth,storage,imageAsFile,setProg,setLoaderVisible,firestore,firebase,history) =>{
    if(!imageURL||inputText===""){
        Swal.fire("Input Something",'','warning');
        return;
    }
    const name = auth.currentUser.uid+Date.now();

    await storage.ref(`broadcast/${name}`).put(imageAsFile).on(
        "state_changed",
        snapshot=>{
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProg(progress+"%");
            setLoaderVisible('visible');
        },
        error=>{
            console.log(error);
        },
        ()=>{
            return storage
            .ref('broadcast')
            .child(name)
            .getDownloadURL()
            .then(async(url)=>{
                 return await firestore.collection('broadcast').add({
                    url:url,
                    text:inputText,
                    uid:auth.currentUser.uid,
                    username:auth.currentUser.displayName,
                    photo:auth.currentUser.photoURL,
                    createdAt : firebase.firebase.firestore.FieldValue.serverTimestamp()
                }).then(res=>{
                    setProg("completed, You will be redirected in 2s");
                    setTimeout(()=>{
                        history.push('/home/broadcast?tab=broadImage')
                    },2000)
                }).catch(err=>{
                    alert(err);
                })
            }).catch(err=>{
                alert(err);
            })
        }
    )

}

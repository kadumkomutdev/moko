import React, { useContext, useState,useRef } from 'react'
import { withRouter } from 'react-router';
import ChatActive from '../../../Context/ChatActive'
import { FirebaseContext } from '../../../Firebase';
import { sentMessage, useQuery } from '../../ExtraFunction/FirebaseFunction';

 function InputContainer({match}) {
    const inputRef = useRef();
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const {profileData} = useContext(ChatActive);
    const [ formValue, setFormValue] = useState("");
    const [inputFocus,setInputFocus] = useState(true);
    const [formDisable, setFormDisable] = useState(false);
    const id = match.params.id;
    const query = useQuery();    
    const sendMessageT = (e) =>{
        e.preventDefault();
        var userA = firebase.auth.currentUser.displayName.split(' ')[0];
        var userB = query.get('name').split(' ')[0];
        var key = Array.from(new Set(userA+userB)).sort().join('');
        sentMessage(id,formValue,setFormDisable,firestore,profileData,firebase,setFormValue,inputRef,setInputFocus,key);
    }

    return (
        <div>
            <form className="input-container" onSubmit={sendMessageT}>
                <input 
                type="text" 
                value={formValue} 
                onChange={(e)=>setFormValue(e.target.value)} 
                placeholder="Type your message" 
                className="input" 
                disabled={formDisable}
                autoFocus={inputFocus}
                ref={inputRef}
                />
                
                <button><i className="fas fa-play"></i></button>
            </form>
        </div>
    )
}
export default withRouter(InputContainer);

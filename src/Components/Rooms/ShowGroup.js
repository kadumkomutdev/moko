import React,{useRef,useState,useEffect} from 'react';
import { useCollectionData} from 'react-firebase-hooks/firestore';
import ShowMessage from './ShowMessage'
import Ripple from '../loader/Ripple';
import { sendMessage } from './RoomFunction';


const ShowGroup = ({name,firebase,id}) =>{
    const down = useRef();
    const [form,setForm] = useState("");
    const [formDisable,setFormDisable] = useState(false);

    const query = firebase.firestore.collection('messages').doc(id).collection('userMessages').orderBy('createdAt');
    const [message,loading] = useCollectionData(query,{idField:"id"});

    //send message
    const sendMessageT = (e)=>{
        e.preventDefault();
        sendMessage(form,setFormDisable,firebase,id,setForm);
    }

    useEffect(()=>{
        down.current.scrollIntoView({behavior : 'smooth'});        
    },[message,name])

    return(
        <div className="right-content w3-background">
            <h2  className="right-top w3-padding-large w3-center w3-light-grey w3-text-grey" style={{position:"sticky",top:0}}>
                <img alt={name} src="https://fakeimg.pl/50x50/4a6e8b/" className="w3-circle"/> {name}
            </h2>
            <div className="right-middle" style={{overflowY:"auto"}}>
                {
                    loading?<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50vh"}}><Ripple /></div>:message?message.map(msg=>(
                            <ShowMessage name={msg.name} key={msg.id} msg={msg.message} from={msg.from} photo={msg.photo}/>
                        )):null
                }
                <div ref={down} ></div>
            </div>
            <div className="showGroup-input w3-background">
                <form onSubmit={sendMessageT}>
                <input 
                    type="text" 
                    placeholder="type your message" 
                    className="w3-input w3-border w3-round"
                    value={form}
                    onChange={(e)=>setForm(e.target.value)}
                    disabled={formDisable}
                />
                <button title="option" className="w3-button w3-light-grey w3-border-right w3-round "><i className="fas fa-chevron-circle-up"></i></button>
                <button title="Send message" className="w3-button w3-dark w3-border-right w3-round"><i className="fas fa-check-circle"></i></button>
                </form>
            </div>
        </div>
    );
}

export default ShowGroup;
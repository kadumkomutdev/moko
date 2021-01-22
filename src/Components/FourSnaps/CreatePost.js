import React,{useRef,useContext,useState} from 'react'
import {FirebaseContext} from '../Firebase';
import Ellipse from '../loader/Ellipse'
import {useHistory} from 'react-router';
import {broadcastText,uploadFirebase} from './function';

const CreatePost = () =>{
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const storage = firebase.storage;
    const history = useHistory();

    const triggerInput = useRef();
    const [imageAsFile,setImageAsFile] = useState();
    const [imageURL,setImageURL] = useState();
    const [inputText, setInputText] = useState("");

    const [prog,setProg] = useState("Broadcast");
    const [buttonDisable,setButtonDisable] = useState(false);
    const [loaderVisible,setLoaderVisible] = useState('hidden');

    const trigger = () =>{
            triggerInput.current.click();
    }

    const handleChange = (e) =>{
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
        setImageURL( URL.createObjectURL(e.target.files[0]))

    }
    const uploadFirebaseT = async() =>{
        uploadFirebase(imageURL,inputText,auth,storage,imageAsFile,setProg,setLoaderVisible,firestore,firebase,history);
    }

    const broadcastTextT = () =>{
        broadcastText(firestore,auth,firebase);
    }
    return (
        <form className="w3-form w3-border w3-border-light-grey w3-center w3-padding-large"
        style={{position:'relative'}}
        onSubmit={(e)=>e.preventDefault()}>

            <div class="w3-bar w3-border w3-light-grey w3-padding-large">
                <button class="w3-bar-item w3-button w3-border w3-white" onClick={broadcastTextT}><i className="fas fa-text-height"> </i> Broadcast Text Only</button>
                <button class="w3-bar-item w3-button w3-border w3-dark"><i className="fas fa-images"></i> Broadcast Image</button>
            </div>

            <div style={{visibility:"visible"}}>    
                <div 
                    style={{display:'flex',color:'red',alignItems:'center',
                    justifyContent:'center',position:'absolute',fontWeight:"bold",
                    height:'90%',left:0,top:0,width:'100%',visibility:loaderVisible,
                    background:"lightgrey",zIndex:9999,opacity:0.8}}>
                    Uploading...<br/><br/>{prog} <Ellipse />
                </div>
                <input type="file" style={{visibility:'hidden'}} onChange={handleChange} ref={triggerInput} className="w3-input" required/>
                <button className={`w3-button ${imageURL?"w3-dark-red":"w3-red"} w3-hover-dark-red w3-round-large`} onClick={trigger}>
                    Select a file <i className="far fa-file-image"></i>
                </button>
                {imageURL&&<div className="w3-padding-medium w3-round-large w3-margin-top  animate__animated animate__bounce">
                    <img src={imageURL} alt="kadum" className=" w3-animate-zoom" style={{maxWidth:"300px",height:'auto'}}/>
                    <p>Preview</p>
                </div>}
                <input type="text" value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder="write somethings" className="w3-margin-top w3-input w3-border w3-round-large"/>
                <button 
                    onClick={uploadFirebaseT} 
                    className="w3-button w3-hover-darker w3-round-large w3-margin-top w3-dark"
                    disabled={buttonDisable}>
                    {prog} <i class="fas fa-upload"></i> 
                </button>
            </div>
        </form>
    );
}

export default CreatePost;

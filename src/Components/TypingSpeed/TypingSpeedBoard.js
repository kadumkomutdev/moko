import React,{useState,useRef,useEffect} from 'react';
import Swal from 'sweetalert2';
import {allowedKeys} from './Helper'

let interval = null;
const TypingSpeedBoard = ({quote,history,firebase,score}) =>{

    const firestore = firebase.firestore;
    const auth = firebase.auth;
    

    const outRef = useRef();
    const inRef = useRef();
    const [ duration, setDuration ] = useState(60);
    const [progress, setProgress] = useState(0);

    const [hide,setHide] = useState("block");
    
    const [index,setIndex] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [ correctIndex, setCorrectIndex ] = useState(0)
    const [ errorIndex, setErrorIndex ] = useState(0)
    
	const [ ended, setEnded ] = useState(false)

    const [ cpm, setCpm ] = useState(0)
	const [ wpm, setWpm ] = useState(0)
    const [ accuracy, setAccuracy ] = useState(0)
    

    const [ text, setText ] = useState()
	const [ input, setInput ] = useState()
    
    //starting the timer
    useEffect(()=>{
        handleStart();
        return ()=>{
            clearInterval(interval);
        }
    },[]);

    const setTimer = () => {
		const now = Date.now()
		const seconds = now + duration * 1000
		interval = setInterval(() => {
			const secondLeft = Math.round((seconds - Date.now()) / 1000)
            setDuration(secondLeft)
            const progressLeft = (60-secondLeft)*1.67+progress;
            setProgress(progressLeft)
			if (secondLeft <= 0) {
				handleEnd()
			}
		}, 1000);
    }
    
    const handleEnd = () => {
        setEnded(true);
        clearInterval(interval);
        setHide('none');
    }

    const submitData = async() =>{
        Swal.fire({
             title:"Do you want to submit this data",
             text:"wpm "+wpm+" cpm "+cpm,
             icon:"info",
             showConfirmButton:true,
             showCancelButton:true,
             confirmButtonText:"Submit",
             cancelButtonText:"Cancel",
             preConfirm:async()=>{
                return await firestore.collection('typingSpeed').doc(auth.currentUser.uid).set({
                    wordPerMinute:wpm,
                    accuracy:accuracy,
                    characterPerMinute:cpm,
                    error:errorIndex,
                    photo:auth.currentUser.photoURL,
                    name:auth.currentUser.displayName,
                    uid:auth.currentUser.uid
                }).catch(err=>{
                    Swal.showValidationMessage('Submit error, try again');
                    return false;
                });
             },
             showLoaderOnConfirm:true
        }).then(res=>{
            if(res.value){
                Swal.fire({
                    title:"Submitted",
                    icon:"success",
                    confirmButtonText:"Go back to home"
                }).then(res=>{
                    if(res.isConfirmed){
                        history.push('/home/typingspeed');
                    }
                })
            }
        })
        
    }
    
    const handleStart = () => {
        setText(quote);
        setInput(quote);
        outRef.current.focus();
        setTimer();
    }

    const handleKey = (e) =>{
        e.preventDefault();
        if(ended){
            return;
        }
        const {key} =  e;
        const quoteText = text;
        if(key===quoteText.charAt(index)){
            setIndex(index+1);
            setTotalCount(totalCount+1);
            const currenChar = quoteText.substring(index + 1, index + quoteText.length)
            setInput(currenChar);
            setCorrectIndex(correctIndex + 1)
            inRef.current.innerHTML+=key
        }else{
            if(allowedKeys.includes(key)){
                setErrorIndex(errorIndex + 1);
                setTotalCount(totalCount+1);
                inRef.current.innerHTML+=`<span class="w3-text-red">${key}</span>`
            }
        }

		const _accuracy = Math.floor((correctIndex / totalCount) * 100)
        const _wpm = Math.round((totalCount / 5)-errorIndex);
        
        if (index > 5) {
			setAccuracy(_accuracy)
			setCpm(correctIndex)
			setWpm(_wpm)
		}

		if (index + 1 === quoteText.length || errorIndex > 50) {
			handleEnd()
		}
        
    }

    return (
        <div className="typingspeed-board-main w3-center">
            <div className="w3-border typingGrid-0 w3-grey">
                <div className="w3-red" style={{height:"10px",width:`${progress}%`}}></div>
            </div>
            <div className="item typingGrid-1">WPM<p>{wpm}</p></div>
            <div className="item typingGrid-2">CPM<p>{cpm}</p></div>
            <div className="item typingGrid-3">BestScore<p>{score&&score.wordPerMinute}</p></div>
            <div className="item typingGrid-4">Timer<p>{duration}</p></div>
            <div className="item typingGrid-5">Error<p>{errorIndex}</p></div>
            <div className="item typingGrid-6">Accuracy<p>{accuracy}%</p></div>
                
            <div ref={outRef} tabIndex="0" style={{display:hide}}  onKeyDown={handleKey} className="typingGrid-7 typingspeed-text">
                {input}
            </div>
                
            <div ref={inRef}  className="typingspeed-form w3-black typingGrid-8" style={{wordBreak:"break-word",textAlign:"left"}}>
                - 
            </div>

            {ended&&<p className="w3-padding-medium over typingGrid-7 w3-red w3-card-2 w3-round-large animate__animated animate__bounce w3-hover-dark-red" 
                onClick={submitData} title="Submit your score for the final ranking"
                style={{width:"50%",margin:"auto",cursor:"pointer"}}>Finish - Submit your score</p>}

        </div>
    );
}

export default TypingSpeedBoard;
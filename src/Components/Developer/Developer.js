import React, { useEffect, useState } from 'react'
import './styles/Developer.css';
import kadum from '../Signup/kadum.jpg';
import mishra from '../Signup/mishra.jpg';
import mohit from '../Signup/mohit.jpg';
//icon images
import facebook from './image/facebook.png';
import twitter from './image/twitter.png';
import github from './image/github.png';
import google from './image/search.png'


export default function Developer({history,location}) {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [ intro, setIntro] = useState("");
    const [fb, setFb] = useState(null);
    const [tw, setTw] = useState(null);
    const [git,setGit] = useState(null);
    const [go,setGo] = useState(null);

    var kadumIntro = "is one of the original developers that worked on the moko, designing its interface and functionality.\n"+
    "He has an eye for analysing things and it helped moko to be great at providing better user experience."+
    "Things he likes to do in his spare time is to play chess, play guitar while singing, read books, watch movies and sleep a lot.";
    var mohitIntro = "is one of the original developers that worked on the moko, designing its interface and functionality."+
    "His eye for seeing the posibilites a product can have shaped the features of moko to be unique and divergent."+
    "Some of the things he does in his spare time is to listen to music, reading books and learning things.";

    var akshayIntro = "joined late on the moko developers team but played a vital role in the progress of the new functionalities"+
                        " that were added after moko was launched."+
                        "His work ethics and forseeing the future of moko helped it provide better user experience."+
                        "He does like reading things and learning new stuffs.";

    useEffect(()=>{
        const path = location.pathname.slice(1,location.pathname.length);
        switch(path){
            case "kadumkomut":
                setName("KADUM KOMUT");
                setImg(kadum);
                setFb("https://www.facebook.com/kadum.komut.9");
                setGit("https://github.com/kadmon47");
                setIntro(kadumIntro);
                break;
            case "mohitpal":
                setName("MOHIT PAL");
                setImg(mohit);
                setFb("https://www.facebook.com/sahil.pal.1466");
                setIntro(mohitIntro);
                break;
            case "akshaymishra":
                setName("AKSHAY MISHRA");
                setImg(mishra);
                setFb("https://www.facebook.com/akshay.mishra.7146");
                setIntro(akshayIntro);
                break;
            default:
        }
    },[])

    return (
    <div>
        <div className=" w3-center developer-name-big">
            <h1 className="w3-dark">
                <i className="fas fa-arrow-alt-circle-left icon w3-margin-right" onClick={()=>history.goBack()}></i> 
                 {name}<span className=" w3-large w3-text-orange">Developer</span>
            </h1>
        </div>

        <div className="developer-main w3-animate-zoom w3-white w3-card-4" >
            <div className="w3-jumbo w3-center developer-image">
                <div style={{width:"400px"}}>
                    <img  src={img} alt={name} className="w3-image"  style={{width:"400px",height:"400px"}}/>
                    <div className="social-icons w3-light-grey">
                        <a href={go}><img alt="google" src={google}/></a>
                        <a href={fb}><img alt="facebook" src={facebook}/></a>
                        <a href={tw}><img alt="twitter" src={twitter}/></a>
                        <a href={git}><img alt="github" src={github}/></a>
                    </div>
                </div>
            </div>
            <div className="developer-intro w3-text-grey">
                <p><b className="w3-text-orange">{name} </b> {intro}</p>
            </div>
        </div>
        
    </div>
        
    )
}

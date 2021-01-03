import React,{ useEffect,useContext} from 'react'
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { useHistory } from 'react-router';
import ChatActive from '../../../Context/ChatActive';
import { navigateProfile } from '../../ExtraFunction/ExtraFunction';
 

const MainProfileBar = () =>{
          
  const history = useHistory();
    const {profileData} = useContext(ChatActive);

    // const firebase = useContext(FirebaseContext);
    // const firestore = firebase.firestore;
    // const auth = firebase.auth;

    const phoneCall = () =>{
      NotificationManager.success('Coming soon','',3000);
    }

    const videoCall = () =>{
      NotificationManager.success('Coming soon','',3000);
    }

    const deleteMessage = async() =>{
          // if(profileData.roomid!==null){
          //   const query = firestore.collection('messages').doc(profileData.roomid);
          // }
          NotificationManager.success('Not Yet Implemented','',3000);
    }
    
     //3 dot drop down function
     const myFunction =() => {
        document.getElementById("myDropdown").classList.toggle("show");
      }        
      useEffect(()=>{
         // Close the dropdown if the user clicks outside of it
        window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        }
      },[])
      
      const enlarge = () =>{
        navigateProfile(profileData.name,profileData.photo,profileData.uid,history);
    }
         
        return (
            <div className="main-profile-bar">
               <div className="profile-bar">
                  <div className="profile">
                      {/* <div className="profile-photo"><img src={loading?<></>:myData[0].photo!=='undefined'?myData[0].photo:null} alt=""/></div> */}
                        <div className="profile-photo" onClick={enlarge}><img src={profileData.photo} alt={profileData.name}/></div>

                              <p>{profileData.name}</p>
                            </div>
                            <nav>
                                <ul>
                                    <li><i onClick={videoCall} className="fas fa-video video-icon"></i></li>
                                    <li onClick={phoneCall}><i  className="fas fa-phone phone-icon "></i></li>
                                    <li> 
                                        <div className="dropdown" >
                                            <i className="fas fa-ellipsis-v dropbtn" onClick={myFunction}></i>
                                            <div id="myDropdown" className="dropdown-content w3-animate-zoom" >
                                              <a href="#home">Block</a>
                                              <a href="#about">Mute Notification</a>
                                              <a href="#about">Contact info</a>
                                              <a href="#contact">Clear Message</a>
                                              <a href="#delete" onClick={deleteMessage}>Delete message</a>
                                            </div>
                                          </div>
                                    </li> 
                                </ul>
                            </nav>
                        </div>
              </div>
        )
    }
    

    export default MainProfileBar;
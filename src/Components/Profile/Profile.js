import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../Firebase'
import './styles/index.css'
import Swal from 'sweetalert2'
import profile from './profile.jpg'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Modal from './Modal';
import Linkify from 'react-linkify';

export default function Profile({match}) {
    const firebase = useContext(FirebaseContext);
    const firestore = firebase.firestore;
    const auth  =firebase.auth;

    const [isOpenModal,setIsOpenModal] = useState(false);


    const other = match.params.id?match.params.id:auth.currentUser.uid;

    const query = firestore.collection('users').doc(other);
    const [user] = useDocumentData(query,{idField:"id"});

    const updateStatus = () =>{
        Swal.fire({
            title:"Status",
            input:"text",
            inputPlaceholder:"type your bio",
            inputValue:user.bio,
            showLoaderOnConfirm:true,
            inputValidator:value=>{
                if(!value){
                   return "You need to write something!"
                }
                if(value.length>60){
                    return "Length must be less than 60 alphabets"
                }
            },
            preConfirm:async(value)=>{
                return await firestore.collection('users').doc(other).update({
                    bio:value
                }).then(res=>{
                    return "done"
                }).catch(err=>{
                    Swal.showValidationMessage('Some error occured');
                })
            },
            confirmButtonText:"Update Bio <i class='fas fa-edit'></i>"
        }).then(result=>{
            if(result.value==="done"){
                Swal.fire('','Status Updated','success');
            }
        })
    }

    const updateRelationship = () =>{
        Swal.fire({
            title:"Gender",
            input:"select",
            inputOptions:{
                '':'Choose Relationship status',
                'Single':'Single',
                'In Relationship':'In Relationship',
                'Married':'Married',
                'Widow':'Widow'
            },
            inputValue:user.relationship,
            showLoaderOnConfirm:true,
            inputValidator:value=>{
                if(!value){
                   return "You need to select something!"
                }
                if(value===user.relationship){
                    return "Its same, duh!"
                }
            },
            preConfirm:async(value)=>{
                return await firestore.collection('users').doc(other).update({
                    relationship:value
                }).then(res=>{
                    return "done"
                }).catch(err=>{
                    Swal.showValidationMessage('Some error occured');
                })
            },
            confirmButtonText:"Update Gender <i class='fas fa-edit'></i>"
        }).then(result=>{
            if(result.value==="done"){
                Swal.fire('','Gender Updated','success');
            }
        })
    }

    const updateGender = () =>{
        Swal.fire({
            title:"Gender",
            input:"radio",
            inputOptions:{
                'Male':'Male',
                'Female':'Female',
                'Transgender':'Transgender'
            },
            inputValue:user.gender,
            showLoaderOnConfirm:true,
            inputValidator:value=>{
                if(!value){
                   return "You need to select something!"
                }
                if(value===user.gender) return "Its same, duh!"
            },
            preConfirm:async(value)=>{
                return await firestore.collection('users').doc(other).update({
                    gender:value
                }).then(res=>{
                    return "done"
                }).catch(err=>{
                    Swal.showValidationMessage('Some error occured');
                })
            },
            confirmButtonText:"Update Gender <i class='fas fa-edit'></i>"
        }).then(result=>{
            if(result.value==="done"){
                Swal.fire('','Gender Updated','success');
            }
        })
    }

    const updateBirthday = ()=>{
        Swal.mixin({
            input: 'select',
            confirmButtonText: 'Next &rarr;',
            allowOutsideClick:false,
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
          }).queue([
            {
              title: 'Select Year',
              inputOptions : {
                  '2010':'2010',
                  '2009':'2009',
                  '2008':'2008',
                  '2007':'2007',
                  '2006':'2006',
                  '2005':'2005',
                  '2004':'2004',
                  '2003':'2003',
                  '2002':'2002',
                  '2001':'2001',
                  '2000':'2000',
                  '1999':'1999',
                  '1998':'1998',
                  '1997':'1997',
                  '1996':'1996',
                  '1995':'1995',
                  '1994':'1994',
                  '1993':'1993',
                  '1992':'1992',
                  '1991':'1991',
                  '1990':'1990',
                  '1989':'1988',
                  '1987':'1987',
                  '1986':'1986',
                  '1985':'1985',
                  '1984':'1984',
                  '1983':'1983',
                  '1982':'1982',
                  '1981':'1981',
                  '1980':'1980',
                  '1979':'1979',
                  '1978':'1978',
                  '1977':'1977',
              }
            },
            {
                title:"Select Month",
                inputOptions:{
                    'January':'January',
                    'February':'February',
                    'March':'March',
                    'April':'April',
                    'May':'May',
                    'June':'June',
                    'July':'July',
                    'August':'August',
                    'September':'September',
                    'October':'October',
                    'November':'November',
                    'December':'December'
                }
            },
            {
                title:"Select Day",
                inputOptions:{
                    "1":"1",
                    "2":"2",
                    "3":"3",
                    "4":"4",
                    "5":"5",
                    "6":"6",
                    "7":"7",
                    "8":"8",
                    "9":"9",
                    "10":"10",
                    "11":"11",
                    "12":"12",
                    "13":"13",
                    "14":"14",
                    "15":"15",
                    "16":"16",
                    "17":"17",
                    "18":"18",
                    "19":"19",
                    "20":"20",
                    "21":"21",
                    "22":"22",
                    "23":"23",
                    "24":"24",
                    "25":"25",
                    "26":"26",
                    "27":"27",
                    "28":"28",
                    "29":"29",
                    "30":"30",
                    "31":"31",
                }
            }
          ]).then((result) => {
            if (result.value) {
              const birth = result.value[1]+" "+result.value[2]+", "+result.value[0];
              Swal.fire({
                title: 'Do you want to proceed?',
                text:birth,
                confirmButtonText: 'Update Birthday!',
                showLoaderOnConfirm:true,
                showDenyButton:true,
                preConfirm:async()=>{
                    return await firestore.collection('users').doc(other).update({
                        birthday:birth
                    }).then(res=>{
                        return "done"
                    }).catch(err=>{
                        Swal.showValidationMessage('Some error occured');
                    })
                }
              }).then(result=>{
                  if(result.value==="done"){
                      Swal.fire('','Birthday Updated','success');
                  }
              })
            }
          })
    }

    const updateWebsite = () =>{
        Swal.fire({
            title:"Website",
            input:"text",
            inputPlaceholder:"Enter your website",
            inputValue:user.website,
            showLoaderOnConfirm:true,
            inputValidator:value=>{
                if(!value){
                   return "You need to input something!"
                }
                if(value.length>40){
                    return "Enter input less than 40 characters, try removing https"
                }
                if(value===user.website) return "Its same, duh!"
            },
            preConfirm:async(value)=>{
                return await firestore.collection('users').doc(other).update({
                    website:value
                }).then(res=>{
                    return "done"
                }).catch(err=>{
                    Swal.showValidationMessage('Some error occured');
                })
            },
            confirmButtonText:"Update Website <i class='fas fa-edit'></i>"
        }).then(result=>{
            if(result.value==="done"){
                Swal.fire('','Website Updated','success');
            }
        })
    }

    return (
        <div className="profile-section w3-background">
            {isOpenModal?<Modal setIsOpenModal={setIsOpenModal} firebase={firebase}/>:null}
            {/* top */}
            <div className=" w3-background w3-padding-large profile-top">
                {/* profile picture */}
                <div className="w3-center profile-overlay">
                    <img src={(user&&user.photo)||profile} className="w3-circle" 
                    style={{width:"200px",height:"200px"}} 
                    alt={user&&user.username}/>
                    {
                        other===auth.currentUser.uid?<div className="text">
                        <button onClick={()=>setIsOpenModal(true)} className="animate__animated animate__bounce w3-button w3-red w3-round-large w3-hover-orange">
                            <i className="fas fa-camera-retro"></i>
                        </button>
                    </div>:null
                    }
                    
                </div>
                <div className=" profile-namebio w3-margin-left">
                {/* display name */}
                <p className="w3-text-dark" style={{marginLeft:"28px",letterSpacing:"1px",fontWeight:"bold",fontFamily:'Krona One'}}>{(user&&user.username)||"display name"}</p>
                {/* bio */}
                <div className="w3-large w3-text-light-grey w3-margin-top"
                    style={{display:"flex",justifyContent:"flex-start",alignItems:"center"}}>
                   <i className="fas fa-quote-left w3-text-red w3-small w3-margin-right" style={{alignSelf:"flex-start"}}></i> 
                   <p className="w3-text-grey w3-large">
                        {user?user.bio?user.bio:"no status":"display status"}
                    {
                       other===auth.currentUser.uid?
                       <i onClick={updateStatus} 
                       className=" w3-margin-left animate__animated animate__bounce fas fa-edit w3-text-light-dark w3-hover-text-red"></i>
                       :null
                    }
                    </p>
                   <i className="fas fa-quote-right w3-text-red w3-small w3-margin-left" style={{alignSelf:"flex-start"}}></i> 
                </div>
                </div>
            </div>
            {/* end of top */}

            <div className="profile-info w3-white w3-padding-large" >
                    <div className="profile-info-grid">
                        <div className="item ">
                            <div className="w3-dark w3-padding-medium">
                                GENDER {other===auth.currentUser.uid?
                                <i onClick={updateGender} className="fas fa-edit w3-right w3-hover-text-orange"></i>:null}
                            </div>
                            <div className="w3-padding-large w3-background w3-large w3-text-grey" style={{letterSpacing:"1px"}}>
                                <b>{(user&&user.gender)||"Not updated"}</b>
                            </div>
                        </div>
                        <div className="item">
                            <div className="w3-dark w3-padding-medium">
                                BIRTHDAY{other===auth.currentUser.uid?<i onClick={updateBirthday} className="fas fa-edit w3-right w3-hover-text-orange"></i>:null}
                            </div>
                            <div className="w3-padding-large w3-background w3-large w3-text-grey" style={{letterSpacing:"1px"}}>
                                <b>{(user&&user.birthday)||"Not updated"}</b>
                            </div>
                        </div>
                        <div className="item">
                            <div className="w3-dark w3-padding-medium">
                               RELATIONSHIP {other===auth.currentUser.uid?<i onClick={updateRelationship} className="fas fa-edit w3-right w3-hover-text-orange"></i>:null}
                            </div>
                            <div className="w3-padding-large w3-background w3-large w3-text-grey" style={{letterSpacing:"1px"}}>
                                <b>{(user&&user.relationship)||"Not updated"}</b>
                            </div>
                        </div>
                        <div className="item">
                            <div className="w3-dark w3-padding-medium">
                               WEBSITE {other===auth.currentUser.uid?<i onClick={updateWebsite} className="fas fa-edit w3-right w3-hover-text-orange"></i>:null}
                            </div>
                            <div className="myWebsite w3-padding-large w3-background w3-large w3-text-grey" style={{letterSpacing:"1px"}}>
                                <Linkify><b>{(user&&user.website)||"Not updated"}</b></Linkify>
                            </div>
                        </div>
                    </div>
            </div>
            
        </div>

    )
}

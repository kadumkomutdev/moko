import React, { useContext, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {NavLink} from 'react-router-dom'
import { FirebaseContext } from '../Firebase';

export default function Chat() {
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const firestore = firebase.firestore;

    const [count] = useDocumentData(firestore.collection('notificationCount').doc(auth.currentUser.uid),{idField:'id'});

    return (
        <NavLink activeStyle={{color:"#4a6e8b"}} className="nav_link" to="/home/chat/">
            <div className="tooltip">
                <span className="val">
                    <i className="fas fa-comment"></i>
                    {count?count.chatCount>0?<span>{count.chatCount}</span>:null:null}
                </span>
                <span className="tooltiptext">Chat</span>
            </div>
        </NavLink>
    )
}

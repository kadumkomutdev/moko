import firebase from 'firebase/app';
import 'firebase/auth' ;
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "your api key",
    authDomain: "your auth domain",
    databaseURL: "your database url",
    projectId: "your project id ",
    storageBucket: "your storage bucket",
    messagingSenderId: "your messaging sender id",
    appId: "your app id",
    measurementId: "your measurement id"
};

class Firebase{
  constructor() {
	firebase.initializeApp(config);
	this.auth = firebase.auth();
	this.signAuth = firebase.auth;
	this.firestore = firebase.firestore();
	this.firebase = firebase;
	this.realTime = firebase.database();
	this.storage = firebase.storage();
  }

  doSignOut = () => {
	  this.auth.signOut();
  }


}
 
export default Firebase;

import firebase from 'firebase/app';
import 'firebase/auth' ;
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyA573tvELEEwnOjgmFKd0KDSBN99HVKOHE",
	authDomain: "fir-project-9bafb.firebaseapp.com",
	databaseURL: "https://fir-project-9bafb.firebaseio.com",
	projectId: "fir-project-9bafb",
	storageBucket: "fir-project-9bafb.appspot.com",
	messagingSenderId: "277926580088",
	appId: "1:277926580088:web:4d26de0ad307d9efa9428d"
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
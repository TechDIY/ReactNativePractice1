import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkt9fhQz0WFo8iXEDfJGTZcXY3nIgbmDY",
  authDomain: "login-bad0b",
  databaseURL: "https://login-bad0b.firebaseio.com",
  projectId: "project-969730246969",
};

export default !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();
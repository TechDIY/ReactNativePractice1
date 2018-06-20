import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
};

export default !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();

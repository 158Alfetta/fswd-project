import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCJVmL2fqIsBeFP6avvoBPf6b22t5PbpB8",
  authDomain: "fswd-2021.firebaseapp.com",
  projectId: "fswd-2021",
  storageBucket: "fswd-2021.appspot.com",
  messagingSenderId: "460833536620",
  appId: "1:460833536620:web:98a841a8208e4bebae7649",
  measurementId: "G-Q0MQNKX063"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }

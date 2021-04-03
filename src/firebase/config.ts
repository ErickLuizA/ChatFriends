import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import Config from 'react-native-config'

const firebaseConfig = {
  apiKey: Config.apiKey,
  authDomain: Config.authDomain,
  databaseURL: Config.databaseURL,
  projectId: Config.projectId,
  storageBucket: Config.storageBucket,
  messagingSenderId: Config.messagingSenderId,
  appId: Config.appId,
  measurementId: Config.measurementId,
}

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

const firestore = firebase.firestore()
const auth = firebase.auth()

export { firestore, auth }

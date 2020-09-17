import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBLb-fyWCxt5ui84paRytzgt6y-Ejf23j4",
    authDomain: "crwn-db-bb60f.firebaseapp.com",
    databaseURL: "https://crwn-db-bb60f.firebaseio.com",
    projectId: "crwn-db-bb60f",
    storageBucket: "crwn-db-bb60f.appspot.com",
    messagingSenderId: "556384109437",
    appId: "1:556384109437:web:6f9100273f8a4c842b8214",
    measurementId: "G-B0EQY1XSCH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log('createUserProfileDocument called!')
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // create new user if user doesn't exist
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
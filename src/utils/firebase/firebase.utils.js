import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirec,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVOnrz32zIpsUk-7p3pxt-dh-f-fAl7Gs",
  authDomain: "crwn-clothing-c1c57.firebaseapp.com",
  projectId: "crwn-clothing-c1c57",
  storageBucket: "crwn-clothing-c1c57.appspot.com",
  messagingSenderId: "995800823955",
  appId: "1:995800823955:web:acc5d4cee78bc78c70b566",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`error creating the user`, error.message);
    }
  }
  return userDocRef;
};

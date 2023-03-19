import {firestore} from '$lib/firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  

const db = getFirestore();

const querySnapshot = await getDocs(collection(db, 'Users'));


export async function POST(requestEvent) {
    requestEvent.preventDefault()
    const formData = new FormData(requestEvent.target); // get form data
    const username = formData.get('username');
    let password = formData.get('password');
    password = toString(password)
    password = await sha256(password)

    const NewUser = {
        "username": username,
        "password":password
    }
    let isAvalible = true;

    console.log(JSON.stringify(NewUser))

    querySnapshot.forEach((doc) => {
        let DB_username = (doc.data().username)
        if (username === DB_username) {isAvalible = false}});

    if (isAvalible){
        const userRef = firestore.collection('Users').doc()
        await userRef.set({ username, password });
        console.log('User created:', userRef.id);
        window.location.href = "/accounts/login"
    } else {alert('User not avalible')}
}
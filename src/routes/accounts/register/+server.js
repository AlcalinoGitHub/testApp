import {firestore} from '$lib/firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  import Cookies from 'js-cookie';
  

const db = getFirestore();

const querySnapshot = await getDocs(collection(db, 'Users'));


function Validate(username){
    if (username.length < 1){return false}
    return true
}

export async function POST(requestEvent) {
    requestEvent.preventDefault()
    const formData = new FormData(requestEvent.target); // get form data
    const username = formData.get('username');

    let isValid = Validate(username)
    if(!isValid){alert('username must be at least 1 character long')}

    let password = formData.get('password');
    if (password.length < 5){isValid = false; alert('pasword must be at least 5 characters long')}
    

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

    if (isAvalible && isValid){
        const userRef = firestore.collection('Users').doc()
        await userRef.set({ username, password });
        console.log('User created:', userRef.id);
        Cookies.set('userCookie', username, { expires: 24/24 });
        window.location.href = "/"
    } else if (isValid) {alert('User not avalible')}
}
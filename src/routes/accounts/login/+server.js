import {firestore} from '$lib/firebase.js'
import { setCookie } from 'cookie';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';

const db = getFirestore();

const querySnapshot = await getDocs(collection(db, 'Users'));

async function sha256(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }



export async function POST(requestEvent) {
    requestEvent.preventDefault()

    const formData = new FormData(requestEvent.target); // get form data
    const username = formData.get('username');
    let password = formData.get('password');
    password = toString(password)
    password = await sha256(password)
    console.log(password)
    let isAuthenticated = false;
    querySnapshot.forEach((doc) => {
        let DB_username = (doc.data().username)
        let DB_password = (doc.data().password)
        if ((username === DB_username) && (password === DB_password)){
            console.log('Match')
            isAuthenticated = true
        }});
      if (isAuthenticated) {
        Cookies.set('userCookie', username, { expires: 24/24 });
        window.location.href = "/"
        return true;
    } else {
        alert('User not found')
        return false;
    }
}
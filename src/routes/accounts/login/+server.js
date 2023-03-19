import {firestore} from '$lib/firebase.js'
import { setCookie } from 'cookie';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';

const db = getFirestore();

const querySnapshot = await getDocs(collection(db, 'Users'));



export async function POST(requestEvent) {
    requestEvent.preventDefault()

    const formData = new FormData(requestEvent.target); // get form data
    const username = formData.get('username');
    let password = formData.get('password');

    const NewUser = {
        "username": username,
        "password":password
    }

    let isAuthenticated = false;
    querySnapshot.forEach((doc) => {
        let DB_username = (doc.data().username)
        let DB_password = (doc.data().password)
        if ((username === DB_username) && (password === DB_password)){
            console.log('Match')
            isAuthenticated = true
        }

      });
      if (isAuthenticated) {
        Cookies.set('userCookie', username, { expires: 24/24 });
        alert(`Logged in as ${username}`)
        return true;
    } else {
        return false;
    }
}
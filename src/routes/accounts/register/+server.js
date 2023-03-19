import {firestore} from '$lib/firebase.js'

async function hashString(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


export async function POST(requestEvent) {
    requestEvent.preventDefault()

    const formData = new FormData(requestEvent.target); // get form data
    const username = formData.get('username');
    let password = formData.get('password');
    password = await hashString(password)
    const NewUser = {
        "username": username,
        "password":password
    }

    console.log(JSON.stringify(NewUser))

    const userRef = firestore.collection('Users').doc()
    await userRef.set({ username, password });

    console.log('User created:', userRef.id);

    alert('USer created')
}
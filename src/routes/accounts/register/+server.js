import {firestore} from '$lib/firebase.js'




export async function POST(requestEvent) {
    requestEvent.preventDefault()

    const formData = new FormData(requestEvent.target); // get form data
    const username = formData.get('username');
    let password = formData.get('password');

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
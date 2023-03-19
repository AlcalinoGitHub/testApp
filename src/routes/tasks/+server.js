import {firestore} from '$lib/firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';
const db = getFirestore();
import getData from './getFire.js'




export async function POST(requestEvent){
    requestEvent.preventDefault()
    const formData = new FormData(requestEvent.target)
    const Usuario = formData.get('Usuario')
    const Nombre = formData.get('Nombre')
    const Descripcion = formData.get('Descripcion')
    const NewTask = {
        Usuario:Usuario,
        Nombre: Nombre,
        Descripcion:Descripcion
    }
    console.log(JSON.stringify(NewTask))

    const userRef = firestore.collection('Tasks').doc()
    await userRef.set({ Usuario, Descripcion, Nombre });

    window.location.href = "/tasks"

}

export async function DELETE(requestEvent){
    requestEvent.preventDefault()
    const formData = new FormData(requestEvent.target)
    const item = formData.get('item').split(',')
    let Nombre = item[0]
    let Desc = item[1]
    let User = item[2]
    let Database = await getData(); 


    for(var i = 0; i < Database.length; i ++){
        let current  = Database[i]
        console.log(current)
        let DB_Nombre = current.Nombre
        let DB_Descripcion = current.Descripcion
        let DB_Usuario = current.Usuario

        if (DB_Nombre === Nombre && DB_Descripcion === Desc && DB_Usuario === User){
            console.log(current.id)
            let docRef = firestore.collection('Tasks').doc(current.id);
            docRef.delete().then(() => {
                console.log('Document successfully deleted!'); window.location.href = '/tasks'
            }).catch((error) => {
                console.error('Error removing document:', error);
            });
            break;
        }
    }
}
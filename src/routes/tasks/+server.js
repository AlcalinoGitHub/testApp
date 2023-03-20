import {firestore} from '$lib/firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Cookies from 'js-cookie';
const db = getFirestore();
import getData from './getFire.js'




export async function POST(requestEvent){ //create a task
    requestEvent.preventDefault()
    const formData = new FormData(requestEvent.target)
    const Usuario = formData.get('Usuario')
    const Nombre = formData.get('Nombre')
    const Descripcion = formData.get('Descripcion')
    const Date = formData.get('date')
    const NewTask = {
        Usuario:Usuario,
        Nombre: Nombre,
        Descripcion:Descripcion,
        Date:Date
    }
    console.log(JSON.stringify(NewTask))

    const userRef = firestore.collection('Tasks').doc()
    await userRef.set({ Usuario, Descripcion, Nombre, Date });


}

export async function DELETE(requestEvent){
    console.log(requestEvent)
    requestEvent.preventDefault()
    const formData = new FormData(requestEvent.target)
    const item = formData.get('item').split(',')
    console.log(item)
    let Nombre = item[0]
    let Desc = item[1]
    let User = item[2]
    let Date = item[3]
    let Database = await getData(); 


    for(var i = 0; i < Database.length; i ++){
        let current  = Database[i]
        let DB_Nombre = current.Nombre
        let DB_Descripcion = current.Descripcion
        let DB_Usuario = current.Usuario
        let DB_Date = current.Date
        if (DB_Nombre === Nombre && DB_Descripcion === Desc && DB_Usuario === User && DB_Date == Date){
            console.log(current.id)
            let docRef = firestore.collection('Tasks').doc(current.id);
            docRef.delete().then(() => {
                console.log('Document successfully deleted!'); //window.location.href = '/tasks'
            }).catch((error) => {
                console.error('Error removing document:', error);
            });
            break;
        }
    }
}
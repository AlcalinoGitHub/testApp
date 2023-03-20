import {DELETE} from './+server.js'
import getData from './getFire.js'
import {firestore} from '$lib/firebase.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const db = getFirestore();

const monthToNumber = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  };

function CheckExpired(date){
    let TaskDate = new Date(date)
    let CurrentDate = Date()
    CurrentDate = CurrentDate.split(' ')
    CurrentDate = CurrentDate.slice(1, 4)
    CurrentDate[0] = monthToNumber[CurrentDate[0]]
    let TimeStamp = `${CurrentDate[2]}-${CurrentDate[0]}-${CurrentDate[1]}`
    TimeStamp = new Date(TimeStamp)
    console.log(TaskDate > TimeStamp)
    if (!(TaskDate > TimeStamp)){return 'rgb(255, 82, 82)'} else {return 'rgb(167, 255, 222)'}
}


export async function Task(requestEvent){
    let ReqData = requestEvent
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

    let Div = document.createElement('div')
    Div.className = 'element'
    Div.style = `box-shadow: 0px 0px 5px 1px ${CheckExpired(Date)}`
    Div.id = `${Usuario}${Nombre}${Descripcion}${Date}`

    let task = document.createElement('div')
    task.innerHTML = `Task: ${Nombre}`

    let desc = document.createElement('div')
    desc.innerHTML = `Descripcion: ${Descripcion}`

    let due = document.createElement('div')
    due. innerHTML = `Due: ${Date}`

    let Form = document.createElement('form')
    Form.onsubmit = "DeleteTask()"

    let Delete = document.createElement('input')
    Delete.type = 'submit'
    Delete.className = 'delete'
    Delete.value  = "Delete"
    Delete.addEventListener('click', async function() {
        Div.style.display = 'none'
        let Database = await getData(); 
        for(var i = 0; i < Database.length; i ++){
            let current  = Database[i]
            let DB_Nombre = current.Nombre
            let DB_Descripcion = current.Descripcion
            let DB_Usuario = current.Usuario
            let DB_Date = current.Date
            if (DB_Nombre === Nombre && DB_Descripcion === Descripcion && DB_Usuario === Usuario && DB_Date == Date){
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

    })

    let Hidden = document.createElement('input')
    Hidden.type = 'hidden'
    Hidden.value = [Nombre, Descripcion, Usuario, Date]


    Div.appendChild(task)
    Div.appendChild(desc)
    Div.appendChild(due)
    Form.appendChild(Delete)
    Form.appendChild(Hidden)

    Div.appendChild(Form)

    return Div
}
<script>
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


    import { onMount } from 'svelte';
    import Cookies from 'js-cookie';
    import {POST} from './+server.js'
    import { firestore } from '$lib/firebase.js';
    import { writable } from 'svelte/store';
    import {DELETE} from './+server.js'
    import './styles.css'
	import { identity } from 'svelte/internal';

    const getData = async () => {
        const querySnapshot = await firestore.collection('Tasks').get();
        const data = querySnapshot.docs.map((doc) => doc.data());
        //console.log('data:', data);
        return data;
    };


    const dataStore = writable([]);


    onMount(async () => {
        const data = await getData();
        dataStore.set(data);
    })

    export { dataStore };

    let myData = [];

    const unsubscribe = dataStore.subscribe(value => {
        myData = value;
    });   

    let user = Cookies.get('userCookie')

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

    function DeleteTask(requestEvent){
        DELETE(requestEvent)
        requestEvent.preventDefault()
        const formData = new FormData(requestEvent.target)
        const item = formData.get('item').split(',')
        let Nombre = item[0]
        let Desc = item[1]
        let User = item[2]
        let Date = item[3]

        let element = document.getElementById(`${User}${Nombre}${Desc}${Date}`)
        element.style.display = 'none'


    }

</script>




<h1>Tasks</h1>
<div>Logged in as: {user}</div><br>




<div class = "main">
    <div class = 'tasks'>
        {#each myData as item}
            {#if item.Usuario === user}
                <div class="element" style="box-shadow: 0px 0px 5px 1px {CheckExpired(item.Date)};" id = "{item.Usuario}{item.Nombre}{item.Descripcion}{item.Date}">
                    <div>Task: {item.Nombre}</div>
                    <div>Description: {item.Descripcion}</div>
                    <div>Due: {item.Date}</div>
                    <form on:submit={DeleteTask}>
                        <input type = "submit" value  = "Delete" class ="delete">
                        <input type = "hidden" value = {[item.Nombre, item.Descripcion, item.Usuario, item.Date]} name = "item">
                    </form> <br>
                </div>
            {/if}
        {/each}
    </div>


    <div class = "FORM">
        <h2>Create a Task</h2>
        <form on:submit={POST}>
            <input type ="text" name = "Nombre" placeholder="Nombre"> <br>
            <textarea name="Descripcion" placeholder="Desc" rows="5" cols="20"></textarea> <br> <small>Due:</small>
            <input type = "date" name = 'date'>
            <input type ="hidden" value = {user} name = "Usuario"> 
            <input type = "submit">
        </form>
    </div>
</div>
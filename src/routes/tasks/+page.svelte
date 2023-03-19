<script>
    import { onMount } from 'svelte';
    import Cookies from 'js-cookie';
    import {POST} from './+server.js'
    import { firestore } from '$lib/firebase.js';
    import { writable } from 'svelte/store';
    import {DELETE} from './+server.js'
    import './styles.css'

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
        console.log(myData);
    });   

    let user = Cookies.get('userCookie')

    
</script>




<h1>Tasks</h1>
<div>Logged in as: {user}</div><br>


<div class = "main">
    <div class = 'tasks'>
        {#each myData as item}
            {#if item.Usuario === user}
                <div class = "element">
                    <div>Task: {item.Nombre}</div>
                    <div>Name: {item.Descripcion}</div>
                    <form on:submit={DELETE}>
                        <input type = "submit" value  = "Delete" class ="delete">
                        <input type = "hidden" value = {[item.Nombre, item.Descripcion, item.Usuario]} name = "item">
                    </form> <br>
                </div>
            {/if}
        {/each}
    </div>


    <div class = "FORM">
        <h2>Create a Task</h2>
        <form on:submit={POST}>
            <input type ="text" name = "Nombre" placeholder="Nombre"> <br>
            <textarea name="Descripcion" placeholder="Desc" rows="5" cols="20"></textarea>
            <input type ="hidden" value = {user} name = "Usuario"> 
            <input type = "submit">
        </form>
    </div>
</div>
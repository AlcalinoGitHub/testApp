<script>
    import { onMount } from 'svelte';
    import Cookies from 'js-cookie';
    import {POST} from './+server.js'
    import { firestore } from '$lib/firebase.js';
    import { writable } from 'svelte/store';
    import {DELETE} from './+server.js'

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

{#each myData as item}
    {#if item.Usuario === user}
        <div>Task: {item.Nombre}</div>
        <div>Name: {item.Descripcion}</div>
        <form on:submit={DELETE}>
            <input type = "submit" value  = "Delete">
            <input type = "hidden" value = {[item.Nombre, item.Descripcion, item.Usuario]} name = "item">
        </form> <br>
    {/if}
{/each}


<form on:submit={POST}>
    <input type ="text" name = "Nombre" placeholder="Nombre"> <br>
    <input type ="text" name = "Descripcion" placeholder="Desc"> <br>
    <input type ="hidden" value = {user} name = "Usuario"> 
    <input type = "submit">
</form>



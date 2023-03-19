
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import getData from './getFire.js';
    const data = writable([]);
    import Cookies from 'js-cookie';
    const username = Cookies.get('userCookie');
    let isAuth = (username != undefined)

    onMount(async () => {
    const retrievedData = await getData();
    data.set(retrievedData);
  });
  function LogOut() {Cookies.remove('userCookie'); window.location.href = '/'}
</script>

<h1>This is my page</h1>


<a href = "/accounts/register">register</a>
<a href = "/accounts/login">login</a> <br>

{#if isAuth}
  <div> Welcome {Cookies.get('userCookie')}</div>
  <a href = "/tasks">Tasks</a> <br>
  <button on:click={LogOut}>LogOut</button>
{/if}


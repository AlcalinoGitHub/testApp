
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
  function LogOut() {
    Cookies.set('userCookie', username, { expires: 0/24 });
    Cookies.remove('userCookie')
    window.location.href = '/'
  }


</script>



<h1>TODO APP</h1>


{#if isAuth}
  <div class="button"> Welcome {Cookies.get('userCookie')}</div>
  <a href = "/tasks" class = "button">Tasks</a> <br>
  <button on:click={LogOut}>LogOut</button>
{:else}
  <div class = "container">
    <a href = "/accounts/register" class="button">register</a>
    <a href = "/accounts/login" class="button">login</a> <br>
  </div>
{/if}



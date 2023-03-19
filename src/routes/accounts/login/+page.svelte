<script>
    import {POST} from './+server.js'
    import Cookies from 'js-cookie';


</script>

<h1>LogIn</h1>



<form on:submit={POST}>
    <input type = "text" name = "username" placeholder="username"> <br>
    <input type = "password" name = "password" placeholder="password"> <br>
    <input type = "submit">
</form>





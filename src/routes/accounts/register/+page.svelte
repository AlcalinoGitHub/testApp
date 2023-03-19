<script>
    import {POST} from './+server.js'
</script>

<h1>register</h1>



<form on:submit={POST}>
    <input type = "text" name = "username" placeholder="username"> <br>
    <input type = "text" name = "password" placeholder="password"> <br>
    <input type = "submit">
</form>
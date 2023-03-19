<script>
    import {POST} from './+server.js'
    import "../accounts.css";
</script>

<h1>register</h1>


<div class = 'form'>
    <form on:submit={POST}>
        <input type = "text" name = "username" placeholder="username" class = 'inp'> <br>
        <input type = "password" name = "password" placeholder="password" class = 'inp' > <br>
        <input type = "submit" class = "clickable">
    </form>
</div>
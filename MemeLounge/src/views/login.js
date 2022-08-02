import {html} from '../lib.js';
import {login} from '../api/users.js';
import { notify } from '../notify.js';

const loginTemplate = (submitHandler)=>html`
<section id="login">
    <form @submit=${submitHandler} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(submitHandler));

    async function submitHandler(e){
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email =='' || password == '') {
            return notify('All fields are required!');
        }

        await login(email,password);
        ctx.updateNav();
        ctx.page.redirect('/memes');
    }
}
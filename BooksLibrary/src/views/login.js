import {html} from '../lib.js';
import {login} from '../api/users.js';

let loginTemplate = (submitHandler) =>html`
<section id="login-page" class="login">
    <form @submit=${submitHandler} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>`;

export function loginView(ctx){
ctx.render(loginTemplate(submitHandler));

async function submitHandler(e){
    e.preventDefault();
    let formData = new FormData(e.target);

    let email = formData.get('email').trim();
    let password = formData.get('password').trim();

    if (email =='' || password =='') {
        return alert('All fields must be filled!');
    }
    await login(email,password);
    ctx.updateNav();
    ctx.page.redirect('/');
}
}
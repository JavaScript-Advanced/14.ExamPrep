import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { myBooksView } from './views/myBooks.js';
import { registerView } from './views/register.js';

let main = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/',homeView);
page('/login',loginView);
page('/register',registerView);
page('/create',createView);
page('/myBooks',myBooksView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    next();
}

function renderMain(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
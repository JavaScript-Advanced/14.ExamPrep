import { html } from '../lib.js';
import { deleteBook, getBookId,getLikesByBookId, getMyLikesByBookId, likeBook } from '../api/data.js';
import { getUserData } from '../util.js';

let detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${bookControlsTemplate(book,isOwner,onDelete)}
            ${likesControlsTemplate(showLikeButton, onLike)}

            <div class="likes">
                <img class="hearts" src="../images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

const bookControlsTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" @click=${onDelete} href="javascript:void(0)">Delete</a>`;
    } else {
        return null;
    }
};

const likesControlsTemplate = (showLikeButton, onLike)=>{
    if (showLikeButton) {
        return html`<a class="button" @click=${onLike} href="javascript:void(0)">Like</a>`;
    }else{
        return null;
    }
}

export async function detailsView(ctx) {
    let userData = getUserData();

    let [book,likes,hasLike] = await Promise.all([
        getBookId(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikesByBookId(ctx.params.id, userData.id) : 0
    ])

    let isOwner = userData && userData.id == book._ownerId;
    let showLikeButton = isOwner == false && hasLike == false && userData != null;
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete(){
        await deleteBook(ctx.params.id);
        ctx.page.redirect('/');
    }

    async function onLike(){
        await likeBook(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}
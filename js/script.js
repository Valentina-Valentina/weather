// fetch('https://jsonplaceholder.typicode.com/posts/1')
//     .then(response => response.json())
//     .then(json => console.log(json));

// const options = {
//     method: "POST",
//     headers: {
//         "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//         title: 'Hello from JS',
//         body: 'QWERTY',
//         userId: 12,
//     }),
// };

// fetch('https://jsonplaceholder.typicode.com/posts', options)
//     .then(resp =>{
//         if(!resp.ok){
//             throw new Error(resp.statusText)
//         }
//         return resp.json()
//     })
// .then(data => console.log(data))
// .catch(err => console.log(err))
     
const addPosts = document.querySelector('.js-add');
const listPost = document.querySelector('.js-posts');
const formWrapper = document.querySelector('.js-form');
const errMessage = document.querySelector('.js-error')

addPosts.addEventListener('click', handlerAddPosts);

function handlerAddPosts() {
   formWrapper.innerHTML =  `<form action="submit" class="js-form-add">
        <input type="text" name="title">
        <textarea name="body" cols="30" rows="10"></textarea>
        <button>Додати пост</button>
    </form>`;
    const form = document.querySelector('.js-form-add')
   form.addEventListener('submit', handlerFormSumbit)
}
function handlerFormSumbit(evt) {
    evt.preventDefault();

    const { title, body } = evt.currentTarget.elements;
    const data = {
        title: title.value,
        body: body.value,
    };

    addPostService(data).then((obj) => {
        listPost.insertAdjacentHTML("beforeend", createPostMarkup(obj));
    })
        .catch(() => {
            errMessage.innerHTML = 'Не можливо додати пост';
        })
        .finally(() => {
            formWrapper.innerHTML = "";
            setTimeout(() => {
                errMessage.innerHTML = "";
            }, 2000)
        });
}

function createPostMarkup({ id, title, body }) {
    return `  <li data-id="${id}">
                <h2>${title}</h2>
                <p>${body}</p>
            </li>`; 
}

function addPostService(data) {
  const options = {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(data),
};

return fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then(resp =>{
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return resp.json()
    })  
}
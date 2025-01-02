import * as style from "./style.module.css";

console.log({style});

const clearButton = document.createElement('button');
clearButton.innerText = 'Clear';
clearButton.classList.add([style.button]);
clearButton.addEventListener('click', () => {
    document.getElementById('title').innerText = '';
    document.getElementById('description').innerText = '';
    document.getElementById('shoppingList').innerHTML = '';
});

document.body.appendChild(clearButton);
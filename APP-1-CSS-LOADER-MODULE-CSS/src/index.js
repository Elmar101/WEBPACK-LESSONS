import _ from "lodash";
import * as style from "./style.module.css";
import "./components/clearButton"

console.log({style});

function onClickButton() {  
    const title = document.getElementById("title");
    title.innerText = "APP-1 new title";

    const shoppingList =["milk", "butter", "bread"];
    const ul = document.getElementById("shoppingList");
    _.forEach(shoppingList, (item) => {
        const li = document.createElement("li");
        li.innerText = item;
        ul.appendChild(li);
    });
};

const btn_1 = document.getElementById('btn-1');
btn_1.classList.add([style.button]);
btn_1.addEventListener('click', onClickButton);

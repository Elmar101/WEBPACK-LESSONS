import _ from "lodash";
import * as style from "./style.module.scss";
import "./components/clearButton";
import Logo from "./assets/logo-img/logo.png";

console.log({style, Logo});

function onClickButton() {  
    const title = document.getElementById("title");
    title.innerText = "APP-1 new title";
    title.classList.add([style.title]);

    const shoppingList =["milk", "butter", "bread"];
    const ul = document.getElementById("shoppingList");
    _.forEach(shoppingList, (item) => {
        const li = document.createElement("li");
        li.innerText = item;
        ul.appendChild(li);
    });
};
const logoElement = document.getElementById('logo');
logoElement.className=style.logo;
logoElement.src = Logo;

const btn_1 = document.getElementById('btn-1');
btn_1.classList.add([style.button]);
btn_1.addEventListener('click', onClickButton);

const body = document.querySelector("body");
const button = document.createElement("button");
const topics = document.querySelector("#topics");
const ul = document.createElement("ul");
const loader = document.querySelector("#loading");
const bodyContent = document.querySelector("#content");
//global variable to track state of page
count = 1;

ul.className = "list-group";

window.addEventListener("DOMContentLoaded", createGetButton);
button.addEventListener("click", callApi);

//button component
function createGetButton() {
  button.className = "btn btn-primary";
  button.textContent = "Get Topics";
  button.id = "get-topics";
  body.appendChild(button);
}

//first backend call
async function callApi() {
  body.removeChild(button);
  loader.style.display = "revert";
  const res = await get("/topic", 1);
  loader.style.display = "none";
  listCreator(res);
}

//function to create list
function listCreator(res) {
  //if the div for new data
  if (topics.children.length > 1) {
    topics.replaceChildren();
    ul.replaceChildren();
  }
  for (let i = 0; i < 7; i++) {
    const list = document.createElement("li");
    list.className = "list-group-item";
    list.data = res[i];
    list.textContent = list.data.title;
    list.addEventListener("click", displayBody);
    ul.appendChild(list);
    topics.appendChild(ul);
  }
  const navigation = navButton();
  const { back, forth } = navigation;
  topics.append(back, forth);
}

//navigation buttons
function navButton() {
  const back = document.createElement("button");
  const forth = document.createElement("button");
  back.textContent = "<";
  forth.textContent = ">";
  back.className = "btn btn-primary";
  forth.className = "btn btn-primary";
  back.id = "go-back";
  forth.id = "go-forth";
  back.addEventListener("click", next);
  forth.addEventListener("click", next);
  return { back, forth };
}

//fetch function
async function get(url, page) {
  return await (await fetch(`${url}/${page}`)).json();
}

function displayBody(event) {
  removeBG();
  event.target.style.background = "aliceblue";
  bodyContent.textContent = event.target.data.body;
}

//subsequent fetch calls
async function next(event) {
  count = event.target.id === "go-forth" ? ++count : --count;
  count = count === 0 ? 1 : count;
  const data = await get("/topic", count);
  listCreator(data);
}

//remove background styling from ul elements
function removeBG() {
  for (let i = 0; i < ul.childNodes.length; i++) {
    ul.childNodes[i].style.background =
      ul.childNodes[i].style.background !== ""
        ? ""
        : ul.childNodes[i].style.background;
  }
}

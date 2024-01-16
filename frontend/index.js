
const btn = document.getElementById("add-btn");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");


function funcAdd(data) {
  for(let i=0; i<data.length; i++){
    const listItem = document.createElement("li");
    listItem.className = "add-item";
    listItem.innerHTML = `
                      <input type="checkbox">
                      <span>${data[i].description}</span>
                      <button class="delete-btn" onclick="deleteFunc('${data[i]._id}')">Delete</button>
                  `;
    list.appendChild(listItem);
  }  
}

// // Show all the item
function todoCallback(parseData){
  funcAdd(parseData.data)
}

function callback2(res){
  res.json().then(todoCallback);
}

function getData(){
  fetch("http://localhost:3000/todo", {
    method: "GET"
  }).then(callback2);
}
getData();


// // Add item to the list
function parseResponse(data){
  const listItem = document.createElement("li");
    listItem.className = "add-item";
    listItem.innerHTML = `
                      <input type="checkbox">
                      <span>${input.value}</span>
                      <button class="delete-btn">Delete</button>
                  `;
    list.appendChild(listItem);
    input.value = "";
    location.reload();
}

function callback(res) {
  res.json().then(parseResponse);
}

function func() {
  const data = input.value;
  fetch("http://localhost:3000/todo", {
    method: "POST",
    body: JSON.stringify({
      "description": data
    }),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(callback);
}

// // Delete all the item

function deleteCallback(){
  location.reload();
  console.log('data has been');
}

function deleteFunc(deleteDataId){
  console.log(deleteDataId);
  fetch("http://localhost:3000/todo/"+deleteDataId, {
    method: "DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  }).then(deleteCallback);
}

btn.addEventListener('click', func)



let form = document.getElementById("form");
let tasks = document.getElementById("tasks");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Lớp và đối tượng
class Data {
  constructor(title, date, description, status) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.status = status;
  }
}

let dataList = [];

// Tạo nhiệm vụ mới
let btnAdd = document.getElementById("add");
let btnReset = document.getElementById("reset");

btnAdd.addEventListener("click", () => {
  let textInput = document.getElementById("textInput").value;
  let dateInput = document.getElementById("dateInput").value;
  let textarea = document.getElementById("textarea").value;
  let selectInput = document.getElementById("selectInput").value;
  btnReset.click();
  let newData = new Data(textInput, dateInput, textarea, selectInput);
  dataList.push(newData);
  createTasks();
});

// Hiển thị nhiệm vụ mới
function createTasks() {
  tasks.innerHTML = "";
  for (let i in dataList) {
    if (dataList[i].title != "") {
      tasks.innerHTML += `
    <div id="task">  
    <div id="title-task">${dataList[i].title}</div>
    <div id="date-task">${dataList[i].date}</div>
    <div id="description-task">${dataList[i].description}</div>
    <div id="status-task">${dataList[i].status}</div>
    </div>`;
    }
  }
  alert('Add task successfully !')
}

// tìm kiếm task
function searchTask() {
  let check = false;
  let searchName = document.getElementById("search-name").value;
  let search = document.getElementById("search");
  search.innerHTML = "";

  // Loop throught each item in dataList
  for (let i in dataList) {
    if (dataList[i].title.includes(searchName)) {
      check = true;
      search.innerHTML += `
    <div id="search-form">  
    <div id="title-search">${dataList[i].title}</div>
    <div id="date-search">${dataList[i].date}</div>
    <div id="description-search">${dataList[i].description}</div>
    <div id="status-search">${dataList[i].status}</div>
    <div class="option">
      <i class="btn ti-trash" onclick="deleteTask(this)"></i>
      <i class="btn ti-pencil-alt" onclick ="editTask(this)" data-bs-toggle="modal"
      data-bs-target="#form"></i>
    </div>
    </div>`;
      break;
    }
  }
  if (check == false) {
    alert("No book found");
  }
}

// Xoá task
function deleteTask(e) {
  let searchName = document.getElementById("search-name").value;

  // Loop throught each item in dataList
  for (let i in dataList) {
    if (dataList[i].title.includes(searchName)) {
      dataList.splice(i, 1);
      e.parentElement.parentElement.remove();
      break;
    }
  }
  tasks.innerHTML = "";
  for (let i in dataList) {
    if (dataList[i].title != "") {
      tasks.innerHTML += `
    <div id="task">  
    <div id="title-task">${dataList[i].title}</div>
    <div id="date-task">${dataList[i].date}</div>
    <div id="description-task">${dataList[i].description}</div>
    <div id="status-task">${dataList[i].status}</div>
    </div>`;
    }
  }
}

// Update task
function editTask(e) {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  selectInput.value = selectedTask.children[3].innerHTML;
  deleteTask(e);
}
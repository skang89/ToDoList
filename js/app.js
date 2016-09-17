//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivty so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

function createNewTaskElement(taskString){
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkbox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input (text)
  var input = document.createElement("input");
  //button.edit
  var edit = document.createElement("button");
  //button.delete
  var deletebutton = document.createElement("button");
  
  //Each elements needs modified
  checkbox.type = "checkbox";
  input.type = "text";
  
  edit.innerText = "Edit";
  edit.className = "edit";
  deletebutton.innerText = "Delete";
  deletebutton.className = "delete";
  
  label.innerText = taskString;
  
  //and appended
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(edit);
  listItem.appendChild(deletebutton);
  
  return listItem;
}

//Add a new task
function addTask(){
  console.log("add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //append list items to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
  taskInput.value = "";
}

//Edit an existing task
function editTask(){
  console.log("edit task...");
  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containClass = listItem.classList.contains("editMode");
  
  //if the class of the parent is .editMode
  if (containClass){
  //Switch from .editMode
  //label text become the input's value
    label.innerText = editInput.value;
  }
  else {
  //Switch to .editMode
  //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
}

//Delete an existing task
function deleteTask(){
  console.log("delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
function taskComplete(){
  console.log("task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
function taskIncomplete(){
  console.log("task incomplete...");
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
}

function bindTaskEvents(taskListItem, checkboxEventHandler){
  console.log("bind...");
  //select taskListItem children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind to checkboxEventHandler to checkbox
  checkbox.onchange = checkboxEventHandler;
}

//set click handler to addtask function
addButton.onclick = addTask;

//cycle incompleteTasksHolder ul li items
for(var i = 0; i < incompleteTasksHolder.children.length; i += 1){
  //bind events to to list items childrens
  bindTaskEvents(incompleteTasksHolder.children[i], taskComplete);
}

//cycle completedTasksHolder ul li items
for(var i = 0; i < completedTasksHolder.children.length; i += 1){
  //bind events to to list items childrens
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}











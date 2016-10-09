//User interaction doesn't provide desired results
//Add interactivity so the user can manage daily tasks


var taskInput = document.getElementById("new-task"); //new task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//new task list item
var createNewTaskElement = function(taskString) {
    
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkbox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input(text)
  var editInput = document.createElement("input");
  //create button with .edit
  var editButton = document.createElement("button");
  //create button with .delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifing 
  checkbox.type = "checkbox";
  editInput.type = "text";
  
  editButton.textContent = "Edit";
  editButton.className = "edit";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  label.textContent = taskString;
  
  //each element needs appeneding
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add Task...");
  //Create a new list item with text from #new-task
  var listItem = createNewTaskElement(taskInput.value);
  
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
  console.log("Edit Task...");
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
    //if the parent has .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the inputs value
    label.textContent = editInput.value;
  } else {
    //else switch to .editMode
    //input value becomes the labels text
    editInput.value = label.textContent;
  }
    //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
}

//Delete existing task
var deleteTask = function() {
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //remove the parent list item from ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  //append the task list item to #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //append to #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind List Items");
  //select it's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
  editButton.onclick = editTask;
    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler; 
}

//Set the click handler to the add task function
addButton.onclick = addTask;

//cycle over each incompleteTasksHolder ul items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children(taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
//cycle over each completedTasksHolder ul items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children(taskCompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}










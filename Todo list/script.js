// Get references to the HTML elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// This function is called when the "Add" button is clicked
function addTask() {
    // Check if the input box is empty
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    // Create a new list item (li)
    let li = document.createElement("li");

    // Create the checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    li.appendChild(checkbox);

    // Create a span to hold the task text
    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = inputBox.value;
    li.appendChild(taskText);

    // Create a container for the buttons
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";

    // Create the Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    buttonsDiv.appendChild(editBtn);

    // Create the Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    buttonsDiv.appendChild(deleteBtn);

    // Add the buttons container to the list item
    li.appendChild(buttonsDiv);

    // Add the new list item to the task list
    listContainer.appendChild(li);

    // Clear the input box and save the data
    inputBox.value = "";
    saveData();
}

// Add a single event listener to the list container for all actions
listContainer.addEventListener("click", function(e) {
    const targetEl = e.target; // The element that was clicked
    const listItem = targetEl.closest('li'); // The parent list item

    if (!listItem) return; // Exit if click was not inside a list item

    const taskTextSpan = listItem.querySelector('.task-text');

    // --- TOGGLE CHECKBOX ---
    if (targetEl.type === 'checkbox') {
        // Toggle the 'checked' class on the parent <li> based on the checkbox state
        listItem.classList.toggle("checked", targetEl.checked);
        saveData();
    }
    // --- DELETE a task ---
    else if (targetEl.classList.contains('delete-btn')) {
        listItem.remove();
        saveData();
    }
    // --- EDIT / SAVE a task ---
    else if (targetEl.classList.contains('edit-btn')) {
        if (targetEl.textContent === "Edit") {
            taskTextSpan.contentEditable = true;
            taskTextSpan.style.backgroundColor = "#ddf4ff";
            taskTextSpan.focus();
            targetEl.textContent = "Save";
        } else {
            taskTextSpan.contentEditable = false;
            taskTextSpan.style.backgroundColor = "transparent";
            targetEl.textContent = "Edit";
            saveData();
        }
    }
}, false);

// Add a task when the "Enter" key is pressed
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        addTask();
    }
});

// Function to save the current list to the browser's local storage
function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
}

// Function to load tasks from local storage when the page opens
function showTasks() {
    const savedData = localStorage.getItem("todoData");
    if (savedData) {
        listContainer.innerHTML = savedData;
        
        // **IMPORTANT**: After loading, sync checkboxes with the 'checked' class state
        const allTasks = listContainer.querySelectorAll('li');
        allTasks.forEach(task => {
            const checkbox = task.querySelector('.task-checkbox');
            if (task.classList.contains('checked')) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    }
}

// Load the tasks when the script first runs
showTasks();
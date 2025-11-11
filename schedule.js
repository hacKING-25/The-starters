// Wait for the entire HTML page to load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Get references to your HTML elements ---
    const daySelect = document.getElementById('day-select');
    const timeSelect = document.getElementById('time-select');
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // --- 2. Create the function to display tasks ---
    function displayTasks() {
        // Clear the list first to avoid duplicates
        taskList.innerHTML = ''; 

        // Get the tasks from localStorage.
        // JSON.parse() turns the string back into an array.
        // If "tasks" doesn't exist, use an empty array [].
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Loop through each task in the array
        tasks.forEach(task => {
            // Create a new list item (<li>)
            const li = document.createElement('li');
            
            // Set its text content
            li.textContent = `[${task.day} at ${task.time}] - ${task.taskName}`;
            
            // Add the new list item to the <ul>
            taskList.appendChild(li);
        });
    }

    // --- 3. Create the function to save a new task ---
    function saveTask() {
        // Get the values from the inputs
        const day = daySelect.value;
        const time = timeSelect.value;
        const taskName = taskInput.value;

        // Simple validation: check if task name is empty
        if (taskName.trim() === '') {
            alert('Please enter a task.');
            return; // Stop the function
        }
        if (time === '') {
            alert('Please select a time.');
            return; // Stop the function
        }

        // Create a 'task object' to hold the data
        const newTask = {
            day: day,
            time: time,
            taskName: taskName
        };

        // Get existing tasks from localStorage, or start a new array
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task object to the array
        tasks.push(newTask);

        // Save the *updated* array back to localStorage.
        // JSON.stringify() turns the array into a string for storage.
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // --- 4. Refresh the displayed tasks ---
        displayTasks();

        // Bonus: Clear the input fields after saving
        taskInput.value = '';
        timeSelect.value = '';
    }

    // --- 5. Add the Event Listener to the button ---
    // When the button is clicked, run the saveTask function
    addTaskBtn.addEventListener('click', saveTask);

    // --- 6. Display all saved tasks when the page first loads ---
    displayTasks();

});
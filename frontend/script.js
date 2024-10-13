console.log("this is from client");
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-desc');
const addTodoButton = document.getElementById('add-todo');

const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
        .then((res) => res.json())
        .then((data) => {
            todoList.innerHTML = ''; // Clear existing list
            data.forEach(todo => {
                const listItem = document.createElement('li');
                listItem.textContent = todo.desc;
                if (todo.completed) {
                    listItem.classList.add('completed');
                }
                
                // Add update and delete buttons
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Toggle Complete';
                updateButton.onclick = () => updateTodo(todo.id, !todo.completed);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteTodo(todo.id);

                listItem.appendChild(updateButton);
                listItem.appendChild(deleteButton);
                todoList.appendChild(listItem);
            });
        })
        .catch((err) => console.log(err));
};

const addTodo = () => {
    const desc = todoInput.value;
    if (desc.trim() === '') {
        alert("Please enter a todo description.");
        return;
    }
    const newTodo = { desc: desc, completed: false };
    
    fetch("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    })
    .then(() => {
        todoInput.value = ''; // Clear input field
        fetchTodos(); // Refresh todo list
    })
    .catch((err) => console.log(err));
};

const updateTodo = (id, completed) => {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: completed }) // Update completion status
    })
    .then(() => fetchTodos()) // Refresh todo list
    .catch((err) => console.log(err));
};

const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
    })
    .then(() => fetchTodos()) // Refresh todo list
    .catch((err) => console.log(err));
};

// Event listeners
addTodoButton.addEventListener('click', addTodo);

// Initial fetch to display todos
fetchTodos();

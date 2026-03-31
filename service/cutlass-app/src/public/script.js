document.querySelector('.input-group button').addEventListener('click', async function () {
    console.log("dfdsff")
    const inputValue = document.getElementById('myInput').value.trim();
    if (inputValue) {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo: inputValue
            })
        });
        let newLi = document.createElement('li');
        newLi.appendChild(document.createTextNode(inputValue));
        let todoList = document.getElementById('todos');
        todoList.appendChild(newLi);
        document.getElementById('myInput').value = '';
    } else {
        alert('Please enter something!');
    }
});

document.getElementById('todos').addEventListener('click', (e) => {
    console.log("document.getElementById");
    if (e.target.classList.contains('mark_done-btn')) {
        const id = e.target.dataset.id;
        markTodoDone(id).then(r => {});
    }
});

async function markTodoDone(todoId) {
    // Your delete logic here
    console.log('Mark todo done with id', todoId);
    if (todoId) {
        const response = await fetch('/todos/' + todoId, {
            method: 'PUT',
        });
        console.log(response);
    }
    // ... remove from array and re-render
}
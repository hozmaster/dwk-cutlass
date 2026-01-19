
document.querySelector('.input-group button').addEventListener('click', async function () {
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
        let newLi=document.createElement('li');
        newLi.appendChild(document.createTextNode(inputValue));
        let todoList = document.getElementById('todos');
        todoList.appendChild(newLi);
        document.getElementById('myInput').value = '';
    } else {
        alert('Please enter something!');
    }
});
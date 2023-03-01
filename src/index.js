import './style.css';

const myTodo = [
    {
    description: 'Complete a website',
    completed: false,
    index: 0,
    },
    {
        description: 'Go to city',
        completed: true,
        index: 1,
        },
        {
            description: 'Wash the dishes',
            completed: false,
            index: 2,
            },
    ]

    let myList = document.getElementById('listholder');
    for(let i = 0; i < myTodo.length; i+=1) {
    const li = document.createElement('li');
    li.innerHTML = `<li class="my-list"><input type="checkbox" class="checkbox" ${myTodo[i].completed ? 'checked' : ''}>
    <p>${myTodo[i].description}</p></li>`;
    myList.appendChild(li)
    }

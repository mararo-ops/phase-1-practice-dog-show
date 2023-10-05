document.addEventListener('DOMContentLoaded', () => {

})
document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    document.getElementById('table-body').addEventListener('click', handleEdit);
    document.getElementById('dog-form').addEventListener('submit', updateDog);
});

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
            renderDogs(dogs);
        });
}

function renderDogs(dogs) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';  // Clear previous dogs
    dogs.forEach(dog => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-id="${dog.id}">Edit</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function handleEdit(event) {
    if (event.target.tagName === 'BUTTON') {
        const dogId = event.target.dataset.id;
        fetch(`http://localhost:3000/dogs/${dogId}`)
            .then(response => response.json())
            .then(dog => {
                const form = document.getElementById('dog-form');
                form.name.value = dog.name;
                form.breed.value = dog.breed;
                form.sex.value = dog.sex;
                form.dataset.id = dog.id;  // Store the dog's id for the update
            });
    }
}

function updateDog(event) {
    event.preventDefault();
    const form = event.target;
    const dogId = form.dataset.id;

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value
        })
    })
    .then(() => fetchDogs());  // Re-fetch all dogs and update the table
}

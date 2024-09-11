// renderer.js
// Fetch and display all people
window.dbAPI.getPeople().then(people => {
  const peopleList = document.getElementById('people');
  people.forEach(person => {
    const li = document.createElement('li');
    // li.textContent = `${person.name} (Age: ${person.age}) - ${person.email}`;
    li.textContent = `${person.name}`;
    peopleList.appendChild(li);
  });
  // get created li and add event listener to each li
  // if li is clicked, show the person's detail in model-container
  const li = document.querySelectorAll('li');
  li.forEach((li, index) => {
    li.addEventListener('click', () => {
      fetch('detail.html')
        .then(response => response.text())
        .then(html => {
          document.getElementById('modal-container').innerHTML = html;
          document.getElementById('detail-modal').classList.remove('hidden');
          document.getElementById('name').textContent = people[index].name;
          document.getElementById('age').textContent = people[index].age;
          document.getElementById('email').textContent = people[index].email;
          document.getElementById('close-detail-btn').addEventListener('click', () => {
            document.getElementById('detail-modal').classList.add('hidden');
          });
        })
        .catch(error => console.error('Error loading modal:', error));
    });
  });
});


document.getElementById('add-btn').addEventListener('click', () => {
  fetch('form.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modal-container').innerHTML = html;
      document.getElementById('add-person-modal').classList.remove('hidden');

      // Add event listeners for modal buttons
      document.getElementById('cancel-person-btn').addEventListener('click', () => {
        document.getElementById('add-person-modal').classList.add('hidden');
      });

      document.getElementById('save-person-btn').addEventListener('click', () => {
        const name = document.getElementById('name-input').value;
        const age = document.getElementById('age-input').value;
        const email = document.getElementById('email-input').value;

        if (name && age && email) {
          window.dbAPI.addPerson(name, parseInt(age), email);
          document.getElementById('add-person-modal').classList.add('hidden');
          window.location.reload(); // Reload to refresh the people list
        } else {
          alert('Please fill out all fields');
        }
      });
    })
    .catch(error => console.error('Error loading modal:', error));
});

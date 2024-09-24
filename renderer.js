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
          // document.getElementById('close-detail-btn').addEventListener('click', () => {
          //   document.getElementById('detail-modal').classList.add('hidden');
          // });
        })
        .catch(error => console.error('Error loading modal:', error));
    });
  });
});


document.getElementById('add-btn').addEventListener('click', () => {
  fetch('add.html')
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

// add event listener to delete button
document.getElementById('delete-btn').addEventListener('click', () => {
  fetch('delete.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modal-container').innerHTML = html;
      document.getElementById('delete-person-modal').classList.remove('hidden');

      // Add event listeners for modal buttons
      document.getElementById('cancel-delete-btn').addEventListener('click', () => {
        document.getElementById('delete-modal').classList.add('hidden');
      });

      document.getElementById('confirm-delete-btn').addEventListener('click', () => {
        const name = document.getElementById('name-input').value;
        if (name) {
          window.dbAPI.deletePerson(name);
          document.getElementById('delete-person-modal').classList.add('hidden');
          window.location.reload(); // Reload to refresh the people list
        } else {
          alert('Please fill out the name field');
        }
      });
    })
    .catch(error => console.error('Error loading modal:', error));
});

document.getElementById('edit-btn').addEventListener('click', () => {
  fetch('update.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modal-container').innerHTML = html;
      document.getElementById('edit-person-modal').classList.remove('hidden');
      document.getElementById('result-modal').classList.add('hidden');
      document.getElementById('edit-form').classList.add('hidden');

      // Fix: Correct the method name (getElementById instead of getElementsById)
      document.getElementById('cancel-edit-btn').addEventListener('click', () => {
        document.getElementById('edit-person-modal').classList.add('hidden');
      });

      // Add event listener to the search button
      document.getElementById('search-btn').addEventListener('click', () => {
        const name = document.getElementById('name-input').value;

        // Fetch person from the database
        window.dbAPI.getPerson(name).then(person => {
          document.getElementById('result-modal').classList.remove('hidden');

          if (person.length > 0) {
            // Show edit form if person is found
            document.getElementById('edit-form').classList.remove('hidden');

            // Pre-fill form fields with person details
            // document.getElementById('name-input').value = person[0].name;
            // document.getElementById('age-input').value = person[0].age;
            // document.getElementById('email-input').value = person[0].email;

            // Populate search results (optional for display purposes)
            document.getElementById('search-results').innerHTML = `
              <li>Name: ${person[0].name}</li>
              <li>Age: ${person[0].age}</li>
              <li>Email: ${person[0].email}</li>
            `;
          } else {
            alert('Person not found');
          }
        });
      });

      // Add event listener to the confirm button for saving edits
      document.getElementById('confirm-edit-btn').addEventListener('click', () => {
        const name = document.getElementById('name-input').value;
        const age = document.getElementById('edit-age-input').value;
        const email = document.getElementById('edit-email-input').value;

        if (name && age && email) {
          // Call the editPerson function with the new data
          window.dbAPI.editPerson(name, age, email);
          document.getElementById('edit-person-modal').classList.add('hidden');
          window.location.reload(); // Reload to refresh the list
        } else {
          alert('Please fill out all fields');
        }
      });
    })
    .catch(error => console.error('Error loading modal:', error));
});

// script.js
document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('goodThingInput');
    const value = input.value;
    if (value) {
        addEntry(value);
        saveEntries(value);
        input.value = ''; // Clear the input after adding
    }
});

function addEntry(text) {
    const container = document.getElementById('entriesContainer');
    const entry = document.createElement('div');
    entry.classList.add('entry');

    const date = new Date();
    const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    entry.textContent = `${dateString} - ${text}`;
    container.appendChild(entry);

    // Smooth scroll to the new entry
    entry.scrollIntoView({ behavior: 'smooth' });
}

function saveEntries(entry) {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries.push(entry);
    localStorage.setItem('goodThings', JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries.forEach(entry => {
        addEntry(entry);
    });
}

window.onload = loadEntries;

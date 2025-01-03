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
    entry.textContent = text;
    container.appendChild(entry);
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

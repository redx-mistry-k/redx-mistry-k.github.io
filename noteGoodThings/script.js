document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('goodThingInput');
    const dateInput = document.getElementById('dateInput'); // Adding a date input field
    const value = input.value;
    const dateValue = dateInput.value || new Date().toLocaleDateString(); // If no date is entered, use the current date

    if (value) {
        addEntry(value, dateValue);
        saveEntries(value, dateValue);
        input.value = ''; // Clear the input after adding
        dateInput.value = ''; // Clear the date input after adding
    }
});

function addEntry(text, date) {
    const container = document.getElementById('entriesContainer');
    const entry = document.createElement('div');
    entry.classList.add('entry');

    entry.textContent = `${date} - ${text}`;
    container.appendChild(entry);

    // Smooth scroll to the new entry
    entry.scrollIntoView({ behavior: 'smooth' });
}

function saveEntries(entry, date) {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries.push({ entry, date });
    localStorage.setItem('goodThings', JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries.forEach(({ entry, date }) => {
        addEntry(entry, date);
    });
}

window.onload = loadEntries;

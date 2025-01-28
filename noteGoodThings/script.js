// Toggle Dark Mode
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
} else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙 Dark Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    }
});

// Rest of the JavaScript code remains the same
document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('goodThingInput');
    const dateInput = document.getElementById('dateInput');
    const value = input.value;
    const dateValue = dateInput.value || new Date().toLocaleDateString();

    if (value) {
        addEntry(value, dateValue);
        saveEntries(value, dateValue);
        input.value = '';
        dateInput.value = '';
    }
});

function addEntry(text, date) {
    const container = document.getElementById('entriesContainer');
    const entry = document.createElement('div');
    entry.classList.add('entry');

    const entryText = document.createElement('span');
    entryText.textContent = `${date} - ${text}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        if (confirm('Are you sure you want to delete this entry?')) {
            container.removeChild(entry);
            removeEntry(text, date);
        }
    };

    entry.appendChild(entryText);
    entry.appendChild(deleteButton);
    container.appendChild(entry);

    entry.scrollIntoView({ behavior: 'smooth' });
}

function saveEntries(entry, date) {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries.push({ entry, date });
    localStorage.setItem('goodThings', JSON.stringify(entries));
}

function removeEntry(entry, date) {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries = entries.filter(e => e.entry !== entry || e.date !== date);
    localStorage.setItem('goodThings', JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('goodThings')) || [];
    entries.forEach(({ entry, date }) => {
        addEntry(entry, date);
    });
}

document.getElementById('goodThingInput').addEventListener('input', function() {
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${this.value.length}/500`;
});

window.onload = function() {
    loadEntries();
    document.getElementById('goodThingInput').dispatchEvent(new Event('input'));
};

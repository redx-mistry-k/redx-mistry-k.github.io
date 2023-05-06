// Get references to the input elements and the output div
const triggerNameInput = document.getElementById('trigger-name');
const integerInput = document.getElementById('integer-input');
const outputDiv = document.getElementById('output');

// Add an event listener to the Delagg button
const delaggButton = document.getElementById('delagg-button');
delaggButton.addEventListener('click', () => {
  // Get the values of the input elements
  const triggerName = triggerNameInput.value;
  const integer = parseInt(integerInput.value);

  // Generate the output strings and add them to the output div
  let outputText = '';
  for (let i = 1; i <= integer; i++) {
    outputText += `/${triggerName}${i} `;
  }
  outputDiv.innerText = outputText;
});

function copyToClipboard() {
  var output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output);
}

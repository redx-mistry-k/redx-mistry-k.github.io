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
  
  // Get the value of the selected starting integer option
  const zeroOption = document.querySelector('input[name="zero-option"]:checked').value;

  // Generate the output strings and add them to the output div
  let outputText = '';
  for (let i = 1; i <= integer; i++) {
    if (zeroOption === 'with-zero') {
      outputText += `/${triggerName}${i.toString().padStart(2, '0')} `;
    } else {
      outputText += `/${triggerName}${i} `;
    }
  }
  outputDiv.innerText = outputText;
});

function copyToClipboard() {
  var output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output);
}

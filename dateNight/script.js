// script.js
function rollDice(diceId) {
  const dice = document.getElementById(diceId);

  // Randomize rotations
  const xRotation = Math.floor(Math.random() * 4) * 90; // 0, 90, 180, 270
  const yRotation = Math.floor(Math.random() * 4) * 90;

  // Apply rotation to the dice
  dice.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
}

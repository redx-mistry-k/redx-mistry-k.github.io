function calculate() {
  const lastPeriodInput = document.getElementById('lastPeriod').value;
  const cycleLength = parseInt(document.getElementById('cycleLength').value);

  if (!lastPeriodInput || isNaN(cycleLength)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const lastPeriod = new Date(lastPeriodInput);
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  const ovulationDay = new Date(lastPeriod);
  ovulationDay.setDate(ovulationDay.getDate() + (cycleLength - 14));

  const fertileStart = new Date(ovulationDay);
  fertileStart.setDate(fertileStart.getDate() - 4); // Start 4 days before ovulation

  const fertileEnd = new Date(ovulationDay);
  fertileEnd.setDate(fertileEnd.getDate() + 1); // 1 day after ovulation

  const format = (date) => date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  document.getElementById('results').innerHTML = `
    <h3>Results</h3>
    <p><strong>Next Period:</strong> ${format(nextPeriod)}</p>
    <p><strong>Estimated Ovulation:</strong> ${format(ovulationDay)}</p>
    <p><strong>Fertile Window:</strong> ${format(fertileStart)} to ${format(fertileEnd)}</p>
    <small>(Fertile window includes days with higher chance of pregnancy)</small>
  `;
}

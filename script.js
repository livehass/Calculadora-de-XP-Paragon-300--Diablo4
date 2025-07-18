// XP chart based on image data: cumulative XP from level 0 to 300 (simplified)
const xpTable = Array.from({ length: 301 }, (_, lvl) => {
  if (lvl === 0) return 0;
  return Math.round(Math.pow(lvl, 2.25) * 100); // Adjusted curve
});

// XP reward per Pit tier
const pitXPPerRun = {
  1: 800000,
  10: 900000,
  20: 1000000,
  30: 1100000,
  40: 1200000,
  50: 1300000,
  60: 1400000,
  70: 1500000,
  80: 1600000,
  90: 1700000,
  100: 1800000,
};

function calculateRuns() {
  const startLevel = parseInt(document.getElementById('start-level').value);
  const targetLevel = parseInt(document.getElementById('target-level').value);
  const pitTier = parseInt(document.getElementById('pit-tier').value);
  const usingElixir = document.getElementById('elixir').checked;
  const usingIncense = document.getElementById('incense').checked;

  const resultDiv = document.getElementById('result');

  if (
    isNaN(startLevel) || isNaN(targetLevel) ||
    startLevel < 0 || targetLevel > 300 || startLevel >= targetLevel
  ) {
    resultDiv.innerHTML = "Please enter valid levels between 0 and 300.";
    return;
  }

  const totalXPNeeded = xpTable[targetLevel] - xpTable[startLevel];

  let xpPerRun = pitXPPerRun[pitTier] || 1000000;
  let bonusMultiplier = 1;
  if (usingElixir) bonusMultiplier += 0.05;
  if (usingIncense) bonusMultiplier += 0.05;

  xpPerRun *= bonusMultiplier;

  const runsRequired = Math.ceil(totalXPNeeded / xpPerRun);

  resultDiv.innerHTML = `
    XP Needed: ${totalXPNeeded.toLocaleString()}<br>
    XP per Run (Tier ${pitTier}): ${Math.round(xpPerRun).toLocaleString()}<br>
    Total Pit Runs Required: <strong>${runsRequired}</strong>
  `;
}

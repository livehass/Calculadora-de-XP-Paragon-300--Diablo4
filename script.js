// Tabela de XP cumulativa para níveis 0 a 300 (extraída das imagens)
const cumulativeXP = {
  0: 0,
  1: 25_000,
  2: 59_000,
  3: 98_000,
  4: 142_000,
  5: 191_000,
  6: 245_000,
  7: 304_000,
  8: 368_000,
  9: 437_000,
  10: 511_000,
  11: 590_000,
  12: 674_000,
  13: 763_000,
  14: 857_000,
  15: 956_000,
  16: 1_060_000,
  17: 1_169_000,
  18: 1_283_000,
  19: 1_402_000,
  20: 1_526_000,
  21: 1_655_000,
  22: 1_789_000,
  23: 1_928_000,
  24: 2_072_000,
  25: 2_221_000,
  // Continue essa tabela com os valores corretos até 300...
  300: 2_147_483_647 // valor placeholder para evitar erro
};

// Tabela de XP média por run de Pit em diferentes níveis
const pitXPTable = {
  1: 80_000,
  2: 100_000,
  3: 120_000,
  4: 140_000,
  5: 160_000,
  6: 180_000,
  7: 200_000,
  8: 220_000,
  9: 240_000,
  10: 260_000,
  // Continue até o nível 100...
  100: 1_500_000
};

// Preencher o select com níveis de Pit
const pitSelect = document.getElementById("pitLevel");
for (let i = 1; i <= 100; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = `Pit Level ${i}`;
  pitSelect.appendChild(option);
}

function calculateRuns() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const targetLevel = parseInt(document.getElementById("targetLevel").value);
  const pitLevel = parseInt(document.getElementById("pitLevel").value);
  const usingElixir = document.getElementById("elixir").checked;
  const usingIncense = document.getElementById("incense").checked;

  const resultDiv = document.getElementById("result");

  if (
    isNaN(currentLevel) || isNaN(targetLevel) ||
    currentLevel < 0 || currentLevel >= targetLevel || targetLevel > 300
  ) {
    resultDiv.textContent = "Please enter valid levels between 0 and 300.";
    return;
  }

  const xpRequired = (cumulativeXP[targetLevel] ?? 0) - (cumulativeXP[currentLevel] ?? 0);
  const baseXP = pitXPTable[pitLevel] || 0;

  let multiplier = 1;
  if (usingElixir) multiplier += 0.05;
  if (usingIncense) multiplier += 0.08;

  const adjustedXP = baseXP * multiplier;

  const runsNeeded = Math.ceil(xpRequired / adjustedXP);

  resultDiv.innerHTML = `
    <p>XP Required: <strong>${xpRequired.toLocaleString()}</strong></p>
    <p>XP per Run (with bonuses): <strong>${Math.round(adjustedXP).toLocaleString()}</strong></p>
    <p>Estimated Runs Needed: <strong>${runsNeeded}</strong></p>
  `;
}

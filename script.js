
function setupDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');


  const currentTheme = localStorage.getItem('theme') ||
    (prefersDarkScheme.matches ? 'dark' : 'light');


  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }


  darkModeToggle.addEventListener('click', function () {
    let theme;
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      theme = 'light';
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      theme = 'dark';
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
    localStorage.setItem('theme', theme);
  });
}

// Paragon level accumulated XP data (1-300) in millions
const XP_TOTAL_TO_300 = 24000;
const xpProgression = [
  { level: 1, xp: 0 },
  { level: 200, xp: 1200 },
  { level: 243, xp: 2500 },
  { level: 261, xp: 4500 },
  { level: 271, xp: 6500 },
  { level: 278, xp: 9000 },
  { level: 284, xp: 11000 },
  { level: 288, xp: 13000 },
  { level: 292, xp: 15500 },
  { level: 295, xp: 17500 },
  { level: 298, xp: 20500 },
  { level: 300, xp: XP_TOTAL_TO_300 }
];

// Pit data
const pitData = [
  { tier: 60, clearXP: 3.0, completionXP: 6.1 },
  { tier: 70, clearXP: 3.5, completionXP: 7.1 },
  { tier: 80, clearXP: 4.0, completionXP: 8.1 },
  { tier: 100, clearXP: 4.8, completionXP: 9.6 },
  { tier: 150, clearXP: 5.5, completionXP: 11.0 }
];


function getXPFromLevel(level) {
  if (level >= 300) return XP_TOTAL_TO_300;

  let lowerBound = { level: 1, xp: 0 };
  let upperBound = { level: 300, xp: XP_TOTAL_TO_300 };

  for (const entry of xpProgression) {
    if (entry.level <= level) {
      lowerBound = entry;
    } else {
      upperBound = entry;
      break;
    }
  }

  if (lowerBound.level === level) {
    return lowerBound.xp;
  }

  const levelRange = upperBound.level - lowerBound.level;
  const xpRange = upperBound.xp - lowerBound.xp;
  const progress = (level - lowerBound.level) / levelRange;

  return lowerBound.xp + (xpRange * progress);
}


function calculate() {
  const currentLevel = parseInt(document.getElementById("currentLevel").value);
  const timePerPit = parseFloat(document.getElementById("pitTime").value);
  const pitTier = parseInt(document.getElementById("pitTier").value);
  const elixirChecked = document.getElementById("elixir").checked;
  const incenseChecked = document.getElementById("incense").checked;

  if (isNaN(currentLevel) || currentLevel < 1 || currentLevel > 300) {
    alert("Please enter a valid Paragon level (1-300).");
    return;
  }

  if (isNaN(timePerPit)) {
    alert("Please enter a valid time to complete the Pit.");
    return;
  }

  if (timePerPit > 15) {
    alert("The maximum time per Pit is 15 minutes. Adjust your time.");
    return;
  }

  const selectedPit = pitData.find(pit => pit.tier === pitTier);
  if (!selectedPit) {
    alert("Invalid Pit tier. Please select an available tier.");
    return;
  }

  const currentXP = getXPFromLevel(currentLevel);
  const xpRemaining = XP_TOTAL_TO_300 - currentXP;

  if (xpRemaining <= 0) {
    document.getElementById("remainingXP").innerText = "XP remaining to Paragon 300: 0 XP";
    document.getElementById("pitsRequired").innerText = "Pits required: 0";
    document.getElementById("totalTime").innerText = "Estimated total time: 0h 0m";
    document.getElementById("efficiency").innerText = "You've already reached Paragon 300!";
    return;
  }

  let xpPerPit = selectedPit.completionXP;
  let bonusMultiplier = 1;

  if (elixirChecked) bonusMultiplier += 0.05;
  if (incenseChecked) bonusMultiplier += 0.08;

  xpPerPit *= bonusMultiplier;

  const pitsRequired = Math.ceil(xpRemaining / xpPerPit);
  const totalMinutes = pitsRequired * timePerPit;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  let efficiencyRating = "Good";
  if (timePerPit < 2) efficiencyRating = "Excellent";
  if (timePerPit > 5) efficiencyRating = "Average";
  if (timePerPit > 10) efficiencyRating = "Poor";

  document.getElementById("remainingXP").innerText = `XP remaining to Paragon 300: ${(xpRemaining * 1000000).toLocaleString()} XP`;
  document.getElementById("pitsRequired").innerText = `Pits required: ${pitsRequired} (Tier ${pitTier})`;
  document.getElementById("totalTime").innerText = `Estimated total time: ${hours}h ${minutes}m`;
  document.getElementById("efficiency").innerHTML = `
      Efficiency: <strong>${efficiencyRating}</strong><br>
      XP per Pit: ${xpPerPit.toFixed(1)} million<br>
      Active bonuses: ${elixirChecked ? 'Elixir (5%) ' : ''}${incenseChecked ? 'Incense (8%)' : ''}
  `;
}


document.addEventListener('DOMContentLoaded', function () {
  setupDarkMode();


  const pitTierSelect = document.getElementById("pitTier");
  if (pitTierSelect) {
    pitData.forEach(pit => {
      const option = document.createElement("option");
      option.value = pit.tier;
      option.textContent = `Pit ${pit.tier} (${pit.completionXP}M XP)`;
      pitTierSelect.appendChild(option);
    });

    document.getElementById("currentLevel").value = 200;
    document.getElementById("pitTime").value = 2.5;
    document.getElementById("pitTier").value = 100;
  }
});
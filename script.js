// script.js

const XP_TOTAL_TO_300 = 24000000000;

const paragonProgress = [
  { level: 0, xp: 0 },
  { level: 243, xp: 2400000000 }, // ~10%
  { level: 261, xp: 7200000000 }, // ~30%
  { level: 271, xp: 9600000000 }, // ~40%
  { level: 278, xp: 12000000000 }, // ~50%
  { level: 284, xp: 14400000000 }, // ~60%
  { level: 288, xp: 16800000000 }, // ~70%
  { level: 292, xp: 19200000000 }, // ~80%
  { level: 295, xp: 21600000000 }, // ~90%
  { level: 298, xp: 22800000000 }, // ~95%
  { level: 300, xp: 24000000000 }, // 100%
];

const pitXPs = {
  65: 5883075,
  70: 6191164,
  75: 6493035,
  80: 6794906,
  85: 7096778,
  90: 7401081,
  95: 7700520,
  100: 7950000,
  110: 8592620,
  120: 9197734,
  130: 9798301,
  140: 10401143,
  150: 11003985,
};

function getXPFromLevel(level) {
  if (level >= 300) return XP_TOTAL_TO_300;

  for (let i = 1; i < paragonProgress.length; i++) {
    if (level < paragonProgress[i].level) {
      const lower = paragonProgress[i - 1];
      const upper = paragonProgress[i];
      const ratio = (level - lower.level) / (upper.level - lower.level);
      return lower.xp + ratio * (upper.xp - lower.xp);
    }
  }
  return 0;
}

function formatNumber(num) {
  return num.toLocaleString('en-US');
}

function calcular() {
  const nivelAtual = parseInt(document.getElementById('nivelAtual').value);
  const tempoPorPit = parseFloat(document.getElementById('tempoPit').value);
  const pitTier = parseInt(document.getElementById('pitTier').value);
  const elixirChecked = document.getElementById('elixir').checked;
  const incenseChecked = document.getElementById('incense').checked;

  if (nivelAtual >= 300 || !pitXPs[pitTier]) {
    document.getElementById('xpFaltante').innerText = 'XP remaining: 0';
    document.getElementById('pitsNecessarios').innerText = 'Runs needed: 0';
    document.getElementById('tempoTotal').innerText = 'Time required: 0h 0m';
    return;
  }

  const xpAtual = getXPFromLevel(nivelAtual);
  const xpFaltante = XP_TOTAL_TO_300 - xpAtual;

  let xpPorPit = pitXPs[pitTier];
  if (elixirChecked) xpPorPit *= 1.08;
  if (incenseChecked) xpPorPit *= 1.05;

  const pitsNecessarios = Math.ceil(xpFaltante / xpPorPit);
  const tempoTotalMinutos = pitsNecessarios * tempoPorPit;

  const horas = Math.floor(tempoTotalMinutos / 60);
  const minutos = Math.round(tempoTotalMinutos % 60);

  document.getElementById('xpFaltante').innerText = `XP remaining to Paragon 300: ${formatNumber(xpFaltante)} XP`;
  document.getElementById('pitsNecessarios').innerText = `Pits required: ${pitsNecessarios}`;
  document.getElementById('tempoTotal').innerText = `Estimated total time: ${horas}h ${minutos}m`;
}

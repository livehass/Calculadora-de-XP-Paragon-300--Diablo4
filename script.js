function calcular() {
  const nivelAtual = parseInt(document.getElementById('nivelAtual').value);
  const tempoPorPit = parseFloat(document.getElementById('tempoPit').value);
  const pitNivel = parseInt(document.getElementById('pitSelect').value);
  const elixir = document.getElementById('elixir').checked;
  const incenso = document.getElementById('incenso').checked;

  if (nivelAtual < 1 || nivelAtual > 300) {
    alert("Level must be between 1 and 300.");
    return;
  }

  // XP total necessário até o nível 300
  const xpTotalAte300 = 24000000000;

  // XP base por dificuldade de Pit
  const xpPorPitBase = {
    6: 12000000,
    7: 15000000,
    8: 18000000,
    9: 21000000,
    10: 24000000
  };

  // Aumentar XP com elixir/incenso
  let xpPorPit = xpPorPitBase[pitNivel];
  if (elixir) xpPorPit *= 1.05;
  if (incenso) xpPorPit *= 1.05;

  // Estimar XP atual com base no nível
  let percentualAtual = 0;
  if (nivelAtual >= 300) {
    percentualAtual = 100;
  } else if (nivelAtual >= 284) {
    percentualAtual = 50 + ((nivelAtual - 284) / (300 - 284)) * 50;
  } else if (nivelAtual >= 243) {
    percentualAtual = ((nivelAtual - 243) / (284 - 243)) * 50;
  } else {
    percentualAtual = (nivelAtual / 243) * 10;
  }

  const xpAtual = (percentualAtual / 100) * xpTotalAte300;
  const xpFaltante = Math.max(0, xpTotalAte300 - xpAtual);

  const pitsNecessarios = Math.ceil(xpFaltante / xpPorPit);
  const tempoTotalMinutos = pitsNecessarios * tempoPorPit;
  const horas = Math.floor(tempoTotalMinutos / 60);
  const minutos = Math.round(tempoTotalMinutos % 60);

  document.getElementById('xpFaltante').innerText =
    `Remaining XP to reach Paragon 300: ${xpFaltante.toLocaleString('en-US')} XP`;

  document.getElementById('pitsNecessarios').innerText =
    `Pits needed: ${pitsNecessarios}`;

  document.getElementById('tempoTotal').innerText =
    `Estimated total time: ${horas} hour(s) and ${minutos} minute(s)`;
}

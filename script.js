function calcular() {
    const nivelAtual = parseInt(document.getElementById('nivelAtual').value);
    const tempoPorPit = parseFloat(document.getElementById('tempoPit').value);
    const xpPorPit = parseFloat(document.getElementById('xpPit').value) * 1000000;
    
  // 24 bilhões XP até Paragon 300
    const xpTotalAte300 = 24000000000; 

    // Estimativa de progressão pelo gráfico
    let percentualAtual = 0;

    if (nivelAtual >= 300) {
        percentualAtual = 100;
    } else if (nivelAtual >= 284) {
        percentualAtual = 50 + ((nivelAtual - 284) / (300 - 284)) * 50;
    } else if (nivelAtual >= 243) {
        percentualAtual = ((nivelAtual - 243) / (284 - 243)) * 50;
    } else {
        // antes do 243 é muito raso
        percentualAtual = (nivelAtual / 243) * 10; 
    }

    const xpAtual = (percentualAtual / 100) * xpTotalAte300;
    const xpFaltante = xpTotalAte300 - xpAtual;

    const pitsNecessarios = Math.ceil(xpFaltante / xpPorPit);
    const tempoTotalMinutos = pitsNecessarios * tempoPorPit;
    const horas = Math.floor(tempoTotalMinutos / 60);
    const minutos = Math.round(tempoTotalMinutos % 60);

    document.getElementById('xpFaltante').innerText = `XP restante até Paragon 300: ${xpFaltante.toLocaleString('pt-BR')} XP`;
    document.getElementById('pitsNecessarios').innerText = `Pits necessários: ${pitsNecessarios}`;
    document.getElementById('tempoTotal').innerText = `Tempo total estimado: ${horas} horas e ${minutos} minutos`;
}

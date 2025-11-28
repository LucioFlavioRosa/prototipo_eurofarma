// forecast-analyzer.js
// Implementação de cálculo de acuracidade de forecast para PCP

function calcularMAPE(previsao, realizado) {
  // previsao e realizado: arrays de números
  let somaErro = 0;
  let n = previsao.length;
  for (let i = 0; i < n; i++) {
    if (realizado[i] === 0) continue; // evitar divisão por zero
    somaErro += Math.abs((realizado[i] - previsao[i]) / realizado[i]);
  }
  return ((somaErro / n) * 100).toFixed(2); // percentual
}

function calcularBias(previsao, realizado) {
  let somaBias = 0;
  let n = previsao.length;
  for (let i = 0; i < n; i++) {
    somaBias += (previsao[i] - realizado[i]);
  }
  return (somaBias / n).toFixed(2);
}

function identificarPadraoErro(previsao, realizado) {
  // Retorna insights simples sobre padrões de erro
  let erros = realizado.map((r, i) => r - previsao[i]);
  let positivos = erros.filter(e => e > 0).length;
  let negativos = erros.filter(e => e < 0).length;
  if (positivos > negativos) {
    return "Tendência de subprevisão: vendas reais acima do previsto.";
  } else if (negativos > positivos) {
    return "Tendência de superprevisão: vendas reais abaixo do previsto.";
  } else {
    return "Previsão equilibrada, sem padrão dominante de erro.";
  }
}

function gerarInsights(previsao, realizado) {
  const mape = calcularMAPE(previsao, realizado);
  const bias = calcularBias(previsao, realizado);
  const padrao = identificarPadraoErro(previsao, realizado);
  return {
    MAPE: mape,
    Bias: bias,
    Padrao: padrao
  };
}

// Exemplo de uso:
// const previsao = [1200, 1300, 1100, 1400, 1500];
// const realizado = [1250, 1280, 1050, 1450, 1480];
// const resultado = gerarInsights(previsao, realizado);
// console.log(resultado);
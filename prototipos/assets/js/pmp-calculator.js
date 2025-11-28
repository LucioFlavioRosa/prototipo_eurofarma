// Algoritmo PCP - Necessidade de Produção Mensal
// Simula cálculo: Necessidade = Previsão de Vendas - Estoque Atual + Política de Estoque, arredondado para múltiplos de lote
// Inclui validação de capacidade e geração de alertas

function calcularNecessidadeProducao({estoque, previsao, politica, lote, capacidade}) {
  // Para cada mês (array previsao)
  return previsao.map((venda, mesIdx) => {
    let necessidade = venda - estoque + politica;
    if (necessidade < 0) necessidade = 0;
    // Arredonda para múltiplo de lote
    const necessidadeLote = Math.ceil(necessidade / lote) * lote;
    // Validação de capacidade
    let alerta = 'green';
    if (necessidadeLote > capacidade) alerta = 'red';
    else if (necessidadeLote > capacidade * 0.85) alerta = 'yellow';
    return {
      mes: mesIdx + 1,
      necessidade,
      necessidadeLote,
      capacidade,
      alerta
    };
  });
}

// Exemplo de uso:
// const resultado = calcularNecessidadeProducao({estoque:12000, previsao:[8000,9000,...], politica:5000, lote:1000, capacidade:12000});
// resultado[0] => {mes:1, necessidade:..., necessidadeLote:..., capacidade:..., alerta:'green'|'yellow'|'red'}

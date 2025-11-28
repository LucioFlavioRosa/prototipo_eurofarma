// order-risk-analyzer.js
// Algoritmo para cruzar pedidos, estoque e sequenciamento, identificar riscos e sugerir antecipações

export function analisarPedidos(pedidos, estoque, sequenciamento) {
  // pedidos: [{id, cliente, produto, qtd, data_entrega}]
  // estoque: {produto: qtdAtual}
  // sequenciamento: [{produto, data, qtdPrevista}]

  const riscos = [];
  pedidos.forEach(pedido => {
    const estoqueAtual = estoque[pedido.produto] || 0;
    const qtdSequenciada = sequenciamento
      .filter(s => s.produto === pedido.produto && new Date(s.data) <= new Date(pedido.data_entrega))
      .reduce((acc, s) => acc + s.qtdPrevista, 0);
    const totalDisponivel = estoqueAtual + qtdSequenciada;
    if (totalDisponivel < pedido.qtd) {
      // Risco de ruptura
      const falta = pedido.qtd - totalDisponivel;
      // Sugerir antecipação
      riscos.push({
        pedidoId: pedido.id,
        produto: pedido.produto,
        qtdFalta: falta,
        impactoFaturamento: calcularFaturamento(pedido.produto, falta),
        impactoMargem: calcularMargem(pedido.produto, falta),
        sugestao: `Antecipar produção de ${falta} unidades de ${pedido.produto} até ${pedido.data_entrega}`
      });
    }
  });
  return riscos;
}

function calcularFaturamento(produto, qtd) {
  // Exemplo realista: preço unitário por produto
  const precos = {
    'Amoxilina 500mg': 3.2,
    'Dipirona 1g': 1.5,
    'Losartana 50mg': 3.5
  };
  return precos[produto] ? precos[produto] * qtd : 0;
}

function calcularMargem(produto, qtd) {
  // Exemplo: margem unitária
  const margens = {
    'Amoxilina 500mg': 1.05,
    'Dipirona 1g': 0.45,
    'Losartana 50mg': 1.1
  };
  return margens[produto] ? margens[produto] * qtd : 0;
}

// Exemplo de uso:
// const riscos = analisarPedidos(pedidos, estoque, sequenciamento);
// riscos.forEach(r => console.log(r.sugestao));
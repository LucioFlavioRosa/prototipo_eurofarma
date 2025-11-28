// Algoritmo de monitoramento de matéria-prima e alertas proativos
// Considera necessidade de produção, estoque disponível, pedidos em trânsito e calcula dias de cobertura

export function calcularCobertura(estoqueAtual, consumoDiario) {
  if (consumoDiario <= 0) return Infinity;
  return +(estoqueAtual / consumoDiario).toFixed(1);
}

export function gerarAlertas(insumos, necessidades, pedidosEmTransito) {
  // insumos: [{ sku, nome, estoque, consumoDiario, status }]
  // necessidades: [{ sku, necessidadeMensal }]
  // pedidosEmTransito: [{ sku, quantidade, chegadaPrevista }]
  const alertas = [];
  insumos.forEach(insumo => {
    const necessidade = necessidades.find(n => n.sku === insumo.sku);
    const pedido = pedidosEmTransito.filter(p => p.sku === insumo.sku);
    const cobertura = calcularCobertura(insumo.estoque, insumo.consumoDiario);
    let status = 'OK';
    let mensagem = '';
    if (cobertura < 7) {
      status = 'RISCO';
      mensagem = `Cobertura baixa (${cobertura} dias)`;
    }
    if (insumo.status === 'bloqueado') {
      status = 'ALERTA';
      mensagem = 'Lote bloqueado pela qualidade';
    }
    if (necessidade && insumo.estoque + (pedido.reduce((a,b)=>a+b.quantidade,0)) < necessidade.necessidadeMensal) {
      status = 'RUPTURA';
      mensagem = 'Estoque insuficiente para necessidade do mês';
    }
    alertas.push({ sku: insumo.sku, nome: insumo.nome, status, mensagem, cobertura });
  });
  return alertas;
}

// Exemplo de uso:
/*
const insumos = [
  { sku: 'MAT001', nome: 'Ácido Acetilsalicílico', estoque: 1200, consumoDiario: 200, status: 'liberado' },
  { sku: 'MAT002', nome: 'Celulose Microcristalina', estoque: 400, consumoDiario: 90, status: 'bloqueado' },
  { sku: 'MAT003', nome: 'Lactose Monoidratada', estoque: 800, consumoDiario: 120, status: 'liberado' },
];
const necessidades = [
  { sku: 'MAT001', necessidadeMensal: 6000 },
  { sku: 'MAT002', necessidadeMensal: 2700 },
  { sku: 'MAT003', necessidadeMensal: 3600 },
];
const pedidosEmTransito = [
  { sku: 'MAT001', quantidade: 2000, chegadaPrevista: '2024-07-05' },
  { sku: 'MAT003', quantidade: 1000, chegadaPrevista: '2024-07-10' },
];
console.log(gerarAlertas(insumos, necessidades, pedidosEmTransito));
*/
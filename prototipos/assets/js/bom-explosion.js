// Lógica de Explosão de BOM (Bill of Materials) - PCP Eurofarma
// Dados mockados de estruturas de produto e roteiros de fabricação
const BOM_DATA = [
  {
    sku: 'PROD-001',
    descricao: 'Amoxilina 500mg 30cp',
    lote_min: 10000,
    componentes: [
      { sku: 'GRANEL-001', descricao: 'Granel Amoxilina', quantidade: 1 },
      { sku: 'EMB-PRIM-001', descricao: 'Blister 10cp', quantidade: 3 },
      { sku: 'EMB-SEC-001', descricao: 'Cartucho 30cp', quantidade: 1 }
    ]
  },
  {
    sku: 'GRANEL-001',
    descricao: 'Granel Amoxilina',
    lote_min: 10000,
    componentes: [
      { sku: 'MAT-API-001', descricao: 'API Amoxilina', quantidade: 0.5 },
      { sku: 'MAT-EXCIP-001', descricao: 'Excipiente', quantidade: 0.2 }
    ]
  }
];

const EQUIPAMENTOS = [
  { id: 'EQP-01', nome: 'Misturador Granel', capacidade_mensal: 50000 },
  { id: 'EQP-02', nome: 'Blisteradora', capacidade_mensal: 30000 },
  { id: 'EQP-03', nome: 'Cartuchadora', capacidade_mensal: 25000 }
];

// Explosão recursiva de BOM
function explodirBOM(sku, quantidadeNecessaria, resultado = []) {
  const item = BOM_DATA.find(b => b.sku === sku);
  if (!item) return resultado;
  resultado.push({ sku: item.sku, descricao: item.descricao, quantidade: quantidadeNecessaria });
  if (item.componentes) {
    item.componentes.forEach(comp => {
      explodirBOM(comp.sku, comp.quantidade * quantidadeNecessaria, resultado);
    });
  }
  return resultado;
}

// Validação de capacidade dos equipamentos
function validarCapacidade(equipamentoId, quantidadeNecessaria) {
  const eq = EQUIPAMENTOS.find(e => e.id === equipamentoId);
  if (!eq) return { status: 'erro', mensagem: 'Equipamento não encontrado.' };
  return quantidadeNecessaria <= eq.capacidade_mensal
    ? { status: 'ok', mensagem: 'Capacidade suficiente.' }
    : { status: 'alerta', mensagem: 'Capacidade insuficiente!' };
}

// Exemplo de uso para interface
window.PCPBOM = {
  explodirBOM,
  validarCapacidade,
  BOM_DATA,
  EQUIPAMENTOS
};
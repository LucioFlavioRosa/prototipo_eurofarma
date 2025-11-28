// Dados mock realistas para PCP Eurofarma
// SKUs farmacêuticos
const skus = [
  {
    id: 'SKU001',
    nome: 'Paracetamol 500mg',
    tipo: 'Comprimido',
    unidade: 'cx 20',
    estoqueAtual: 120000,
    previsaoVendas: [95000, 98000, 102000, 105000, 110000, 115000, 117000, 120000, 125000, 128000, 130000, 135000],
    politicaEstoque: 25000,
    loteMinimo: 5000
  },
  {
    id: 'SKU002',
    nome: 'Ibuprofeno 600mg',
    tipo: 'Comprimido',
    unidade: 'cx 30',
    estoqueAtual: 80000,
    previsaoVendas: [70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 88000, 90000, 92000],
    politicaEstoque: 20000,
    loteMinimo: 4000
  },
  {
    id: 'SKU003',
    nome: 'Dipirona 1g',
    tipo: 'Comprimido',
    unidade: 'cx 10',
    estoqueAtual: 60000,
    previsaoVendas: [55000, 56000, 57000, 58000, 59000, 60000, 61000, 62000, 63000, 64000, 65000, 66000],
    politicaEstoque: 15000,
    loteMinimo: 3000
  }
];

// Estruturas de produto (BOM)
const estruturasProduto = [
  {
    sku: 'SKU001',
    granel: {
      id: 'GRN001',
      nome: 'Paracetamol Granel',
      quantidadePorCaixa: 20
    },
    embalagemPrimaria: {
      id: 'EMP001',
      nome: 'Blister Alu-PVC',
      quantidadePorCaixa: 2
    },
    embalagemSecundaria: {
      id: 'EMS001',
      nome: 'Cartucho Papel',
      quantidadePorCaixa: 1
    }
  },
  {
    sku: 'SKU002',
    granel: {
      id: 'GRN002',
      nome: 'Ibuprofeno Granel',
      quantidadePorCaixa: 30
    },
    embalagemPrimaria: {
      id: 'EMP002',
      nome: 'Blister Alu-PVC',
      quantidadePorCaixa: 3
    },
    embalagemSecundaria: {
      id: 'EMS002',
      nome: 'Cartucho Papel',
      quantidadePorCaixa: 1
    }
  }
];

// Capacidades de equipamentos
const equipamentos = [
  {
    id: 'EQP001',
    nome: 'Comprimideira Fette 2090',
    tipo: 'Comprimidos',
    capacidadeMensal: 150000,
    turnos: 3,
    manutencaoProgramada: ['2024-07-15', '2024-10-10']
  },
  {
    id: 'EQP002',
    nome: 'Blisteira Uhlmann BEC 500',
    tipo: 'Embalagem Primária',
    capacidadeMensal: 120000,
    turnos: 2,
    manutencaoProgramada: ['2024-08-20']
  },
  {
    id: 'EQP003',
    nome: 'Cartucheira Marchesini',
    tipo: 'Embalagem Secundária',
    capacidadeMensal: 100000,
    turnos: 2,
    manutencaoProgramada: []
  }
];

// Pedidos de clientes
const pedidos = [
  {
    id: 'PED001',
    cliente: 'Drogaria São Paulo',
    sku: 'SKU001',
    quantidade: 25000,
    dataEntrega: '2024-07-10',
    status: 'Pendente'
  },
  {
    id: 'PED002',
    cliente: 'Raia Drogasil',
    sku: 'SKU002',
    quantidade: 18000,
    dataEntrega: '2024-07-15',
    status: 'Confirmado'
  },
  {
    id: 'PED003',
    cliente: 'Pacheco',
    sku: 'SKU003',
    quantidade: 12000,
    dataEntrega: '2024-07-20',
    status: 'Pendente'
  }
];

// Histórico de produção
const historicoProducao = [
  {
    sku: 'SKU001',
    mes: '2024-06',
    produzido: 95000,
    ociosidade: 0.08,
    setup: 12
  },
  {
    sku: 'SKU002',
    mes: '2024-06',
    produzido: 70000,
    ociosidade: 0.12,
    setup: 9
  }
];

// Carteira de pedidos SAP
const carteiraPedidos = [
  {
    id: 'SAP001',
    cliente: 'Hospital Albert Einstein',
    sku: 'SKU001',
    quantidade: 10000,
    dataEntrega: '2024-07-12',
    status: 'Em análise'
  },
  {
    id: 'SAP002',
    cliente: 'Drogasil',
    sku: 'SKU002',
    quantidade: 8000,
    dataEntrega: '2024-07-18',
    status: 'Pendente'
  }
];

// Status de matéria-prima
const materiasPrimas = [
  {
    id: 'MP001',
    nome: 'Paracetamol API',
    estoque: 35000,
    status: 'Liberado'
  },
  {
    id: 'MP002',
    nome: 'Ibuprofeno API',
    estoque: 25000,
    status: 'Bloqueado'
  },
  {
    id: 'MP003',
    nome: 'PVC Blister',
    estoque: 90000,
    status: 'Em análise'
  }
];

// Exportação dos dados para uso global
export {
  skus,
  estruturasProduto,
  equipamentos,
  pedidos,
  historicoProducao,
  carteiraPedidos,
  materiasPrimas
};
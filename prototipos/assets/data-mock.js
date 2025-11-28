// data-mock.js - Dados mockados realistas para protótipo PCP Eurofarma
window.EurofarmaMockData = {
  skus: [
    { sku: 'EFM001', nome: 'Amoxicilina 500mg', familia: 'Antibióticos', embalagem: 'Caixa 21 cápsulas', estoque: 12500 },
    { sku: 'EFM002', nome: 'Dipirona Sódica 1g', familia: 'Analgésicos', embalagem: 'Caixa 10 comprimidos', estoque: 9800 },
    { sku: 'EFM003', nome: 'Losartana Potássica 50mg', familia: 'Antihipertensivos', embalagem: 'Caixa 30 comprimidos', estoque: 14200 },
    { sku: 'EFM004', nome: 'Cloridrato de Metformina 850mg', familia: 'Antidiabéticos', embalagem: 'Caixa 60 comprimidos', estoque: 8700 },
    { sku: 'EFM005', nome: 'Azitromicina 500mg', familia: 'Antibióticos', embalagem: 'Caixa 3 comprimidos', estoque: 4100 },
    { sku: 'EFM006', nome: 'Ibuprofeno 600mg', familia: 'Anti-inflamatórios', embalagem: 'Caixa 20 comprimidos', estoque: 7600 },
    { sku: 'EFM007', nome: 'Enalapril 20mg', familia: 'Antihipertensivos', embalagem: 'Caixa 30 comprimidos', estoque: 6500 },
    { sku: 'EFM008', nome: 'Cetoconazol 200mg', familia: 'Antifúngicos', embalagem: 'Caixa 30 comprimidos', estoque: 3200 },
    { sku: 'EFM009', nome: 'Levotiroxina Sódica 100mcg', familia: 'Hormônios', embalagem: 'Caixa 30 comprimidos', estoque: 5400 },
    { sku: 'EFM010', nome: 'Omeprazol 20mg', familia: 'Gastrintestinais', embalagem: 'Caixa 28 cápsulas', estoque: 11200 },
    { sku: 'EFM011', nome: 'Sinvastatina 20mg', familia: 'Hipolipemiantes', embalagem: 'Caixa 30 comprimidos', estoque: 7800 },
    { sku: 'EFM012', nome: 'Paracetamol 750mg', familia: 'Analgésicos', embalagem: 'Caixa 20 comprimidos', estoque: 13400 },
    { sku: 'EFM013', nome: 'Clopidogrel 75mg', familia: 'Antitrombóticos', embalagem: 'Caixa 30 comprimidos', estoque: 3900 },
    { sku: 'EFM014', nome: 'Captopril 25mg', familia: 'Antihipertensivos', embalagem: 'Caixa 30 comprimidos', estoque: 5100 },
    { sku: 'EFM015', nome: 'Fluconazol 150mg', familia: 'Antifúngicos', embalagem: 'Caixa 2 cápsulas', estoque: 2100 }
  ],
  ordensProducao: Array.from({length: 40}, (_, i) => {
    const skus = [
      'EFM001', 'EFM002', 'EFM003', 'EFM004', 'EFM005', 'EFM006', 'EFM007', 'EFM008', 'EFM009', 'EFM010',
      'EFM011', 'EFM012', 'EFM013', 'EFM014', 'EFM015'
    ];
    const status = ['Planejada', 'Em Execução', 'Finalizada', 'Aguardando Liberação'];
    const turno = ['1º', '2º', '3º'];
    return {
      ordem: 1000 + i,
      sku: skus[i % skus.length],
      produto: window.EurofarmaMockData ? window.EurofarmaMockData.skus[i % skus.length].nome : '',
      quantidade: 10000 + (i % 7) * 2500,
      dataInicio: `2024-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      dataFim: `2024-07-${((i % 28 + 3) > 28 ? 28 : (i % 28 + 3)).toString().padStart(2, '0')}`,
      status: status[i % status.length],
      turno: turno[i % turno.length],
      equipamento: `Linha ${1 + (i % 6)}`
    };
  }),
  pedidosClientes: [
    { pedido: 'PD-202407-001', cliente: 'Drogasil', sku: 'EFM001', produto: 'Amoxicilina 500mg', quantidade: 1200, dataEntrega: '2024-07-10', status: 'Em Produção' },
    { pedido: 'PD-202407-002', cliente: 'Raia', sku: 'EFM002', produto: 'Dipirona Sódica 1g', quantidade: 900, dataEntrega: '2024-07-12', status: 'Atendido' },
    { pedido: 'PD-202407-003', cliente: 'Pague Menos', sku: 'EFM003', produto: 'Losartana Potássica 50mg', quantidade: 800, dataEntrega: '2024-07-13', status: 'Em Produção' },
    { pedido: 'PD-202407-004', cliente: 'Drogaria São Paulo', sku: 'EFM004', produto: 'Cloridrato de Metformina 850mg', quantidade: 700, dataEntrega: '2024-07-15', status: 'Aguardando Estoque' },
    { pedido: 'PD-202407-005', cliente: 'Panvel', sku: 'EFM005', produto: 'Azitromicina 500mg', quantidade: 600, dataEntrega: '2024-07-17', status: 'Atendido' },
    { pedido: 'PD-202407-006', cliente: 'Drogaria Venancio', sku: 'EFM006', produto: 'Ibuprofeno 600mg', quantidade: 1100, dataEntrega: '2024-07-19', status: 'Em Produção' },
    { pedido: 'PD-202407-007', cliente: 'Ultrafarma', sku: 'EFM007', produto: 'Enalapril 20mg', quantidade: 950, dataEntrega: '2024-07-20', status: 'Aguardando Estoque' },
    { pedido: 'PD-202407-008', cliente: 'Drogaria Araujo', sku: 'EFM008', produto: 'Cetoconazol 200mg', quantidade: 400, dataEntrega: '2024-07-21', status: 'Atendido' },
    { pedido: 'PD-202407-009', cliente: 'Extrafarma', sku: 'EFM009', produto: 'Levotiroxina Sódica 100mcg', quantidade: 550, dataEntrega: '2024-07-22', status: 'Em Produção' },
    { pedido: 'PD-202407-010', cliente: 'Onofre', sku: 'EFM010', produto: 'Omeprazol 20mg', quantidade: 1300, dataEntrega: '2024-07-23', status: 'Atendido' },
    { pedido: 'PD-202407-011', cliente: 'Drogaria Pacheco', sku: 'EFM011', produto: 'Sinvastatina 20mg', quantidade: 800, dataEntrega: '2024-07-24', status: 'Em Produção' },
    { pedido: 'PD-202407-012', cliente: 'Farmácias Nissei', sku: 'EFM012', produto: 'Paracetamol 750mg', quantidade: 1200, dataEntrega: '2024-07-25', status: 'Atendido' },
    { pedido: 'PD-202407-013', cliente: 'Drogaria Moderna', sku: 'EFM013', produto: 'Clopidogrel 75mg', quantidade: 350, dataEntrega: '2024-07-26', status: 'Aguardando Estoque' },
    { pedido: 'PD-202407-014', cliente: 'Drogaria Coop', sku: 'EFM014', produto: 'Captopril 25mg', quantidade: 500, dataEntrega: '2024-07-27', status: 'Em Produção' },
    { pedido: 'PD-202407-015', cliente: 'Drogaria Iguatemi', sku: 'EFM015', produto: 'Fluconazol 150mg', quantidade: 200, dataEntrega: '2024-07-28', status: 'Atendido' },
    { pedido: 'PD-202407-016', cliente: 'Drogaria São João', sku: 'EFM001', produto: 'Amoxicilina 500mg', quantidade: 700, dataEntrega: '2024-07-29', status: 'Aguardando Estoque' },
    { pedido: 'PD-202407-017', cliente: 'Drogaria Catarinense', sku: 'EFM002', produto: 'Dipirona Sódica 1g', quantidade: 600, dataEntrega: '2024-07-30', status: 'Em Produção' },
    { pedido: 'PD-202407-018', cliente: 'Drogaria Total', sku: 'EFM003', produto: 'Losartana Potássica 50mg', quantidade: 900, dataEntrega: '2024-08-01', status: 'Atendido' },
    { pedido: 'PD-202407-019', cliente: 'Drogaria Econômica', sku: 'EFM004', produto: 'Cloridrato de Metformina 850mg', quantidade: 800, dataEntrega: '2024-08-02', status: 'Em Produção' },
    { pedido: 'PD-202407-020', cliente: 'Drogaria Avenida', sku: 'EFM005', produto: 'Azitromicina 500mg', quantidade: 400, dataEntrega: '2024-08-03', status: 'Aguardando Estoque' },
    { pedido: 'PD-202407-021', cliente: 'Drogaria Rosário', sku: 'EFM006', produto: 'Ibuprofeno 600mg', quantidade: 700, dataEntrega: '2024-08-04', status: 'Atendido' },
    { pedido: 'PD-202407-022', cliente: 'Drogaria Popular', sku: 'EFM007', produto: 'Enalapril 20mg', quantidade: 600, dataEntrega: '2024-08-05', status: 'Em Produção' },
    { pedido: 'PD-202407-023', cliente: 'Drogaria São Bento', sku: 'EFM008', produto: 'Cetoconazol 200mg', quantidade: 350, dataEntrega: '2024-08-06', status: 'Atendido' },
    { pedido: 'PD-202407-024', cliente: 'Drogaria Unida', sku: 'EFM009', produto: 'Levotiroxina Sódica 100mcg', quantidade: 400, dataEntrega: '2024-08-07', status: 'Aguardando Estoque' },
    { pedido: 'PD-202407-025', cliente: 'Drogaria Ultra', sku: 'EFM010', produto: 'Omeprazol 20mg', quantidade: 1200, dataEntrega: '2024-08-08', status: 'Em Produção' }
  ],
  insumosCriticos: [
    { insumo: 'Ácido Clavulânico', estoque: 120, unidade: 'kg', status: 'Liberado' },
    { insumo: 'Celulose Microcristalina', estoque: 250, unidade: 'kg', status: 'Em Análise' },
    { insumo: 'Estearato de Magnésio', estoque: 90, unidade: 'kg', status: 'Liberado' },
    { insumo: 'Lactose Monoidratada', estoque: 180, unidade: 'kg', status: 'Bloqueado' },
    { insumo: 'Amido de Milho', estoque: 300, unidade: 'kg', status: 'Liberado' },
    { insumo: 'Povidona', estoque: 60, unidade: 'kg', status: 'Liberado' },
    { insumo: 'Dióxido de Silício', estoque: 45, unidade: 'kg', status: 'Em Análise' },
    { insumo: 'Talco Farmacêutico', estoque: 70, unidade: 'kg', status: 'Liberado' },
    { insumo: 'Polietileno Glicol', estoque: 55, unidade: 'kg', status: 'Bloqueado' },
    { insumo: 'Estearato de Zinco', estoque: 35, unidade: 'kg', status: 'Liberado' },
    { insumo: 'Ácido Ascórbico', estoque: 40, unidade: 'kg', status: 'Em Análise' },
    { insumo: 'Ácido Fólico', estoque: 15, unidade: 'kg', status: 'Liberado' }
  ],
  equipamentos: [
    { id: 'EQ01', nome: 'Comprimidora Fette', tipo: 'Comprimidos', capacidade: 120000, status: 'Operando' },
    { id: 'EQ02', nome: 'Envasadora Bosch', tipo: 'Cápsulas', capacidade: 90000, status: 'Manutenção' },
    { id: 'EQ03', nome: 'Misturador V', tipo: 'Mistura', capacidade: 150000, status: 'Operando' },
    { id: 'EQ04', nome: 'Blister Pack Uhlmann', tipo: 'Embalagem', capacidade: 100000, status: 'Operando' },
    { id: 'EQ05', nome: 'Reator Químico', tipo: 'Reação', capacidade: 60000, status: 'Parado' },
    { id: 'EQ06', nome: 'Secador de Leito Fluidizado', tipo: 'Secagem', capacidade: 80000, status: 'Operando' }
  ],
  fornecedores: [
    { id: 'F01', nome: 'Quimifarma', leadTime: 12, performance: 97 },
    { id: 'F02', nome: 'Farmoquímica', leadTime: 15, performance: 93 },
    { id: 'F03', nome: 'Ingredion', leadTime: 10, performance: 99 }
  ],
  ordensTerceirizacao: Array.from({length: 10}, (_, i) => ({
    ordem: 2000 + i,
    fornecedor: ['Quimifarma', 'Farmoquímica', 'Ingredion'][i % 3],
    produto: window.EurofarmaMockData ? window.EurofarmaMockData.skus[i % 15].nome : '',
    quantidade: 5000 + (i % 5) * 1500,
    dataPrevista: `2024-08-${(5 + i).toString().padStart(2, '0')}`,
    status: ['Solicitada', 'Em Produção', 'Aguardando Entrega', 'Entregue'][i % 4]
  })),
  notificacoes: Array.from({length: 30}, (_, i) => ({
    id: 3000 + i,
    tipo: ['Alerta', 'Info', 'Aprovação', 'Ruptura'][i % 4],
    mensagem: [
      'Necessidade de produção excede capacidade da Linha 2',
      'Pedido PD-202407-008 entregue',
      'Solicitação de aprovação de replanejamento',
      'Risco de ruptura para Ibuprofeno 600mg',
      'Novo pedido recebido: Drogasil',
      'Ordem 1012 finalizada',
      'Estoque de Ácido Clavulânico abaixo do mínimo',
      'Aprovação pendente para cenário alternativo'
    ][i % 8],
    lida: i % 5 === 0,
    data: `2024-07-${(10 + (i % 20)).toString().padStart(2, '0')} 0${(i % 9) + 8}:00`
  })),
  solicitacoesAprovacao: Array.from({length: 8}, (_, i) => ({
    id: 4000 + i,
    solicitante: ['PCP Central', 'Supervisor Planta', 'Gerente PCP'][i % 3],
    descricao: [
      'Alteração de sequência na Linha 1',
      'Inclusão de turno extra',
      'Ajuste de lote mínimo',
      'Replanejamento de Ibuprofeno',
      'Aprovação de cenário simulado',
      'Realocação de produção para Planta 2'
    ][i % 6],
    status: ['Pendente', 'Aprovada', 'Rejeitada'][i % 3],
    data: `2024-07-${(15 + i).toString().padStart(2, '0')}`
  })),
  forecastHistorico: [
    { mes: '2023-08', previsto: 112000, realizado: 109500 },
    { mes: '2023-09', previsto: 118000, realizado: 120300 },
    { mes: '2023-10', previsto: 125000, realizado: 124000 },
    { mes: '2023-11', previsto: 130000, realizado: 128800 },
    { mes: '2023-12', previsto: 135000, realizado: 133500 },
    { mes: '2024-01', previsto: 140000, realizado: 139000 },
    { mes: '2024-02', previsto: 138000, realizado: 137500 },
    { mes: '2024-03', previsto: 142000, realizado: 141200 },
    { mes: '2024-04', previsto: 145000, realizado: 144800 },
    { mes: '2024-05', previsto: 148000, realizado: 147000 },
    { mes: '2024-06', previsto: 150000, realizado: 149200 },
    { mes: '2024-07', previsto: 153000, realizado: 0 }
  ],
  oeeHistorico: [
    { mes: '2024-02', oee: 82.3 },
    { mes: '2024-03', oee: 84.1 },
    { mes: '2024-04', oee: 85.7 },
    { mes: '2024-05', oee: 86.2 },
    { mes: '2024-06', oee: 83.9 },
    { mes: '2024-07', oee: 87.0 }
  ]
};

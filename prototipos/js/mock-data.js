// mock-data.js
// Dados mockados realistas e coerentes para toda a plataforma PCP

const produtos = [
  { sku: 'EF001', nome: 'Amoxicilina 500mg', familia: 'Antibióticos', lote: 'L2301' },
  { sku: 'EF002', nome: 'Dipirona 1g', familia: 'Analgésicos', lote: 'L2302' },
  { sku: 'EF003', nome: 'Losartana 50mg', familia: 'Anti-hipertensivos', lote: 'L2303' },
  { sku: 'EF004', nome: 'Paracetamol 750mg', familia: 'Analgésicos', lote: 'L2304' }
];

const plantas = [
  { codigo: 'PL01', nome: 'Planta Itapevi', capacidade: 120000 },
  { codigo: 'PL02', nome: 'Planta Ribeirão Preto', capacidade: 90000 }
];

const equipamentos = [
  { id: 'EQ01', nome: 'Comprimidora Fette', oee: 0.92, turnos: 3 },
  { id: 'EQ02', nome: 'Embaladora Marchesini', oee: 0.87, turnos: 2 },
  { id: 'EQ03', nome: 'Misturador Glatt', oee: 0.95, turnos: 2 }
];

const pedidos = [
  { numero: 'PED1001', cliente: 'Drogasil', produto: 'EF001', quantidade: 20000, data: '2024-07-05' },
  { numero: 'PED1002', cliente: 'Raia', produto: 'EF002', quantidade: 15000, data: '2024-07-10' },
  { numero: 'PED1003', cliente: 'Pacheco', produto: 'EF003', quantidade: 18000, data: '2024-07-12' },
  { numero: 'PED1004', cliente: 'Ultrafarma', produto: 'EF004', quantidade: 22000, data: '2024-07-15' }
];

const estoque = [
  { produto: 'EF001', quantidade: 12000, planta: 'PL01' },
  { produto: 'EF002', quantidade: 10000, planta: 'PL01' },
  { produto: 'EF003', quantidade: 8000, planta: 'PL02' },
  { produto: 'EF004', quantidade: 5000, planta: 'PL02' }
];

const previsaoVendas = [
  { produto: 'EF001', mes: '2024-07', quantidade: 25000 },
  { produto: 'EF002', mes: '2024-07', quantidade: 18000 },
  { produto: 'EF003', mes: '2024-07', quantidade: 20000 },
  { produto: 'EF004', mes: '2024-07', quantidade: 22000 }
];

const ordensProducao = [
  { id: 'OP1001', produto: 'EF001', quantidade: 20000, equipamento: 'EQ01', data: '2024-07-02' },
  { id: 'OP1002', produto: 'EF002', quantidade: 15000, equipamento: 'EQ02', data: '2024-07-03' },
  { id: 'OP1003', produto: 'EF003', quantidade: 18000, equipamento: 'EQ03', data: '2024-07-04' },
  { id: 'OP1004', produto: 'EF004', quantidade: 22000, equipamento: 'EQ01', data: '2024-07-05' }
];

const estoqueGranel = [
  { produto: 'EF001', quantidade: 35000, planta: 'PL01' },
  { produto: 'EF002', quantidade: 22000, planta: 'PL01' },
  { produto: 'EF003', quantidade: 17000, planta: 'PL02' },
  { produto: 'EF004', quantidade: 12000, planta: 'PL02' }
];

window.mockData = {
  produtos,
  plantas,
  equipamentos,
  pedidos,
  estoque,
  previsaoVendas,
  ordensProducao,
  estoqueGranel
};
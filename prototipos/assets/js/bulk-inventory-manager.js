// bulk-inventory-manager.js
// Lógica de cálculo de necessidade de granel, política de estoque de segurança, priorização por rotatividade e shelf life

class BulkInventoryManager {
  constructor(options = {}) {
    this.skus = options.skus || [];
    this.politicaEstoqueGranelMeses = options.politicaEstoqueGranelMeses || 2;
    this.lotes = options.lotes || [];
    this.rotatividade = options.rotatividade || {};
    this.shelfLifeMinimoDias = options.shelfLifeMinimoDias || 90;
  }

  calcularNecessidadeGranel(sku, previsaoVendas, estoqueAtual, loteMinimo) {
    // Política: manter sempre X meses de cobertura
    const necessidade = Math.max(0, (previsaoVendas * this.politicaEstoqueGranelMeses) - estoqueAtual);
    // Ajusta para múltiplo de lote mínimo
    const lotesNecessarios = Math.ceil(necessidade / loteMinimo);
    return lotesNecessarios * loteMinimo;
  }

  priorizarPorRotatividade() {
    // Retorna SKUs ordenados por rotatividade decrescente
    return this.skus.sort((a, b) => (this.rotatividade[b] || 0) - (this.rotatividade[a] || 0));
  }

  validarShelfLife(lote) {
    // Verifica se o shelf life do lote é suficiente
    const hoje = new Date();
    const vencimento = new Date(lote.dataVencimento);
    const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
    return diasRestantes >= this.shelfLifeMinimoDias;
  }

  alertasShelfLife() {
    // Retorna lotes próximos do vencimento
    return this.lotes.filter(lote => {
      const hoje = new Date();
      const vencimento = new Date(lote.dataVencimento);
      const diasRestantes = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
      return diasRestantes < this.shelfLifeMinimoDias;
    });
  }
}

// Exemplo de uso:
// const manager = new BulkInventoryManager({
//   skus: ['SKU001', 'SKU002'],
//   politicaEstoqueGranelMeses: 2,
//   lotes: [{sku: 'SKU001', dataVencimento: '2024-09-10'}],
//   rotatividade: {'SKU001': 500, 'SKU002': 200},
//   shelfLifeMinimoDias: 90
// });
// manager.calcularNecessidadeGranel('SKU001', 1000, 500, 250);
// manager.priorizarPorRotatividade();
// manager.validarShelfLife({sku: 'SKU001', dataVencimento: '2024-09-10'});
// manager.alertasShelfLife();
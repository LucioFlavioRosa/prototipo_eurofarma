// outsourcing-manager.js
// Gerenciador de priorização de produção interna vs. terceirizada e indicadores de performance

const fornecedores = [
  { nome: 'LabFarma', leadtime: 8, categoria: 'Produto Acabado', performance: 98 },
  { nome: 'BioTerceiros', leadtime: 10, categoria: 'Granel', performance: 87 },
  { nome: 'TerceirizaMais', leadtime: 12, categoria: 'Embalagem', performance: 74 }
];

const pedidos = [
  { pedido: 'PO-2025-0012', sku: 'AMOX500MG-30', fornecedor: 'LabFarma', qtd: 12000, leadtime: 8, prazo: '18/07/2025', status: 'No prazo', sequenciado: true },
  { pedido: 'PO-2025-0013', sku: 'PARA650MG-20', fornecedor: 'BioTerceiros', qtd: 7500, leadtime: 10, prazo: '15/07/2025', status: 'Atrasado', sequenciado: false },
  { pedido: 'PO-2025-0014', sku: 'VITA1000MG-60', fornecedor: 'LabFarma', qtd: 5000, leadtime: 8, prazo: '22/07/2025', status: 'No prazo', sequenciado: true },
  { pedido: 'PO-2025-0015', sku: 'OMEP20MG-14', fornecedor: 'TerceirizaMais', qtd: 10000, leadtime: 12, prazo: '10/07/2025', status: 'Atrasado', sequenciado: false }
];

function priorizarProducao(pedidos, fornecedores) {
  // Prioriza produção interna se fornecedor estiver com performance < 80% ou pedido atrasado
  return pedidos.map(p => {
    const fornecedor = fornecedores.find(f => f.nome === p.fornecedor);
    if (p.status === 'Atrasado' || (fornecedor && fornecedor.performance < 80)) {
      return { ...p, recomendacao: 'Priorizar produção interna' };
    } else {
      return { ...p, recomendacao: 'Manter terceirização' };
    }
  });
}

function calcularIndicadores(fornecedores, pedidos) {
  // Calcula % de pedidos no prazo por fornecedor
  return fornecedores.map(f => {
    const total = pedidos.filter(p => p.fornecedor === f.nome).length;
    const noPrazo = pedidos.filter(p => p.fornecedor === f.nome && p.status === 'No prazo').length;
    const percent = total > 0 ? ((noPrazo / total) * 100).toFixed(0) : 0;
    return { fornecedor: f.nome, performance: percent };
  });
}

// Integração com cadastro de fornecedores (exemplo de manipulação DOM)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formFornecedor');
  const list = document.getElementById('fornecedores-list');
  if (form && list) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const leadtime = parseInt(form.leadtime.value);
      const categoria = form.categoria.value;
      if (nome && leadtime > 0) {
        fornecedores.push({ nome, leadtime, categoria, performance: 100 });
        const el = document.createElement('div');
        el.textContent = `Fornecedor cadastrado: ${nome} (${categoria}, Lead Time: ${leadtime} dias)`;
        el.style.marginTop = '8px';
        el.style.color = '#00358e';
        list.appendChild(el);
        form.reset();
      }
    });
  }
});

// Exporta funções para uso em outras telas
window.OutsourcingManager = {
  priorizarProducao,
  calcularIndicadores,
  fornecedores,
  pedidos
};
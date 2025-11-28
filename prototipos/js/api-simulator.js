// api-simulator.js
// Simulador de API REST para integração frontend PCP
// Todas as funções retornam Promises e simulam latência de rede

const API_DELAY = 600;

function fetchPMP(filtros) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Exemplo: retorna previsão de vendas + estoque + necessidade
      const produtos = window.mockData.produtos;
      const previsao = window.mockData.previsaoVendas;
      const estoque = window.mockData.estoque;
      const resultado = produtos.map(prod => {
        const prev = previsao.find(p => p.produto === prod.sku && (!filtros?.mes || p.mes === filtros.mes));
        const est = estoque.find(e => e.produto === prod.sku);
        return {
          sku: prod.sku,
          nome: prod.nome,
          familia: prod.familia,
          estoqueAtual: est ? est.quantidade : 0,
          previsao: prev ? prev.quantidade : 0,
          politicaEstoque: 8000,
          necessidade: Math.max(0, (prev ? prev.quantidade : 0) - (est ? est.quantidade : 0) + 8000)
        };
      });
      resolve(resultado);
    }, API_DELAY);
  });
}

function fetchSequenciamento(filtros) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Exemplo: retorna ordens de produção filtradas
      let ordens = window.mockData.ordensProducao;
      if (filtros?.produto) {
        ordens = ordens.filter(o => o.produto === filtros.produto);
      }
      resolve(ordens);
    }, API_DELAY);
  });
}

function fetchCarteiraPedidos(filtros) {
  return new Promise(resolve => {
    setTimeout(() => {
      let pedidos = window.mockData.pedidos;
      if (filtros?.produto) {
        pedidos = pedidos.filter(p => p.produto === filtros.produto);
      }
      if (filtros?.cliente) {
        pedidos = pedidos.filter(p => p.cliente === filtros.cliente);
      }
      resolve(pedidos);
    }, API_DELAY);
  });
}

function fetchEstoqueGranel(filtros) {
  return new Promise(resolve => {
    setTimeout(() => {
      let estoque = window.mockData.estoqueGranel;
      if (filtros?.produto) {
        estoque = estoque.filter(e => e.produto === filtros.produto);
      }
      resolve(estoque);
    }, API_DELAY);
  });
}

function fetchOEE(equipamentoId) {
  return new Promise(resolve => {
    setTimeout(() => {
      const eq = window.mockData.equipamentos.find(e => e.id === equipamentoId);
      resolve(eq ? { id: eq.id, nome: eq.nome, oee: eq.oee, turnos: eq.turnos } : null);
    }, API_DELAY);
  });
}

function saveSequenciamento(dados) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simula salvar sequenciamento (não persiste de fato)
      resolve({ status: 'ok', dados });
    }, API_DELAY);
  });
}

function submitAprovacao(dados) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simula submissão de aprovação (delega para workflowAprovacao)
      const result = window.workflowAprovacao.submeterAprovacao(dados.alteracao, dados.justificativa);
      resolve(result);
    }, API_DELAY);
  });
}

// Utilitário para mostrar spinner durante fetch
function withLoadingSpinner(promise, spinnerId) {
  const spinner = document.getElementById(spinnerId);
  if (spinner) spinner.style.display = 'block';
  return promise.finally(() => {
    if (spinner) spinner.style.display = 'none';
  });
}

window.apiSimulator = {
  fetchPMP,
  fetchSequenciamento,
  fetchCarteiraPedidos,
  fetchEstoqueGranel,
  fetchOEE,
  saveSequenciamento,
  submitAprovacao,
  withLoadingSpinner
};
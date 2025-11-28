// dynamic-updates.js
// Sistema de atualizações dinâmicas entre páginas do protótipo PCP Eurofarma
// Requer que funções de cálculo estejam disponíveis em pmp-calculator.js e sequenciamento-engine.js

(function () {
  // Utilitário para atualizar tabelas e gráficos em pmp-mensal.html
  function atualizarPmpMensal(filtros) {
    if (typeof calcularPmpMensal !== 'function') return;
    const resultado = calcularPmpMensal(filtros);
    atualizarTabelaPmp(resultado.tabela);
    atualizarGraficoPmp(resultado.grafico);
  }

  // Utilitário para atualizar Gantt e KPIs em simulacao-cenarios.html
  function atualizarSimulacaoCenarios(parametros) {
    if (typeof calcularSequenciamentoSimulado !== 'function') return;
    const resultado = calcularSequenciamentoSimulado(parametros);
    atualizarGantt(resultado.gantt);
    atualizarKPIs(resultado.kpis);
  }

  // Exemplo: filtro de mês em pmp-mensal.html
  if (document.getElementById('filtro-mes')) {
    document.getElementById('filtro-mes').addEventListener('change', function (e) {
      const filtros = {
        mes: e.target.value,
        sku: document.getElementById('filtro-sku') ? document.getElementById('filtro-sku').value : undefined
      };
      atualizarPmpMensal(filtros);
    });
  }

  // Exemplo: filtro de SKU em pmp-mensal.html
  if (document.getElementById('filtro-sku')) {
    document.getElementById('filtro-sku').addEventListener('change', function (e) {
      const filtros = {
        mes: document.getElementById('filtro-mes') ? document.getElementById('filtro-mes').value : undefined,
        sku: e.target.value
      };
      atualizarPmpMensal(filtros);
    });
  }

  // Exemplo: parâmetros de simulação em simulacao-cenarios.html
  if (document.querySelector('.parametro-simulacao')) {
    document.querySelectorAll('.parametro-simulacao').forEach(function (input) {
      input.addEventListener('input', function () {
        const parametros = {};
        document.querySelectorAll('.parametro-simulacao').forEach(function (el) {
          parametros[el.name] = el.value;
        });
        atualizarSimulacaoCenarios(parametros);
      });
    });
  }

  // Funções de atualização de UI (devem ser implementadas nas páginas)
  window.atualizarTabelaPmp = window.atualizarTabelaPmp || function (dados) {
    // Atualiza tabela de PMP Mensal (exemplo de integração)
    // Implementação específica deve estar na página
  };

  window.atualizarGraficoPmp = window.atualizarGraficoPmp || function (dados) {
    // Atualiza gráfico de PMP Mensal
  };

  window.atualizarGantt = window.atualizarGantt || function (dados) {
    // Atualiza Gantt Chart na simulação de cenários
  };

  window.atualizarKPIs = window.atualizarKPIs || function (dados) {
    // Atualiza KPIs na simulação de cenários
  };

  // Exemplo de atualização dinâmica entre páginas (simulação de navegação)
  window.navegarComEstado = function (url, estado) {
    sessionStorage.setItem('estadoNavegacao', JSON.stringify(estado));
    window.location.href = url;
  };

  window.obterEstadoNavegacao = function () {
    try {
      return JSON.parse(sessionStorage.getItem('estadoNavegacao')) || {};
    } catch (e) {
      return {};
    }
  };
})();

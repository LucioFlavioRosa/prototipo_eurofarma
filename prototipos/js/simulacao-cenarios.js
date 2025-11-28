// prototipos/js/simulacao-cenarios.js
// Lógica de Simulação de Cenários para PCP Eurofarma

/**
 * Clona o cenário base atual (sequenciamento, parâmetros, KPIs)
 * @returns {Object} Cópia profunda do cenário base
 */
function clonarCenarioBase() {
  let cenarioBase = window.cenarioBase || {};
  return JSON.parse(JSON.stringify(cenarioBase));
}

/**
 * Aplica parâmetros de simulação ao cenário (capacidade, turnos, políticas)
 * @param {Object} cenario - Cópia do cenário base
 * @param {Object} parametros - Parâmetros ajustados pelo usuário
 * @returns {Object} Novo cenário simulado
 */
function aplicarParametros(cenario, parametros) {
  let novoCenario = JSON.parse(JSON.stringify(cenario));
  // Exemplo: alterar capacidade dos equipamentos
  if (parametros.capacidadeEquipamentos) {
    novoCenario.equipamentos.forEach(eq => {
      if (parametros.capacidadeEquipamentos[eq.nome]) {
        eq.capacidade = parametros.capacidadeEquipamentos[eq.nome];
      }
    });
  }
  // Exemplo: alterar turnos
  if (parametros.turnos) {
    novoCenario.turnos = parametros.turnos;
  }
  // Exemplo: alterar políticas de estoque
  if (parametros.politicaEstoque) {
    novoCenario.politicaEstoque = parametros.politicaEstoque;
  }
  // Recalcular sequenciamento e KPIs
  novoCenario.sequenciamento = window.otimizarSequenciamento(
    novoCenario.ordens,
    novoCenario.equipamentos,
    novoCenario.restricoes
  );
  novoCenario.kpis = window.calcularKPIs(novoCenario.sequenciamento);
  return novoCenario;
}

/**
 * Compara dois cenários e retorna diferenças de KPIs
 * @param {Object} cenarioBase
 * @param {Object} cenarioSimulado
 * @returns {Object} Diferenças de KPIs
 */
function compararCenarios(cenarioBase, cenarioSimulado) {
  let dif = {};
  Object.keys(cenarioBase.kpis).forEach(kpi => {
    dif[kpi] = {
      base: cenarioBase.kpis[kpi],
      simulado: cenarioSimulado.kpis[kpi],
      delta: cenarioSimulado.kpis[kpi] - cenarioBase.kpis[kpi]
    };
  });
  return dif;
}

// Persistência de cenários simulados em localStorage
function salvarCenarioSimulado(nome, cenario) {
  let cenarios = JSON.parse(localStorage.getItem('cenariosSimulados') || '{}');
  cenarios[nome] = cenario;
  localStorage.setItem('cenariosSimulados', JSON.stringify(cenarios));
}
function listarCenariosSimulados() {
  return JSON.parse(localStorage.getItem('cenariosSimulados') || '{}');
}

// Integração dinâmica com simulacao-cenarios.html
window.clonarCenarioBase = clonarCenarioBase;
window.aplicarParametros = aplicarParametros;
window.compararCenarios = compararCenarios;
window.salvarCenarioSimulado = salvarCenarioSimulado;
window.listarCenariosSimulados = listarCenariosSimulados;

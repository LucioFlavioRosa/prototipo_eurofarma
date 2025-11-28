// prototipos/js/sequenciamento-engine.js
// Engine de Sequenciamento Simplificado para PCP Eurofarma

/**
 * Ordena as ordens de produção por prazo de entrega e minimiza setups entre produtos
 * @param {Array} ordens - Lista de ordens de produção
 * @param {Array} equipamentos - Lista de equipamentos disponíveis
 * @param {Object} restricoes - Restrições de setup, disponibilidade de matéria-prima, etc
 * @returns {Array} Sequenciamento otimizado
 */
function otimizarSequenciamento(ordens, equipamentos, restricoes) {
  // Exemplo de heurística: ordenar por prazo de entrega e agrupar por produto para minimizar setups
  let sequencia = [...ordens];
  sequencia.sort((a, b) => {
    if (a.produto === b.produto) {
      return new Date(a.prazoEntrega) - new Date(b.prazoEntrega);
    }
    return a.produto.localeCompare(b.produto);
  });
  // Alocar ordens nos equipamentos disponíveis, respeitando restrições básicas
  let resultado = [];
  let equipamentoIndex = 0;
  for (let i = 0; i < sequencia.length; i++) {
    let ordem = sequencia[i];
    let equipamento = equipamentos[equipamentoIndex % equipamentos.length];
    if (validarRestricoes(ordem, i, restricoes)) {
      resultado.push({ ...ordem, equipamento: equipamento.nome, posicao: i });
      equipamentoIndex++;
    }
    // Se não for válido, pular ou reordenar conforme lógica de negócio
  }
  return resultado;
}

/**
 * Calcula KPIs do sequenciamento: Faturamento, Margem, Atendimento, Setup Time
 * @param {Array} sequenciamento - Sequência de ordens alocadas
 * @returns {Object} KPIs calculados
 */
function calcularKPIs(sequenciamento) {
  let faturamento = 0;
  let margem = 0;
  let atendimento = 0;
  let setupTime = 0;
  let totalOrdens = sequenciamento.length;
  let ordensAtendidas = 0;
  let ultimoProdutoPorEquip = {};

  sequenciamento.forEach((ordem, idx) => {
    faturamento += ordem.valorTotal || 0;
    margem += ordem.margem || 0;
    if (ordem.atendida) ordensAtendidas++;
    // Setup: se mudou de produto no mesmo equipamento, soma tempo de setup
    let key = ordem.equipamento;
    if (ultimoProdutoPorEquip[key] && ultimoProdutoPorEquip[key] !== ordem.produto) {
      setupTime += ordem.tempoSetup || 30; // 30 min default
    }
    ultimoProdutoPorEquip[key] = ordem.produto;
  });

  atendimento = totalOrdens > 0 ? Math.round((ordensAtendidas / totalOrdens) * 100) : 0;
  return {
    faturamento,
    margem,
    atendimento, // %
    setupTime // minutos
  };
}

/**
 * Valida se a ordem pode ser posicionada naquela posição do sequenciamento
 * @param {Object} ordem - Ordem de produção
 * @param {number} posicao - Posição na fila
 * @param {Object} restricoes - Restrições de setup, MP, etc
 * @returns {boolean}
 */
function validarRestricoes(ordem, posicao, restricoes) {
  // Exemplo: verifica se há matéria-prima suficiente
  if (restricoes && restricoes.materiaPrima) {
    let mp = restricoes.materiaPrima[ordem.produto];
    if (!mp || mp < ordem.quantidade) return false;
  }
  // Exemplo: roda de setup crítica
  if (restricoes && restricoes.rodaSetupCritica) {
    if (restricoes.rodaSetupCritica.includes(ordem.produto) && posicao === 0) {
      return false; // Não pode iniciar com produto crítico
    }
  }
  return true;
}

// Integração com Gantt Chart (sequenciamento-aps.html, replanejamento-drag-drop.html)
// Exemplo de função para atualizar visualização do Gantt Chart
document.addEventListener('sequenciamentoAtualizado', function(e) {
  if (window.renderGanttChart) {
    window.renderGanttChart(e.detail.sequenciamento);
  }
});

// Export das funções para uso global
window.otimizarSequenciamento = otimizarSequenciamento;
window.calcularKPIs = calcularKPIs;
window.validarRestricoes = validarRestricoes;

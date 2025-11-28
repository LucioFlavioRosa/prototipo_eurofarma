const ScenarioSimulator = {
  baseKPIs: {
    faturamento: 8200000,
    margem: 2750000,
    atendimento: 96,
    utilizacao: 87
  },
  simKPIs: {},
  savedScenarios: [],
  initUI: function() {
    document.getElementById('btn-simular').addEventListener('click', this.simulate.bind(this));
    document.getElementById('btn-save-scenario').addEventListener('click', this.saveScenario.bind(this));
    this.renderSavedScenarios();
  },
  simulate: function() {
    // Coleta dos parâmetros do formulário
    const capacidade = parseInt(document.getElementById('capacidade').value);
    const turnos = parseInt(document.getElementById('turnos').value);
    const horasExtra = parseInt(document.getElementById('horas_extra').value);
    const politicaEstoque = parseInt(document.getElementById('politica_estoque').value);
    // Lógica de simulação (exemplo realista)
    // Faturamento cresce com capacidade e turnos
    let simFaturamento = 8200000 + ((capacidade - 50000) * 80) + ((turnos - 2) * 120000);
    // Margem cresce menos, penalizada por horas extras
    let simMargem = 2750000 + ((capacidade - 50000) * 30) + ((turnos - 2) * 50000) - (horasExtra * 80);
    // Atendimento cresce com política de estoque e capacidade
    let simAtendimento = Math.min(100, 96 + Math.floor((politicaEstoque - 15) * 0.7) + Math.floor((capacidade - 50000) / 2000));
    // Utilização de capacidade depende dos turnos e horas extras
    let simUtilizacao = Math.min(100, 87 + ((turnos - 2) * 4) + Math.floor(horasExtra / 40));
    this.simKPIs = {
      faturamento: simFaturamento,
      margem: simMargem,
      atendimento: simAtendimento,
      utilizacao: simUtilizacao
    };
    // Atualiza tabela
    document.getElementById('sim-faturamento').textContent = 'R$ ' + simFaturamento.toLocaleString('pt-BR');
    document.getElementById('var-faturamento').textContent = ((simFaturamento - this.baseKPIs.faturamento) / this.baseKPIs.faturamento * 100).toFixed(1) + '%';
    document.getElementById('sim-margem').textContent = 'R$ ' + simMargem.toLocaleString('pt-BR');
    document.getElementById('var-margem').textContent = ((simMargem - this.baseKPIs.margem) / this.baseKPIs.margem * 100).toFixed(1) + '%';
    document.getElementById('sim-atendimento').textContent = simAtendimento + '%';
    document.getElementById('var-atendimento').textContent = ((simAtendimento - this.baseKPIs.atendimento)).toFixed(1) + '%';
    document.getElementById('sim-utilizacao').textContent = simUtilizacao + '%';
    document.getElementById('var-utilizacao').textContent = ((simUtilizacao - this.baseKPIs.utilizacao)).toFixed(1) + '%';
  },
  saveScenario: function() {
    if (Object.keys(this.simKPIs).length === 0) {
      alert('Simule um cenário antes de salvar.');
      return;
    }
    const params = {
      capacidade: document.getElementById('capacidade').value,
      turnos: document.getElementById('turnos').value,
      horasExtra: document.getElementById('horas_extra').value,
      politicaEstoque: document.getElementById('politica_estoque').value
    };
    const scenario = {
      id: Date.now(),
      params,
      KPIs: { ...this.simKPIs }
    };
    this.savedScenarios.push(scenario);
    this.renderSavedScenarios();
  },
  renderSavedScenarios: function() {
    const ul = document.getElementById('saved-scenarios');
    ul.innerHTML = '';
    if (this.savedScenarios.length === 0) {
      ul.innerHTML = '<li>Nenhum cenário salvo ainda.</li>';
      return;
    }
    this.savedScenarios.forEach(scenario => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>
          Capacidade: <strong>${scenario.params.capacidade}</strong>, Turnos: <strong>${scenario.params.turnos}</strong>, Horas Extra: <strong>${scenario.params.horasExtra}</strong>, Estoque: <strong>${scenario.params.politicaEstoque}%</strong>
          | Faturamento: <strong>R$ ${scenario.KPIs.faturamento.toLocaleString('pt-BR')}</strong>
        </span>
        <button onclick="ScenarioSimulator.loadScenario(${scenario.id})">Carregar</button>
      `;
      ul.appendChild(li);
    });
  },
  loadScenario: function(id) {
    const scenario = this.savedScenarios.find(s => s.id === id);
    if (!scenario) return;
    document.getElementById('capacidade').value = scenario.params.capacidade;
    document.getElementById('turnos').value = scenario.params.turnos;
    document.getElementById('horas_extra').value = scenario.params.horasExtra;
    document.getElementById('politica_estoque').value = scenario.params.politicaEstoque;
    this.simKPIs = { ...scenario.KPIs };
    // Atualiza tabela
    document.getElementById('sim-faturamento').textContent = 'R$ ' + scenario.KPIs.faturamento.toLocaleString('pt-BR');
    document.getElementById('var-faturamento').textContent = ((scenario.KPIs.faturamento - this.baseKPIs.faturamento) / this.baseKPIs.faturamento * 100).toFixed(1) + '%';
    document.getElementById('sim-margem').textContent = 'R$ ' + scenario.KPIs.margem.toLocaleString('pt-BR');
    document.getElementById('var-margem').textContent = ((scenario.KPIs.margem - this.baseKPIs.margem) / this.baseKPIs.margem * 100).toFixed(1) + '%';
    document.getElementById('sim-atendimento').textContent = scenario.KPIs.atendimento + '%';
    document.getElementById('var-atendimento').textContent = ((scenario.KPIs.atendimento - this.baseKPIs.atendimento)).toFixed(1) + '%';
    document.getElementById('sim-utilizacao').textContent = scenario.KPIs.utilizacao + '%';
    document.getElementById('var-utilizacao').textContent = ((scenario.KPIs.utilizacao - this.baseKPIs.utilizacao)).toFixed(1) + '%';
  }
};
window.ScenarioSimulator = ScenarioSimulator;
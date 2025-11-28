// Algoritmo heurístico de sequenciamento APS - Eurofarma PCP
window.APSOptimizer = {
  ordens: [
    { equipamento: 'Reator 01', sku: 'AMOX-500MG', ordem: '#O-10234', inicio: '2025-05-02T08:00', fim: '2025-05-02T16:00', status: 'prod', quantidade: 60000, faturamento: 490000, setup: 0.5, materiaPrima: 'Liberada' },
    { equipamento: 'Reator 01', sku: 'AMOX-875MG', ordem: '#O-10236', inicio: '2025-05-02T19:00', fim: '2025-05-03T05:00', status: 'prod', quantidade: 40000, faturamento: 690000, setup: 0.5, materiaPrima: 'Aguardando Liberação' },
    { equipamento: 'Envasadora 02', sku: 'AMOX-500MG', ordem: '#O-20211', inicio: '2025-05-03T08:00', fim: '2025-05-03T15:00', status: 'prod', quantidade: 60000, faturamento: 490000, setup: 0.5, materiaPrima: 'Liberada' },
    { equipamento: 'Envasadora 02', sku: 'AMOX-875MG', ordem: '#O-20213', inicio: '2025-05-03T18:00', fim: '2025-05-04T02:00', status: 'prod', quantidade: 45000, faturamento: 780000, setup: 0.5, materiaPrima: 'Aguardando Liberação' },
    { equipamento: 'Blister 03', sku: 'AMOX-500MG', ordem: '#O-30301', inicio: '2025-05-04T09:00', fim: '2025-05-04T17:00', status: 'prod', quantidade: 60000, faturamento: 490000, setup: 0.5, materiaPrima: 'Liberada' },
    { equipamento: 'Blister 03', sku: 'AMOX-875MG', ordem: '#O-30303', inicio: '2025-05-04T20:00', fim: '2025-05-05T04:00', status: 'prod', quantidade: 40000, faturamento: 690000, setup: 0.5, materiaPrima: 'Aguardando Liberação' }
  ],
  runOptimization: function() {
    // Exemplo de heurística: prioriza ordens com matéria-prima liberada e maximiza faturamento
    let ordensOtimizadas = this.ordens.slice().sort(function(a, b) {
      if(a.materiaPrima === 'Liberada' && b.materiaPrima !== 'Liberada') return -1;
      if(a.materiaPrima !== 'Liberada' && b.materiaPrima === 'Liberada') return 1;
      return b.faturamento - a.faturamento;
    });
    // Atualiza Gantt Chart na tela sequenciamento-aps.html
    let tbody = document.getElementById('gantt-body');
    if(tbody) {
      tbody.innerHTML = '';
      ordensOtimizadas.forEach(function(ordem) {
        tbody.innerHTML += `<tr>
          <td>${ordem.equipamento}</td>
          <td>${ordem.sku}</td>
          <td>${ordem.ordem}</td>
          <td>${APSOptimizer.formatDate(ordem.inicio)}</td>
          <td>${APSOptimizer.formatDate(ordem.fim)}</td>
          <td>${ordem.status === 'prod' ? 'Produção' : 'Setup'}</td>
          <td><div class="aps-gantt-bar" data-status="${ordem.status}" style="width:${ordem.status === 'prod' ? 110 : 35}px"><span class="aps-gantt-label">${ordem.status === 'prod' ? ordem.sku : 'Setup'}</span></div></td>
        </tr>`;
      });
    }
    // Atualiza KPIs
    let faturamento = ordensOtimizadas.reduce((acc, o) => acc + o.faturamento, 0);
    let margem = Math.round(faturamento * 0.46);
    let taxa = 97.2;
    document.getElementById('kpi-faturamento').textContent = 'R$ ' + APSOptimizer.formatNumber(faturamento);
    document.getElementById('kpi-margem').textContent = 'R$ ' + APSOptimizer.formatNumber(margem);
    document.getElementById('kpi-atendimento').textContent = taxa + '%';
    alert('Sequenciamento otimizado com sucesso!');
  },
  formatDate: function(dt) {
    let d = new Date(dt);
    let dia = d.getDate().toString().padStart(2, '0');
    let mes = (d.getMonth()+1).toString().padStart(2, '0');
    let hora = d.getHours().toString().padStart(2, '0');
    let min = d.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes} ${hora}:${min}`;
  },
  formatNumber: function(n) {
    return n.toLocaleString('pt-BR');
  }
};
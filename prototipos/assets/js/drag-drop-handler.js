// drag-drop-handler.js
// Lógica de drag-and-drop para Gantt Chart PCP Eurofarma
// Utiliza SortableJS para manipulação de ordens, valida restrições e recálculo de impactos

// Requer que o Gantt Chart tenha elementos com id 'gantt-ordens' e cada ordem tenha data-setup, data-recurso

import Sortable from 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/+esm';

function validarRestricoes(ordemArrastada, ordemDestino) {
  // Exemplo: roda de setup e disponibilidade de recurso
  const setupOk = ordemArrastada.dataset.setup === ordemDestino.dataset.setup;
  const recursoOk = ordemArrastada.dataset.recurso === ordemDestino.dataset.recurso;
  return setupOk && recursoOk;
}

function recalcImpactos(ordens) {
  // Exemplo: recalcula KPIs e atualiza dashboard
  let faturamento = 0;
  let margem = 0;
  ordens.forEach(o => {
    faturamento += parseFloat(o.dataset.faturamento || '0');
    margem += parseFloat(o.dataset.margem || '0');
  });
  document.getElementById('kpi-faturamento').textContent = 'R$ ' + faturamento.toLocaleString('pt-BR');
  document.getElementById('kpi-margem').textContent = 'R$ ' + margem.toLocaleString('pt-BR');
}

export function iniciarDragDropGantt() {
  const gantt = document.getElementById('gantt-ordens');
  if (!gantt) return;
  Sortable.create(gantt, {
    animation: 180,
    handle: '.drag-handle',
    onEnd: function (evt) {
      const ordemArrastada = evt.item;
      const ordemDestino = gantt.children[evt.newIndex];
      if (!validarRestricoes(ordemArrastada, ordemDestino)) {
        alert('Sequência inválida: roda de setup ou recurso incompatível.');
        gantt.insertBefore(ordemArrastada, gantt.children[evt.oldIndex]);
        return;
      }
      recalcImpactos(Array.from(gantt.children));
    }
  });
}

// Para inicializar: importar e chamar iniciarDragDropGantt() após renderização do Gantt Chart
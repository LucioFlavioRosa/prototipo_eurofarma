// prototipos/assets/scripts.js
// Arquivo unificado de funções reutilizáveis para a plataforma PCP Eurofarma
// ES6+, modular, comentado para desenvolvimento

// =========================
// UTILITÁRIOS GERAIS
// =========================

// Debounce para evitar execuções excessivas (ex: filtros de tabela)
const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

// Função para exibir notificações toast
const showToast = (message, type = 'info', duration = 3500) => {
  let toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
};

// =========================
// MODAIS
// =========================

// Abrir modal genérico
const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }
};

// Fechar modal genérico
const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
};

// =========================
// NAVEGAÇÃO ENTRE PÁGINAS
// =========================

// Navegação SPA-like (simulada via window.location)
const navigateTo = (page) => {
  window.location.href = page;
};

// =========================
// INTEGRAÇÃO SIMULADA COM SAP
// =========================

// Simula chamada AJAX para SAP (fake)
const fakeSAPRequest = (endpoint, data = {}, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula resposta
      resolve({ success: true, endpoint, data });
    }, delay);
  });
};

// =========================
// GRÁFICOS (Chart.js) - Lazy Loading
// =========================

// Carrega Chart.js apenas quando necessário
let ChartLibLoaded = false;
const loadChartJs = () => {
  return new Promise((resolve, reject) => {
    if (ChartLibLoaded) return resolve();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
      ChartLibLoaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Inicializa gráfico quando elemento estiver visível
const initChartWhenVisible = (canvasId, config) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const observer = new IntersectionObserver(async (entries, obs) => {
    if (entries[0].isIntersecting) {
      await loadChartJs();
      // eslint-disable-next-line no-undef
      new Chart(canvas, config);
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(canvas);
};

// =========================
// GANTT CHART DRAG-AND-DROP
// =========================

// Função para inicializar drag-and-drop em Gantt Chart
const initGanttDragDrop = (containerId, onDropCallback) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  let dragged = null;
  container.querySelectorAll('.gantt-task').forEach(task => {
    task.draggable = true;
    task.addEventListener('dragstart', (e) => {
      dragged = task;
      e.dataTransfer.effectAllowed = 'move';
      task.classList.add('dragging');
    });
    task.addEventListener('dragend', () => {
      dragged = null;
      task.classList.remove('dragging');
    });
  });
  container.querySelectorAll('.gantt-dropzone').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('over');
      if (dragged) {
        zone.appendChild(dragged);
        if (typeof onDropCallback === 'function') onDropCallback(dragged, zone);
      }
    });
  });
};

// =========================
// RECÁLCULO DE KPIs EM TEMPO REAL
// =========================

// Exemplo: recalcula KPIs ao alterar parâmetros de simulação
const recalculateKPIs = (params, updateCallback) => {
  // Simulação: calcula KPIs com base nos parâmetros
  const { turnoExtra, horasExtras, producaoBase } = params;
  const kpis = {
    faturamento: producaoBase * (1 + 0.15 * turnoExtra + 0.05 * horasExtras),
    margem: 0.22 * producaoBase,
    taxaAtendimento: 97 + (turnoExtra ? 1 : 0) + (horasExtras ? 0.5 : 0)
  };
  if (typeof updateCallback === 'function') updateCallback(kpis);
};

// =========================
// VALIDAÇÃO DE FORMULÁRIOS
// =========================

const validateForm = (formId) => {
  const form = document.getElementById(formId);
  if (!form) return false;
  let valid = true;
  form.querySelectorAll('[required]').forEach(input => {
    if (!input.value) {
      input.classList.add('input-error');
      valid = false;
    } else {
      input.classList.remove('input-error');
    }
  });
  return valid;
};

// =========================
// FILTROS E ORDENAÇÃO DE TABELAS
// =========================

// Filtro de tabela com debounce
const filterTable = debounce((tableId, query) => {
  const table = document.getElementById(tableId);
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(query.toLowerCase()) ? '' : 'none';
  });
}, 250);

// Ordenação de colunas (crescente/decrescente)
const sortTable = (tableId, colIndex, type = 'string') => {
  const table = document.getElementById(tableId);
  if (!table) return;
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);
  const asc = !table.dataset.sortAsc || table.dataset.sortAsc === 'false';
  rows.sort((a, b) => {
    let vA = a.cells[colIndex].innerText.trim();
    let vB = b.cells[colIndex].innerText.trim();
    if (type === 'number') {
      vA = parseFloat(vA.replace(/[^\d,.-]/g, '').replace(',', '.'));
      vB = parseFloat(vB.replace(/[^\d,.-]/g, '').replace(',', '.'));
      return asc ? vA - vB : vB - vA;
    } else {
      return asc ? vA.localeCompare(vB) : vB.localeCompare(vA);
    }
  });
  rows.forEach(row => tbody.appendChild(row));
  table.dataset.sortAsc = asc;
};

// =========================
// EXPORTAÇÃO SIMULADA PARA EXCEL
// =========================

const exportTableToExcel = (tableId, filename = 'export.xlsx') => {
  const table = document.getElementById(tableId);
  if (!table) return;
  let csv = '';
  table.querySelectorAll('tr').forEach(row => {
    let rowData = [];
    row.querySelectorAll('th,td').forEach(cell => {
      rowData.push('"' + cell.innerText.replace(/"/g, '""') + '"');
    });
    csv += rowData.join(',') + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Exportação simulada para Excel concluída.', 'success');
};

// =========================
// VIRTUALIZAÇÃO DE TABELAS LONGAS
// =========================

// Renderiza apenas as linhas visíveis para tabelas grandes
const virtualizeTable = (tableId, rowHeight = 40, buffer = 10) => {
  const table = document.getElementById(tableId);
  if (!table) return;
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);
  const totalRows = rows.length;
  const container = table.parentElement;
  if (!container.classList.contains('virtual-table-container')) {
    container.classList.add('virtual-table-container');
    container.style.position = 'relative';
    container.style.overflowY = 'auto';
    container.style.maxHeight = '480px';
  }
  const visibleRows = Math.ceil(container.clientHeight / rowHeight) + buffer;
  let start = 0;
  let end = visibleRows;
  const render = () => {
    const scrollTop = container.scrollTop;
    start = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
    end = Math.min(totalRows, start + visibleRows);
    rows.forEach((row, i) => {
      row.style.display = (i >= start && i < end) ? '' : 'none';
    });
  };
  container.addEventListener('scroll', debounce(render, 50));
  render();
};

// =========================
// GERENCIAMENTO DE ESTADO DE CENÁRIOS
// =========================

let scenarioState = {};
const saveScenario = (name, data) => {
  scenarioState[name] = data;
  showToast(`Cenário "${name}" salvo com sucesso.`, 'success');
};
const loadScenario = (name) => scenarioState[name] || null;
const listScenarios = () => Object.keys(scenarioState);

// =========================
// ANIMAÇÕES DE TRANSIÇÃO ENTRE TELAS
// =========================

const animateTransition = (containerId, callback) => {
  const container = document.getElementById(containerId);
  if (!container) {
    if (typeof callback === 'function') callback();
    return;
  }
  container.classList.add('fade-out');
  setTimeout(() => {
    if (typeof callback === 'function') callback();
    container.classList.remove('fade-out');
    container.classList.add('fade-in');
    setTimeout(() => {
      container.classList.remove('fade-in');
    }, 400);
  }, 400);
};

// =========================
// INICIALIZAÇÃO GLOBAL
// =========================

document.addEventListener('DOMContentLoaded', () => {
  // Exemplo: inicializar gráficos visíveis
  document.querySelectorAll('canvas[data-chart-config]').forEach(canvas => {
    const config = JSON.parse(canvas.dataset.chartConfig);
    initChartWhenVisible(canvas.id, config);
  });

  // Exemplo: inicializar drag-and-drop em Gantt Chart
  if (document.getElementById('gantt-container')) {
    initGanttDragDrop('gantt-container', (task, zone) => {
      showToast('Ordem movida. Recalculando KPIs...','info');
      // Simular recálculo de KPIs
      recalculateKPIs({ turnoExtra: 1, horasExtras: 0, producaoBase: 100000 }, (kpis) => {
        document.getElementById('kpi-faturamento').innerText = kpis.faturamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      });
    });
  }
});

// =========================
// FIM DO SCRIPT UNIFICADO
// =========================

/*
  Observação: Para produção, recomenda-se minificar este arquivo e separar funções em módulos.
  Para desenvolvimento, os comentários e estrutura modular facilitam manutenção e extensibilidade.
*/

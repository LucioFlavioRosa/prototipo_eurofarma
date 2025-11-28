// Eurofarma PCP - Navegação Dinâmica e Persistência de Contexto

/**
 * Navega para uma página, armazenando contexto no sessionStorage.
 * @param {string} page - Caminho relativo da página destino (ex: 'replanejamento-drag-drop.html')
 * @param {object} context - Objeto com filtros, seleções, etc.
 */
function navigateTo(page, context = {}) {
  if (context && typeof context === 'object') {
    sessionStorage.setItem('pcp_context', JSON.stringify(context));
  }
  window.location.href = page;
}

/**
 * Recupera contexto salvo ao carregar página.
 * @returns {object|null} contexto recuperado
 */
function loadContext() {
  const ctx = sessionStorage.getItem('pcp_context');
  if (ctx) {
    try {
      return JSON.parse(ctx);
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Renderiza breadcrumbs dinâmicos no header.
 * @param {Array} trail - Array de objetos { label: string, href: string|null }
 * Exemplo: [ {label: 'Dashboard', href: 'dashboard.html'}, {label: 'Carteira de Pedidos', href: null} ]
 */
function renderBreadcrumbs(trail) {
  const container = document.querySelector('.breadcrumbs');
  if (!container) return;
  container.innerHTML = '';
  trail.forEach((item, idx) => {
    if (item.href) {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.onclick = (ev) => {
        ev.preventDefault();
        navigateTo(item.href);
      };
      container.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.textContent = item.label;
      container.appendChild(span);
    }
    if (idx < trail.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'separator';
      sep.textContent = '›';
      container.appendChild(sep);
    }
  });
}

// Exemplo de uso: ao clicar em um pedido em risco
// document.querySelectorAll('.pedido-risco').forEach(el => {
//   el.addEventListener('click', function() {
//     const pedidoId = this.dataset.pedidoId;
//     navigateTo('replanejamento-drag-drop.html', { ordemSelecionada: pedidoId });
//   });
// });

// Ao carregar página destino:
// const ctx = loadContext();
// if (ctx && ctx.ordemSelecionada) { ... pré-selecionar ordem no Gantt ... }

// Sistema de navegação PCP Eurofarma
// Transições suaves, breadcrumbs dinâmicos, histórico e deep linking

const navigation = {
  history: [],
  breadcrumbs: [],
  currentPage: '',

  goTo(page, params = {}) {
    // Fade out atual
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = page + (params.anchor ? '#' + params.anchor : '');
    }, 250);
  },

  setBreadcrumbs(paths) {
    this.breadcrumbs = paths;
    const bcEl = document.getElementById('breadcrumb');
    if (bcEl) {
      bcEl.innerHTML = paths.map((p, i) => {
        if (i < paths.length - 1) {
          return `<a href="${p.href}" class="breadcrumb-link">${p.label}</a> <span class="breadcrumb-sep">/</span> `;
        } else {
          return `<span class="breadcrumb-current">${p.label}</span>`;
        }
      }).join('');
    }
  },

  saveHistory(page) {
    this.history.push(page);
    window.sessionStorage.setItem('navHistory', JSON.stringify(this.history));
  },

  restoreHistory() {
    const h = window.sessionStorage.getItem('navHistory');
    if (h) this.history = JSON.parse(h);
  },

  deepLink(page, params = {}) {
    // Permite acesso direto a módulos
    this.goTo(page, params);
  }
};

// Transição fade in/out
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

// CSS para transições (incluir no head das páginas)
/*
.fade-in {
  animation: fadeIn 0.4s;
}
.fade-out {
  animation: fadeOut 0.25s;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
*/

export default navigation;
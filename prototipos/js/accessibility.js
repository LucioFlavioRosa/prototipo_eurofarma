// Acessibilidade: aria-labels, navegação por teclado, modo alto contraste, descrições alternativas para gráficos

// Adiciona aria-labels a todos os botões e links interativos
function addAriaLabels() {
  document.querySelectorAll('button, a, [role="button"]').forEach(function(el) {
    if (!el.hasAttribute('aria-label')) {
      let text = el.textContent.trim() || el.getAttribute('title') || 'Botão';
      el.setAttribute('aria-label', text);
    }
  });
}

document.addEventListener('DOMContentLoaded', addAriaLabels);

// Navegação por teclado em modais, dropdowns e Gantt Chart
function enableKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Fechar modais com Esc
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal[aria-modal="true"]').forEach(function(modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
    }
    // Navegação por Tab
    if (e.key === 'Tab') {
      // Foco cíclico em modais
      let modals = document.querySelectorAll('.modal.open');
      if (modals.length > 0) {
        let focusable = modals[0].querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusable = Array.prototype.slice.call(focusable);
        let index = focusable.indexOf(document.activeElement);
        if (e.shiftKey) {
          if (index <= 0) {
            focusable[focusable.length - 1].focus();
            e.preventDefault();
          }
        } else {
          if (index === focusable.length - 1) {
            focusable[0].focus();
            e.preventDefault();
          }
        }
      }
    }
    // Enter para ativar botões
    if (e.key === 'Enter' && document.activeElement) {
      if (document.activeElement.tagName === 'BUTTON' ||
          document.activeElement.getAttribute('role') === 'button') {
        document.activeElement.click();
      }
    }
  });
}
document.addEventListener('DOMContentLoaded', enableKeyboardNavigation);

// Modo alto contraste (toggle no header)
function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
  localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

document.addEventListener('DOMContentLoaded', function() {
  let btn = document.getElementById('toggle-contrast');
  if (btn) {
    btn.addEventListener('click', toggleHighContrast);
    // Estado persistente
    if (localStorage.getItem('highContrast') === 'true') {
      document.body.classList.add('high-contrast');
    }
  }
});

// Gráficos: descrições alternativas
function addChartDescriptions() {
  document.querySelectorAll('canvas[aria-describedby]').forEach(function(canvas) {
    let descId = canvas.getAttribute('aria-describedby');
    if (descId && !document.getElementById(descId)) {
      let desc = document.createElement('div');
      desc.id = descId;
      desc.textContent = canvas.getAttribute('data-description') || 'Gráfico de dados';
      desc.style.display = 'none';
      canvas.parentNode.insertBefore(desc, canvas.nextSibling);
    }
  });
}
document.addEventListener('DOMContentLoaded', addChartDescriptions);

// Simulação de leitor de tela (apenas para testes)
// Exemplo: alertar ao usuário quando um modal abre
function announceModalOpen(modalId) {
  let live = document.getElementById('aria-live');
  if (!live) {
    live = document.createElement('div');
    live.id = 'aria-live';
    live.setAttribute('aria-live', 'polite');
    live.style.position = 'absolute';
    live.style.left = '-9999px';
    document.body.appendChild(live);
  }
  live.textContent = 'Modal aberto: ' + modalId;
}

// Exemplo de uso: announceModalOpen('Simulação de Cenário');

// Lazy loading para componentes pesados (tabelas, gráficos)
// Utiliza IntersectionObserver para carregar componentes sob demanda
// Exibe spinner enquanto carrega

function lazyLoadComponent(selector, loadFn) {
  const el = document.querySelector(selector);
  if (!el) return;
  const spinner = document.createElement('div');
  spinner.className = 'spinner-loading';
  spinner.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
  el.appendChild(spinner);

  const observer = new window.IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        loadFn().then(function(content) {
          el.innerHTML = content;
        }).catch(function() {
          el.innerHTML = '<div class="error">Erro ao carregar componente.</div>';
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(el);
}

// Exemplo de uso para um gráfico
// lazyLoadComponent('#grafico-kpi', () => fetch('/prototipos/assets/mock/grafico-kpi.html').then(r => r.text()));

// Spinner CSS (deve ser incluído no HTML principal)
// .spinner-loading { display: flex; justify-content: center; align-items: center; height: 200px; }
// .lds-ring { display: inline-block; position: relative; width: 64px; height: 64px; }
// .lds-ring div { box-sizing: border-box; display: block; position: absolute; width: 51px; height: 51px; margin: 6px; border: 6px solid #00358e; border-radius: 50%; animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; border-color: #00358e transparent transparent transparent; }
// .lds-ring div:nth-child(1) { animation-delay: -0.45s; }
// .lds-ring div:nth-child(2) { animation-delay: -0.3s; }
// .lds-ring div:nth-child(3) { animation-delay: -0.15s; }
// @keyframes lds-ring { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
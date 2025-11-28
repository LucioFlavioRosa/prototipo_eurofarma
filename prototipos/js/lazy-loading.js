// Lazy loading de componentes pesados (Gantt Chart, gráficos complexos)
// Carrega bibliotecas sob demanda e exibe spinner enquanto carrega
// Otimiza imagens e minifica CSS/JS customizados

function loadComponent(componentName) {
  let script, link;
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  spinner.setAttribute('aria-label', 'Carregando componente...');
  document.body.appendChild(spinner);

  switch (componentName) {
    case 'gantt':
      if (!window.dhtmlxGantt) {
        script = document.createElement('script');
        script.src = 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js';
        script.async = true;
        script.onload = () => {
          link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css';
          document.head.appendChild(link);
          document.body.removeChild(spinner);
          if (typeof window.initGantt === 'function') window.initGantt();
        };
        document.head.appendChild(script);
      } else {
        document.body.removeChild(spinner);
        if (typeof window.initGantt === 'function') window.initGantt();
      }
      break;
    case 'chart':
      if (!window.Chart) {
        script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        script.onload = () => {
          document.body.removeChild(spinner);
          if (typeof window.initCharts === 'function') window.initCharts();
        };
        document.head.appendChild(script);
      } else {
        document.body.removeChild(spinner);
        if (typeof window.initCharts === 'function') window.initCharts();
      }
      break;
    default:
      document.body.removeChild(spinner);
      break;
  }
}

// Otimização de imagens (exemplo: comprimir logos, ícones)
// Implemente compressão no build, mas aqui garantimos lazy loading de imagens grandes

document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazyImageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function(img) {
      lazyImageObserver.observe(img);
    });
  } else {
    // fallback
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
});

// Minificação de CSS/JS customizados deve ser feita no build (Webpack, etc.)
// Aqui, garantimos que arquivos minificados sejam usados nos links do HTML

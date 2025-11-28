// prototipos/js/alertas-ruptura.js
// Sistema de Alertas de Ruptura para PCP Eurofarma

/**
 * Verifica pedidos em risco de ruptura cruzando pedidos, estoque e sequenciamento
 * @param {Array} pedidos - Lista de pedidos
 * @param {Object} estoque - Estoque atual por SKU
 * @param {Array} sequenciamento - Sequenciamento planejado
 * @returns {Array} Lista de pedidos em risco
 */
function verificarRiscoRuptura(pedidos, estoque, sequenciamento) {
  let risco = [];
  pedidos.forEach(pedido => {
    let disponivel = estoque[pedido.sku] || 0;
    let planejado = sequenciamento.filter(ordem => ordem.produto === pedido.sku)
      .reduce((soma, ordem) => soma + (ordem.quantidade || 0), 0);
    if (disponivel + planejado < pedido.quantidade) {
      risco.push({ ...pedido, falta: pedido.quantidade - (disponivel + planejado) });
    }
  });
  return risco;
}

/**
 * Sugere antecipação de ordens para pedidos em risco
 * @param {Object} pedidoEmRisco
 * @param {Array} sequenciamento
 * @returns {Object} Nova sugestão de sequenciamento
 */
function sugerirAntecipacao(pedidoEmRisco, sequenciamento) {
  // Exemplo: move ordem do SKU para o início da fila
  let idx = sequenciamento.findIndex(ordem => ordem.produto === pedidoEmRisco.sku);
  if (idx > 0) {
    let ordem = sequenciamento.splice(idx, 1)[0];
    sequenciamento.unshift(ordem);
  }
  return sequenciamento;
}

/**
 * Gera notificação visual (toast) e adiciona ao histórico
 * @param {Object} alerta
 */
function gerarNotificacao(alerta) {
  // Toast visual
  let toast = document.createElement('div');
  toast.className = 'toast-alerta-ruptura';
  toast.innerText = `Alerta: Pedido ${alerta.pedidoId} em risco para SKU ${alerta.sku} (faltam ${alerta.falta} unid.)`;
  toast.style.position = 'fixed';
  toast.style.bottom = '32px';
  toast.style.right = '32px';
  toast.style.background = '#ffc107';
  toast.style.color = '#222';
  toast.style.padding = '16px 24px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  toast.style.zIndex = 9999;
  document.body.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 6000);
  // Histórico
  let historico = JSON.parse(localStorage.getItem('historicoAlertasRuptura') || '[]');
  historico.push({ ...alerta, data: new Date().toISOString() });
  localStorage.setItem('historicoAlertasRuptura', JSON.stringify(historico));
}

// Integração periódica com carteira-pedidos.html e materia-prima.html
function iniciarMonitoramentoRuptura(pedidos, estoque, sequenciamento) {
  setInterval(() => {
    let riscos = verificarRiscoRuptura(pedidos, estoque, sequenciamento);
    riscos.forEach(risco => {
      gerarNotificacao({
        pedidoId: risco.id,
        sku: risco.sku,
        falta: risco.falta
      });
    });
  }, 15000); // a cada 15s
}

window.verificarRiscoRuptura = verificarRiscoRuptura;
window.sugerirAntecipacao = sugerirAntecipacao;
window.gerarNotificacao = gerarNotificacao;
window.iniciarMonitoramentoRuptura = iniciarMonitoramentoRuptura;

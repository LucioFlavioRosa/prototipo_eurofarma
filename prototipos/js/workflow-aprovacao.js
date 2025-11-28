// workflow-aprovacao.js
// Lógica de workflow de aprovação para PCP
// Integra com workflow-aprovacao.html e replanejamento-drag-drop.html

const WORKFLOW_KEY = 'workflowAprovacaoSolicitacoes';

function getSolicitacoes() {
  const data = localStorage.getItem(WORKFLOW_KEY);
  return data ? JSON.parse(data) : [];
}

function setSolicitacoes(solicitacoes) {
  localStorage.setItem(WORKFLOW_KEY, JSON.stringify(solicitacoes));
}

function gerarId() {
  return 'sol-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

function submeterAprovacao(alteracao, justificativa) {
  const solicitacoes = getSolicitacoes();
  const novaSolicitacao = {
    id: gerarId(),
    alteracao,
    justificativa,
    status: 'PENDENTE',
    historico: [
      {
        data: new Date().toISOString(),
        acao: 'SUBMETIDO',
        usuario: alteracao.solicitante || 'usuário',
        justificativa
      }
    ],
    dataCriacao: new Date().toISOString(),
    aprovadores: alteracao.aprovadores || ['supervisor1', 'gerente1'],
    aprovadoPor: [],
    rejeitadoPor: [],
    notificacoes: []
  };
  solicitacoes.push(novaSolicitacao);
  setSolicitacoes(solicitacoes);
  notificarAprovadores(novaSolicitacao);
  return novaSolicitacao;
}

function aprovar(solicitacaoId, aprovadorId) {
  const solicitacoes = getSolicitacoes();
  const idx = solicitacoes.findIndex(s => s.id === solicitacaoId);
  if (idx === -1) return false;
  const solicitacao = solicitacoes[idx];
  if (!solicitacao.aprovadoPor.includes(aprovadorId)) {
    solicitacao.aprovadoPor.push(aprovadorId);
    solicitacao.historico.push({
      data: new Date().toISOString(),
      acao: 'APROVADO',
      usuario: aprovadorId
    });
    // Se todos aprovadores aprovaram
    if (solicitacao.aprovadores.every(a => solicitacao.aprovadoPor.includes(a))) {
      solicitacao.status = 'APROVADO';
    }
    setSolicitacoes(solicitacoes);
    return true;
  }
  return false;
}

function rejeitar(solicitacaoId, aprovadorId, motivo) {
  const solicitacoes = getSolicitacoes();
  const idx = solicitacoes.findIndex(s => s.id === solicitacaoId);
  if (idx === -1) return false;
  const solicitacao = solicitacoes[idx];
  if (!solicitacao.rejeitadoPor.includes(aprovadorId)) {
    solicitacao.rejeitadoPor.push(aprovadorId);
    solicitacao.status = 'REJEITADO';
    solicitacao.historico.push({
      data: new Date().toISOString(),
      acao: 'REJEITADO',
      usuario: aprovadorId,
      motivo
    });
    setSolicitacoes(solicitacoes);
    return true;
  }
  return false;
}

function notificarAprovadores(solicitacao) {
  // Simula envio de notificação (ex: toast, badge, etc)
  solicitacao.aprovadores.forEach(aprovadorId => {
    solicitacao.notificacoes.push({
      para: aprovadorId,
      mensagem: `Nova solicitação de aprovação #${solicitacao.id}`,
      data: new Date().toISOString()
    });
  });
  setSolicitacoes(getSolicitacoes().map(s => s.id === solicitacao.id ? solicitacao : s));
}

// Export para uso em outras páginas
window.workflowAprovacao = {
  submeterAprovacao,
  aprovar,
  rejeitar,
  notificarAprovadores,
  getSolicitacoes
};
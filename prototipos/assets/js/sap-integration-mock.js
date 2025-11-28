// Simulador de Integração SAP MRP - PCP Eurofarma
const MOCK_PLAN = [
  { sku: 'PROD-001', descricao: 'Amoxilina 500mg 30cp', quantidade: 12000 },
  { sku: 'PROD-002', descricao: 'Dipirona 1g 20cp', quantidade: 8000 }
];

let LOGS = [];
let lastStatus = 'Aguardando envio';

function enviarPlanoParaSAP(plano) {
  const now = new Date();
  // Simula validação
  const valido = plano.every(p => p.quantidade > 0);
  let status, mensagem;
  if (!valido) {
    status = 'Falha';
    mensagem = 'Plano contém quantidade inválida.';
    LOGS.push({ data: now, acao: 'Envio', status, mensagem });
    lastStatus = status;
    return { sucesso: false, mensagem, rollback: true };
  }
  // Simula resposta SAP
  const sucesso = Math.random() > 0.15;
  if (sucesso) {
    status = 'Sucesso';
    mensagem = 'Plano enviado e processado pelo SAP.';
    LOGS.push({ data: now, acao: 'Envio', status, mensagem });
    lastStatus = status;
    return { sucesso: true, mensagem };
  } else {
    status = 'Erro';
    mensagem = 'SAP retornou erro de integração.';
    LOGS.push({ data: now, acao: 'Envio', status, mensagem });
    lastStatus = status;
    // Simula rollback
    LOGS.push({ data: now, acao: 'Rollback', status: 'Rollback realizado', mensagem: 'Plano revertido.' });
    return { sucesso: false, mensagem, rollback: true };
  }
}

function consultarLogTransacoes() {
  return LOGS.slice(-10).map(l => ({
    data: l.data.toLocaleString(),
    acao: l.acao,
    status: l.status,
    mensagem: l.mensagem
  }));
}

function statusAtual() {
  return lastStatus;
}

window.PCPSAP = {
  enviarPlanoParaSAP,
  consultarLogTransacoes,
  statusAtual,
  MOCK_PLAN
};
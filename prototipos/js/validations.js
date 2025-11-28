// validations.js
// Validações de formulários e ações críticas para o protótipo PCP Eurofarma

// Exibe toast de erro customizado
function exibirToastErro(mensagem) {
  let toast = document.createElement('div');
  toast.className = 'toast-erro';
  toast.innerText = mensagem;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3500);
  }, 100);
}

// Validação de formulário de aprovação
function validarFormularioAprovacao(dados) {
  const camposObrigatorios = ['responsavel', 'justificativa', 'nivelAprovacao'];
  for (let campo of camposObrigatorios) {
    if (!dados[campo] || dados[campo].trim() === '') {
      exibirToastErro('Preencha o campo obrigatório: ' + campo);
      return false;
    }
  }
  return true;
}

// Validação de movimento no Gantt Chart
function validarMovimentoGantt(ordem, novaPosicao) {
  // Exemplo: não permitir mover ordem para posição que viole roda de setup crítica
  if (ordem.tipo === 'setup-critico' && novaPosicao < ordem.posicaoMinima) {
    exibirToastErro('Não é permitido mover esta ordem para antes do setup crítico.');
    return false;
  }
  // Outras regras podem ser adicionadas conforme necessidade
  return true;
}

// Validação de parâmetros de simulação
function validarParametrosSimulacao(parametros) {
  if (parametros.turnos && (parametros.turnos < 1 || parametros.turnos > 4)) {
    exibirToastErro('O número de turnos deve estar entre 1 e 4.');
    return false;
  }
  if (parametros.horasExtras && (parametros.horasExtras < 0 || parametros.horasExtras > 80)) {
    exibirToastErro('Horas extras devem estar entre 0 e 80.');
    return false;
  }
  // Adicione outras validações conforme os limites do negócio
  return true;
}

// Integração com formulários (exemplo de uso)
// document.getElementById('form-aprovacao').onsubmit = function(e) {
//   const dados = { ... };
//   if (!validarFormularioAprovacao(dados)) e.preventDefault();
// };

// document.querySelector('.gantt-move').addEventListener('drop', function(e) {
//   if (!validarMovimentoGantt(ordem, novaPosicao)) e.preventDefault();
// });

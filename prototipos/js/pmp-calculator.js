// Função para arredondar para múltiplo de lote
function arredondarParaMultiplo(valor, multiplo) {
  if (!multiplo || multiplo <= 0) return valor;
  return Math.ceil(valor / multiplo) * multiplo;
}

// Função principal do cálculo de necessidade de produção
function calcularNecessidadeProducao(estoqueAtual, previsaoVendas, politicaEstoque, lotePiloto) {
  // Fórmula: Estoque Atual - Previsão de Vendas + Política de Estoque
  var necessidade = estoqueAtual - previsaoVendas + politicaEstoque;
  return arredondarParaMultiplo(Math.max(necessidade, 0), lotePiloto);
}

// Função para validar capacidade disponível
function validarCapacidade(necessidadeProducao, capacidadeDisponivel) {
  if (necessidadeProducao <= capacidadeDisponivel * 0.9) {
    return { status: 'OK', cor: 'success' };
  } else if (necessidadeProducao <= capacidadeDisponivel) {
    return { status: 'Alerta', cor: 'warning' };
  } else {
    return { status: 'Crítico', cor: 'danger' };
  }
}

// Simulação de chamada de API para obter dados (mock)
function obterDadosPMP(callback) {
  setTimeout(function() {
    callback({
      estoqueAtual: 12000,
      previsaoVendas: 9000,
      politicaEstoque: 4000,
      lotePiloto: 1000,
      capacidadeDisponivel: 15000
    });
  }, 700);
}

// Integração dinâmica com tabela de PMP Mensal (exemplo de uso)
function atualizarTabelaPMP() {
  obterDadosPMP(function(dados) {
    var necessidade = calcularNecessidadeProducao(
      dados.estoqueAtual,
      dados.previsaoVendas,
      dados.politicaEstoque,
      dados.lotePiloto
    );
    var validacao = validarCapacidade(necessidade, dados.capacidadeDisponivel);
    // Exemplo: atualizar célula da tabela
    var celulaNecessidade = document.getElementById('pmp-necessidade');
    var celulaStatus = document.getElementById('pmp-status');
    if (celulaNecessidade && celulaStatus) {
      celulaNecessidade.textContent = necessidade;
      celulaStatus.textContent = validacao.status;
      celulaStatus.className = 'badge bg-' + validacao.cor;
    }
  });
}

// Exemplo: atualizar ao carregar página
// document.addEventListener('DOMContentLoaded', atualizarTabelaPMP);

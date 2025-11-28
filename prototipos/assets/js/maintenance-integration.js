// maintenance-integration.js
// Simulador de integração com sistema de manutenção, ajustando capacidade com base em OEE/manutenções

class MaintenanceIntegration {
  constructor(equipamentos) {
    this.equipamentos = equipamentos;
  }

  getCapacidadeDisponivel(equipamentoId) {
    // Simula cálculo de capacidade disponível considerando OEE e status de manutenção
    const eq = this.equipamentos.find(e => e.id === equipamentoId);
    if (!eq) return 0;
    let capacidadeBase = 100; // Exemplo: capacidade nominal
    if (eq.status === 'Manutenção') {
      return 0;
    } else if (eq.status === 'Prevista') {
      return capacidadeBase * 0.5; // Reduz capacidade pela metade
    } else {
      return capacidadeBase * (eq.oee / 100);
    }
  }

  atualizarOEE(equipamentoId, novoOEE) {
    // Atualiza OEE do equipamento
    const eq = this.equipamentos.find(e => e.id === equipamentoId);
    if (eq) eq.oee = novoOEE;
  }

  agendarManutencao(equipamentoId, data, tipo) {
    // Simula agendamento de manutenção (poderia integrar com backend)
    const eq = this.equipamentos.find(e => e.id === equipamentoId);
    if (eq) eq.status = 'Manutenção';
    // Em produção, adicionaria ao calendário
  }
}

// Exemplo de uso:
// const integracao = new MaintenanceIntegration([
//   {id: 'eq1', oee: 85, status: 'Operando'},
//   {id: 'eq2', oee: 72, status: 'Operando'}
// ]);
// integracao.getCapacidadeDisponivel('eq1');
// integracao.atualizarOEE('eq2', 80);
// integracao.agendarManutencao('eq2', '2024-07-15', 'Corretiva');
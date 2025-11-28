// Funções de cálculo de KPIs PCP (mock realista)
// Planejado vs. Realizado, agregação por período, planta, linha

export function calcularOTIF(pedidos) {
  // pedidos: [{ entregueNoPrazo: bool, quantidade: number }]
  const total = pedidos.reduce((a,b)=>a+b.quantidade,0);
  const entregues = pedidos.filter(p=>p.entregueNoPrazo).reduce((a,b)=>a+b.quantidade,0);
  return total ? +(100*entregues/total).toFixed(1) : 0;
}

export function calcularSetupMedio(setups) {
  // setups: [{ tempoMinutos: number }]
  if (!setups.length) return 0;
  const total = setups.reduce((a,b)=>a+b.tempoMinutos,0);
  return +(total/setups.length).toFixed(1); // minutos
}

export function calcularUtilizacao(capacidadeTotal, capacidadeUsada) {
  return capacidadeTotal ? +(100*capacidadeUsada/capacidadeTotal).toFixed(1) : 0;
}

export function calcularAcuracidadePlano(planejado, realizado) {
  // planejado/realizado: [{ sku, quantidadePlanejada, quantidadeRealizada }]
  let totalPlanejado = 0, totalRealizado = 0;
  planejado.forEach((p,i)=>{
    totalPlanejado += p.quantidadePlanejada;
    totalRealizado += realizado[i]?.quantidadeRealizada || 0;
  });
  if (!totalPlanejado) return 0;
  return +(100*totalRealizado/totalPlanejado).toFixed(1);
}

export function agregacaoPorPlantaLinha(kpis, planta, linha) {
  // kpis: [{ planta, linha, otif, setupMedio, utilizacao, acuracidade }]
  return kpis.filter(k=>k.planta===planta && k.linha===linha);
}

// Exemplo de uso:
/*
const pedidos = [
  { entregueNoPrazo: true, quantidade: 1200 },
  { entregueNoPrazo: false, quantidade: 100 },
  { entregueNoPrazo: true, quantidade: 800 }
];
console.log('OTIF:', calcularOTIF(pedidos));
const setups = [ { tempoMinutos: 80 }, { tempoMinutos: 90 }, { tempoMinutos: 75 } ];
console.log('Setup Médio:', calcularSetupMedio(setups));
console.log('Utilização:', calcularUtilizacao(10000, 8940));
const planejado = [ { sku: 'PA001', quantidadePlanejada: 5000 }, { sku: 'PA002', quantidadePlanejada: 3200 } ];
const realizado = [ { sku: 'PA001', quantidadeRealizada: 4800 }, { sku: 'PA002', quantidadeRealizada: 3250 } ];
console.log('Acuracidade:', calcularAcuracidadePlano(planejado, realizado));
*/
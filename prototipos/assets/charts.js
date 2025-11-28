// charts.js - Biblioteca de configurações de gráficos reutilizáveis Eurofarma (Chart.js)
// Requer Chart.js 4.x
// Paleta Eurofarma: Azul #003399, Amarelo #FFD600, Verde #00995D, Cinza #F5F7FA

const eurofarmaColors = {
  blue: '#003399',
  yellow: '#FFD600',
  green: '#00995D',
  gray: '#F5F7FA',
  darkGray: '#4B4B4B',
  red: '#E53935',
  orange: '#FFA726',
  lightBlue: '#4FC3F7',
  purple: '#7B1FA2'
};

// Configuração global Chart.js
if (window.Chart) {
  Chart.defaults.font.family = 'Lato, Source Sans Pro, Arial, sans-serif';
  Chart.defaults.color = eurofarmaColors.darkGray;
  Chart.defaults.plugins.legend.labels.boxWidth = 18;
  Chart.defaults.plugins.tooltip.backgroundColor = eurofarmaColors.blue;
  Chart.defaults.plugins.tooltip.titleColor = eurofarmaColors.yellow;
  Chart.defaults.plugins.tooltip.bodyColor = '#fff';
  Chart.defaults.plugins.tooltip.borderColor = eurofarmaColors.yellow;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
}

// Gráfico de Linha: Faturamento Mensal, Histórico de OEE, Previsão vs. Realizado
function getLineChartConfig({labels, datasets, title}) {
  return {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map(ds => ({
        ...ds,
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3
      }))
    },
    options: {
      plugins: {
        title: {
          display: !!title,
          text: title,
          color: eurofarmaColors.blue,
          font: {size: 18, weight: 'bold'}
        },
        legend: {position: 'top'},
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          },
          animation: {duration: 400}
        }
      },
      scales: {
        x: {grid: {color: eurofarmaColors.gray}},
        y: {beginAtZero: true, grid: {color: eurofarmaColors.gray}}
      },
      animation: {
        duration: 900,
        easing: 'easeOutQuart'
      }
    }
  };
}

// Gráfico de Barras: Capacidade vs. Demanda, Cobertura de Estoque, MAPE por Família
function getBarChartConfig({labels, datasets, title, horizontal = false}) {
  return {
    type: horizontal ? 'bar' : 'bar',
    data: {
      labels,
      datasets: datasets.map(ds => ({
        ...ds,
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.6
      }))
    },
    options: {
      indexAxis: horizontal ? 'y' : 'x',
      plugins: {
        title: {
          display: !!title,
          text: title,
          color: eurofarmaColors.blue,
          font: {size: 18, weight: 'bold'}
        },
        legend: {position: 'top'},
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          },
          animation: {duration: 400}
        }
      },
      scales: {
        x: {grid: {color: eurofarmaColors.gray}},
        y: {beginAtZero: true, grid: {color: eurofarmaColors.gray}}
      },
      animation: {
        duration: 900,
        easing: 'easeOutQuart'
      }
    }
  };
}

// Gráfico de Pizza: Distribuição de Pedidos, Distribuição de Notificações
function getPieChartConfig({labels, data, title}) {
  return {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          eurofarmaColors.blue,
          eurofarmaColors.yellow,
          eurofarmaColors.green,
          eurofarmaColors.red,
          eurofarmaColors.orange,
          eurofarmaColors.purple,
          eurofarmaColors.lightBlue
        ],
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 8
      }]
    },
    options: {
      plugins: {
        title: {
          display: !!title,
          text: title,
          color: eurofarmaColors.blue,
          font: {size: 18, weight: 'bold'}
        },
        legend: {position: 'right'},
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              let value = context.parsed;
              let total = context.dataset.data.reduce((a, b) => a + b, 0);
              let percent = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percent}%)`;
            }
          },
          animation: {duration: 400}
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 900,
        easing: 'easeOutQuart'
      }
    }
  };
}

// Gráfico de Gauge (OEE)
function getGaugeChartConfig({value, min = 0, max = 100, title}) {
  // Utiliza o plugin chartjs-gauge
  return {
    type: 'gauge',
    data: {
      datasets: [{
        value: value,
        data: [value, max - value],
        backgroundColor: [
          value >= 85 ? eurofarmaColors.green : value >= 70 ? eurofarmaColors.yellow : eurofarmaColors.red,
          eurofarmaColors.gray
        ],
        borderWidth: 0
      }]
    },
    options: {
      needle: {
        radiusPercentage: 2,
        widthPercentage: 3.2,
        lengthPercentage: 80,
        color: eurofarmaColors.blue
      },
      valueLabel: {
        display: true,
        formatter: (v) => v + '%',
        color: eurofarmaColors.blue,
        font: {size: 20, weight: 'bold'}
      },
      plugins: {
        title: {
          display: !!title,
          text: title,
          color: eurofarmaColors.blue,
          font: {size: 18, weight: 'bold'}
        }
      },
      animation: {
        duration: 900,
        easing: 'easeOutQuart'
      },
      cutout: '80%',
      circumference: 180,
      rotation: 270,
      responsive: true,
      maintainAspectRatio: false
    }
  };
}

// Export das funções
window.EurofarmaCharts = {
  eurofarmaColors,
  getLineChartConfig,
  getBarChartConfig,
  getPieChartConfig,
  getGaugeChartConfig
};

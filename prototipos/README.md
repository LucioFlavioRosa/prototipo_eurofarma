# Protótipo Plataforma PCP Eurofarma

## 1. Visão Geral
A plataforma PCP (Planejamento e Controle da Produção) Eurofarma é um sistema de gestão industrial que visa eliminar tarefas manuais em Excel, acelerar o planejamento e execução, e melhorar a tomada de decisão no ambiente fabril. O protótipo cobre todos os épicos do roadmap, simulando integrações com SAP e fluxos críticos do PCP moderno.

## 2. Estrutura de Arquivos
- **pmp-mensal.html**: Visão mensal do Plano Mestre de Produção, filtros dinâmicos, tabela de necessidades e gráficos.
- **explosao-bom.html**: Explosão de estrutura de produto, validação de capacidade fabril, dashboard de gargalos.
- **simulacao-cenarios.html**: Simulação "E Se", ajuste de parâmetros, Gantt Chart dinâmico, comparação de KPIs.
- **cockpit-replanejamento.html**: Drag-and-drop no sequenciamento, múltiplos cenários, workflow de aprovação.
- **dashboard-kpis.html**: Painel executivo com KPIs críticos, drill-down por planta/linha/período.
- **aprovacoes.html**: Workflow de aprovação multifábrica, histórico de decisões.
- **monitoramento-mp.html**: Monitoramento de matéria-prima, alertas de ruptura, dashboard de insumos.
- **comunicacao.html**: Comunicação automática pós-replanejamento, status de notificações.
- **terceirizacao.html**: Gestão de produção terceirizada, status de fornecedores.
- **acuracidade-forecast.html**: Análise de acuracidade de previsão de vendas.
- **js/dynamic-updates.js**: Atualizações dinâmicas entre páginas e recálculo de dados.
- **js/validations.js**: Validações de formulários e ações críticas.
- **js/mock-data.js**: Dados simulados para tabelas, gráficos e Gantt.

## 3. Fluxos de Navegação
![Fluxo de Navegação](screenshots/fluxo-navegacao.png)
- O usuário inicia em **pmp-mensal.html**.
- Seleciona SKU/mês → vê explosão de estrutura em **explosao-bom.html**.
- Pode acessar simulação de cenários ou cockpit de replanejamento.
- Aprovações e monitoramento são acessíveis a partir de alertas ou menus.
- Todas as transições são dinâmicas, com filtros e parâmetros propagados entre páginas.

## 4. Dados Mockados
Os dados utilizados nas tabelas, gráficos e Gantt Chart estão definidos em `js/mock-data.js`. Exemplos:
- **Necessidade de Produção por SKU**: [{ sku: 'AMOX500', mes: '2024-07', estoqueAtual: 12000, previsaoVendas: 9500, politicaEstoque: 4000, necessidade: 1500 }]
- **Gantt Chart**: [{ ordem: 'OP1234', produto: 'AMOX500', inicio: '2024-07-10', fim: '2024-07-12', equipamento: 'Linha 1' }]
- **KPIs**: { otif: 98.2, setupTime: 7.5, capacidadeUtilizada: 89, faturamento: 1_200_000 }

## 5. Como Executar
1. Clone ou baixe o repositório.
2. Abra qualquer arquivo HTML na pasta `prototipos/` em seu navegador (não requer backend).
3. Para simular navegação dinâmica, utilize os filtros e botões das páginas.
4. Certifique-se de que os arquivos `.js` estejam no mesmo diretório das páginas HTML.

## 6. Limitações
- Integrações com SAP, APIs e sistemas externos são simuladas via mock.
- O Gantt Chart e gráficos usam dados estáticos ou simulados.
- Não há persistência real de dados ou autenticação.
- Algumas validações e restrições são exemplos e podem ser expandidas.

## 7. Próximos Passos
- Implementar APIs reais para leitura/escrita no SAP.
- Conectar dashboards a bancos de dados reais.
- Desenvolver autenticação e controle de permissões.
- Evoluir o motor de simulação e algoritmos de otimização.
- Testes de usabilidade com usuários reais.

---

![Screenshot PMP Mensal](screenshots/pmp-mensal.png)
![Screenshot Simulação de Cenários](screenshots/simulacao-cenarios.png)
![Screenshot Gantt Chart](screenshots/gantt-chart.png)

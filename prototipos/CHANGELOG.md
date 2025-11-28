# CHANGELOG - Plataforma PCP Eurofarma (Protótipo)

## Sprint 1
- Estrutura inicial do protótipo criada.
- Página de Login e autenticação simulada.
- Dashboard principal com KPIs de PCP, gráficos (Chart.js) e navegação responsiva.
- Tabelas de exemplo com DataTables.js para visualização de SKUs, estoques e necessidades.

## Sprint 2
- Módulo de Plano Mestre de Produção (PMP) com cálculo automatizado e ajuste manual de parâmetros.
- Explosão de estrutura de produto (BOM) e validação de capacidade fabril.
- Dashboard de Capacidade vs. Demanda com indicadores visuais (verde/amarelo/vermelho).
- Alertas automáticos para excesso de demanda.

## Sprint 3
- Integração bidirecional simulada com SAP MRP.
- Log de auditoria de transações e rollback em caso de falha.
- Motor de Sequenciamento Ótimo de Produção (APS) com visualização em Gantt Chart (DHTMLX Gantt).
- KPIs de Faturamento Previsto, Margem Líquida e Taxa de Atendimento.

## Sprint 4
- Cockpit de Replanejamento Dinâmico com Drag-and-Drop (DHTMLX Gantt).
- Recalculo automático de KPIs ao mover ordens.
- Geração e comparação de múltiplos cenários "E se...".
- Workflow de aprovação multifábrica com dashboard de aprovações pendentes.

## Sprint 5
- Gestão de Carteira de Pedidos e alertas de ruptura.
- Algoritmo de sugestão de antecipação de ordens para pedidos críticos.
- Dashboard de Pedidos em Risco com filtros avançados.

## Sprint 6
- Módulo de Monitoramento de Matéria-Prima e alertas proativos.
- Dashboard de Saúde de Insumos com indicadores por produto crítico.
- Integração com sistema de manutenção preditiva (simulada).
- Dashboard de Saúde de Equipamentos.

## Sprint 7
- Módulo de Comunicação Automática pós-replanejamento.
- Log de confirmação de leitura de notificações.
- Dashboard de Status de Comunicação para auditoria.

## Sprint 8
- Análise de acuracidade de previsão de vendas (MAPE, Bias).
- Dashboard de Acuracidade de Forecast com tendências históricas.
- Gestão de Estoque de Granel e política de desacoplamento.
- Dashboard de Estoque de Granel com alertas de vencimento.

## Sprint 9
- Gestão de Terceirização de Produção e integração de pedidos terceirizados.
- Dashboard de Status de Terceirização com indicadores de performance de fornecedores.

## Sprint 10
- Página de testes de integração automatizados (QUnit) cobrindo fluxos completos: PMP → BOM → Capacidade, Carteira de Pedidos → Replanejamento → Aprovação, Simulação → Comparação de Cenários → Salvar Cenário.
- Documentação de dependências (package.json).
- Changelog detalhado.

---

## Melhorias Futuras
- Integração real-time com SAP via RFC/REST.
- Autenticação de usuários integrada ao SSO corporativo.
- Notificações push reais (Web Push, SMS, e-mail).
- Dashboard mobile-first com PWA.
- Módulo de analytics avançado com IA para previsão de gargalos.
- Exportação de relatórios em PDF/Excel diretamente do dashboard.
- Internacionalização (i18n) e acessibilidade avançada (WCAG 2.1).

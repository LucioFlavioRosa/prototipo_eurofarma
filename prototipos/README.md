# Prototipo PCP Eurofarma

## Estrutura de Arquivos

- `prototipos/`
  - `dashboard.html` — Tela principal do cockpit PCP
  - `plano-mestre.html` — Módulo de Plano Mestre de Produção
  - `explosao-estrutura.html` — Explosão de estrutura de produto e capacidade fabril
  - `sequenciamento.html` — Sequenciamento ótimo de produção (APS)
  - `replanejamento.html` — Cockpit de replanejamento dinâmico (drag-and-drop)
  - `comunicacao.html` — Comunicação automática pós-replanejamento
  - `monitoramento-materia-prima.html` — Monitoramento de matéria-prima
  - `dashboard-kpis.html` — Dashboard executivo de KPIs
  - `simulacao-cenarios.html` — Módulo de simulação 'E Se'
  - `terceirizacao.html` — Gestão de terceirização de produção
  - `integration-tests.html` — Testes de integração dos fluxos principais
  - `assets/js/lazy-loading.js` — Script de lazy loading para componentes pesados
  - `assets/mock/` — Exemplos de dados e componentes para lazy loading

## Dependências

- Todas as páginas replicam os `<link>` e `<script>` do template Eurofarma-2.html.
- Não há dependências externas além das presentes no template original.

## Instruções de Execução

1. Abra qualquer página `.html` diretamente em seu navegador.
2. Para testar lazy loading, acesse páginas com gráficos ou tabelas grandes (ex: `dashboard-kpis.html`).
3. Para validar integração, acesse `integration-tests.html` e siga o checklist.

## Descrição dos Módulos

- **Plano Mestre de Produção:** Visualização mensal da necessidade de produção, integração SAP, alertas de capacidade.
- **Explosão de Estrutura:** Desdobramento de produto acabado em granel/embalagem, validação de capacidade fabril.
- **Sequenciamento:** Algoritmo de otimização, Gantt Chart, KPIs.
- **Replanejamento:** Drag-and-drop de ordens, recálculo de KPIs, múltiplos cenários.
- **Comunicação:** Notificações automáticas para equipes após replanejamento.
- **Monitoramento de Matéria-Prima:** Alertas proativos de ruptura, dashboard de insumos críticos.
- **Dashboard KPIs:** Indicadores-chave do PCP, drill-down por planta/linha/período.
- **Simulação de Cenários:** Engine de simulação, comparação de cenários.
- **Terceirização:** Gestão de ordens terceirizadas, status de fornecedores.

## Fluxo de Navegação

1. **dashboard.html** → Plano Mestre → Explosão → Sequenciamento → Replanejamento → Aprovação → Comunicação
2. Todas as telas possuem navegação intuitiva, botões de retorno e links para próximos passos.
3. Experiência visual e interativa baseada no design Eurofarma.

## Observações

- Exemplos de tabelas e gráficos são realistas e baseados em dados industriais.
- Lazy loading está implementado para componentes pesados.
- Testes de integração cobrem todos os épicos do PCP.
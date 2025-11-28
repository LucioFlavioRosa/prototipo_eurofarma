# Guia do Usuário – Plataforma PCP Eurofarma

Bem-vindo à plataforma de Planejamento e Controle da Produção (PCP) Eurofarma. Este guia foi elaborado para apoiar diferentes perfis de usuários na utilização eficiente do sistema, promovendo automação, integração e tomada de decisão baseada em dados.

## Sumário
1. [Planejador de PCP](#planejador-de-pcp)
2. [Gestor de Produção](#gestor-de-produção)
3. [Analista de Suprimentos](#analista-de-suprimentos)

---

## 1. Planejador de PCP

### 1.1. Módulo de Plano Mestre de Produção (PMP)
**Objetivo:** Automatizar o cálculo da necessidade de produção mensal, considerando estoque, previsão de vendas e política de estoque, eliminando planilhas Excel.

#### Passo a Passo
1. **Acesse o menu** `Planejamento > PMP Mensal`.
2. **Selecione o período** desejado (até 12 meses à frente).
3. **Visualize a tabela** de necessidades de produção por SKU:

   ![Screenshot PMP](screenshots/pmp-tabela.png)

4. **Ajuste parâmetros** (turnos, horas extras) usando os campos editáveis acima da tabela.
5. **Clique em "Recalcular"** para atualizar os resultados em tempo real.
6. **Observe alertas** automáticos caso a necessidade exceda a capacidade disponível.

#### Dicas de Uso
- Utilize os filtros por família de produto ou planta para análises segmentadas.
- Exporte os dados em Excel para reuniões de S&OP.

---

### 1.2. Sequenciamento de Produção (APS)
**Objetivo:** Sequenciar ordens de produção de forma otimizada, considerando restrições de setup, disponibilidade de insumos e maximização de KPIs.

#### Passo a Passo
1. **Acesse o menu** `Sequenciamento > APS`.
2. **Visualize o Gantt Chart** com a linha do tempo por equipamento:

   ![Screenshot Gantt](screenshots/gantt-chart.png)

3. **Arraste e solte** ordens para reordenar a sequência (Drag-and-Drop).
4. **Confira os KPIs** recalculados automaticamente ao lado do gráfico.
5. **Salve o cenário** ou compare múltiplos cenários lado a lado.

#### Dicas de Uso
- Use o botão "Simular Cenário" para testar hipóteses sem impactar o plano oficial.
- Utilize o modo de alto contraste para melhor visualização em ambientes industriais.

---

### 1.3. Simulação de Cenários "E Se"
**Objetivo:** Testar hipóteses de planejamento e visualizar impactos antes de aplicar mudanças.

#### Passo a Passo
1. **Acesse o menu** `Simulação > Novo Cenário`.
2. **Ajuste parâmetros** (ex: adicionar turno, antecipar produção).
3. **Clique em "Executar Simulação"**.
4. **Compare o cenário simulado** com o cenário base em tabela e gráficos:

   ![Screenshot Simulação](screenshots/simulacao-comparativo.png)

5. **Salve o cenário** para análise posterior.

#### Dicas de Uso
- Analise os KPIs de cada cenário antes de decidir pela aplicação.
- Utilize os gráficos para apresentar resultados em reuniões.

---

## 2. Gestor de Produção

### 2.1. Visualização de Capacidade e Aprovação de Replanejamentos
**Objetivo:** Monitorar capacidade fabril, identificar gargalos e aprovar mudanças de sequenciamento.

#### Passo a Passo
1. **Acesse o menu** `Capacidade > Dashboard`.
2. **Visualize o painel** "Capacidade vs. Demanda" com indicadores visuais (verde/amarelo/vermelho):

   ![Screenshot Capacidade](screenshots/capacidade-dashboard.png)

3. **Clique em "Aprovações Pendentes"** para revisar solicitações de replanejamento.
4. **Aprove ou rejeite** alterações diretamente pelo painel, com histórico de decisões.

#### Dicas de Uso
- Utilize o filtro por linha de produção para análise detalhada.
- Ative notificações para ser alertado sobre novas solicitações de aprovação.

---

### 2.2. Monitoramento de KPIs
**Objetivo:** Acompanhar indicadores-chave do PCP, como acuracidade do plano, taxa de atendimento e ociosidade de máquinas.

#### Passo a Passo
1. **Acesse o menu** `KPIs > Dashboard Executivo`.
2. **Visualize gráficos interativos** com drill-down por planta e período:

   ![Screenshot KPIs](screenshots/kpi-dashboard.png)

3. **Exporte relatórios** em PDF/Excel para reuniões.

#### Dicas de Uso
- Utilize o comparativo Planejado vs. Realizado para identificar desvios.
- Os gráficos possuem descrições alternativas para acessibilidade.

---

## 3. Analista de Suprimentos

### 3.1. Monitoramento de Matéria-Prima e Carteira de Pedidos
**Objetivo:** Acompanhar status de insumos e pedidos, receber alertas de risco de ruptura e propor cenários de antecipação.

#### Passo a Passo
1. **Acesse o menu** `Suprimentos > Matéria-Prima`.
2. **Visualize o dashboard** de "Saúde de Insumos" com indicadores por produto crítico:

   ![Screenshot Insumos](screenshots/insumos-dashboard.png)

3. **Acesse o menu** `Suprimentos > Carteira de Pedidos` para ver pedidos em risco:

   ![Screenshot Pedidos](screenshots/pedidos-risco.png)

4. **Utilize filtros** por cliente, produto e data de entrega.
5. **Analise sugestões** de antecipação de ordens para atender pedidos críticos.

#### Dicas de Uso
- Ative notificações para ser informado sobre novos riscos de ruptura.
- Utilize o modo de alto contraste para melhor leitura dos alertas.

---

## Recursos de Acessibilidade
- Todos os botões e links possuem `aria-label` para leitores de tela.
- Navegação por teclado: use Tab para navegar, Enter para selecionar e Esc para fechar modais.
- Gráficos possuem descrições alternativas e podem ser lidos por leitores de tela.
- O modo de alto contraste pode ser ativado no cabeçalho da plataforma.

---

## Suporte
Em caso de dúvidas ou sugestões, entre em contato com o time de suporte pelo menu `Ajuda > Suporte`.

// PCP Core JS - Biblioteca central
const PCP = {
    formatNumber: function(num, decimals = 2) {
        return num.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    },
    formatCurrency: function(num) {
        return 'R$ ' + num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).replace('R$', '').trim();
    },
    formatPercent: function(num) {
        return PCP.formatNumber(num, 1) + '%';
    },
    formatDate: function(date) {
        if (!date) return '';
        let d = new Date(date);
        return d.toLocaleDateString('pt-BR');
    },
    validateEmail: function(email) {
        return /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
    },
    mockKPIs: function() {
        return {
            acuracidade: 97.2,
            atendimento: 99.1,
            ociosidade: 6.5,
            faturamento: 48200000
        };
    },
    mockPlantas: function() {
        return [
            { nome: 'Montes Claros', acuracidade: 98.1, atendimento: 99.5, ociosidade: 5.2, faturamento: 12800000 },
            { nome: 'Itapevi', acuracidade: 96.7, atendimento: 98.9, ociosidade: 7.1, faturamento: 18400000 },
            { nome: 'Ribeirão Preto', acuracidade: 97.0, atendimento: 99.0, ociosidade: 7.2, faturamento: 17000000 }
        ];
    },
    goToPage: function(page) {
        window.location.href = page;
    },
    showToast: function(msg, type = 'info') {
        let toast = document.createElement('div');
        toast.className = 'pcp-toast pcp-toast-' + type;
        toast.innerText = msg;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 400);
        }, 3000);
    },
    // Transição entre páginas simulada
    transition: function(targetPage) {
        PCP.showToast('Navegando para ' + targetPage, 'success');
        setTimeout(() => PCP.goToPage(targetPage), 800);
    }
};
// Exemplo de uso: PCP.showToast('Bem-vindo ao PCP!', 'success');

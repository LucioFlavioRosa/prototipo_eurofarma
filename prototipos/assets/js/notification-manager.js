// notification-manager.js
// Simula envio de notificações, exibe toast/modal e registra leitura por perfil
function reenviarNotificacao(btn, id) {
    const destinatarios = {
        1: { nome: 'Maria Oliveira', perfil: 'Produção', mensagem: 'Nova sequência de ordens aprovada para linha 3.' },
        2: { nome: 'João Silva', perfil: 'Almoxarifado', mensagem: 'Nova prioridade de separação para SKU 1029.' },
        3: { nome: 'Fernanda Lima', perfil: 'Qualidade', mensagem: 'Liberação pendente para lote 2204.' },
        4: { nome: 'Roberto Costa', perfil: 'Logística', mensagem: 'Atualização de rota para entrega urgente.' }
    };
    const info = destinatarios[id];
    showToast(`Notificação reenviada para ${info.nome} (${info.perfil})`);
    showModal(`Mensagem: <strong>${info.mensagem}</strong><br>Status: <span style='color:#2e8b57;font-weight:700;'>Enviada</span>`);
    // Simula atualização de status para "Lido" após reenvio
    setTimeout(() => {
        const rows = document.querySelectorAll('#notification-log tr');
        if (rows[id-1]) {
            rows[id-1].querySelector('td.status-nao-lido')?.classList.remove('status-nao-lido');
            if (rows[id-1].querySelector('td')) {
                rows[id-1].querySelectorAll('td')[4].textContent = 'Lido';
                rows[id-1].querySelectorAll('td')[4].classList.add('status-lido');
            }
        }
    }, 1500);
}
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2200);
}
function showModal(html) {
    document.getElementById('modal-content').innerHTML = html;
    document.getElementById('modal-bg').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}
function closeModal() {
    document.getElementById('modal-bg').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

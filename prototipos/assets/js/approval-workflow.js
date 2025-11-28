// approval-workflow.js
// Simulação de workflow de aprovação multifábrica com níveis, notificações e log

const userProfile = 'Gerente PCP Corporativo'; // Simulação de perfil logado

function showToast(message) {
    const toast = document.getElementById('toast-notification');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

function approveRequest(requestId) {
    if (!canApprove(userProfile)) {
        showToast('Permissão insuficiente para aprovar esta solicitação.');
        return;
    }
    updateStatus(requestId, 'Aprovado');
    logAudit(requestId, 'Aprovado');
    showToast('Solicitação ' + requestId + ' aprovada com sucesso! Notificação enviada.');
}

function rejectRequest(requestId) {
    if (!canApprove(userProfile)) {
        showToast('Permissão insuficiente para rejeitar esta solicitação.');
        return;
    }
    updateStatus(requestId, 'Rejeitado');
    logAudit(requestId, 'Rejeitado');
    showToast('Solicitação ' + requestId + ' rejeitada. Notificação enviada.');
}

function updateStatus(requestId, status) {
    const rows = document.querySelectorAll('#pending-approvals tr');
    rows.forEach(row => {
        if (row.cells[0].textContent === requestId) {
            const statusCell = row.cells[4].querySelector('span');
            if (status === 'Aprovado') {
                statusCell.textContent = 'Aprovado';
                statusCell.className = 'status-indicator status-aprovado';
            } else if (status === 'Rejeitado') {
                statusCell.textContent = 'Rejeitado';
                statusCell.className = 'status-indicator status-rejeitado';
            }
            row.cells[5].querySelectorAll('button').forEach(btn => btn.disabled = true);
            row.cells[5].querySelector('textarea').disabled = true;
        }
    });
}

function logAudit(requestId, decision) {
    const comment = document.getElementById('comment-' + requestId).value;
    const now = new Date();
    const dateString = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    const table = document.getElementById('audit-log');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${dateString}</td><td>${requestId}</td><td>${decision}</td><td>${userProfile}</td><td>${comment ? comment : '-'}</td><td><span class="status-indicator status-${decision.toLowerCase()}">${decision}</span></td>`;
    table.prepend(tr);
}

function canApprove(profile) {
    // Simulação de permissões: apenas Gerente PCP Corporativo ou Supervisor Planta podem aprovar/rejeitar
    return profile === 'Gerente PCP Corporativo' || profile.includes('Supervisor Planta');
}

// Notificações simuladas: toast/modal
// Log de auditoria: tabela dinâmica
// Validação de permissões: função canApprove

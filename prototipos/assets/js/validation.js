// Validação de formulários PCP Eurofarma

function showFeedback(type, message, target) {
  let feedback = document.createElement('div');
  feedback.className = 'form-feedback ' + type;
  feedback.setAttribute('role', 'alert');
  feedback.innerText = message;
  if (target) {
    target.parentNode.insertBefore(feedback, target.nextSibling);
    setTimeout(() => feedback.remove(), 4000);
  }
}

function validateField(field) {
  if (field.hasAttribute('required') && !field.value.trim()) {
    showFeedback('error', 'Campo obrigatório.', field);
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    return false;
  }
  field.classList.remove('invalid');
  field.setAttribute('aria-invalid', 'false');
  return true;
}

function validateForm(form) {
  let valid = true;
  let fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(field => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

// Exemplo de validação de negócio: não permitir sequência inválida no Gantt
function validateSequence(sequence) {
  // Regra: não pode haver dois setups críticos consecutivos
  for (let i = 1; i < sequence.length; i++) {
    if (sequence[i].type === 'setup' && sequence[i-1].type === 'setup' && sequence[i].critical && sequence[i-1].critical) {
      showFeedback('error', 'Sequência inválida: dois setups críticos consecutivos.', document.querySelector('.gantt-chart'));
      return false;
    }
  }
  return true;
}

// Tooltips de ajuda
function attachTooltip(element, text) {
  element.addEventListener('focus', function() {
    let tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = text;
    tooltip.style.position = 'absolute';
    tooltip.style.top = (element.offsetTop + element.offsetHeight + 5) + 'px';
    tooltip.style.left = element.offsetLeft + 'px';
    document.body.appendChild(tooltip);
    element._tooltip = tooltip;
  });
  element.addEventListener('blur', function() {
    if (element._tooltip) {
      element._tooltip.remove();
      element._tooltip = null;
    }
  });
}

// Modal de confirmação
function showModal(message, onConfirm) {
  let modal = document.createElement('div');
  modal.className = 'modal-confirm';
  modal.innerHTML = '<div class="modal-content"><p>' + message + '</p><button id="confirmBtn">Confirmar</button><button id="cancelBtn">Cancelar</button></div>';
  document.body.appendChild(modal);
  document.getElementById('confirmBtn').onclick = function() {
    onConfirm();
    modal.remove();
  };
  document.getElementById('cancelBtn').onclick = function() {
    modal.remove();
  };
}

// Exemplo de uso:
// document.querySelector('form').onsubmit = function(e) {
//   e.preventDefault();
//   if (validateForm(this)) {
//     showModal('Deseja realmente salvar?', () => {
//       // lógica de envio
//     });
//   }
// };

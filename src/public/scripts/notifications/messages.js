// Função para mostrar um alerta personalizado
function showCustomAlert(message, type = 'error') {
    const alertBox = document.createElement('div');
    alertBox.className = `custom-alert ${type}`;
    alertBox.innerHTML = `
        ${message} <button onclick="this.parentElement.style.display='none'">Fechar</button>
    `;

    // Adiciona a caixa de alerta ao contêiner de alertas personalizados
    const alertContainer = document.getElementById('customAlertContainer');
    alertContainer.appendChild(alertBox);

    // Exibe a caixa de alerta
    alertBox.style.display = 'block';

    // Remove a caixa de alerta após 5 segundos
    setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.remove();
    }, 5000);
}

// Função para mostrar uma confirmação personalizada
function showCustomConfirm(message) {
    return new Promise((resolve, reject) => {
        const confirmBox = document.createElement('div');
        confirmBox.className = 'custom-confirm';
        confirmBox.innerHTML = `
            <div class="custom-confirm-message">${message}</div>
            <div class="custom-confirm-buttons">
                <button id="confirmYes">Confirmar</button>
                <button id="confirmNo">Cancelar</button>
            </div>
        `;

        document.body.appendChild(confirmBox);

        document.getElementById('confirmYes').addEventListener('click', () => {
            confirmBox.remove(); // Remove a caixa de confirmação
            resolve(true); // Resolve a promise com true
        });

        document.getElementById('confirmNo').addEventListener('click', () => {
            confirmBox.remove(); // Remove a caixa de confirmação
            reject(false); // Rejeita a promise com false
        });
    });
}

export { showCustomAlert };
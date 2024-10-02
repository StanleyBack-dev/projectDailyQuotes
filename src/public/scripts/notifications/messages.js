// FUNCTION TO SHOW A CUSTOM ALERT
function showCustomAlert(message, type = 'error') {
    const alertBox = document.createElement('div');
    alertBox.className = `custom-alert ${type}`;
    alertBox.innerHTML = `
        ${message} <button onclick="this.parentElement.style.display='none'">Fechar</button>
    `;

    // ADD ALERT BOX TO CUSTOM ALERTS CONTAINER
    const alertContainer = document.getElementById('customAlertContainer');
    alertContainer.appendChild(alertBox);

    // DISPLAYS THE ALERT BOX
    alertBox.style.display = 'block';

    // REMOVE ALERT BOX AFTER 5 SECONDS
    setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.remove();
    }, 5000);
}

// FUNCTION TO SHOW A CUSTOM CONFIRMATION
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
            confirmBox.remove();
            resolve(true);
        });

        document.getElementById('confirmNo').addEventListener('click', () => {
            confirmBox.remove();
            reject(false);
        });
    });
}

export { showCustomAlert };
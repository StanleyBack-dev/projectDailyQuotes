import { showCustomAlert } from '../../notifications/messages.js';

document.addEventListener("DOMContentLoaded", function () {
    const emailForm = document.getElementById("emailForm");
    const emailInput = document.getElementById("email");

    emailForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = emailInput.value;
        try {
            const response = await fetch('/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();

            if (response.ok) {
                showCustomAlert(result.message,'success');
            } else {
                showCustomAlert(result.message, 'error'); 
            }
        } catch (error) {
            showCustomAlert("Erro de conexão. Por favor, tente novamente.");
        }

        setTimeout(() => {
            location.reload();
        }, 3000); 
    });
});
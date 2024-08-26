document.addEventListener("DOMContentLoaded", async function () {
    const readersCountElement = document.getElementById("readersCount");

    try {
        // MAKE THE REQUEST FOR THE READER COUNT ROUTE
        const response = await fetch('/emails-count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();

            if (data.success && data.activeReadersCount !== undefined) {
                readersCountElement.textContent = data.activeReadersCount;
            } else {
                readersCountElement.textContent = "N/A";
                console.error("Erro: Dados não encontrados ou formato inesperado.");
            }
        } else {
            readersCountElement.textContent = "N/A";
            console.error("Erro na requisição:", response.status, response.statusText);
        }
    } catch (error) {
        readersCountElement.textContent = "N/A";
        console.error("Erro ao buscar os leitores ativos:", error);
    }
});
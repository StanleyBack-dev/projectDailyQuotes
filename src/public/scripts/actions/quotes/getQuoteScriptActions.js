document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes();
});

async function fetchQuotes() {
    try {
        // Fazendo a requisição à API
        const response = await fetch('/quotes');
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Convertendo a resposta para JSON
        const data = await response.json();
        console.log('Citações recebidas:', data);
        
        // Atualizando o DOM com as citações
        displayQuotes(data.data); // Acessando a chave 'data'
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayQuotes(quotes) {
    const container = document.querySelector('.quote-container');
    
    // Limpa o container antes de adicionar as citações
    container.innerHTML = '';

    // Itera sobre cada citação e cria um elemento para ela
    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.classList.add('quote-card');

        // Criando o HTML para o cartão de citação
        quoteCard.innerHTML = `
            <div class="quote-header">
                <h2 class="quote-author">${quote.author}</h2>
            </div>
            <p class="quote-content">
                "${quote.content}"
            </p>
            <div class="quote-tags">
                ${quote.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
            </div>
        `;

        // Adiciona o cartão de citação ao container
        container.appendChild(quoteCard);
    });
}

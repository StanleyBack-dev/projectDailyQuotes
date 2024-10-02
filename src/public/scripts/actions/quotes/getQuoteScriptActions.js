document.addEventListener('DOMContentLoaded', () => {
    fetchQuotes();
});

async function fetchQuotes() {
    try {
        // MAKING THE API REQUEST
        const response = await fetch('/quotes');
        
        // CHECKING IF THE RESPONSE WAS SUCCESSFUL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // CONVERTING THE RESPONSE TO JSON
        const data = await response.json();
        console.log('Citações recebidas:', data);
        
        // UPDATING THE DOM WITH QUOTES
        displayQuotes(data.data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayQuotes(quotes) {
    const container = document.querySelector('.quote-container');
    
    // CLEAR THE CONTAINER BEFORE ADDING QUOTES
    container.innerHTML = '';

    // Itera sobre cada citação e cria um elemento para ela
    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.classList.add('quote-card');

        // CREATING THE HTML FOR THE QUOTE CARD
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

        // ADD QUOTE CARD TO CONTAINER
        container.appendChild(quoteCard);
    });
}
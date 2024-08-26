import { showCustomAlert } from '../../notifications/messages.js';

const authorsGallery = document.getElementById('authorsGallery');
const biographyModal = document.getElementById('biographyModal');
const biographyDetails = document.getElementById('biographyDetails');
const closeModal = document.getElementById('closeModal');

// Fetch the list of authors from the API
const fetchAuthors = async () => {
    try {
        const response = await fetch('/authors');
        const result = await response.json();

        if (result.success) {
            displayAuthors(result.data);
        } else {
            showCustomAlert('Erro ao carregar os autores.');
        }
    } catch (error) {
        console.error('Erro ao buscar autores:', error);
        showCustomAlert('Erro ao buscar autores.');
    }
};

// Display the list of authors in the gallery
const displayAuthors = (authors) => {
    authorsGallery.innerHTML = '';

    authors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card');

        authorCard.innerHTML = `
            <img src="${author.imageThumbnail}" alt="Foto de ${author.nameAuthor}" class="author-image">
            <h3 class="author-name">${author.nameAuthor}</h3>
            <p class="author-description">${author.descriptionBiography}</p>
            <button class="view-biography" data-uid="${author.uid}">Ver Biografia Completa</button>
        `;

        // Add event listener to the "Ver Biografia Completa" button
        authorCard.querySelector('.view-biography').addEventListener('click', () => {
            openBiographyModal(author);
        });

        authorsGallery.appendChild(authorCard);
    });
};

// Open the modal and display the full biography
const openBiographyModal = (author) => {
    biographyDetails.innerHTML = `
        <h2>${author.nameAuthor}</h2>
        <img src="${author.imageOriginal}" alt="Foto de ${author.nameAuthor}" class="biography-image">
        <p>${author.summaryBiographical}</p>
        <a href="${author.informationLink}" target="_blank">Mais informações</a>
    `;

    biographyModal.style.display = 'block';
};

// Close the modal
closeModal.addEventListener('click', () => {
    biographyModal.style.display = 'none';
});

// Fetch authors when the page loads
document.addEventListener('DOMContentLoaded', fetchAuthors);
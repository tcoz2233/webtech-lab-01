//1. DATA ARRAY
const collectionData = [
    { id: 1, title: "Process Simulation", category: "Engineering", description: "Optimization models in Arena & FlexSim" },
    { id: 2, title: "PC player", category: "Hobbies", description: "Age of Empires II player" },
    { id: 3, title: "PC Architecture", category: "Engineering", description: "Computer architecture and assembly projects" },
    { id: 4, title: "Blacksmith", category: "Hobbies", description: "Creation of knives for different purposes using different materials" },
    { id: 5, title: "Sports", category: "Hobbies", description: "Rugby player and sometimes tennis" },
    { id: 6, title: "Feasibility Study", category: "Engineering", description: "Technical and financial analysis model" },
    { id: 7, title: "Tools", category: "Usefull lessons learned", description: "Utilization of different kind of tools" },
    
    { id: 8, title: "AI aplication", category: "Usefull lessons learned", description: "Utilization of different kind of AI models for different purposes" }
];

//2. SELECCIÓN DE ELEMENTOS DEL DOM
const collectionContainer = document.getElementById('collection-container');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const noResultsMsg = document.getElementById('no-results');
const addItemForm = document.getElementById('add-item-form');

//3. CREAR NODO DE TARJETA
function createCardNode(item) {
    const card = document.createElement('article');
    card.className = 'collection-card';
    card.dataset.id = item.id;

    const titleEl = document.createElement('h4');
    titleEl.textContent = item.title;

    const categoryEl = document.createElement('span');
    categoryEl.className = 'badge';
    categoryEl.textContent = item.category;

    const descEl = document.createElement('p');
    descEl.textContent = item.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.type = 'button';

    card.appendChild(titleEl);
    card.appendChild(categoryEl);
    card.appendChild(descEl);
    card.appendChild(deleteBtn);

    return card;
}

//4. RENDERIZAR LA COLECCIÓN
function renderCollection(items) {
    collectionContainer.replaceChildren();

    if (items.length === 0) {
        noResultsMsg.classList.remove('hidden');
    } else {
        noResultsMsg.classList.add('hidden');
        items.forEach(item => {
            const cardNode = createCardNode(item);
            collectionContainer.appendChild(cardNode);
        });
    }
}

//5. FILTRADO EN TIEMPO REAL
function filterCollection() {
    const query = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;

    const filtered = collectionData.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(query) || 
                             item.description.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        
        return matchesQuery && matchesCategory;
    });

    renderCollection(filtered);
}
searchInput.addEventListener('input', filterCollection);
categorySelect.addEventListener('change', filterCollection);

//6. AGREGAR NUEVOS ITEMS AL ARRAY Y DOM
addItemForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newTitle = document.getElementById('new-title').value.trim();
    const newCategory = document.getElementById('new-category').value;
    const newDesc = document.getElementById('new-desc').value.trim();

    if (!newTitle || !newDesc) return;

    const newItem = {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        description: newDesc
    };

    collectionData.push(newItem);
    filterCollection();
    addItemForm.reset();
});

//7. DELEGACIÓN DE EVENTOS EN EL CONTENEDOR
collectionContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        const card = e.target.closest('.collection-card');
        const itemId = Number(card.dataset.id);

        const index = collectionData.findIndex(item => item.id === itemId);
        if (index !== -1) {
            collectionData.splice(index, 1);
        }

        filterCollection();
    }
});

//8. VALIDACIÓN DEL FORMULARIO DE CONTACTO
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formFeedback = document.getElementById('form-feedback');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // <-- ESTA LÍNEA EVITA EL ERROR 405 Y LA RECARGA

        let isValid = true;

        // Limpiar mensajes anteriores
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formFeedback.textContent = '';
        formFeedback.className = 'feedback-message';

        // 1. Validar Nombre
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter a valid name (at least 2 characters).';
            isValid = false;
        }

        // 2. Validar Email
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // 3. Validar Mensaje
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long.';
            isValid = false;
        }

        // Resultado
        if (isValid) {
            formFeedback.textContent = 'Thank you! Your message has been sent successfully.';
            formFeedback.style.color = 'green';
            contactForm.reset();
        } else {
            formFeedback.textContent = 'Please fix the errors above before submitting.';
            formFeedback.style.color = 'red';
        }
    });
}
// --- INICIALIZAR ---
renderCollection(collectionData);
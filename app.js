const names = {
    boy: [
        'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason',
        'Ethan', 'James', 'Benjamin', 'Alexander', 'Henry', 'Sebastian',
        'Jack', 'Aiden', 'Owen', 'Samuel', 'Ryan', 'Nathan',
        'Leo', 'Isaac', 'Gabriel', 'Julian', 'Matthew', 'Luke',
        'Asher', 'Lincoln', 'Isaiah', 'Caleb', 'Josiah', 'Daniel',
        'Theodore', 'William', 'Michael', 'David', 'Joseph', 'Carter'
    ],
    girl: [
        'Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia',
        'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Luna', 'Ella',
        'Scarlett', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley',
        'Zoey', 'Nora', 'Lily', 'Eleanor', 'Hannah', 'Lillian',
        'Addison', 'Aubrey', 'Ellie', 'Stella', 'Natalie', 'Zoe',
        'Victoria', 'Aurora', 'Savannah', 'Aria', 'Brooklyn', 'Leah'
    ]
};

let currentName = '';
let currentFilter = 'all';
let favorites = JSON.parse(localStorage.getItem('babyNameFavorites')) || [];

function init() {
    renderFavorites();
    generateName();
}

function getFilteredNames() {
    if (currentFilter === 'all') {
        return [...names.boy, ...names.girl];
    }
    return names[currentFilter];
}

function generateName() {
    const nameEl = document.getElementById('baby-name');
    const filteredNames = getFilteredNames();
    let newName;

    do {
        newName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    } while (newName === currentName && filteredNames.length > 1);

    currentName = newName;
    nameEl.style.opacity = '0';

    setTimeout(() => {
        nameEl.textContent = newName;
        nameEl.style.opacity = '1';
        updateFavoriteButton();
    }, 150);
}

function setFilter(filter) {
    currentFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    const backgrounds = {
        all: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        boy: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        girl: 'linear-gradient(135deg, #fbc2eb 0%, #f8a5c2 100%)'
    };
    document.body.style.background = backgrounds[filter];

    generateName();
}

function toggleFavorite() {
    if (!currentName) return;

    const index = favorites.indexOf(currentName);
    if (index === -1) {
        favorites.push(currentName);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('babyNameFavorites', JSON.stringify(favorites));
    updateFavoriteButton();
    renderFavorites();
}

function updateFavoriteButton() {
    const btn = document.getElementById('favorite-btn');
    const isFavorite = favorites.includes(currentName);
    btn.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
    btn.classList.toggle('is-favorite', isFavorite);
}

function removeFavorite(name) {
    const index = favorites.indexOf(name);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('babyNameFavorites', JSON.stringify(favorites));
        renderFavorites();
        if (name === currentName) {
            updateFavoriteButton();
        }
    }
}

function renderFavorites() {
    const list = document.getElementById('favorites-list');
    const emptyMsg = document.getElementById('favorites-empty');

    if (favorites.length === 0) {
        list.innerHTML = '';
        emptyMsg.style.display = 'block';
        return;
    }

    emptyMsg.style.display = 'none';
    list.innerHTML = favorites.map(name => `
        <li class="favorite-item">
            <span class="favorite-name">${name}</span>
            <button class="remove-btn" onclick="removeFavorite('${name}')">&times;</button>
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);

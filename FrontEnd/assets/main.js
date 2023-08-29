// Fonction pour récupérer les travaux depuis l'API
async function fetchWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux:', error);
    return [];
  }
}

// Fonction pour afficher les travaux sur la page
async function displayWorks() {
  const works = await fetchWorks();

  const galleryElement = document.getElementById('gallery');

  // Vider le contenu de la galerie avant d'afficher les travaux
  galleryElement.innerHTML = '';
  
  works.forEach(work => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title; 
    
    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryElement.appendChild(figure);
  });
}

// Appeler la fonction pour afficher les travaux au chargement de la page
window.onload = () => {
  displayWorks();
};


// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
}

// Fonction pour créer et ajouter les boutons de filtre
async function createFilterButtons() {
  const categories = await fetchCategories();
  const filterContainer = document.getElementById('filter-container');

  // Créer le bouton "Tous"
  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.id = 'filter-all';
  allButton.classList.add('active'); // Mettre en surbrillance par défaut
  allButton.addEventListener('click', () => {
    // Supprimer la classe active de tous les autres boutons de filtre
    const otherButtons = filterContainer.querySelectorAll('button:not(#filter-all)');
    otherButtons.forEach(btn => btn.classList.remove('active'));
    
    // Ajouter la classe active au bouton "Tous"
    allButton.classList.add('active');

    displayWorks(); // Afficher tous les travaux
  });
  filterContainer.appendChild(allButton);

  // Ajouter les boutons de catégorie
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.addEventListener('click', () => {
      // Supprimer la classe active du bouton "Tous"
      allButton.classList.remove('active');

      // Supprimer la classe active de tous les autres boutons de filtre
      const allButtons = filterContainer.querySelectorAll('button');
      allButtons.forEach(btn => btn.classList.remove('active'));
      
      // Ajouter la classe active au bouton cliqué
      button.classList.add('active');

      filterWorksByCategory(category.id);
    });
    filterContainer.appendChild(button);
  });
}
// Fonction pour filtrer et afficher les travaux en fonction de la catégorie
async function filterWorksByCategory(categoryId) {
  const works = await fetchWorks();
  const galleryElement = document.getElementById('gallery');
  galleryElement.innerHTML = ''; // Effacer le contenu existant de la galerie
  
  works.forEach(work => {
    if (work.categoryId === categoryId) {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = work.imageUrl;
      img.alt = work.title;

      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title; 

      figure.appendChild(img);
      figure.appendChild(figcaption);
      galleryElement.appendChild(figure);
    }
  });
}

// Appeler la fonction pour créer les boutons de filtre lorsque la page est chargée
window.onload = () => {
  createFilterButtons();
  displayWorks(); // Afficher tous les travaux initialement
};

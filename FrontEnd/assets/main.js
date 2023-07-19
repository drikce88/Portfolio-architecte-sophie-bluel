// Fonction pour filtrer les travaux par catégorie
function filterWorks(category) {
  const gallery = document.querySelector('#portfolio .gallery');
  const figures = gallery.querySelectorAll('figure');

  figures.forEach(figure => {
    const figureCategory = figure.getAttribute('data-category');

    if (category === 'all' || figureCategory === category) {
      figure.style.display = 'block';
    } else {
      figure.style.display = 'none';
    }
  });
}

// Fonction pour créer dynamiquement un élément HTML <figure>
function createWorkFigure(work) {
  const figure = document.createElement('figure');
  figure.setAttribute('data-category', work.category.name.toLowerCase().replace(/ /g, '-'));

  const imgElement = document.createElement('img');
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = work.title;

  figure.appendChild(imgElement);
  figure.appendChild(figcaption);

  return figure;
}

// Récupérer les catégories depuis l'API
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    const filterButtons = document.querySelector('#portfolio #filters');

    // Supprimer les filtres existants s'ils existent
    while (filterButtons.firstChild) {
      filterButtons.removeChild(filterButtons.firstChild);
    }

    // Créer le bouton "Tous"
    const allButton = document.createElement('button');
    allButton.classList.add('filter-btn', 'active');
    allButton.textContent = 'Tous';
    allButton.setAttribute('data-filter', 'all');
    filterButtons.appendChild(allButton);

    // Créer les boutons de filtre pour chaque catégorie
    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('filter-btn');
      button.textContent = category.name;
      button.setAttribute('data-filter', category.name.toLowerCase().replace(/ /g, '-'));
      filterButtons.appendChild(button);
    });

    // Ajouter les écouteurs d'événements aux boutons de filtre
    const buttons = document.querySelectorAll('#portfolio #filters .filter-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterWorks(filter);

        // Mettre à jour la classe active du bouton
        buttons.forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
  });

// Effectuer une requête GET pour récupérer les travaux depuis l'API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('#portfolio .gallery');

    // Supprimer les travaux existants s'ils existent
    while (gallery.firstChild) {
      gallery.removeChild(gallery.firstChild);
    }

    // Parcourir les travaux
    data.forEach(work => {
      const figure = createWorkFigure(work);
      gallery.appendChild(figure);
    });

    // Afficher tous les travaux par défaut
    filterWorks('all');
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des travaux :', error);
  });

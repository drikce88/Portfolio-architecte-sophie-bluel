// Effectuer une requête GET pour récupérer les travaux (works) depuis l'API
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('#portfolio .gallery');

    // Parcourir les travaux (works)
    data.forEach(work => {
      // Exclure le travail de l'abat-jour "Abajour Tahina"
      if (work.title !== 'Abajour Tahina') {
        const figure = createWorkFigure(work);
        gallery.appendChild(figure);
      }
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des travaux :', error);
  });

// Fonction pour créer dynamiquement un élément HTML <figure> pour un travail (work)
function createWorkFigure(work) {
  const figure = document.createElement('figure');

  const imgElement = document.createElement('img');
  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  const figcaption = document.createElement('figcaption');
  figcaption.textContent = work.title;

  figure.appendChild(imgElement);
  figure.appendChild(figcaption);

  return figure;
}

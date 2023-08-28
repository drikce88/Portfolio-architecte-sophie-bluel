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
  galleryElement.innerHTML = ''; // Effacer le contenu précédent

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
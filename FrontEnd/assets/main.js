// Récupère la valeur du token depuis le localStorage
let tokenValue = localStorage.token; 

let works = [];

// Fonction pour récupérer les travaux depuis l'API
async function fetchWorks() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des travaux:', error);
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




// Récupération de l'élément de connexion/logout par son ID
const loginElement = document.getElementById('logout');

// Vérification de la présence d'un jeton d'authentification dans le stockage local
if (localStorage.getItem('token')) {
  // Si un jeton est présent, afficher "logout" pour permettre à l'utilisateur de se déconnecter
  loginElement.textContent = 'logout';
} else {
  // Sinon, afficher "login" pour permettre à l'utilisateur de se connecter
  loginElement.textContent = 'login';
}

// Gestionnaire d'événement pour le clic sur le bouton de déconnexion (logout)
loginElement.addEventListener('click', () => {
  if (localStorage.getItem('token')) {
    // Si un jeton est présent, le supprimer du stockage local
    localStorage.removeItem('token');
    // Mettre à jour le texte du bouton en "Login" après la déconnexion
    loginElement.textContent = 'Login';
  }
});

// Récupération de l'élément avec la classe "edition"
const editionDiv = document.querySelector('.edition');

// Affichage ou masquage de l'élément en fonction de la présence d'un jeton d'authentification
if (localStorage.getItem('token')) {
  editionDiv.style.display = 'flex'; // Afficher l'élément
} else {
  editionDiv.style.display = 'none'; // Masquer l'élément
}

// Récupération de l'élément de conteneur de filtres par son ID
const filterContainer = document.getElementById('filter-container');

// Affichage ou masquage du conteneur de filtres en fonction de la présence d'un jeton d'authentification
if (localStorage.getItem('token')) {
  filterContainer.style.display = 'none'; // Masquer le conteneur
} else {
  filterContainer.style.display = 'flex'; // Afficher le conteneur
}

// Récupération de tous les éléments avec la classe "modif"
const modifDivs = document.querySelectorAll('.modif');

// Affichage ou masquage de chaque élément en fonction de la présence d'un jeton d'authentification
if (localStorage.getItem('token')) {
  modifDivs.forEach(div => {
    div.style.display = 'block'; // Afficher chaque élément
  });
} else {
  modifDivs.forEach(div => {
    div.style.display = 'none'; // Masquer chaque élément
  });
}

                                      // gestion de la modal

let modal = null;
let addModal;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute('href'));
  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-modal', 'true');
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const openAddModal = function (e) {
  e.preventDefault();
  const addModal = document.getElementById('add-modal');
  const galleryModal = document.getElementById('modal');
  galleryModal.style.display = 'none';
  addModal.style.display = null;
  addModal.removeAttribute('aria-hidden');
  addModal.setAttribute('aria-modal', 'true');
  modal = addModal;
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};
document.querySelector('.ajt-photo a').addEventListener('click', openAddModal);

const retourModal = function (e) {
  e.preventDefault();
  const galleryModal = document.getElementById('modal');
  const addImgContainer = document.querySelector('.add-img');

  const imagePreview = addImgContainer.querySelector('img.photo-preview');
  if (imagePreview) {
    addImgContainer.removeChild(imagePreview);
  }

  const elementsToShow = addImgContainer.querySelectorAll('i, label, p');
  elementsToShow.forEach(element => {
    element.style.display = null;
  });

  galleryModal.style.display = null;
  addModal.style.display = 'none';
  addModal.setAttribute('aria-hidden', 'true');
  addModal.removeAttribute('aria-modal');
  modal = galleryModal;
  modal.removeEventListener('click', closeModal);
  resetForm();
};

const retourButton = document.querySelector('.js-modal-retour');
retourButton.addEventListener('click', retourModal);

function closeModal(event) {
  if (event) {
    event.preventDefault();
  }
  
  const addImgContainer = document.querySelector('.add-img');

  const imagePreview = addImgContainer.querySelector('img.photo-preview');
  if (imagePreview) {
    addImgContainer.removeChild(imagePreview);
  }

  const elementsToShow = addImgContainer.querySelectorAll('i, label, p');
  elementsToShow.forEach(element => {
    element.style.display = "null";
  });

  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null;
  resetForm();
  resetAddImgContainer();
};

function resetForm() {
  const form = document.getElementById('add-form');
  form.reset();

  const selectElement = document.getElementById('choix');
  selectElement.value = 'vide';
}

// Gestionnaire d'événement pour le chargement de la page
window.addEventListener('load', function() {
  addModal = document.getElementById('add-modal');
});

document.querySelectorAll('.js-modal').forEach(a => {
  a.addEventListener('click', openModal)
});

const stopPropagation = function (e) {
  e.stopPropagation();
};

window.addEventListener('keydown', function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

const addImgContainer = document.querySelector('.add-img');
const photoFileInput = document.getElementById('photo-file');

// Gestionnaire d'événement pour le changement de la photo dans le formulaire d'ajout
photoFileInput.addEventListener('change', (e) => {
  const selectedFile = e.target.files[0];

  const elementsToHide = addImgContainer.querySelectorAll('i, label, p');
  elementsToHide.forEach(element => {
    element.style.display = 'none';
  });

  const imagePreview = document.createElement('img');
  imagePreview.classList.add('photo-preview');
  imagePreview.src = URL.createObjectURL(selectedFile);
  addImgContainer.appendChild(imagePreview);
});

// Appelez la fonction handleSubmit() lorsque le bouton "Valider" est cliqué
document.getElementById("add-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  handleSubmit();

  // Récupérez les travaux mis à jour après l'ajout de la nouvelle image
  const updatedWorks = await fetchWorks();
  displayWorksInModal(updatedWorks);
});

function handleSubmit() {
  // Récupérer les valeurs des champs du formulaire
  var titre = document.getElementById("titre").value;
  var categorie = document.getElementById("choix").value;
  var photoFile = document.getElementById("photo-file").files[0];

  // Vérifier si les champs sont remplis
  var photoFile = document.getElementById("photo-file").files[0];

  if (photoFile.size > 4 * 1024 * 1024) {
    console.error("La taille du fichier dépasse la limite de 4 Mo.");
    return;
  }
  // Créer un objet FormData pour envoyer les données du formulaire
  var formData = new FormData();
  formData.append("title", titre);
  formData.append("category", categorie);
  formData.append("image", photoFile);

  // Récupérer le jeton d'authentification
  var token = tokenValue;

  // Ajouter l'en-tête d'authentification à la requête
  var headers = new Headers();
  headers.append("Authorization", "Bearer " + token);

  // Effectuer la requête POST avec les données du formulaire et l'en-tête d'authentification
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: headers,
  })
    .then(function (response) {
      if (response.status === 201) {
        console.log("Nouvelle œuvre envoyée avec succès !");
        return response.json(); // Récupérer les données renvoyées par le serveur
      } else {
        console.error(
          "Erreur lors de l'envoi de l'œuvre. Statut de la réponse :",
          response.status
        );
      }
    })
    .then(function (newWork) {
      // Ajouter le nouveau travail à la liste des traveaux existant
      works.push(newWork);
      // Afficher les traveaux mis à jour dans la galerie
      displayWorks(works);

      var retourButton = document.querySelector(".js-modal-retour");
      retourButton.click(); // Simuler un clic sur le bouton "Retour"

      // Fermer la modal lors d'un clic en dehors d'elle
      document.addEventListener("click", function (event) {
      var modal = document.querySelector(".js-modal");
      if (!modal.contains(event.target)) {
      // Clic en dehors de la modal
      var closeButton = document.querySelector(".js-modal-close");
      closeButton.dispatchEvent(new Event("click")); // Simuler un événement de clic sur le bouton de fermeture
      }
      });

      // Réinitialise l'état du bouton "Valider" à gris
      var submitButton = document.querySelector("#submit-button");
      submitButton.disabled = true;
      submitButton.classList.remove("button-active");
    });
}

document.getElementById("titre").addEventListener("keyup", function () {
  checkForm();
});
document.getElementById("choix").addEventListener("change", function () {
  checkForm();
});
document.getElementById("photo-file").addEventListener("change", function () {
  checkForm();
});

function checkForm() {
  var titre = document.getElementById("titre").value;
  var choix = document.getElementById("choix").value;
  var photoFile = document.getElementById("photo-file").files[0];
  var submitButton = document.querySelector("#submit-button");
  var errorMessage = document.getElementById("error-message");

  if (titre && choix && photoFile && choix !== "vide") {
    if (photoFile.size <= 4 * 1024 * 1024) {
      if (isImageValid(photoFile)) {
        submitButton.disabled = false;
        submitButton.classList.add("button-active");

        errorMessage.style.display = "none";
      } else {
        submitButton.disabled = true;
        submitButton.classList.remove("button-active");

        errorMessage.textContent = "L'image n'est pas au format JPG ou PNG.";
        errorMessage.style.display = "block";
      }
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("button-active");

      errorMessage.textContent = "La taille de l'image dépasse 4 Mo.";
      errorMessage.style.display = "block";
    }
  } else {
    // Au moins un champ est vide, le bouton est désactivé
    submitButton.disabled = true;
    submitButton.classList.remove("button-active");

    errorMessage.style.display = "none";
  }
}

function isImageValid(file) {
  const validExtensions = ['.jpg', '.png'];
  const fileName = file.name.toLowerCase();
  return validExtensions.some(ext => fileName.endsWith(ext));
}

document.querySelector(".js-modal-retour").addEventListener("click", hideErrorMessage);
document.querySelector(".js-modal-close").addEventListener("click", hideErrorMessage);

function hideErrorMessage() {
  let errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
}

function resetAddImgContainer() {
  const addImgContainer = document.querySelector('.add-img');

  // Supprimer l'image de prévisualisation
  const imagePreview = addImgContainer.querySelector('img.photo-preview');
  if (imagePreview) {
    addImgContainer.removeChild(imagePreview);
  }

  // Réinitialiser l'affichage des éléments i, label et p
  const elementsToShow = addImgContainer.querySelectorAll('i, label, p');
  elementsToShow.forEach(element => {
    element.style.display = null;
  });
}




// Fonction pour afficher les travaux dans la modal
async function displayWorksInModal() {
  const works = await fetchWorks();
  const galleryModal = document.getElementById('modal');
  const galleryContent = galleryModal.querySelector('.gallery-modal');

  // Vider le contenu existant de la modal
  galleryContent.innerHTML = '';

  works.forEach(work => {
    const figure = document.createElement('figure');
    figure.setAttribute('data-work-id', work.id); // Stockez l'ID du travail

    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    

    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', async () => {
      await deleteWork(work.id);
      // Mettre à jour la galerie après la suppression
      displayWorksInModal(updatedWorks);
    });

    figure.appendChild(img);
    figure.appendChild(deleteButton);

    galleryContent.appendChild(figure);
  });
}

// Gestionnaire d'événements pour le bouton "Modifier"
const editButton = document.querySelector('.js-modal');
editButton.addEventListener('click', () => {
  displayWorksInModal();
});



// Fonction pour supprimer un travail en utilisant une requête DELETE
async function deleteWork(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenValue}`
      }
    });

    if (response.ok) {
      console.log(`Œuvre avec l'ID ${id} supprimée avec succès`);
      
      // Supprimez le travail de la liste 'works'
      const index = works.findIndex(work => work.id === id);
      if (index !== -1) {
        works.splice(index, 1);
      }
      
      // Mettez à jour la galerie modale
      displayWorksInModal(works); // Mettez à jour la galerie modale avec la liste mise à jour des travaux
      
      // Mettez à jour la galerie principale
      displayWorks(); // Mettez également à jour la galerie principale si nécessaire
    } else {
      console.error('Erreur lors de la suppression de l\'œuvre');
      displayWorks();
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'œuvre:', error);
  }
}



// Ajoutez un gestionnaire d'événement pour supprimer toute la galerie
const deleteGalleryButton = document.getElementById('delete-gallery');
deleteGalleryButton.addEventListener('click', async () => {
  const works = await fetchWorks();
  for (const work of works) {
    await deleteWork(work.id);
  }
  const updatedWorks = await fetchWorks();
  displayWorks(updatedWorks);
});












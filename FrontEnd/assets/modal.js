// --- Gerer la boite modal

// Sélection des éléments nécessaires pour la boîte modale
const portfolioEdit = document.querySelector(".portfolio-edit");
const closeModalButton = document.querySelector(".modal-close");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

// Ajouter un écouteur d'événement pour ouvrir la boîte modale lorsque l'élément portfolioEdit est cliqué.
portfolioEdit.addEventListener("click", () => {
  openModal();
});

// Ajouter un écouteur d'événement pour fermer la boîte modale lorsque le bouton de fermeture est cliqué.
closeModalButton.addEventListener("click", () => {
  closeModal();
});

// Ajouter un écouteur d'événement pour fermer la boîte modale lorsqu'un clic se produit en dehors de la boîte modale.
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    closeModal();
  }
});

// Fonction pour ouvrir la boîte modale
function openModal() {
  modalContainer.classList.add("show");
  setTimeout(() => {
    modal.classList.add("show");
  }, 300);
}

// Fonction pour fermer la boîte modale
function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modalContainer.classList.remove("show");
  }, 300);
}

// --- Gerer les elements a afficher si l'utilisateur est connecte ou non

// Récupérer le token du stockage local pour vérifier si l'utilisateur est connecté.
const token = localStorage.getItem("token");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const modeBar = document.querySelector(".mode");

// Vérifier si le token est présent pour décider quels éléments afficher.
if (token) {
  // Afficher les éléments pour l'utilisateur connecté.
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
  modeBar.style.display = "flex";
  portfolioEdit.style.display = "flex";

  // Ajouter un écouteur d'événement pour le bouton de déconnexion.
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  });
} else {
  // Afficher les éléments pour l'utilisateur non connecté.
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";
  modeBar.style.display = "none";
  portfolioEdit.style.display = "none";
}
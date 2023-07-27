// --- Gerer la boite modal

const portfolioEdit = document.querySelector(".portfolio-edit");
const closeModalButton = document.querySelector(".modal-close");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

portfolioEdit.addEventListener("click", () => {
  openModal();
});

closeModalButton.addEventListener("click", () => {
  closeModal();
});

modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    closeModal();
  }
});

function openModal() {
  modalContainer.classList.add("show");
  setTimeout(() => {
    modal.classList.add("show");
  }, 300);
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => {
    modalContainer.classList.remove("show");
  }, 300);
}

// --- Gerer les elements a afficher si l'utilisateur est connecte ou non
const token = localStorage.getItem("token");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const modeBar = document.querySelector(".mode");

if (token) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
  modeBar.style.display = "flex";
  portfolioEdit.style.display = "flex";

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  });
} else {
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";
  modeBar.style.display = "none";
  portfolioEdit.style.display = "none";
}
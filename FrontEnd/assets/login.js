// Cette fonction affiche ou masque le mot de passe en fonction de l'état de la case à cocher 'showPasswordCheckbox'.
// Lorsque la case est cochée, le champ de mot de passe affiche le texte, sinon il le masque comme un mot de passe.
function showPassword() {
  const passwordField = document.getElementById('password');
  const showPasswordCheckbox = document.getElementById('showMdp');

  if (showPasswordCheckbox.checked) {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
}
// Ajoute un écouteur d'événement à la case à cocher 'showPasswordCheckbox' pour appeler la fonction 'showPassword' lorsque l'état de la case change.
document.addEventListener('DOMContentLoaded', function() {
  const showPasswordCheckbox = document.getElementById('showMdp');
  showPasswordCheckbox.addEventListener('change', showPassword);

// Ajoute un écouteur d'événement au formulaire de connexion ('loginForm') pour gérer la soumission du formulaire.
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

     // Récupère les valeurs de l'e-mail et du mot de passe depuis les champs de saisie.
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crée un objet contenant les données de connexion.
    const loginData = {
      email: email,
      password: password
    };

    // Envoie une requête POST au serveur pour effectuer le processus de connexion.
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)  // Convertit l'objet loginData en une chaîne JSON avant de l'envoyer.
    })
      .then(response => response.json())  // Analyse la réponse en tant que JSON.
      // Si la connexion est réussie, data contiendra 'userId' et 'token'.
      .then(data => {    
        if (data.userId && data.token) {
          const token = data.token;
          localStorage.setItem('token', token);   // Stocke le token dans le stockage local pour une utilisation ultérieure.
          window.location.href = './index.html';  // Redirige l'utilisateur vers la page index.html après une connexion réussie.
        } else {
          // Si la connexion échoue, affiche un message d'erreur à l'utilisateur.
          const errorContainer = document.getElementById('error-container');
          const error = document.createElement('p');
          error.innerText = 'Email ou mot de passe incorrect';  // Message d'erreur pour des identifiants de connexion incorrects.
          error.style.textAlign = 'center';
          error.style.color = 'red';
          error.style.marginBottom = '35px';
          errorContainer.appendChild(error);
        }
      })
      .catch(error => {
        // Si une erreur se produit lors de la requête de connexion, l'affiche dans la console.
        console.error('Erreur lors de la requête de login:', error);
      });
  });
});
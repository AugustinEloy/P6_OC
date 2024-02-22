let emailInput = document.getElementById('email_login');
let mdpInput = document.getElementById('mdp');
let form = document.querySelector('form');

function checkLogin(emailInput, mdpInput) {
    let login = "sophie.bluel@test.tld";
    let password = "SOphie";

    if (emailInput.value === login && mdpInput.value === password) {
        window.location.href = "../Frontend/index.html";
    } else {
        alert('Erreur dans l’identifiant ou le mot de passe');
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    checkLogin(emailInput, mdpInput);
});
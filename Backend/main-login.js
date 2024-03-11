let form = document.getElementById('login_text')
let emailInput = document.getElementById('email_login');
let mdpInput = document.getElementById('mdp');


function ajoutlogin(event) {
  event.preventDefault();

  const emailv = emailInput.value;
  const mdpv = mdpInput.value;

  if (emailv === "" || mdpv === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  } else {
    fetch("http://localhost:5678/api/users/login", {
      method: 'POST',
      body: JSON.stringify({ email: emailv, password: mdpv }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(result => {
      if(result.token){
       
        
        localStorage.setItem('token', result.token)
       
        window.location.href = "../Frontend/index.html"
      }else{
        alert('La tentative de connexion a échoué')
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la connexion.');
    });
  } 
}
  
form.addEventListener('submit', ajoutlogin);


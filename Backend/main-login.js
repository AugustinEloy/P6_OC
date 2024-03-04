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
       
        console.log(result.token)
        localStorage.setItem('token', result.token)
        let token = localStorage.getItem('token');
        console.log(token);
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
let token = localStorage.getItem('token')
console.log(token)
/*console.log(result);
        
const token = result.token;

window.localStorage.setItem('token', token);

/*function checkLogin(emailInput, mdpInput) {
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
});*/

/*let email = window.localStorage.getItem("email")
if ( email === null){
const response = await fetch("http://localhost:5678/api/users/login")
email = response.json
}

    
export function checkLogin(emailInput, mdpInput) {
    let login = emailv;
    let password = mdpv;

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
/*email = response.json
console.log(emailv)
console.log(mdpv)
console.log(password)
console.log(email)

let password = window.localStorage.getItem("password")
localStorage.setItem("token", token);pour envoyer
localStorage.getItem("token"); pour recuperer*/
/*fetch("https://jsonplaceholder.typicode.com/todos", {
  method: "POST",
  body: JSON.stringify({
    userId: 1,
    email: "sophie.bluel@test.tld",
    password: "S0phie"
    completed: false
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));*/
  // Définissez les informations d'identification
/*function loginapi (){ 
var username = emailv;
var password = mdpv;

// Définissez l'URL de l'API
var url = "http://localhost:5678/api/users/login" ;

// Créez un objet contenant les données à envoyer
var data = {
  username: username,
  password: password
};

// Configurez les options de la requête POST
var options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

// Effectuez la requête POST en utilisant la fonction fetch()
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    // Récupérez le token à partir de la réponse
    var token = data.token;
    console.log('Token:', token);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite:', error);
  });
}
form.addEventListener('submit', loginapi())*/

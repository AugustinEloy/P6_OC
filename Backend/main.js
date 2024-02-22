
let app = document.getElementById ("appartements")
let Hr = document.getElementById ("her")
let tous = document.getElementById ("tous")
let objet = document.getElementById ("objet")
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const closeButton = document.querySelector('.close');
let imputitle = document.getElementById('modal-titre')
let modal_categorie = document.getElementById('input_select')
const formadd = document.getElementById('addphoto')
var modala = document.getElementById("modala");
var modalb = document.getElementById("modalb");
var span = document.getElementsByClassName("close")[0];
let submitdel = document.getElementById('submitdel')
let mymodal = document.getElementById('mymodal')
let span2 = document.getElementsByClassName('close2')[0];
const buttonadd = document.getElementById('submitadd')
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODQzNjM3MiwiZXhwIjoxNzA4NTIyNzcyfQ.yfPpT7NHIaink7ggXxRwkkXhl4xtFiHoEywydvmOpBw"
let projectsData;




/*##########################################filtres ##########################################################*/
fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => {
projectsData = data;
    document.getElementById('tous').addEventListener('click', () => displayProjects(projectsData)); 
    document.getElementById('appartements').addEventListener('click', () => filtresAppartements(projectsData));
    document.getElementById('objet').addEventListener('click', () => filtreObjets(projectsData));
    document.getElementById('her').addEventListener('click', () => filtreHotelsRestaurants(projectsData));
    displayProjects(projectsData);
    const modalBody = document.querySelector('.modal-center');

    projectsData.forEach(project => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const deleteIcon = document.createElement('i'); 
  
      img.src = project.imageUrl;
      img.alt = project.title;
      deleteIcon.classList.add('fa', 'fa-trash'); 
  
      figure.appendChild(img);
      figure.appendChild(deleteIcon); 
      modalBody.appendChild(figure);
      
      deleteIcon.addEventListener('click', function() {
        const photoId = project.id; 
        deletePhoto(photoId);
    });
  });
    });


  


function filtresAppartements(projectsData) {
    const appartementProjects = projectsData.filter(project => project.categoryId === 2);
    displayProjects(appartementProjects);
}

function filtreObjets(projectsData) {
    const objetProjects = projectsData.filter(project => project.categoryId === 1);
    displayProjects(objetProjects);
}

function filtreHotelsRestaurants(projectsData) {
    const hrProjects = projectsData.filter(project => project.categoryId === 3);
    displayProjects(hrProjects);
}

function displayProjects(projects) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; 

    projects.forEach(project => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.src = project.imageUrl;
        img.alt = project.title;
        figcaption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}


//######################################################################## MODAL  ########################################################################



modalb.onclick = function() {
  modala.style.display = "block";
}


span.onclick = function() {
  modala.style.display = "none";
}


window.onclick = function(event) {
  if (event.target === modala) {
    modala.style.display = "none";
  }
}
submitdel.onclick = function(){
  mymodal.style.display = "block";
  modala.style.display = "none";
}
span2.onclick = function() {
  mymodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target === mymodal) {
    mymodal.style.display = "none";
  }
}
uploadBtn.addEventListener('click', function() {
    imageInput.click(); 
  })


/*################################## DELETE ############################################*/

function deletePhoto(photoId) {
  fetch(`http://localhost:5678/api/works/${photoId}`, {
      method: 'DELETE',
      headers: {
          Authorization: `Bearer ${token}`
      },
  })
  .then(response => {
      console.log('Image supprimée avec succès');
  })
  .catch(error => {
      console.error('Erreur lors de la suppression de l\'image :', error);
  });
}
/*################################## AJOUT################################################## */
buttonadd.addEventListener('click', ajoutprojet);

 async function ajoutprojet (event){
  event.preventDefault();

  console.log(projectsData)

  if(projectsData.length === 0){
    alert("Aucun projet n'a été trouvé")
    return;
  }

  const lastId = projectsData[projectsData.length - 1].id;
  const newId = lastId + 1;
  const image = document.querySelector(".inputimage").files[0]
  const titre = document.querySelector(".titleimput").value;
  const categoryId = document.querySelector(".cateselect").value;

  if (titre === "" || categoryId === "" || image === "") {
    alert("Les champs ne sont pas remplis");
    return;
  } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
    alert("Veuillez sélectionner une catégorie valide");
    return;
  }

  const formData = new FormData();
  formData.append('id', newId); 
  formData.append('title', titre);
  formData.append('image', image);
  formData.append('categoryId', categoryId);
  
  console.log(formData)

  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        enctype: 'multipart/form-data'
      },
      body: formData
    });

    if (response.ok) {
      alert("Projet ajouté avec succès");
      displayProjects(projectsData);
    } else {
      alert("Quelque chose s'est mal passé lors de l'ajout du projet");
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi de la requête :", error);
  }
};

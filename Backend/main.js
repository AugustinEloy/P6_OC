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
let projectsData;

/*##########################################token ##########################################################*/
let token = localStorage.getItem('token');


/*##########################################filtres ##########################################################*/
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    document.getElementById('tous').addEventListener('click', () => displayProjects(projectsData)); 
    document.getElementById('appartements').addEventListener('click', () => filtresParCategorie(categories, 2));
    document.getElementById('objet').addEventListener('click', () => filtresParCategorie(categories, 1));
    document.getElementById('her').addEventListener('click', () => filtresParCategorie(categories, 3));
  })
  .catch(error => {
    console.error("Erreur sur lid :", error);
  });

function filtresParCategorie(categories, categoryId) {

  const projectsFilteredByCategory = projectsData.filter(project => {
    const category = categories.find(cat => cat.id === categoryId);
    return project.categoryId === category.id;
  });

  displayProjects(projectsFilteredByCategory);
}


fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => {
projectsData = data;
    
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

modalb.addEventListener('click', function(){
  modala.style.display = 'block'
})
span.addEventListener('click' , function(){
  modala.style.display = "none"
})

submitdel.addEventListener('click', function(){
  mymodal.style.display = "block";
  modala.style.display = "none";
})
span2.addEventListener('click', function(){
  mymodal.style.display = "none";
})

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
  
  formData.append('title', titre);
  formData.append('image', image);
  formData.append('category', categoryId);
  
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

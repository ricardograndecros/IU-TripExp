$(document).ready(function(){

  $(".experiences-grid").sortable();


  document.addEventListener('keydown', function(event){
    // just wait
    const keyName = event.key;
    if(keyName == 'ArrowLeft'){
        pasaratras();
    } else if (keyName == 'ArrowRight'){
      pasarsiguiente();
    }
    setTimeout(() => {

    }, 250);
  });

/*
  document.getElementById("search-input").addEventListener("keyup", function(event) {
  //console.log("listener activado, key: ", parseInt(event.key));

    if (/[a-zA-Z0-9-_ ]/.test(event.key) || event.key=='keyback') { // if a letter pressed or removed
        //console.log("pressed: ", event.key);
        search(); 
    }
  }); 

  document.getElementById("search-input").addEventListener("keyup", function(event){
    if(event.key=='enter'){
      //event.preventDefault();
      search();
    }
  });
  */
});

$(document).ready(function(){
	$(':checkbox[readonly=readonly]').click(function(){
		return false;         
	}); 
});
/*
$(document).ready(function(){

  document.getElementById("add-comment").addEventListener("keyup", function(event) {
  //console.log("listener activado, key: ", parseInt(event.key));

    if (/[a-zA-Z0-9-_ ]/.test(event.key) || event.key=='keyback') { // if a letter pressed or removed
        //console.log("pressed: ", event.key);
        writeConsole(); 
    }
  });
});*/

$(window).on("load", iniciarPagina);
//window.onload = iniciarPagina();

function iniciarPagina(){
  ////console.log("HOla");
  //Experiencias
  crearCookiesExpIniciales();
  expCookies=getExpCookies();
  document.getElementById("ver-mas-experiencias").style.display = "flex";
  let texto = document.getElementById("ver-mas-experiencias").innerHTML;
  if (texto.includes("Ver")){
    buildInitialExperiences(expCookies);
  }
  else {
    buildTotalExperiences(expCookies);
  }
  document.getElementById("titulo-experiencias").innerHTML = "Experiencias más visitadas";
  //Users
  crearCookiesUsersIniciales();
  userCookies = getUsersCookies();
  buildRankingUsers(userCookies);
}

/*Cookies para experiencias*/
function crearCookiesExpIniciales(){
  //Las cookies de la página principal se van a llamar por el nombre de la experiencia separado del usuario.
  for(var i=0; i<data.length; i++){
    nombreCookie=data[i].creador+"+"+data[i].title;
    array=data[i];
    setCookie(nombreCookie, JSON.stringify(array), 10); 
  }
}

function getExpCookies(){
  let decodedCookie = decodeURIComponent(document.cookie); //Cargamos todas las comas.
  let ca = decodedCookie.split(';');
  let ce = [];
  let exp;

  for(let i = 0; i <ca.length; i++) {
    c=ca[i];
    exp = ca[i].split("=");
    if (exp[0].includes("+")) {
      //exp = ca[i].split("=");
      ce.push(exp[1]);
    }
  }
  return ce;
}

//CAMBIOS CUANDO LO ENTREGUEMOS PONER experiences.length ¡¡¡¡¡¡¡¡12!!!!!!!!!
function buildInitialExperiences(experiences){
  ////console.log("Hola")

  let initial = ["BlancaM+Un día en Madrid", "Menchh+París en 48 horas",  "Mari17ng+La Barcelona de Gaudí", "BlancaM+Roma antigua", "BigRaiko+Visitar el Big Ben, Londres", "Joao46+Turismo en Lisboa", 
  "BigRaiko+Playas en Llanes", "CarlossBuche+Viena y sus palacios", "Juli08+Caravana por el norte de España", "Juli08+Mejor paella de Valencia", "BlancaM+Milán, ciudad de la moda", "CarlossBuche+Arenal Sound"];
  

  let experiencesGrid = "";

  for(let i = 0; i < experiences.length; i++){

    exp=JSON.parse(experiences[i]);

    if (initial.includes(exp.creador+"+"+exp.title)){
      let src="images/iconos/mg.png";
      if(loggedInEmail!=""){
        if(doILike(exp.creador, exp.title)==true){
          src="images/iconos/heart-solid-24.png";
        }
      }
      experiencesGrid+= "<div class=\"grid-item\">"+
                        "<div class=\"experience-picture\">"+
                            "<a href=\"#popexp-portada\">"+
                            "<div class=\"grid-overlay-container\" onclick=\"openExp(this)\">"+
                                "<div class=\"grid-overlay\"></div>"+
                                "<div class=\"grid-title\"><h3>"+exp.title+"</h3>"+
                                    "<div class=\"grid-line\" id=\"creador"+exp.title+"\"><p>Por: "+exp.creador+"</p></div>"+
                                "</div>"+
                            "</div>"+
                            "</a>"+
                            "<div class=\"grid-mg\">"+
                                "<img id=\"exp-like-icon"+exp.title+"\" src="+src+" alt=\"mg\"  onclick=\"LikeOut(this)\">"+
                                "<p id=\"exp-likes"+exp.title+"\">"+exp.likes+"</p>"+
                            "</div>"+
                            "<div class=\"grid-comment\">"+
                                "<a href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/comment.png\" alt=\"comment\" onclick=\"preComment(this)\"></a>"+
                                "<p id=\"exp-comments"+exp.title+"\">"+exp.comments.length+"</p>"+
                            "</div>"+
                            "<div class=\"grid-menu\">"+
                                "<img id=\""+exp.title+"\" class=\"tres-puntos\" onclick=\"openMoreOp(this)\" src=\"images/iconos/mas.png\" alt=\"mas\">"+
                                "<ul class=\"menu-ul\" id=\"menu-ul"+exp.title+"\">"+
                                    "<li class=\"menu-li\" id=\"menu-compartir\" onclick=\"openShare()\">"+
                                        "<p>Compartir</p>"+  
                                        "<img src=\"images/iconos/compartir_gris.png\" alt=\"compartir\">"+
                                    "</li>"+
                                    "<li class=\"menu-li colec-menu\" id=\"menu-anadir-coleccion"+exp.title+"\"  onclick=\"anadirColeccion(this)\">"+
                                        "<div class=\"añadir-colec-header\"><p>Añadir a colección</p>"+  
                                        "<img src=\"images/iconos/anadir_gris.png\" alt=\"añadir\"></div>"+
                                        "<ul class=\"user-menu-ul-add-colec\" id=\"menu-ul-colec"+ exp.title + "\">"+
                                        "</ul>"+
                                    "</li>"+
                                    "<li class=\"menu-li\ menu-cancelar\" id=\"menu-cancelar"+exp.title+"\" onclick=\"closeMoreOp(this)\">Cancelar</li>"+
                                "</ul>"+
                                /*<ul class=user-menu-ul id="menu-ul-colec"+exp.title>
                                      <li class=menu-li onclick=addExpToCollection("exp.title")></li>
                                        <p>exp.title</p>
                                      </li>
                                  </ul>*/
                            "</div>"+
                            "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                        "</div>"+
                      "</div>";
    }
  }
  ////console.log(experiencesGrid);

  myexperiencesGrid = document.getElementById("initial-experiences-grid");
  myexperiencesGrid.innerHTML = experiencesGrid;

  ////console.log("USUARIO: " + loggedInEmail);
  if(loggedInEmail != ""){
    Array.from(myexperiencesGrid.childNodes).forEach(experience => {
      experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].addEventListener("mouseenter", function(event){
        tituloExperiencia = experience.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;
        menuListaAnadeColeccion("menu-ul-colec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].addEventListener("click", function(event){
        tituloExperiencia = experience.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;
        menuListaAnadeColeccion("menu-ul-colec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].addEventListener("mouseleave", function(event){
        experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerHTML = "";
      })
    })
  }
}

var lastPopUp = "";
function menuListaAnadeColeccion(listaElement, nombreExperiencia){
  if(nombreExperiencia == ""){
    document.getElementById("lista-colec-myexp").style.display = "flex";
    if(document.getElementById("user-menu-ul-container-id").style.display == "flex"){
      document.body.style.overflowY = "hidden";
      document.getElementById("user-menu-ul-container-id").style.display = "none";
      return;
    }
    document.getElementById("user-menu-ul-container-id").style.display = "flex";
    nombreExperiencia = document.getElementById("experience-title").innerHTML;
  
    if(loggedInEmail == ""){
      document.getElementById("login").style.display = "block";
      document.getElementById("user-menu-ul-container-id").style.display = "none";
      lastPopUp = "popup-grid-item";
      document.getElementById("popup-grid-item").style.display = "none";
      ////console.log("OCULTA")
      //document.getElementById(lastPopUp).style.display = "flex";
      return;
    }
  }


  let ec = getExpCookies();
  let creador="";
  for(var j=0; j<ec.length; j++){
    let exp=JSON.parse(ec[j]);
    if(exp.title==nombreExperiencia){
      ////console.log(exp.title);
      creador=exp.creador;
      }
    }
    let checkExp=creador+"+"+nombreExperiencia;
    let html = "";
    let uc=getUsersCookies();
    for (let i=0; i<uc.length; i++){
    let myuser=JSON.parse(uc[i]);
    if(myuser.email==loggedInEmail){
      if(myuser.collections.length<1){

        html+= "<li class=\"menu-li no-colec\">" +
        "<p><i>No hay colecciones registradas :(</i></p>"+ "</li>";
      }else{
        for(let j=0; j<myuser.collections.length; j++){

          if(myuser.collections[j].experiences.indexOf(checkExp)==-1){
            
            html+= "<li class=\"menu-li\" onclick=\"addExpToCollection('"+nombreExperiencia+"', '"+myuser.collections[j].titulo+"')\">" +
            "<p>"+myuser.collections[j].titulo+"</p>"+ "</li>";
          }
        }
        if(html==""){
          html+= "<li class=\"menu-li no-colec\">" +
          "<p><i>Ya se encuentra en todas tus colecciones</i></p>"+ "</li>";
        }
      }
    }
  }
  ////console.log(html);
  document.getElementById(listaElement).innerHTML = html;
}



function addExpToCollection(experience, coleccion){
  ////console.log("Los argumentos son: ");
  ////console.log(experience);
  ////console.log(coleccion);
  
  users = getUsersCookies();
  for (let i = 0; i < users.length; i++){
    user = JSON.parse(users[i]);
    if (user.email == loggedInEmail){
      break;
    }
  }

  let ec = getExpCookies();
  let creador="";
  for(var j=0; j<ec.length; j++){
    let exp=JSON.parse(ec[j]);
    if(exp.title==experience){
      ////console.log(exp.title);
      creador=exp.creador;
    }
  }

  for(var z=0; z <user.collections.length; z++){
    if(user.collections[z].titulo==coleccion){
      let addExp=creador+"+"+experience;
      ////console.log(addExp);
      user.collections[z].experiences.push(addExp);
    }  
  }

  setCookie(user.email, JSON.stringify(user), 10);
  if(document.getElementById("popup-grid-item").style.display == "flex"){
    document.getElementById("user-menu-ul-container-id").style.display = "none";
    document.getElementById("lista-colec-myexp").innerHTML="";

  } else {
    document.getElementById("menu-ul-colec"+experience).innerHTML="";
    document.getElementById("menu-ul"+experience).style.display = "none";
  }
  
  // lanza el snackbar para añadir experiencias a colecciones
  document.getElementById("snackbarbody").style.display="block";
  document.getElementById("snackbarbody").innerHTML = "Experiencia añadida correctamente a la colección";
  setTimeout(function() {
    document.getElementById("snackbarbody").style.display="none";},2000);

}

/*Cookies para usuarios*/
function crearCookiesUsersIniciales(){
  //Las cookies de la página principal se van a llamar por el nombre de la experiencia separado del usuario.
  for(var i=0, len=users.length; i<len; i++){
    nombreCookie = users[i].email;
    let array=users[i];
    setCookie(nombreCookie, JSON.stringify(array), 10); 
  }
}

function getUsersCookies(){
  let decodedCookie = decodeURIComponent(document.cookie); //Cargamos todas las comas.
  let ca_user = decodedCookie.split(';');
  let ce_user = [];
  let user;

  for(let i = 0; i <ca_user.length; i++) {
    c=ca_user[i];
    user = ca_user[i].split("=");
    if (user[0].includes("@")) {
      //exp = ca[i].split("=");
      ce_user.push(user[1]);
    }
  }
  return ce_user;
}

function buildRankingUsers(users){
  //Saco los mg y las experiencias de cada uno
  likesUsers(users);
  //Los ordeno
  users_ordered = orderedUsers(getUsersCookies());

  //Saco los tres primeros
  let usersGrid = "";
  for(let i = 0; i < 3; i++){

    user = JSON.parse(users_ordered[i]);

    if (user.photo == ""){
      user.photo = "user_azul.png";
    }

    usersGrid+= "<div class=\"grid-item-users\" onclick=\"openUser(this)\">"+
                  "<div class=\"user-picture\">"+
                    "<img src=\"images/perfiles/"+user.photo+"\" alt=\"Foto Perfil\">"+
                  "</div>"+
                  "<div class=\"user-name\"><h3>"+user.username+"</h3></div>"+
                  "<img class=\"medalla\" src=\"images/iconos/medalla"+i+".png\" alt=\"oro\">"+
                  "<div class=\"user-mg\">"+
                    "<img src=\"images/iconos/mg-black.png\" alt=\"mg\">"+
                      "<p>"+user.likes+"</p>"+
                  "</div>"+
                  "<div class=\"user-pub\">"+
                    "<img src=\"images/iconos/pub.png\" alt=\"pub\">"+
                    "<p>"+user.experiences.length+"</p>"+
                  "</div>"+
                "</div>";
  }

  myusersGrid = document.getElementById("initial-users-grid");
  myusersGrid.innerHTML = usersGrid;
}

function likesUsers(users){
  for(let i = 0; i <users.length; i++){
    user = JSON.parse(users[i]);
    user.likes = 0;
    user.experiences = [];
    user.colabs = [];

    let experiences=getExpCookies();
    //Meto las experiencias que tiene a la vez que las cuento
    for(var j=0; j<experiences.length; j++){
      exp=JSON.parse(experiences[j]);
      if(exp.creador==user.username){
        user.experiences.push(exp.title);
        user.likes += exp.likes;
      }
    }
    
    //Meto las colaboraciones que tenga
    for(var j=0; j<experiences.length; j++){
      exp=JSON.parse(experiences[j]);
      if(exp.colaborador.length != ""){
        if(exp.colaborador.includes(user.username)){
          user.colabs.push(exp.title);
        }
      }
    }
    setCookie(user.email, JSON.stringify(user), 10);
  }
}

function orderedUsers(users){
  let n, aux;
  n = users.length;
  for (let i = 0; i < n - 1; i++){
    for (let j = 0; j < (n-i-1); j++){
      userj = JSON.parse(users[j]);
      userj1 = JSON.parse(users[j+1]);
      if (userj1.likes > userj.likes){
        ////console.log("entra ordered")
        aux = users[j+1];
        users[j+1] = users[j];
        users[j] = aux;
      }
    }
  }
  return users;
}


var loginemail;
/* Abre el popup de inicio de sesión o de registro, dependiendo de cuál se clickó */ 
function openForm(element){
    var id = element.textContent  
    
    if(id=="Iniciar Sesión"){
        if(document.getElementById("signup").style.display == "block"){
            closeForm();
        }
        document.getElementById("login").style.display = "block";
        document.getElementById("menu_img_hamb").src = "images/menu-regular-24.png";/* CAMBIOCAR */
        document.getElementById("ayuda_container").style.display = "none";
        document.getElementById("menu_mobile").style.display="none";
        menu=true;
    } else if(id=="Crear Cuenta" || id=="Regístrate"){
        if(document.getElementById("login").style.display == "block"){
            closeForm();
        }
        document.getElementById("signup").style.display = "block";
        document.getElementById("menu_img_hamb").src = "images/menu-regular-24.png";/* CAMBIOCAR */
        document.getElementById("menu_mobile").style.display="none";
        menu=true;
        //Muestra pop-up de ayuda CAMBIAR
        //document.getElementById("interrogacion").onfocus = function() {mostrarAyuda()};
       
    }
    document.body.style.overflowY = "hidden";
}

/* Cierra los popups. Como no hay manera de identificar qué X se pulsó para
cerrar el menú, se cierran directamente ambos. */ 
function closeForm(){
    document.getElementById("login-form").reset();
    document.getElementById("signup-form").reset();
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("logout").style.display = "none"; /* CAMBIOCAR */
    document.getElementById("deleteExpColecc").style.display = "none";

    reset_red();
    // recupera el scroll vertical
    document.body.style.overflowY = "visible";

    if(lastPopUp == "popup-grid-item"){
      document.getElementById("popup-grid-item").style.display = "flex";
      lastPopUp = "";
    }
}

//Mostrar ayuda
var ayuda = false;
function mostrarAyuda(){
  /*element = document.getElementById("interrogacion");
  element.addEventListener("focus", () => {
    document.getElementById("ayuda_container").style.display = "flex";
  });*/

  if (!ayuda){
    document.getElementById("ayuda_container").style.display = "flex";
    ayuda = true;
  }
  else {
    document.getElementById("ayuda_container").style.display = "none";
    ayuda = false;
  }
}

/* Manejo del popup login */ 
function handle_login(){
    // obtiene el contenido del formulario
    content = Array.from(document.querySelectorAll('#login-form input'));
    result = {};
    // recorre el contenido y va añadiendo cada clave: valor a un diccionario
    content.forEach(element => {
      result = {...result, [element.id]: element.value};
    });
    // busca la cookie para el usuario
    loginemail=result['login-email'];
    var userCookie = getCookie(loginemail);
    // variable para almacenar el elemento html correspondiente al error si el email o la contraseña son incorrectos
    var error;
    error = document.getElementById("wrongEmail");
    // Si la cookie no existe --> el usuario no está registrado
    if(userCookie == ""){
      // muestra el error de non-registered account
      error.style.display = "block";
    }
    //si la cuenta existe pero la contraseña es incorrecta
    else if (JSON.parse(userCookie).password != result['login-password']){
      // muestra el error de wrong email or password
      error = document.getElementById("wrongPassword");
      error.style.display = "block";
    } else if (JSON.parse(userCookie).password == result['login-password']){
      ////console.log("Successful login");
      if(lastPopUp == "popup-grid-item"){
        document.getElementById("popup-grid-item").style.display = "flex";
        lastPopUp = "";
      }
      closeForm();
      /*Version ordenador*/
      document.getElementById("account-li-login").style.display="none";
      document.getElementById("account-li-signup").style.display="none";
      document.getElementById("profile-pic-header").style.display="flex";
      document.getElementById("profile-menu-header").style.display="flex";

      profileInfo();
      if(JSON.parse(userCookie).photo==""){
        //CMABIOS
        document.getElementById("ppic").src="images/perfiles/user_blanco.png";
        document.getElementById("ppicmob").src="images/perfiles/user_blanco.png";
      }else{
        ////console.log(JSON.parse(userCookie).photo);
        //Aunque haya establecido una foto de perfil se pone la imagen por defecto
        document.getElementById("ppic").src="images/perfiles/"+JSON.parse(userCookie).photo;
        document.getElementById("ppicmob").src="images/perfiles/"+JSON.parse(userCookie).photo;
        //document.getElementById("ppic").src="images/user_account.png";
        //document.getElementById("ppicmob").src="images/user_account.png";
      }
      /*Version movil*/
      document.getElementById("menu_item_login").style.display="none";
      document.getElementById("menu_item_signup").style.display="none";
      document.getElementById("menu_item_profile").style.display="flex";

      /* Mostrar chat en header*/
      document.getElementById("chat-header").style.display = "block";
      document.getElementById("chat-floating-button").style.display = "flex";
      // Cambia el icono del chat si hay notificaciones
      if(getCookie("notify-"+JSON.parse(userCookie).username) != ""){
        document.getElementById("chat-icon-header").src = "images/iconos/icons8-chat-bubble-50_notificacion.png"
        document.getElementById("chat-floating-button-image").src = "images/iconos/icons8-chat-bubble-50_notificacion.png";
      } 
      else {
        document.getElementById("chat-icon-header").src = "images/iconos/icons8-chat-bubble-50.png";
        document.getElementById("chat-floating-button-image").src = "images/iconos/icons8-chat-bubble-50.png";
      }
      colorLikesExp();
    }
    if(error != ""){
      // click listener para cuando se hace click en cualquier input del formulario
      // De esta manera, con un click en cualquier caja se quita el mensaje de error
      var elements = Object.values(document.getElementsByClassName("login-input"));
      elements.forEach(inputBox => {
        // Establece el click listener para todas las cajas del formulario de forma automática
        elementClicked = document.getElementById(inputBox.id);
        elementClicked.addEventListener("click", () => {
            error.style.display = "none";
        });
      });
    }
    
    loggedInEmail = result['login-email'];

    expCookies=getExpCookies();
    let texto = document.getElementById("ver-mas-experiencias").innerHTML;
    if (texto.includes("Ver")){
      buildInitialExperiences(expCookies);
    }
    else {
      buildTotalExperiences(expCookies);
    }
}

function reset_form(){
  document.getElementById("signup-form").reset();
  reset_red();
}

function reset_red(){
  content = Array.from(document.querySelectorAll('#signup-form input'));
  var all = false;
  content.forEach(element => {
    if (!all){
      // quita el borde rojo
      element.style.border = "";
      // quita el mensaje de error
      let errorMessage = "error-" + element.id;
      document.getElementById(errorMessage).style.display = "none"
      if(errorMessage == "error-birthdate"){all = true}
    }
  });
  document.getElementById("error-photo").style.display = "none";
  document.getElementById("photo").style.border='';
  document.getElementById("error-terms").innerText = "";
  document.getElementById("error-terms").style.display = "none";
  document.getElementById("wrongEmail").style.display = "none"; 
  document.getElementById("wrongPassword").style.display = "none";
  document.getElementById("already-registered").style.display = "none";
  document.getElementById("already-registered-username").style.display = "none";

  content = Array.from(document.querySelectorAll('#experience-form input'));
  content.forEach(element => {
    // quita el borde rojo
    element.style.border = "";
    // quita el mensaje de error
    let errorMessage = "error-" + element.id;
    document.getElementById(errorMessage).style.display = "none";
  });
  //document.getElementById("new-experience-description").style.border = "";
  //document.getElementById("error-new-experience-description").style.visibility = "hidden";
}

/* Manejo del registro de nuevos usuarios */
function handle_registration(){

  content = Array.from(document.querySelectorAll('#signup-form input'));
  result = {};
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      if (element.type != "checkbox"){
        // quita el borde rojo
        element.style.border = "";
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        ////console.log(errorMessage);
        document.getElementById(errorMessage).style.display = "none";
        if(element.id == "username"){
          document.getElementById("already-registered-username").style.display = "none";
        }
        if (element.id == "email"){
          document.getElementById("already-registered").style.display = "none";
        }
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  // recorrer todos los intereses y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('interest'));
  content.forEach(interest => {
    if(interest.type == "checkbox"){
      result[interest.id] = interest.checked;
    }
  })


  //Addevent lisener sobre los términos y condiciones
  content = Array.from(document.querySelectorAll('#terms'));
  content.forEach(element => {
    element.addEventListener('change', function(){
      document.getElementById("error-terms").style.display = "none";
    })
  });

  //inicializar clave para "mis experiencias"
  result["experiences"] = [];
  result["colabs"] = [];
  result["collections"] = [];
  result["likes"] = 0;
  result["like_exp"] = [];

  ////console.log(result);
  var validated = true
  /* RELLENAR CON LLAMADAS A MÉTODOS DE VALIDACIÓN */
  if(!validateUsername(result.username)){
    ////console.log("Invalid username");
    document.getElementById("username").style.border = "2px solid red";
    document.getElementById("error-username").style.display = "flex";
    validated = false;
  }
  if(!validatePassword(result.password)){
    ////console.log("Invalid password");
    document.getElementById("password").style.border = "2px solid red";
    document.getElementById("error-password").style.display = "flex";
    validated = false;
  }
  if(!validateName(result.name)){
    ////console.log("Invalid name");
    document.getElementById("name").style.border = "2px solid red";
    document.getElementById("error-name").style.display = "flex";
    validated = false;
  }
  if(!validateLastname(result.lastname)){
    ////console.log("Invalid lastname");
    document.getElementById("lastname").style.border = "2px solid red";
    document.getElementById("error-lastname").style.display = "flex";
    validated = false;
  }
  if(!validateEmail(result.email)){
    ////console.log("Invalid email");
    document.getElementById("email").style.border = "2px solid red";
    document.getElementById("error-email").style.display = "flex";
    validated = false;
  }
  if(!validateBirthdate(result.birthdate)){
    ////console.log("Invalid birthdate");
    document.getElementById("birthdate").style.border = "2px solid red";
    document.getElementById("error-birthdate").style.display = "flex";
    validated = false;
  }
  if(!validatePhoto(result.photo)){
    ////console.log("Invalid photo");
    document.getElementById("photo").style.border = "2px solid red";
    document.getElementById("error-photo").style.display = "flex";
    validated = false;
  }
  if(!document.getElementById("terms").checked){
    ////console.log("Terms and conditions not accepted");
    document.getElementById("error-terms").innerText = "Debes aceptar nuestros términos y condiciones"
    document.getElementById("error-terms").style.display = "flex";
    validated=false;
  }
  /* ----------------------------------------------  */
  // cuando se han validado todas las entradas, genero la cookie
  // únicamente si no hay ninguna cookie con el mismo email o username
  if(validated){
    //Busco que no haya un usuario con ese username
    let username_other = false;
    users = getUsersCookies();
    ////console.log(result.username)
    for (let i = 0; i < users.length; i++){
      user = JSON.parse(users[i])
      ////console.log(user.username)
      if (user.username.toLowerCase() == result.username.toLowerCase()){
        ////console.log("entra")
        username_other = true;
        break;
      }
    }
    if(getCookie(result.email) == "" && !username_other){
      //Ponemos la imagen bien
      if (result.photo == ""){
        result.photo = "user_blanco.png";
      }
      else {
        result.photo = result.photo.slice(12);
      }
      setCookie(result.email, JSON.stringify(result), 10);
      closeForm();
      document.getElementById("snackbar").style.display="block";
      document.getElementById("snackbar").innerHTML = "Usuario registrado correctamente";
      setTimeout(function() {
        document.getElementById("snackbar").style.display="none";},2000);
      
      buildRankingUsers(getUsersCookies());
      actualizarMoreUsers();
    } 
    else if (username_other && getCookie(result.email)!=""){
      document.getElementById("already-registered-username").style.display = "flex";
      document.getElementById("already-registered").style.display = "flex";
      document.getElementById("username").style.border = "2px solid red";
      document.getElementById("email").style.border = "2px solid red";

    }
    else if (username_other){
      document.getElementById("already-registered-username").style.display = "flex";
      document.getElementById("username").style.border = "2px solid red";
    }
    else if (getCookie(result.email)!=""){
      document.getElementById("already-registered").style.display = "flex";
      document.getElementById("email").style.border = "2px solid red";
    }
  }
}

function borrar_imagen() {
  document.getElementById("photo").value = "";
  document.getElementById("error-photo").style.display = "none";
  document.getElementById("photo").style.border = "";
}

function validatePhoto(photo){
  if(photo == ""){
    return true;
  }
  let re = new RegExp("(gif|jpe?g|tiff?|png|webp|bmp)$");
  if(!re.test(photo.split('.')[1])){
    document.getElementById("error-photo").innerText = "Selecciona una imagen";
    return false
  }
  return true;
}
function validateUsername(username){
  let re = new RegExp('^[a-zA-Z0-9]{5,12}$');
  if(!re.test(username)){
    if(username==""){
      document.getElementById("error-username").innerText = "Campo obligatorio"
    } else if(username.length < 5 || username.length > 12){
      document.getElementById("error-username").innerText = "Debe tener entre 5 y 12 caracteres"
    } else {
      document.getElementById("error-username").innerText = "Caracteres válidos: A-Z a-z 0-9"
    }
    return false;
  }
  return true;
}
function validateUsernameChange(username){
  let re = new RegExp('^[a-zA-Z0-9]{5,12}$');
  if(!re.test(username)){
    if(username==""){
      document.getElementById("error-changeusername").innerText = "Campo obligatorio"
    } else if(username.length < 5 || username.length > 12){
      document.getElementById("error-changeusername").innerText = "Debe tener entre 5 y 12 caracteres"
    } else {
      document.getElementById("error-changeusername").innerText = "Caracteres válidos: A-Z a-z 0-9"
    }
    return false;
  }
  return true;
}
function validatePassword(password){
  if(password == ""){
    document.getElementById("error-password").innerText = "Campo obligatorio"
    return false;
  }
  let re = new RegExp('^[a-z0-9]{4,8}$');
  ////console.log("LONGITUD: ", password.length);
  if(!re.test(password)){
    ////console.log(password.length)
    if(password.length < 4 || password.length > 8){
      document.getElementById("error-password").innerText = "Debe tener entre 4 y 8 caracteres"
    } else {
      document.getElementById("error-password").innerText = "Caracteres válidos: a-z 0-9"
    }
    return false;
  }
  return true;
}
function validateName(name){
  if(name == ""){
    document.getElementById("error-name").innerText = "Campo obligatorio"
    return false;
  }
  return true;
}
function validateNameChange(name){
  if(name == ""){
    document.getElementById("error-changename").innerText = "Campo obligatorio"
    return false;
  }
  return true;
}
function validateLastname(lastname){
  if(lastname == ""){
    document.getElementById("error-lastname").innerText = "Campo obligatorio"
    return false;
  }
  return true
}
function validateLastnameChange(lastname){
  if(lastname == ""){
    document.getElementById("error-changelastname").innerText = "Campo obligatorio"
    return false;
  }
  return true
}
function validateEmail(email){
  if(email == ""){
    document.getElementById("error-email").innerText = "Campo obligatorio";
    return false;
  }
  	
  let re = new RegExp('^[a-z0-9_.]+@[a-z0-9_]+[.][a-z0-9_]+$')
  ////console.log(email);
  if(!re.test(email)){
    document.getElementById("error-email").innerText = "Formato: nombre@dominio.com";
    return false;
  }
  return true;
}
function validateBirthdate(birthdate){
  if(birthdate == ""){
    document.getElementById("error-birthdate").innerText = "Campo obligatorio"
    return false;
  }
  parts = birthdate.split("-");
  var vbirthdate = new Date(birthdate)
  minAge = new Date().setDate(new Date().getDate()-15*365)
  if(vbirthdate > minAge){
    document.getElementById("error-birthdate").innerText = "Debes tener más de 15 años";
    return false;
  }
  return true;
}
function validateBirthdateChange(birthdate){
  if(birthdate == ""){
    document.getElementById("error-changebirthdate").innerText = "Campo obligatorio"
    return false;
  }
  parts = birthdate.split("-");
  var vbirthdate = new Date(birthdate)
  minAge = new Date().setDate(new Date().getDate()-15*365)
  if(vbirthdate > minAge){
    document.getElementById("error-changebirthdate").innerText = "Debes tener más de 15 años";
    return false;
  }
  return true;
}


var loggedInEmail = ""; 
function handleNewExperience(){
  ////console.log("Email: " + loggedInEmail);
  content = Array.from(document.querySelectorAll('#experience-form input'));
  var result = {};
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      // quita el mensaje de error
      let errorMessage = "error-" + element.id;
      document.getElementById(errorMessage).style.visibility = "hidden";
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });
  //añade la descripción al resultado
  description = document.getElementById("new-experience-description");
  description.addEventListener('focus', function(){description.style.border = ""; 
  document.getElementById("error-new-experience-description").style.visibility = "hidden"; });
  result = {...result, ["description"]: document.getElementById("new-experience-description").value}

  // validar contenido de la experiencia
  if(validateExperiences(result)){
  
    // con el nuevo resultado hay que guardar la cookie con la información
    // {..., experiences: [{titulo: "", description: "", photo: ""}, {titulo: "", description: "", photo: ""}, ...], ...}
    var cookie = getCookie(loggedInEmail);
    ////console.log("PRUEBA", cookie);
    userInfo = JSON.parse(cookie);
    // cargo el array con las experiencias
    var userExperiences = userInfo.experiences;
    ////console.log(userExperiences);
    // añadir nueva experiencia
    userExperiences.push({'title': result['myexp-title'],'location': result['myexp-location'],  'description': result['description'], 'photo': result['myexp-picture']});
    ////console.log(userInfo);

    setCookie(userInfo.email, JSON.stringify(userInfo), 10);

    expForm = document.getElementById("experience-form");
    expForm.reset();
    expForm.style.display = "none";

    deleting = false; // poner esto para evitar que se pueda eliminar después de volver del menú de añadir experiencia
    if(userExperiences.length > 0){
      document.getElementById("myexp-delete").src = "images/button_edit.png";
      document.getElementById("myexp-delete").style.display = "block";
    }
    openMyExp();
  }

}

function validateExperiences(result){
  ////console.log("Entro a validar: ", result);
  validated = true;
  if(result['myexp-title'] == ''){
    ////console.log("Title not provided");
    var error = document.getElementById("error-myexp-title");
    error.style.visibility = "visible";
    error.innerText = "You must provide an experience title"
    document.getElementById("myexp-title").style.border = "2px solid red";
    
    validated = false;
  }
  if(result['description'] == ''){
    ////console.log("Description not provided");
    var error = document.getElementById("error-new-experience-description");
    error.style.visibility = "visible";
    error.innerText = "You must provide an experience description"
    document.getElementById("new-experience-description").style.border = "2px solid red";

    validated = false;
  }
  if(result['description'].length > 140){
    ////console.log("Description too long");
    var error = document.getElementById("error-new-experience-description");
    error.style.visibility = "visible";
    error.innerText = "can have a maximum of 140 characters"
    document.getElementById("new-experience-description").style.border = "2px solid red";

    validated = false;
  }
  
  if(result['myexp-location'] == ''){
    ////console.log("Location not provided");
    var error = document.getElementById("error-myexp-location");
    error.style.visibility = "visible";
    error.innerText = "You must provide an experience location"
    document.getElementById("myexp-location").style.border = "2px solid red";

    validated = false;
  }
  if(result['myexp-picture'] == ''){
    ////console.log("Picture not provided");
    var error = document.getElementById("error-myexp-picture");
    error.style.visibility = "visible";
    error.innerText = "You must provide an experience picture"
    document.getElementById("myexp-picture").style.border = "2px solid red";

    validated = false;
  }
  return validated;
}

function buildExperience(title, location, description, picture){
  picture = "images/experiences/madrid.jpg";
  newExperienceHTML = "<div class=\"grid-item myexp-item\" onclick=\"confirmDelete(this)\">" +
                        "<img class=\"trash-icon\" src=\"images/trash_icon.png\" alt=\"basura\">"+ 
                        "<div class=\"experience-picture\">" +
                          "<img src=" + picture + " alt=\"Asturias, Llanes\">" +
                        "</div><div class=\"experience-body\"><div class=\"experience-title\">" +
                          "<h2>" + title + "</h2><h3>" + location + "</h3></div>" + 
                          "<div class=\"experience-description\">"+
                          "<p>" + description + "</p></div></div></div>"

  return newExperienceHTML;
}
var experienceToDelete = "";
var deleting = false;

/* Maneja el botón que permite eliminar las experiencias */
function allowDelete(){
  var deleters = Array.from(document.getElementsByClassName("trash-icon"));
  if(!deleting) {
    deleters.forEach(deleter => {
      ////console.log(deleter);
      
      deleter.style.display = "block";
      
    });
    document.getElementById("myexp-delete").src = "images/return_icon.png";
    deleting = true;
  } else {
    deleters.forEach(deleter => {
      ////console.log(deleter);
      
      deleter.style.display = "none";
      
    });
    deleting = false;
    document.getElementById("myexp-delete").src = "images/button_edit.png";
  }
  closeConfirmDelete();
}
/* Abre el popup para confirmar que eliminas una experiencia */
function confirmDelete(element){
  ////console.log(element);
  experienceToDelete = element;
  if(deleting){
    document.getElementById("confirm-delete").style.display = "flex";
  }else{
    return false;
  }
}
/* Cierra el popup para confirmar que eliminas una experiencia */
function closeConfirmDelete(){
  document.getElementById("confirm-delete").style.display= "none";
}

/* Elimina una experiencia del html y de la cookie */
/*function deleteExperience(){
  // Extraer el título de la experiencia
  var title = experienceToDelete.childNodes[2].childNodes[0].childNodes[0].innerText;

  // Eliminarla de la cookie del usuario
  var userCookie = JSON.parse(getCookie(loggedInEmail));
  var userExperiences = userCookie.experiences;
  index = 0;
  userExperiences.forEach(experience => {
    //console.log("TITULO: ", title, "EXPERIENCIA: ", experience);
    if(experience.title == title){
      userExperiences.splice(index, 1);
    }
    index += 1;
  });
  
  setCookie(loggedInEmail, JSON.stringify(userCookie), 10);
  //console.log("RESULTADO: ", userCookie);
  // actualiza el html
  document.getElementById("confirm-delete").style.display = "none";
  
  //deleting = false; // esto evita que se pueda eliminar una experiencia sin que se muestre el icono de eliminar
  allowDelete();
  openMyExp();
}*/


/* BUSCADOR */ 
function search(){
  //Cojo lo que busca
  let texto = document.getElementById("search-input").value;
  let contador_total = 0, contador_intereses = 0, contador_likes = 0, contador_publicaciones = 0, contador_fecha = 0;
  experiences_total = getExpCookies();
  ////console.log(experiences_total.length);
  users_total = getUsersCookies();
  experiences_valid = experiences_total;
  users_valid = users_total;

  /*-------------------------------------------TEXTO--------------------------------*/
  if (texto != ''){
    //Busco las experiencias que contengan el texto
    for (let i = 0; i < experiences_total.length; i++){
      exp = JSON.parse(experiences_total[i]);
      if (!exp.title.toLowerCase().includes(texto.toLowerCase())){
        experiences_valid.splice(i,1);
        i--;
      }
    }
    //Busco los usuarios que contengan ese texto
    for (let i = 0; i < users_total.length; i++){
      user = JSON.parse(users_total[i]);
      if (!user.username.toLowerCase().includes(texto.toLowerCase())){
        users_valid.splice(i,1);
        i--;
      }
    }
  }

  /*-------------------------------------------INTERESES--------------------------------*/
  intereses = [];
  // recorrer todos los intereses y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('interest-filter'));
  content.forEach(interest => {
    if(interest.type == "checkbox"){
      intereses.push(interest.checked);
    }
  })
  //Miro los filtros marcados como si y los sumo al contador
  for (let i = 0; i < intereses.length; i++){
    if (intereses[i]){
      contador_intereses += 1;
    }
  }
  //Solo buscamos por intereses si se ha marcado alguno
  if (contador_intereses != 0){
    //Buscamos las experiencias que coincidan con la búsqueda de intereses
    experiences_interest = [];
    for (let i = 0; i < experiences_valid.length; i++){
      exp = JSON.parse(experiences_valid[i]);
      experiences_interest = [exp.culture, exp.history, exp.nature, exp.business, exp.gastronomy, exp.sports];
      let incluir = false;
      //Mira la experiencia para cada uno de los intereses
      for (let j = 0; j < intereses.length; j++){
        if (intereses[j] && experiences_interest[j]){
          incluir = true;
          break;
        }
      }
      if (!incluir){
        experiences_valid.splice(i,1);
        i--;
      }
    }
    //Una vez puestas las experiencias pasamos a los usuarios
    user_interest = [];
    for (let i = 0; i < users_valid.length; i++){
      user = JSON.parse(users_valid[i]);
      user_interest = [user.culture, user.history, user.nature, user.business, user.gastronomy, user.sports];
      let incluir = false;
      //Mira la experiencia para cada uno de los intereses
      for (let j = 0; j < intereses.length; j++){
        if (intereses[j] && user_interest[j]){
          incluir = true;
          break;
        }
      }
      if (!incluir){
        users_valid.splice(i,1);
        i--;
      }
    }
  }

  /*-------------------------------------------RELEVANCIA--------------------------------*/
  likes = [];
  // recorrer todos los likes y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('likes-filter'));
  content.forEach(interest => {
    if(interest.type == "checkbox"){
      likes.push(interest.checked);
    }
  })
  //Miro los filtros marcados como si y los sumo al contador
  for (let i = 0; i < likes.length; i++){
    if (likes[i]){
      contador_likes += 1;
    }
  }
  //Solo filtro en caso de que se haya marcado alguno
  if (contador_likes != 0){
    //Si el primer está true es que hay que ordenarlos de mayor a menor
    if (likes[0]){
      experiences_valid = orderedUsers(experiences_valid);
    }
    //Si no es que está el segundo dado
    else {
      experiences_valid = orderedUsersMenor(experiences_valid);
    }
  }
  publicaciones = [];
  // recorrer todos los likes y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('comentarios-filter'));
  content.forEach(interest => {
    if(interest.type == "checkbox"){
      publicaciones.push(interest.checked);
    }
  })
  //Miro los filtros marcados como si y los sumo al contador
  for (let i = 0; i < publicaciones.length; i++){
    if (publicaciones[i]){
      contador_publicaciones += 1;
    }
  }
  //Solo filtro en caso de que se haya marcado alguno
  if (contador_publicaciones != 0){
    //Si el primer está true es que hay que ordenarlos de mayor a menor
    if (publicaciones[0]){
      users_valid = orderedUsersPubli(users_valid);
    }
    //Si no es que está el segundo dado
    else {
      users_valid = orderedUsersPubliMenor(users_valid);
    }
  }

  /*-------------------------------------------FECHA--------------------------------*/
  dates = [];
  // recorrer todos los likes y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('fecha-filter'));
  content.forEach(interest => {
    if(interest.type == "checkbox"){
      dates.push(interest.checked);
    }
  })
  //Miro los filtros marcados como si y los sumo al contador
  for (let i = 0; i < dates.length; i++){
    if (dates[i]){
      contador_fecha += 1;
    }
  }
  //Solo filtro en caso de que se haya marcado alguno
  if (contador_fecha != 0){
    //Si el primer está true es que hay que ordenarlos de reciente a viejo
    if (dates[0]){
      experiences_valid = orderedDate(experiences_valid);
    }
    //Si no es que está el segundo dado
    else {
      experiences_valid = orderedDateMenor(experiences_valid);
    }
  }

  /*-------------------------------------------PRESUPUESTO--------------------------------*/
  let min = document.getElementById("slider1").value;
  let max = document.getElementById("slider2").value;
  //Será que han metido un presupuesto
  if (min != 0 || max != 1000){
    contador_fecha = 1;
    //Hay que coger las experiencias que cumplan ese requisito
    for (let i = 0; i < experiences_valid.length; i++){
      exp = JSON.parse(experiences_valid[i]);
      //Todas las que estén fuera de los limites las elimino
      if (exp.gasto < min || exp.gasto > max){
        experiences_valid.splice(i,1);
        i--;
      }
    }
  }

  /*-------------------------------------------FINAL--------------------------------*/
  contador_total = contador_intereses + contador_likes + contador_publicaciones + contador_fecha;
  //En caso de que indique algun filtro o ponga texto
  if (contador_total != 0 || texto != ''){
    ////console.log("Solo texto");
    //Para el título
    document.getElementById("busqueda").innerHTML = "Búsqueda: &nbsp"+texto;
    document.getElementById("total-filtros").innerHTML = "Filtros("+contador_total+")";
    document.getElementById("busqueda-container").style.display = "flex";
    //Una vez tenemos las experiencias que cumplen con todo las ponemos
    document.getElementById("titulo-experiencias").innerHTML = "Experiencias";
    if (experiences_valid.length == 0){
      myexperiencesGrid = document.getElementById("initial-experiences-grid");
      myexperiencesGrid.innerHTML = "<p class=\"no-tiene\" id=\"no-tiene-exp\">No hay experiencias para esa búsqueda</p><img id=\"cara-triste-exp\" src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    }
    else {
      document.getElementById("ver-mas-experiencias").style.display = "none";
      buildTotalExperiences(experiences_valid);
    }
    //Ponemos los usuarios correspondientes
    searchUsers(users_valid);
    //Poner las lineas limitadoras
    document.getElementById("barrera-resultado1").style.display = "block";
    document.getElementById("barrera-resultado2").style.display = "block";
  }
  else {
    resetSearch();
  }
  //Lo ultimo es cerrar el filtro y reestablecerlo
    document.getElementById("filter-container").style.visibility = "hidden";
    document.getElementById("filtro-btn-img").src = "images/iconos/filtro.png";

    //Reestablecer la ventana a intereses
    document.getElementById("pestana-intereses").style.background = "#483d8b";
    document.getElementById("pestana-relevancia").style.background = "#000073";
    document.getElementById("pestana-fecha").style.background = "#000073";
    document.getElementById("pestana-presupuesto").style.background = "#000073";
    document.getElementById("filter-intereses").style.display = "flex";
    document.getElementById("filter-relevancia").style.display = "none";
    document.getElementById("filter-fecha").style.display = "none";
    document.getElementById("filter-presupuesto").style.display = "none";

  return false;

  /*-------------------------------------------------------FILTRO ANTERIOR---------------------------------------
  // obtiene el texto de búsqueda
  var text = document.querySelector("#search-input").value;
  // recopilar todos los títulos disponibles
  var gridItems = Array.from(document.querySelectorAll(".grid-item"));
  gridItems.shift(); // soluciona problemas del buscador eliminando del array el item para añdir experiencias
  var experienceTitles = document.querySelectorAll(".experience-title h2");
  var numCoincidencias = 0;
  experienceTitles.forEach(titulo => {
      if(titulo.innerHTML.toLowerCase().includes(text.toLowerCase())){
        numCoincidencias += 1;
      }
  })

  if(numCoincidencias == 0){
    document.getElementById("search-error").firstElementChild.innerHTML = "No experiences found for search '" + text + "'";
    document.getElementById("search-error").style.visibility = "visible";
    text = "";
    var index = 0;
    experienceTitles.forEach(titulo => {
      gridItems[index].style.display = "none";
      index = index+1;
    })
    //Quita el Resultado búsqueda
    document.getElementById("result-search").firstElementChild.innerHTML = "";
    document.getElementById("result-search").style.visibility = "hidden";
    return false;
  } else {
    document.getElementById("search-error").style.visibility = "hidden";
  }

  //Añadir lo de Resultado Búsqueda
  document.getElementById("result-search").firstElementChild.innerHTML = "Resultado de la búsqueda: " + text;
  document.getElementById("result-search").style.visibility = "visible";

  var index = 0;
  //console.log(experienceTitles);
  experienceTitles.forEach(titulo => {
    //console.log(titulo);
    if(!titulo.innerHTML.toLowerCase().includes(text.toLowerCase())){
      gridItems[index].style.display = "none";
    } else {
      gridItems[index].style.display = "flex";
    }
    index = index+1;
  })

  if(text == ""){
    document.getElementById("search-error").firstElementChild.innerHTML = "¡Ups! Debes escribir algo primero";
    document.getElementById("search-error").style.visibility = "visible";

    //Quita el Resultado búsqueda
    document.getElementById("result-search").firstElementChild.innerHTML = "";
    document.getElementById("result-search").style.visibility = "hidden";
  }
  return false; //evita que el formulario cambie de página*/
}

function searchUsers(users){
  let usersGrid = "";
  for(let i = 0; i < users.length; i++){
    user = JSON.parse(users[i]);
    if (user.photo == ""){
      user.photo = "user_azul.png";
    }
    usersGrid+= "<div class=\"grid-item-users\" onclick=\"openUser(this)\">"+
                  "<div class=\"user-picture\">"+
                    "<img src=\"images/perfiles/"+user.photo+"\" alt=\"Foto Perfil\">"+
                  "</div>"+
                  "<div class=\"user-name\"><h3>"+user.username+"</h3></div>"+
                  "<div class=\"user-mg\">"+
                    "<img src=\"images/iconos/mg-black.png\" alt=\"mg\">"+
                      "<p>"+user.likes+"</p>"+
                  "</div>"+
                  "<div class=\"user-pub\">"+
                    "<img src=\"images/iconos/pub.png\" alt=\"pub\">"+
                    "<p>"+user.experiences.length+"</p>"+
                  "</div>"+
                "</div>";
  }
  if (!usersGrid.includes("Foto Perfil")){
    usersGrid+= "<p class=\"no-tiene\" id=\"no-tiene-user\">No hay usuarios para esa búsqueda</p><img id=\"cara-triste-user\" src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
  }
  myusersGrid = document.getElementById("users-search-grid");
  myusersGrid.innerHTML = usersGrid;
  myusersGrid.style.display = "grid";
  document.getElementById("users-search-title").style.display = "flex"
}

function orderedUsersMenor(users){
  let n, aux;
  n = users.length;
  for (let i = 0; i < n - 1; i++){
    for (let j = 0; j < (n-i-1); j++){
      userj = JSON.parse(users[j]);
      userj1 = JSON.parse(users[j+1]);
      if (userj1.likes < userj.likes){
        aux = users[j+1];
        users[j+1] = users[j];
        users[j] = aux;
      }
    }
  }
  return users;
}
function orderedUsersPubli(users){
  let n, aux;
  n = users.length;
  for (let i = 0; i < n - 1; i++){
    for (let j = 0; j < (n-i-1); j++){
      userj = JSON.parse(users[j]);
      userj1 = JSON.parse(users[j+1]);
      if (userj1.experiences.length > userj.experiences.length){
        aux = users[j+1];
        users[j+1] = users[j];
        users[j] = aux;
      }
    }
  }
  return users;
}
function orderedUsersPubliMenor(users){
  let n, aux;
  n = users.length;
  for (let i = 0; i < n - 1; i++){
    for (let j = 0; j < (n-i-1); j++){
      userj = JSON.parse(users[j]);
      userj1 = JSON.parse(users[j+1]);
      if (userj1.experiences.length < userj.experiences.length){
        aux = users[j+1];
        users[j+1] = users[j];
        users[j] = aux;
      }
    }
  }
  return users;
}
function orderedDate(users){
  let n, aux;
  n = users.length;
  for (let i = 0; i < n - 1; i++){
    for (let j = 0; j < (n-i-1); j++){
      userj = JSON.parse(users[j]);
      userj1 = JSON.parse(users[j+1]);
      if (userj1.fecha > userj.fecha){
        aux = users[j+1];
        users[j+1] = users[j];
        users[j] = aux;
      }
    }
  }
  return users;
}
function orderedDateMenor(users){
  let n, aux;
  n = users.length;
  for (let i = 0; i < n - 1; i++){
    for (let j = 0; j < (n-i-1); j++){
      userj = JSON.parse(users[j]);
      userj1 = JSON.parse(users[j+1]);
      if (userj1.fecha < userj.fecha){
        aux = users[j+1];
        users[j+1] = users[j];
        users[j] = aux;
      }
    }
  }
  return users;
}

function resetSearch(){
  //Quito lo de arriba de busqueda y filtros
    //Para el título
  document.getElementById("busqueda-container").style.display = "none";

  document.getElementById("intereses-content").reset();
  document.getElementById("likes-content").reset();
  document.getElementById("comments-content").reset();
  document.getElementById("fecha-container-filter").reset();
  document.getElementById("slider1").value = 0;
  document.getElementById("slider2").value = 1000;
  slideOne();
  slideTwo();

  //Quitamos los usuarios de la pagina
  document.getElementById("users-search-grid").innerHTML = "";
  document.getElementById("users-search-title").style.display = "none"
  //Quito el texto buscado
  document.getElementById("search-input").value = '';
  //Quitar las lineas limitadoras
  document.getElementById("barrera-resultado1").style.display = "none";
  document.getElementById("barrera-resultado2").style.display = "none";
  openFilter();
  iniciarPagina();
}

//Opciones de filtro
function openFilter(){
  var id_filter = document.getElementById("filter-container");
  if (id_filter.style.visibility == "visible"){
    id_filter.style.visibility = "hidden";
    document.getElementById("filtro-btn-img").src = "images/iconos/filtro.png";

    //Reestablecer la ventana a intereses
    document.getElementById("pestana-intereses").style.background = "#483d8b";
    document.getElementById("pestana-relevancia").style.background = "#000073";
    document.getElementById("pestana-fecha").style.background = "#000073";
    document.getElementById("pestana-presupuesto").style.background = "#000073";
    document.getElementById("filter-intereses").style.display = "flex";
    document.getElementById("filter-relevancia").style.display = "none";
    document.getElementById("filter-fecha").style.display = "none";
    document.getElementById("filter-presupuesto").style.display = "none";
  }
  else{
    id_filter.style.visibility = "visible";
    document.getElementById("filtro-btn-img").src = "images/iconos/x.png";
    document.getElementById("pestana-intereses").style.background = "#483d8b";
  }

  var checkbox1 = document.getElementById("filter-likes-mayor");
  var checkbox2 = document.getElementById("filter-likes-menor"); 
  var checkbox1_f = document.getElementById("filter-fecha-reciente");
  var checkbox2_f = document.getElementById("filter-fecha-antigua"); 
  checkbox1.onclick = function(){ 
    if(checkbox1.checked != false){ 
      checkbox2.checked =null; 
      checkbox1_f.checked =null; 
      checkbox2_f.checked =null; 
    }
  } 
  checkbox2.onclick = function(){ 
    if(checkbox2.checked != false){ 
      checkbox1.checked=null;
      checkbox1_f.checked =null; 
      checkbox2_f.checked =null; 
    }
  }
  checkbox1_f.onclick = function(){ 
    if(checkbox1_f.checked != false){ 
      checkbox2.checked =null; 
      checkbox1.checked =null; 
      checkbox2_f.checked =null; 
    }
  } 
  checkbox2_f.onclick = function(){ 
    if(checkbox2_f.checked != false){ 
      checkbox1.checked=null;
      checkbox1_f.checked =null; 
      checkbox2.checked =null; 
    }
  } 

  var checkbox1_c = document.getElementById("comentarios-mayor");
  var checkbox2_c = document.getElementById("comentarios-menor"); 
  checkbox1_c.onclick = function(){ 
    if(checkbox1_c.checked != false){ 
      checkbox2_c.checked =null; 
    }
  } 
  checkbox2_c.onclick = function(){ 
    if(checkbox2_c.checked != false){ 
      checkbox1_c.checked=null;
    }
  } 
}

function changeFilter(element){
  var pestana = document.getElementById(element.id);

  if (pestana.id == "pestana-intereses"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-relevancia").style.background = "#000073";
    document.getElementById("pestana-fecha").style.background = "#000073";
    document.getElementById("pestana-presupuesto").style.background = "#000073";

    //Enseñar su pantalla correspondiente
    document.getElementById("filter-intereses").style.display = "flex";
    document.getElementById("filter-relevancia").style.display = "none";
    document.getElementById("filter-fecha").style.display = "none";
    document.getElementById("filter-presupuesto").style.display = "none";
  }
  if (pestana.id == "pestana-relevancia"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-intereses").style.background = "#000073";
    document.getElementById("pestana-fecha").style.background = "#000073";
    document.getElementById("pestana-presupuesto").style.background = "#000073";

    //Enseñar su pantalla correspondiente
    document.getElementById("filter-intereses").style.display = "none";
    document.getElementById("filter-relevancia").style.display = "flex";
    document.getElementById("filter-fecha").style.display = "none";
    document.getElementById("filter-presupuesto").style.display = "none";
  }
  if (pestana.id == "pestana-fecha"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-relevancia").style.background = "#000073";
    document.getElementById("pestana-intereses").style.background = "#000073";
    document.getElementById("pestana-presupuesto").style.background = "#000073";

    //Enseñar su pantalla correspondiente
    document.getElementById("filter-intereses").style.display = "none";
    document.getElementById("filter-relevancia").style.display = "none";
    document.getElementById("filter-fecha").style.display = "flex";
    document.getElementById("filter-presupuesto").style.display = "none";
  }
  if (pestana.id == "pestana-presupuesto"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-relevancia").style.background = "#000073";
    document.getElementById("pestana-fecha").style.background = "#000073";
    document.getElementById("pestana-intereses").style.background = "#000073";

    //Enseñar su pantalla correspondiente
    document.getElementById("filter-intereses").style.display = "none";
    document.getElementById("filter-relevancia").style.display = "none";
    document.getElementById("filter-fecha").style.display = "none";
    document.getElementById("filter-presupuesto").style.display = "flex";
  }
}

function changeFilterPopUpExp(element){
  var pestana = document.getElementById(element.id);
  if (pestana.id == "pestana-descripcion"){
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-transporte").style.background = "#000073";
    document.getElementById("pestana-presu").style.background = "#000073";
    document.getElementById("pestana-Alojamiento").style.background = "#000073";

    document.getElementById("filter-descripcion").style.display="flex";
    document.getElementById("filter-transporte").style.display = "none";
    document.getElementById("filter-presu").style.display = "none";
    document.getElementById("filter-alojamiento").style.display = "none";
  }

  if (pestana.id == "pestana-transporte"){
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-descripcion").style.background = "#000073";
    document.getElementById("pestana-presu").style.background = "#000073";
    document.getElementById("pestana-Alojamiento").style.background = "#000073";

    document.getElementById("filter-descripcion").style.display="none";
    document.getElementById("filter-transporte").style.display = "flex";
    document.getElementById("filter-presu").style.display = "none";
    document.getElementById("filter-alojamiento").style.display = "none";
  }

  if (pestana.id == "pestana-presu"){
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-transporte").style.background = "#000073";
    document.getElementById("pestana-descripcion").style.background = "#000073";
    document.getElementById("pestana-Alojamiento").style.background = "#000073";

    document.getElementById("filter-descripcion").style.display="none";
    document.getElementById("filter-transporte").style.display = "none";
    document.getElementById("filter-presu").style.display = "flex";
    document.getElementById("filter-alojamiento").style.display = "none";
  }

  if (pestana.id == "pestana-Alojamiento"){
    pestana.style.background = "#483d8b";
    document.getElementById("pestana-transporte").style.background = "#000073";
    document.getElementById("pestana-presu").style.background = "#000073";
    document.getElementById("pestana-descripcion").style.background = "#000073";

    document.getElementById("filter-descripcion").style.display="none";
    document.getElementById("filter-transporte").style.display = "none";
    document.getElementById("filter-presu").style.display = "none";
    document.getElementById("filter-alojamiento").style.display = "flex";
  }
}
//Para el rango del presupuesto
window.onload = function() {
  slideOne();
  slideTwo();
}
function slideOne(){
  let sliderOne = document.getElementById("slider1");
  let sliderTwo = document.getElementById("slider2");
  let displayOne = document.getElementById("range1");
  let min = 50;

  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= min){
    sliderOne.value = parseInt(sliderTwo.value) - min;
  }
  displayOne.textContent = sliderOne.value;
  fillColor();
}
function slideTwo(){
  let sliderOne = document.getElementById("slider1");
  let sliderTwo = document.getElementById("slider2");
  let displayTwo = document.getElementById("range2");
  let min = 50;

  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= min){
    sliderTwo.value = parseInt(sliderOne.value) + min;
  }
  displayTwo.textContent = sliderTwo.value;
  fillColor();
}
//Poner color a la barrita del medio
function fillColor(){
  let sliderOne = document.getElementById("slider1");
  let sliderTwo = document.getElementById("slider2");
  let sliderTrack = document.querySelector(".slider-track");
  let sliderMax = document.getElementById("slider1").max;

  por1 = (sliderOne.value / sliderMax) * 100;
  por2 = (sliderTwo.value / sliderMax) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae4 ${por1}%, #0b0be6 ${por1}%, #0b0be6 ${por2}%, #dadae4 ${por2}%)`;
  ////console.log(sliderTrack.style.background);
}

//Solo permite que pongas ordenador de mayor a menor o de menor a mayor
function uncheckBox(){
  var checkbox1 = document.getElementById("filter-likes-mayor");
  var checkbox2 = document.getElementById("filter-likes-menor"); 
  var checkbox1_f = document.getElementById("filter-fecha-reciente");
  var checkbox2_f = document.getElementById("filter-fecha-antigua"); 
  checkbox1.onclick = function(){ 
    if(checkbox1.checked != false){ 
      checkbox2.checked =null; 
      checkbox1_f.checked =null; 
      checkbox2_f.checked =null; 
    }
  } 
  checkbox2.onclick = function(){ 
    if(checkbox2.checked != false){ 
      checkbox1.checked=null;
      checkbox1_f.checked =null; 
      checkbox2_f.checked =null; 
    }
  }
  checkbox1_f.onclick = function(){ 
    if(checkbox1_f.checked != false){ 
      checkbox2.checked =null; 
      checkbox1.checked =null; 
      checkbox2_f.checked =null; 
    }
  } 
  checkbox2_f.onclick = function(){ 
    if(checkbox2_f.checked != false){ 
      checkbox1.checked=null;
      checkbox1_f.checked =null; 
      checkbox2.checked =null; 
    }
  } 
}
function uncheckComments(){
  var checkbox1 = document.getElementById("comentarios-mayor");
  var checkbox2 = document.getElementById("comentarios-menor"); 
  checkbox1.onclick = function(){ 
    if(checkbox1.checked != false){ 
      checkbox2.checked =null; 
    }
  } 
  checkbox2.onclick = function(){ 
    if(checkbox2.checked != false){ 
      checkbox1.checked=null;
    }
  } 
}

function cambiarMenu(){
  ////console.log(document.getElementById("menu_nesting"));
  if(document.getElementById("menu_nesting").style.display =="block"){
    document.getElementById("menu_nesting").style.display ="none";
    document.getElementById("flechmenu").src = "images/down-arrow.png";
     
  } 
  else{
    document.getElementById("menu_nesting").style.display ="block";
    document.getElementById("flechmenu").src = "images/left-arrow.png";
  }
    
}

var despl_perfil_menu_hamburguesa=true;

function desplPerfilMenuHamburguesa(){
  if(despl_perfil_menu_hamburguesa ==false){
    document.getElementById("menu_nesting_mobile").style.display = "none";
    document.getElementById("flechmenuhamb").src = "images/down-arrow.png";
    despl_perfil_menu_hamburguesa=true;
  } 
  else{
    document.getElementById("menu_nesting_mobile").style.display = "grid";
    document.getElementById("flechmenuhamb").src = "images/left-arrow.png";
    despl_perfil_menu_hamburguesa=false;
  }
    
}

var menu=true;
function menuHamburguesa(){
  /*var menu_style=document.getElementById("aio12").style.display;*/
  if(menu==false){
    document.getElementById("menu_mobile").style.display ="none";
    document.getElementById("menu_img_hamb").src = "images/menu-regular-24.png";
    despl_perfil_menu_hamburguesa=false;
    desplPerfilMenuHamburguesa()
    menu=true;
  } 
  else{
    document.getElementById("menu_mobile").style.display ="flex";
    document.getElementById("menu_img_hamb").src = "images/menu-straight-25.png";
    menu=false;
  }
    
}

function openLogOut(){
  document.getElementById("logout").style.display = "block";
  menu=false;
  menuHamburguesa();
  despl_perfil=false;
  cambiarMenu();

  document.body.style.overflowY = "hidden";
}

function handle_logout(){
  document.getElementById("account-li-login").style.display="inline-block";
  document.getElementById("account-li-signup").style.display="inline-block";
  document.getElementById("profile-pic-header").style.display="none";
  document.getElementById("profile-menu-header").style.display="none";
  loginemail="";

  document.getElementById("menu_item_login").style.display="flex";
  document.getElementById("menu_item_signup").style.display="flex";
  document.getElementById("menu_item_profile").style.display="none";
  /* Ocultar chat header */
  document.getElementById("chat-header").style.display = "none";
  document.getElementById("chat-floating-button").style.display = "none";

  //Quitar corazones rojos y tal
  //Experiencias
  //OJOOOOOOOOOOOOOOOOOOOOOOOOOOOO
  cambiarMenu();
  closeChat();

  loggedInEmail = "";

  expCookies=getExpCookies();
  let texto = document.getElementById("ver-mas-experiencias").innerHTML;
  if (texto.includes("Ver")){
    buildInitialExperiences(expCookies);
  }
  else {
    buildTotalExperiences(expCookies);
  }

  closeForm();
}

/*Abrir more options*/
function openMoreOp(element) {
  var idTresPuntos = document.getElementById(element.id);
  document.getElementById("menu-ul"+idTresPuntos.id).style.display = "flex";
}
function closeMoreOp(element) {
  let idTresPuntos = document.getElementById(element.id);
  document.getElementById("menu-ul"+idTresPuntos.id.slice(13)).style.display = "none";
}
/*Para compartir*/
function openShare(element){
  document.getElementById("compartir-container").style.display = "flex";
  //Cierro todos los menús de opciones que hay
  let cerrarOut = document.getElementsByClassName("menu-ul").length;
  for(var i=0; i<cerrarOut; i++){
    document.getElementsByClassName("menu-ul")[i].style.display = "none";
  }
  let cerrar = document.getElementsByClassName("user-menu-ul").length;
  for(var i=0; i<cerrar; i++){
    document.getElementsByClassName("user-menu-ul")[i].style.display = "none";
  }
}

function closeShare(){
  ////console.log("entra");
  document.getElementById("compartir-container").style.display = "none";
  document.body.style.overflowY = "visible";
  if (document.getElementById("popup-grid-item").style.display == 'flex'){
    document.body.style.overflowY = "hidden";
  }
  if (document.getElementById("popup-user-item").style.display == 'flex'){
    document.body.style.overflowY = "hidden";
  }
}

/*Para las esperiencias*/
function openExp(element){
  let html=element.innerHTML.split("<");
  let user, title;
  for (var i=0; i<html.length; i++){
    if (html[i].indexOf("p>Por: ") == 0) {
      user= html[i].substring(7, html[i].length);
    }

    if (html[i].indexOf("h3>") == 0) {
      title= html[i].substring(3, html[i].length);
    }
  }

  if (document.getElementById("popup-user-item").style.display == "flex"){
    ////console.log("donde"+donde);
    if (donde == 'exp'){
      user = document.getElementById("user-username").innerHTML;
    }
    else {
      //Colaboraciones
      if (document.getElementById("colab-"+title)){
        user = document.getElementById("colab-"+title).innerHTML.slice(6);
      }
      else {
        //Colecciones
        for (var i=0; i<html.length; i++){
          if (html[i].includes("p> Por: ")) {
            user= html[i].slice(8);
          }
        }
      }
    }
  }

  if (document.getElementById("popup-myexp").style.display == "flex"){
    if (document.getElementById("tab-experiences-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
      user = document.getElementById("changeuser-username").innerHTML;
    }
    else {
      for (var i=0; i<html.length; i++){
        if (html[i].includes("p> Por: ")) {
          user= html[i].slice(8);
        }
      }
    }
  }

  //Para que se ponga bien delante siempre
  if (document.getElementById("popup-user-item").style.display == 'flex'){
    document.getElementById("popup-grid-item").style.zIndex = 110;
  }
  else {
    document.getElementById("popup-grid-item").style.zIndex = 100;
  }
  ////console.log(user);
  document.getElementById("popup-coleccion-item").style.zIndex = 90;
  document.body.style.overflowY = "hidden";
  fillPopupExp(user, title);
}

function closeExp(){
  mostrarMenos();
  document.getElementById("popup-grid-item").style.display = "none";
  document.body.style.overflowY = "visible";
  document.getElementById("popexp-like-icon").src="images/iconos/heart-regular-24.png";
  if (document.getElementById("popup-user-item").style.display == 'flex' || document.getElementById("popup-myexp").style.display == 'flex'){
    document.body.style.overflowY = "hidden";
  }
  document.getElementById("gallery-viewer").style.display="none";
  document.getElementById("user-menu-ul-container-id").style.display = "none";
  document.getElementById("popup-grid-item-content").style.overflowY = "auto";
}

function mostrarMas(){
  document.getElementById("exp-info-colaboradores").style.display = "flex";
  document.getElementById("exp-info-fecha").style.display = "flex";
  document.getElementById("mostrarmas").style.display = "none";
  document.getElementById("mostrarmenos").style.display = "flex";
  //Para los intereses
  document.getElementById("exptopic").style.display = "flex";
}
function mostrarMenos(){
  document.getElementById("exp-info-colaboradores").style.display = "none";
  document.getElementById("exp-info-fecha").style.display = "none";
  document.getElementById("mostrarmas").style.display = "flex";
  document.getElementById("mostrarmenos").style.display = "none";
  //Para los intereses
  document.getElementById("exptopic").style.display = "none";
}


//COSAS DE MI PERFIL Y EDITAR MI PERFIL
function openMyExp(){
  //var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  //var loggedinName = loggedinCookie.name;
  let username = '';
  users = getUsersCookies();
  for (let i = 0; i < users.length; i++){
    user = JSON.parse(users[i]);
    if (user.email == loginemail){
      username = user.username;
    }
  }

  // oculta scroll vertical del body
  document.body.style.overflowY = "hidden";
  fillPopupMyUser(username)
  mostrarMasMyUser();

  //document.getElementById("myexperiences-header-text").innerText = "Contenido de " + loggedinName;
  changeMyExperiencesState("tab-experiences-button");
}
function mostrarMasMyUser(){
  document.getElementById("myuser-info-surname").style.display = "flex";
  document.getElementById("myuser-info-birthdate").style.display = "flex";
  document.getElementById("myuser-info-email").style.display = "flex";
  document.getElementById("mostrarmasmyuser").style.display = "none";
  document.getElementById("mostrarmenosmyuser").style.display = "flex";
  //Para los intereses
  document.getElementById("myusertopic").style.display = "flex";
  ////console.log("abierto")
}
function mostrarMenosMyUser(){
  document.getElementById("myuser-info-surname").style.display = "none";
  document.getElementById("myuser-info-birthdate").style.display = "none";
  document.getElementById("myuser-info-email").style.display = "none";
  document.getElementById("mostrarmasmyuser").style.display = "flex";
  document.getElementById("mostrarmenosmyuser").style.display = "none";
  //Para los intereses
  document.getElementById("myusertopic").style.display = "none";
}

function fillPopupMyUser(username){
  ////console.log("entra en fillpopupMyuser");
  ////console.log(username);
  let users = getUsersCookies();
  for(var i=0; i<users.length; i++){
    user=JSON.parse(users[i]);
    if(user.username == username){
      if (user.photo == ''){
        document.getElementById("popmyuser-portada").src = "images/perfiles/user_azul.png";
      }else{
        document.getElementById("popmyuser-portada").src = "images/perfiles/" + user.photo;
      }
      document.getElementById("changeuser-username").innerHTML = user.username;
      document.getElementById("changename").value = user.name;
      document.getElementById("changelastname").value = user.lastname;
      document.getElementById("changebirthdate").value = user.birthdate;
      document.getElementById("email-myuser").innerHTML = user.email;
      document.getElementById("popmyuser-likes").innerHTML = user.likes;
      document.getElementById("popmyuser-public").innerHTML = user.experiences.length;

      //Para los intereses
      document.getElementById("myuserculture").checked=user.culture;
      document.getElementById("myusernature").checked=user.nature;
      document.getElementById("myusergastronomy").checked=user.gastronomy;
      document.getElementById("myuserhistory").checked=user.history;
      document.getElementById("myuserbusiness").checked=user.business;
      document.getElementById("myusersports").checked=user.sports;
    }
  }
  //Para que se abra directamente en experiencias
  /*document.getElementById("selector-experiencias").style.background = "#483d8b";
  document.getElementById("selector-colecciones").style.background = "#000073";
  document.getElementById("selector-colecciones").style.borderTopLeftRadius = "20px";
  document.getElementById("selector-colecciones").style.borderBottomLeftRadius = "20px";
  document.getElementById("selector-colaboraciones").style.background = "#000073";
  document.getElementById("selector-colaboraciones").style.borderTopRightRadius = "20px";
  document.getElementById("selector-colaboraciones").style.borderBottomRightRadius = "20px";
  fillPopupUserExperience(document.getElementById("email-user").innerHTML);*/

  document.getElementById("popup-myexp").style.display = "flex";
}

function closeMyExp(){
  ////console.log(document.getElementById("myexperiences-grid"));
  /*if(document.getElementById("experience-form").style.display == "block"){
    openMyExp();
    document.getElementById("experience-form").style.display = "none"
    document.getElementById("myexperiences-grid").style.display = "grid";
  } else {*/
  document.getElementById("popup-myexp").style.display = "none";
  // recupera el scroll vertical
  document.body.style.overflowY = "visible";
  document.getElementById("confirm-delete-experience").style.display = "none";
  
    //Todavia no se que son estas cosas OJOOOOOOOOOOOOOOOOOO
  /*closeConfirmDelete();
  if(deleting){
    allowDelete();
  }
  reset_red();*/
}


function modifyProfile(){
  document.getElementById("change-profile-form").style.display = "flex";
  profileInfo();
  document.getElementById("myprofile").style.display = "none";
}


function openMyProfile(){
  /*document.getElementById("popup-myprofile").style.display = "flex";
  menuHamburguesa();
  cambiarMenu();

  var username = document.getElementById("username-menu").innerText;
  username = username.charAt(0).toUpperCase() + username.slice(1);
  document.getElementById("myexp-header-title").innerHTML = "<h2>" + username + "'s experiences</h2>";

  document.body.style.overflowY = "hidden";*/

  //Busco el usuario que es mirando su correo
  let username = '';
  users = getUsersCookies();
  for (let i = 0; i < users.length; i++){
    user = JSON.parse(users[i]);
    if (user.email == loginemail){
      username = user.username;
    }
  }

  mostrarMasUser();
  fillPopupUser(username);
  document.body.style.overflowY = "hidden";
}

function closeMyProfile(){
  ////console.log(document.getElementById("myexperiences-grid"));
  if(document.getElementById("change-profile-form").style.display == "flex"){
    document.getElementById("change-profile-form").style.display = "none"
    document.getElementById("popup-myprofile").style.display = "flex";
    document.getElementById("myprofile").style.display = "block";
  } else {
    document.getElementById("popup-myprofile").style.display = "none";
    document.body.style.overflowY = "visible";
  }
  resetChanges();
}

function saveChanges(){
  content = Array.from(document.querySelectorAll('#change-profile-form input'));
  result = {};
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      ////console.log(element);
      if (element.type != "checkbox"){
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        document.getElementById(errorMessage).style.visibility = "hidden";
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  // recorrer todos los intereses y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('changetopic'));
  content.forEach(changeint => {
    ////console.log(changeint.type);
    if(changeint.type == "checkbox"){
      result[changeint.id] = changeint.checked;
    }
  });
  
  ////console.log(result);
  var validated = true
  /* RELLENAR CON LLAMADAS A MÉTODOS DE VALIDACIÓN */
  if(!validateNameChange(result.changename)){
    ////console.log("Invalid name");
    document.getElementById("changename").style.border = "2px solid red";
    document.getElementById("error-changename").style.visibility = "visible";
    validated = false;
  }
  if(!validateLastnameChange(result.changelastname)){
    ////console.log("Invalid lastname");
    document.getElementById("changelastname").style.border = "2px solid red";
    document.getElementById("error-changelastname").style.visibility = "visible";
    validated = false;
  }
  if(!validateBirthdateChange(result.changebirthdate)){
    ////console.log("Invalid birthdate");
    document.getElementById("changebirthdate").style.border = "2px solid red";
    document.getElementById("error-changebirthdate").style.visibility = "visible";
    validated = false;
  }
  //OJOOOOOOOOOOOOOOOOOOO lo debería hacer en un futuro si eso
  /*
  if(!validatePhoto(result.changephoto)){
    //console.log("Invalid photo");
    document.getElementById("error-changephoto").innerText = "Please enter an image file";
    document.getElementById("changephoto").style.border = "2px solid red";
    document.getElementById("error-changephoto").style.visibility = "visible";
    validated = false;
  }*/
  
  if(validated){
    ////console.log(result)
    userCookie = getCookie(loginemail);
    userInfo = JSON.parse(userCookie);
    
    userInfo.name = result.changename;
    userInfo.lastname = result.changelastname;
    userInfo.birthdate = result.changebirthdate;
    
    userInfo.culture=result.myuserculture;
    userInfo.nature=result.myusernature;
    userInfo.gastronomy=result.myusergastronomy;
    userInfo.business=result.myuserbusiness;
    userInfo.history=result.myuserhistory;
    userInfo.sports=result.myusersports;

    setCookie(userInfo.email, JSON.stringify(userInfo), 10);
    ////console.log("todo ok guardado")
    
    document.getElementById("snackbarbody").style.display="block";
    document.getElementById("snackbarbody").innerHTML = "Cambios guardados"
    setTimeout(function() {
      document.getElementById("snackbarbody").style.display="none";},2000);
      
    closeMyExp();
  }
}

function resetChanges(){
  /*Reset de nombre*/
  document.getElementById("changeusername").style.border='';
  document.getElementById("error-usernamechange").style.visibility = "hidden";
  document.getElementById("error-changephoto").style.visibility = "hidden";
  document.getElementById("changephoto").style.border='';

  /*Reset intereses*/
  document.getElementById("change-profile-form").reset();
}

function profileInfo(){
  // para bajar complejidad haz el parse una vez
 
  
  userCookie = getCookie(loginemail);
  userInfo = JSON.parse(userCookie);
  //Ponemos la foto de perfil por defecto
  /*if(userCookie.photo=""){
    document.getElementById("myphoto_mymenu").src="images/user_account.png";
  } else {
    // debería cargar la foto del usuario con una llamada a un servidor con la imagen guardada 
    //pero con las cookies no se puede implementar
    //document.getElementById("myphoto_mymenu").src=userInfo.photo;
    //document.getElementById("myphoto_mymenu").src="images/user_account.png";
  }*/


  document.getElementById("username-mob").textContent = userInfo.username;
  document.getElementById("username-menu").textContent = userInfo.username;
  /*document.getElementById("myusername").innerHTML="Username:         ".bold()+userInfo.username;
  document.getElementById("myname").innerHTML = "Name:         ".bold()+userInfo.name;
  document.getElementById("mylastname").innerHTML ="Lastname:         ".bold()+userInfo.lastname;
  document.getElementById("myemail").innerHTML = "Email: \t".bold()+userInfo.email;*/
  /* document.getElementById("myhistory").checked= userInfo.history; */
  
  /*document.getElementById("myculture").checked=userInfo.culture;
  document.getElementById("mynature").checked=userInfo.nature;
  document.getElementById("mygastronomy").checked=userInfo.gastronomy;
  document.getElementById("myhistory").checked=userInfo.history;
  document.getElementById("mybusiness").checked=userInfo.business;
  document.getElementById("mysports").checked=userInfo.sports;
  document.getElementById("myculture").disabled=true;
  document.getElementById("mynature").disabled=true;
  document.getElementById("mygastronomy").disabled=true;
  document.getElementById("myhistory").disabled=true;
  document.getElementById("mybusiness").disabled=true;
  document.getElementById("mysports").disabled=true;*/

  //Change profile info:
  /*document.getElementById("changeusername").value=userInfo.username;
  document.getElementById("changeculture").checked=userInfo.culture;
  document.getElementById("changenature").checked=userInfo.nature;
  document.getElementById("changegastronomy").checked=userInfo.gastronomy;
  document.getElementById("changehistory").checked=userInfo.history;
  document.getElementById("changebusiness").checked=userInfo.business;
  document.getElementById("changesports").checked=userInfo.sports;*/
}


function Home(){
  document.getElementById("menu_nesting").style.display ="none";
  document.getElementById("flechmenu").src = "images/down-arrow.png";
  document.getElementById("menu_mobile").style.display ="none";
  document.getElementById("menu_img_hamb").src = "images/menu-regular-24.png";
}
/* COOKIES */

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=Lax; Secure";
}

function writeComment(){
  document.getElementById("comment-reset").style.display ="flex";
  document.getElementById("comment-save").style.display ="flex";
}

/*function desplegarComentario(element){

  var comentarios=document.getElementsByClassName("comentario");
  if(element.src.includes("right")){
    for(var i=0, len=comentarios.length; i<len; i++){
      comentarios[i].style.display="flex";
    }
    document.getElementById("comment-arrow").src = "images/iconos/chevron-down-regular-24.png"; 
  }else{
    for(var i=0, len=comentarios.length; i<len; i++){
      comentarios[i].style.display="none";
    }
    document.getElementById("comment-arrow").src = "images/iconos/chevron-right-regular-24.png";
  }

}*/

//PRUEBA EXPERIENCIAS
var data = [
  {
    pathpic: "images/experiences/1-Madrid/",
    title: 'Un día en Madrid',
    creador: 'BlancaM',
    colaborador: '',
    fecha: '2020-08-10',
    descripcion: 'Arrancamos en la Puerta del Sol, centro de Madrid. Pasea por la plaza y no olvides fotografiarte junto al Oso y el Madroño, uno de los símbolos de la ciudad. Después dirige tus pasos a la calle Arenal y busca la chocolatería San Ginés donde puedes desayunar el más castizo chocolate con churros. Para bajar el desayuno camina hasta el Teatro Real, rodéalo y descubrirás el Palacio Real junto con la Catedral de la Almudena. Déjate seducir por este conjunto arquitectónico único en el mundo. Puedes visitar el interior del Palacio, los Jardines Sabatini o el Campo del Moro. Por la calle Mayor nos adentramos en el Madrid de los Austrias. Aquí no puedes dejar de visitar la Plaza Mayor y degustar un aperitivo: ¿qué tal una caña y un bocadillo de calamares sentado en una de sus terrazas? Después échale un vistazo a las tiendas de sellos y monedas que hay por los alrededores, a lo mejor encuentras algún tesoro… Sal de la Plaza por el Arco de Cuchilleros y piérdete entre las estrechas calles de esta zona.Hora de comer. No te pierdas un magnífico cocido madrileño en uno de los restaurantes tradicionales del centro: La Bola, Taberna Daniela, Casa Ciriaco, Casa Marta, Casa Labra, Lhardy, La Taberna del Alabardero… ¡¡Atrévete con sus especialidades!!',
    transporte: 'El metro es la forma más rápida y barata de moverse por Madrid, además con su extensa red de metro puedes llegar a cualquier lugar. Si no, el bus también es una buena opción. Queda totlamente prohibido alquilar un coche. No estás preparado para conducir por el centro.',
    presupuesto: 'En torno a los 40 €/persona, nada caro para pasar un día en la Capital de España.',
    alojamiento: 'Al pasar solo un día no necesitamos alojamiento.',
    gasto: 40,
    likes: 3,
    comments: [
      {
        username: "Joao46",
        date: "2020-10-10",
        content: "Fala galera! Ojalá poder comer un cocidinho.",
        replay: []
      }
    ],
    culture: true,
    history: true,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    gallery: ["madrid.jpg","madrid1.jpg", "madrid2.jpg", "madrid3.jpg", "madrid4.jpg","madrid5.jpg"]
  },
  

  {
    pathpic: "images/experiences/2-Paris/",
    title: 'París en 48 horas',
    creador: 'Menchh',
    colaborador: 'Mari17ng',
    fecha: '2021-11-20',
    descripcion: 'Para empezar bien la visita nada mejor que visitar la Torre Eiffel, el símbolo de París. La mejor impresión la tendréis llegando en metro a la parada Trocadero, desde donde se aprecia la magnitud de la torre y los Campos de Marte, el jardín donde se asienta. Bajando por el Trocadero llegaréis a la base de la Torre Eiffel, donde se encuentran las taquillas para acceder a la misma. Hay diferentes billetes para subir a distintas alturas, recomendamos animarse y subir a la tercera planta, donde se encuentra el mirador más elevado. Después de la visita podéis dirigiros al Barrio Latino, uno de los lugares más animados y económicos para cenar. Tenéis que tomar el RER en Champs de Mars – Tour Eiffel y bajaros en Saint-Michel – Notre Dame. Desde el momento en que bajéis del tren sabréis adonde dirigiros. Después de cenar podéis tomar una copa por la zona o dar un paseo para ver los monumentos iluminados. Cruzando a la Île de la Cité desde el Barrio Latino por cualquiera de los puentes del Sena llegaréis a Notre Dame. Si cruzáis la isla apareceréis en el Hotel de Ville, el ayuntamiento de París.',
    transporte: 'Si quieres llegar a París en avíon puedes elegir entre tres aeropuertos: Charles de Gaulle, Orly y Beauveais. Orly tal vez sea el más cómodo y más cercano al centro, mientras que Beauvais es en el que operan más compañías de bajo coste aunque es el más apartado.',
    presupuesto: 'Bien es sabido por todos que París es una de las ciudades más caras de Europa. Así que si quieres tener un viaje barato este no es tu lugar. Ya solo en el billete de avión te puede gastar 200€, más otros 200 de la noche de hotel y los gastos del día a día te puede salir por unos 600€',
    alojamiento: 'La zona de Faubourg Saint Germain, donde especialmente se encuentra la Torre Eiffel y el Champ-de-Mars, está situada en el 7mo distrito de Paris, cerca de Invalides y de la Quai d’Orsay. A veces conocida como la zona de Ministerios, es una de las zonas más chics y prestigiosas de la ciudad. Si buscas dónde dormir en el centro un fin de semana en París, es el lugar ideal, ya que podrás conocer muchas atracciones en poco tiempo.'
    +"<br>"+ 'Yo elegí el hotel Saint Germain que está a 5 minutos andando de la Torre Eiffel.  El establecimiento ofrece habitaciones modernas en un ambiente sobrio y elegante a partir de 280€ la noche. Lo mejor: el personal es muy atento, los salones ofrecen un ambiente tranquilo para relajarse, el desayuno.',
    gasto: 600,
    likes: 5,
    comments: [
    ],
    culture: true,
    history: true,
    nature: false,
    business: false,
    gastronomy: true,
    sports: false,
    gallery: ["paris.png","paris1.jpg","paris2.jpg","paris3.jpg","paris4.jpg","paris5.jpg"] 
  },
  
  
  {
    pathpic: "images/experiences/3-Barcelona/",
    title: 'La Barcelona de Gaudí',
    creador: 'Mari17ng',
    colaborador: '',
    fecha: '2021-04-29',
    descripcion: 'Antoni Gaudí posiblemente haya sido el arquitecto más revolucionario del modernismo y de la arquitectura en general. En su larga trayectoria, diseñó y construyó algunos de los edificios más llamativos y cómodos para vivir, empleando innovadoras soluciones, siempre basadas en lo más elemental: la naturaleza. Muchas de sus obras, que son más que edificios, podemos encontrarlas en Barcelona, ciudad donde el modernismo tiene una intensa presencia. Las principales obras de Gaudí que podemos visitar están en el barrio de Gracia, cuna del modernismo.'
    +"<br>"+ 'No os podéis perder: La sagrada Familia, La cripta de la Colonia Güell, La Casa Milá, El Park Güell, La Casa Batlló, El Palacio Güell, La Torre Bellesguard entre otras.',
    transporte: 'En Barcelona conviven metro autobús y tranvía, haciendo la movilidad por la ciudad súper fácil. También tiene las llamadas Golondrinas, que son barcos turísticos que realizan pequeñas travesías para mostrar el litoral.',
    presupuesto: 'Os sorprenderá pero en Barcelona todo es de pago, por lo que preparad los bolsillos si queréis ver las obras de Gaudí. Depende de los qu veáis será más caro, pero más de 40€ seguro',
    alojamiento: 'Para contrarrestar el precio de las entradas a los edificios y museos, me alojé en el hostal St Christophers Inn que se encunetra en pleno precio y por solo 10€ la noche.',
    gasto:50,
    likes: 3,
    comments: [
    ],
    culture: true,
    history: false,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    gallery: ["barcelona.png","barcelona1.jpg","barcelona2.jpg","barcelona3.jpg","barcelona4.jpg","barcelona5.jpg"]  
  },

  {
    pathpic: "images/experiences/4-Roma/",
    title: 'Roma antigua',
    creador: 'BlancaM',
    colaborador: '',
    fecha: '2021-05-18',
    descripcion: 'Os voy a contar los 4 monumentos del Imperio Romano imprescindibles de visitar en un viaje a Roma. Comenzaremos con el Foro romano: dejate llevar por el disfrute de unos restos arquitectónicos testigos de la inmensa grandeza de una soberbia civilización, que esculpió el destino de occidente. Y que si no hubiera existido nuestra vida actual se parecería tanto a lo que es hoy en día, como un saltamontes a un elefante.'
    +"<br>"+'El Coliseo: El edificio se empezó a construir en el 71 d.c. sobre los restos de un anfiteatro anterior, y en un tiempo récord de nueve años se concluyó, por lo que Tito pudo inaugurarlo con unas fiestas que duraron 100 días. (Os imagináis 100 días de San Fermín). En el 82 d.C. Domiciano añadió un piso adicional. Con cinco niveles que se distribuían según el rango social, los lugares más cercanos a la arena los ocupan las clase más altas.'
    +"<br>"+'El Panteón de Agripa:Un icono no solo de Roma sino de la historia de la arquitectura. Construido por Adriano en el año 80 d.C. sobre un panteón del tiempo de Agripa, la mano derecha de Octavio Augusto. El nuevo templo se dedico a su memoria y fue ejecutado por Apolodoro de Damasco.'
    +"<br>"+'La boca della Verita:  Cono casi todo en Roma tiene una leyenda. La Bocca Della Verita, viene siendo un antiguo polígrafo detector de mentiras, de manera que quien introduce su mano en la boca de la misma y se le interroga acerca de algo, ya puede decir la verdad pues de lo contrario perderá la mano.',
    transporte: 'En Roma no hace falta nada de transporte público, puedes llegar andando a todos los sitios. Eso sí, si no estas muy entrenado acabarás con agujetas, sobre todo por el pavimento que casi no ha cambiado de la época del Imperio Romano. Es increíble.',
    presupuesto: 'Para entrar al Panteon o ver la Boca della Verita no es necesario entrada y es completamente gratuito. Por el contrario el Coliseoy el Fro son de pago. Te recomiendo que compres el bono que inclyen el Coliseo, el Foro y el Palacio Palatino que solo cuesta 22€.',
    alojamiento: 'Acabé reservando a través de Booking una casita con vistas a la Plaza España y sus famosas escaleras. Era increíble levantarse cada mañana y ver tan preciosa imagen. Aunque puede que no sea apta para todos los bolsillos, ya que costaba 250€ por noche. Menos mal que solo me quedé 2! Personalmente recomiendo que busquéis algo más barato porque no merece la pena dejarse ese dineral.',
    gasto:450,
    likes: 0,
    comments: [
    ],
    culture: true,
    history: true,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    gallery: ["rome.png","rome1.jpg","rome2.jpg","rome3.jpg","rome4.jpg","rome5.jpg"] 
  },

  {
    pathpic: "images/experiences/5-Londres/",
    title: 'Visitar el Big Ben, Londres',
    creador: 'BigRaiko',
    colaborador: '',
    fecha: '2021-10-12',
    descripcion: 'La Torre del Reloj del Parlamento de Londres fue construida como parte del diseño de un nuevo palacio que se inició después de que el antiguo Palacio de Westminster quedara destruido por un incendio la noche en octubre de 1834. Así, tanto el Parlamento como la torre fueron construidos en estilo neogótico a mediados del siglo XIX. Aunque hay que decir que la torre del reloj se ha conservado estupendamente a pesar de los años y las guerras que pesan a sus espaldas, desde hace diez años la torre comenzó a inclinarse debido a la construcción de nuevas líneas de Metro. Se dice que el Big Ben se ha inclinado una media de 1 mm al año y que la inclinación ya es perceptible a la vista.'
    +"<br>"+'Una vez dicha un poco de historia, voy a quejarme. ¿Cuándo van a terminar lo que estén haciendo? Llevo desde 2019 postponiendo este viaje, a ver si terminaban y dejaban la torre visibe, pero nada. Una vergüenza.',
    transporte: 'Se puede llegar fácilmente en metro por las líneas District y Jubilee. Por lo menos el metro si funcionaba bien. Como alternativa seguro que puedes coger alguno de los famosos double-decker.',
    presupuesto: 'Londres es cara, todos lo sabemos, pero el precio exacto de entrar al Big Ben no lo se porque no pude entrar por las obras. Aunque me dijeron que valía 20 Libras Esterlinas o Pounds como le dicen aquí.',
    alojamiento: 'No os puedo decir nada, me alojé en casa de mi amigo Gordon.',
    gasto: 25,
    likes: 0,
    comments: [
    ],
    culture: true,
    history: false,
    nature: false,
    business: false,
    gastronomy: true,
    sports: false,
    gallery: ["london.png","london1.jpg","london2.jpg","london3.jpg","london4.jpg","london5.jpg"] 
   
  },

  {
    pathpic: "images/experiences/6-Lisboa/",
    title: 'Turismo en Lisboa',
    creador: 'Joao46',
    colaborador: '',
    fecha: '2021-07-15',
    descripcion: 'Fala galera! Os voy a contar que ver en mi ciudad natal, Lisboa.La capital portuguesa vive entre siete colinas y la desembocadura del Tajo, enamorando a los viajeros que exploran sus barrios embriagados por el ambiente nostálgico y a la vez animado que se respira. Descubre qué ver en Lisboa y sus alrededores y disfruta al máximo de tu estancia en una ciudad única. Lisboa es una ciudad muy especial. Además de los impresionantes monumentos que recuerdan los tiempos del imperio portugués, uno de sus grandes encantos es explorar sus barrios. Por ello, una de las mejores cosas que hacer en Lisboa es mezclarse con los locales y recorrer sus calles para disfrutar de sus lugares turísticos más famosos como un portugués más. Si quieres más informaçao, llamame al +351 210201683.',
    transporte: 'Lisboa esta llena de cuestas, por lo que te va a tocar darle duro a esas piernas. Si te cansas siempre puedes coger uno de los míticos tranvías de la ciudad. A pesar de ser casi tan viejos como yo siguen funcionando genial y es una gran atracción turística.', 
    presupuesto: 'Lisboa al estar en Portugal no es tan cara como podría serlo París o Londres. Eu penso que con 100€ puedes pasar aquí un fin de semana muy agradable',
    alojamiento: 'No conozco mucho los hoteles de la zona, pero tengo amigos que me han dicho que en el Hotel Munidal es barato y está en el centro de la ciudad. Si no tienes sitio dónde alojarte, puedes preguntarme y te hago un hueco en mi casa. Obrigado.',
    gasto: 100,
    likes: 5,
    comments: [
    ],
    culture: true,
    history: true,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    gallery: ["lisbon.png","lisbon1.jpg","lisbon2.jpg","lisbon3.jpg","lisbon4.jpg","lisbon5.jpg"]
  },

  {
    pathpic: "images/experiences/7-Llanes/",
    title: 'Playas en Llanes',
    creador: 'BigRaiko',
    colaborador: 'Menchh',
    fecha: '2020-06-22',
    descripcion: 'Llanes es el municipio asturiano que cuenta con un mayor número de playas (más de 30 playas), repartidas a lo largo de los 56 kilómetros que ocupa la línea costera. En cuanto a la variedad, la zona alberga playas para todos los gustos: urbanas y concurridas, naturales y poco visitadas, grandes o pequeñas, abiertas o cerradas, al abrigo o expuestas a los vientos, con río o sin río, de arenas o de cantos, etc. Llanes cuenta con dos playas certificadas con la Q de calidad, las playas de Toró en Llanes y Palombina-Las Cámaras en Celorio. Aproximadamente cada doce horas se produce un ciclo completo de marea, por lo cual en cada jornada ocurren dos bajamares y dos pleamares. La diferencia de cotas de nivel marino entre una bajamar y una pleamar oscila entre 4 metros en las mareas vivas (coincidentes con días de luna llena y luna nueva) y 1,5 metros de mareas muertas (coincidentes con días de luna creciente y luna menguante).',
    transporte: 'En coche, por la autovía A-8 y la carretera N-634.',
    presupuesto: 'Lo único que puedes gastar ese gasolina para moverte por allí, así que diré que unos 30€.',
    alojamiento: 'No conozco porque yo siempre me quedo en mi casa de allí.',
    gasto:30,
    likes: 2,
    comments: [
    ],
    culture: false,
    history: false,
    nature: true,
    business: false,
    gastronomy: true,
    sports: true,
    gallery: ["llanes.png", "llanes1.jpg", "llanes2.jpg", "llanes3.jpg", "llanes4.jpg", "llanes5.jpg"]
  },

  {
    pathpic: "images/experiences/8-Viena/",
    title: 'Viena y sus palacios',
    creador: 'CarlossBuche',
    colaborador: '',
    fecha: '2021-08-06',
    descripcion:'Es cierto que existen numerosos monumentos en Viena que debemos visitar, y que además se encuentran más céntricos que el palacio de Schönbrunn. Es el caso del Palacio Imperial de Hofburg, el Museo de Historia del Arte o la catedral. Sin embargo, alejarse del centro de la ciudad para recorrer los jardines y el interior de Schonbrunn, sin duda alguna, merecerá la pena. El encanto de este palacio no tiene comparación. Junto con lugares como Versalles, el palacio de Schonbrunn es considerado como una de las construcciones barrocas más impresionantes y más bellas de Europa. Por ello, es visita indispensable en la capital austriaca. La esposa de Fernando II, Leonor Gonzaga, fue la que bautizó este lugar como Shonbrunn, que significa fuente bonita. La razón es que los jardines del recinto estaban decorados con fuentes y preciosas estatuas. En lo que se refiere al palacio, fue otra mujer la que tendría un protagonismo indiscutible. Ya la hemos mencionado. María Teresa de Austria sería quien ordenara una reforma y ampliación de la construcción para convertirla en un espacio majestuoso. Así se levantaron magníficas salas, como la Gran Galería, uno de los lugares del palacio donde podemos contemplar el verdadero esplendor del rococó en Viena. Hoy están abiertas al público 40 de las 200 estancias del monumento. Visitarlas nos permite acercarnos a la vida de la dinastía de los Habsburgo.',
    transporte: 'En trasnporte público se puede llegar fácilmente. Puedes ir en metro, con la línea 14 hasta la estación Schönbrunn. En tranvía con la línea 10 y 58. Y en bús cogiendo la líena 10A. Yo fui en tren y tardé unos 40 minutos desde el centro de Viena.',
    presupuesto: 'Aquí os dejo un listado de los precios de las entradas:'
    +"<br>"+'Grand Tour: Adultos: 20 €, de 6 a 18 años: 13 €'
    +"<br>"+ 'Imperial Tour: Adultos: 16 €, de 6 a 18 años: 11,50 €'
    +"<br>"+ 'Laberinto: Adultos: 6 €, de 6 a 18 años: 3,50 €'
    +"<br>"+ 'Glorieta: Adultos: 4,50 €, de 6 a 18 años: 3,20 €'
    +"<br>"+ 'Acceso gratuito con Vienna Pass.',
    alojamiento: 'Eso os lo contaré en otra experiencia sobre el viaje de Viena en general.',
    gasto: 25,
    likes: 3,
    comments: [
    ],
    culture: true,
    history: true,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    gallery: ["viena.png","viena1.jpg","viena2.jpg","viena3.jpg","viena4.jpg","viena5.jpg"]
  },

  {
    pathpic: "images/experiences/9-Caravana/",
    title: 'Caravana por el norte de España',
    creador: 'Juli08',
    colaborador: '',
    fecha: '2021-07-02',
    descripcion: 'En este caso, la ruta que hice con mi caravana Kombi t1 del 66 es la frontera vascofrancesa. Esta ruta se inicia desde Biarritz. Para los amantes del mar y del surf, es un destino perfecto porque es uno de los lugares más famosos para practicar este deporte en Francia. A nivel arquitectónico, sorprenden las casas burguesas y las mansiones frente al mar. El siguiente paso es ir a San Juan de Luz, a unos 30 km, un pueblecito en una tranquila bahía perfecta relajarse, tanto si vas con niños, como si no. Si te gustan las historias y profundizar en los lugares que visitas, este es el lugar perfecto porque muchas leyendas de corsarios o piratas vascos transcurren allí. La siguiente parada es Hendaya, donde podrás descansar, y disfrutar del mar. Es un lugar muy preparado para viajar en caravana. Es hora de pasar a España, donde podrás adentrarte en uno de los pueblos más bonitos del País Vasco: Hondarribia. Un paraíso para los amantes de la gastronomía, seguido de Mundaka, un pequeño pueblo en el interior de la espectacular Reserva de la Biosfera del Urdaibai, otro lugar donde el surf es más un estilo de vida que un deporte. También puedes ir por Lekeitio, un pueblo pesquero que se  encuentra junto a la desembocadura del río Lea. Si, quieres terminar tu viaje con algo de ciudad, Bilbao está a menos de una hora y San Sebastián, a una hora y 20 minutos.',
    transporte: 'Que apartado más tonto para este viaje. Medio de transporte fundamental: ¡LA CARAVANA!',
    presupuesto: 'Lo que te gastes en gasolina y en comidas. Yo lo hice por unos 200€',
    alojamiento: 'Otra vez igual, dormía en mi casa andante.',
    gasto:200,
    likes: 4,
    comments: [
      {
        username: "CarlossBuche",
        date: "2021-09-10",
        content: "Julián, no me gusta tu manera de expresarte. Porque no se pueden dar dislikes que si no...",
        replay: []
      }
    ],
    culture: false,
    history: false,
    nature: true,
    business: false,
    gastronomy: true,
    sports: false,
    gallery: ["caravana.png","caravana1.jpg","caravana2.jpg","caravana3.jpg","caravana4.jpg","caravana5.jpg"]
  },

  {
    pathpic: "images/experiences/10-Paella/",
    title: 'Mejor paella de Valencia',
    creador: 'Juli08',
    colaborador: '',
    fecha: '2021-08-19',
    descripcion: 'La semana pasada fui a comer con mi familia a la mejor arrocería de toda la Comunidad Valenciana. Se trata de la arrocería Terra i Mar, en Carrer de ciscar 57. Yo como siempre me pedí la la paella señoret, lleva siendo mi favorita desde bien pequeñito. Aunque existe una gran variedad de arroces y paellas, como pueden ser el arroz negro, paella de marisoc, de carne, mixta. Siempre acabamos llenísimos ya que son bastante generosos con las raciones. Sobre todo Juanma, no dudéis en preguntar por él para que os aconseje y os ayude a elegir.',
    transporte: 'Yo fui en coche. Además en esa zona se encuentra aparcamiento fácilmente.',
    presupuesto: 'En comparación con el resto igual es un poco caro, sobre 25€ el plato, pero merece la pena. No os arrepentiréis.',
    alojamiento: '-',
    gasto:25,
    likes: 1,
    comments: [
    ],
    culture: false,
    history: false,
    nature: false,
    business: false,
    gastronomy: true,
    sports: false,
    gallery: ["paella.png","paella1.jpg","paella2.jpg","paella3.jpg","paella4.jpg","paella5.jpg"]
  },

  {
    pathpic: "images/experiences/11-Milan/",
    title: 'Milán, ciudad de la moda',
    creador: 'BlancaM',
    colaborador: '',
    fecha: '2020-10-10',
    descripcion: 'Milán es conocida ante todo como la capital italiana -e internacional- de la moda. La ciudad alberga innumerables boutiques -que venden joyas, decoración y, por supuesto, las marcas de moda más solicitadas- en su Quadrilatero d oro della moda o Cuadrilátero de la Moda. El distrito está rodeado por cuatro vías principales: Via Monte Napoleone, Via Alessandro Manzoni, Via della Spiga y Corso Venezia. Las tiendas y salas de exposición de estas calles hacen que una compra o un simple vistazo a los escaparates motive a la moda a llegar en tropel desde todo el mundo.Los turistas que recorren el barrio del Quadrilatero pueden experimentar el verdadero ambiente de la capital lombarda, observando las luces, los colores y la elegancia de los distintos ateliers. También podrá observar la interminable sucesión de esos nombres clásicos e internacionales que ya forman parte de un club al que no pueden acceder otras casas de moda: piense en Armani, Versace, Alberta Ferretti, Dolce & Gabbana, Prada, Fendi, Louis Vuitton, Chanel, Bottega Veneta, Gucci, Bulgari, Cartier, Valentino y Gianfranco Ferrè.',
    transporte: 'Principalmente hay que moverse andando para recorrer todas las tiednas y poder ver todos los escaparates, sobre todos en las galerias Vittorio Emanuelle II.',
    presupuesto: 'Todo depende de lo que te compres y estes dispuesto a gastar. Mirar es gratis, pero si eres un apasionado de la moda como yo, y no te fijas en el precio, podrás dejarte una buena fortuna.',
    alojamiento: 'Lo mejor es alojarte cera de la zona de las tiendas, cuanto más cerca del cuadrilátero de la moda más podrás ver y empaparte de lo que significa realmente la moda en Milán',
    gasto:0,
    likes: 0,
    comments: [
    ],
    culture: true,
    history: false,
    nature: false,
    business: true,
    gastronomy: false,
    sports: false,
    gallery: ["galeria-milan.png","milan1.jpg","milan2.jpg","milan3.jpg","milan4.jpg","milan5.jpg"]
  },

  {
    pathpic: "images/experiences/12-Arenal/",
    title: 'Arenal Sound',
    creador: 'CarlossBuche',
    colaborador: 'Menchh BigRaiko Mari17ng',
    fecha: '2019-09-01',
    descripcion: 'La experiencia ha sido única, genial. Hemos disfrutado muchísimo además contaba con una cartel bastante bueno. La unicas pegas que pongo son que los baños portátiles del camping (aunque había un servicio de aseos VIP de pago) pues no eran nada limpios y tenias que ir a un bar o un restaurante para poder ir al aseo en condiciones. Luego el tema del camping Arenal B había demasiada suciedad, más que nada porque es de tierra y todo se mancha, contra eso no se puede hacer nada. Y el camping está sobremasificado, casi no cabíamos todos y para llegar a tu tienda había que hacer malabares. Finalmente que el precio de la bebida en el interior de los recintos era caro. Aún así, ha sido algo único y 100 recomendable. Se puede sobrevivir sin problemas',
    transporte: 'Llegar hasta allí es un coñazo, sobre todo para nosotros que cuando fuimos ninguno tenía carnet. Menos mal que el propio arenal pone buses en Madrid que te llevan directamente a la entrada del festival.',
    presupuesto: 'Es barato, ya que solo tienes que pagar la entrada al festival y el camping. Luego comer por allí tampoco es muy caro.',
    alojamiento: 'Tienes dos opciones, el camping del arenal que está al lado de la zona de conciertos, o el camping malvarrosa. Otra opción es alquilar un piso, pero te pierdes toda la gracia del camping. Personalmente recomiendo escoger el camping del arenal, aunque sea un poco más caro.',
    gasto:80,
    likes: 4,
    comments: [
      {
        username: "Mari17ng",
        date: "2019-09-15",
        content: "Fue increible! Ojalá repetir pronto.",
        replay: [
          {
            username: 'BigRaiko',
            date: '2019-09-20',
            content: 'Menos mal que no me lo perdí!!!!'
          }
        ]
      },
      {
        username: "Menchh",
        date: "2019-09-17",
        content: "Yavesss! Siuuuu.",
        replay: []
      }
    ],
    culture: false,
    history: false,
    nature: false,
    business: false,
    gastronomy: false,
    sports: true,
    gallery: ["arenal.png","arenal1.jpg","arenal2.jpg","arenal3.jpg","arenal4.jpg","arenal5.jpg"]
  },

  {
    pathpic: "images/experiences/13-Oasiz/",
    title: 'Oasiz',
    creador: 'Mari17ng',
    colaborador: 'CarlossBuche',
    fecha: '2021-12-04',
    descripcion: 'El otro día fui al reién abierto centro comercial Oasiz en Torrejón de Ardoz. Es el centro comercial más grande de Madrid. Llegué allí y ya era de noche, así que todo estaba iluminado como correpsonde en este época del año, con sus bonnitas luces de navidad. El sitio es muy chulo, con sus tiendas y sus restaurantes. Además cuenta con un lago en el que hacen algín espectáculo de agua y luces y una peuqeña playa que de moemtno permanece cerrada. Está muy bien para niños pequeños con muchas cosas que hacer y múltiples ocpciones para jugar. Incluso hay una tirolina que cruza el centro comercial de lado a lado. Yo que vivo por aquí cerca llevo años viendo como decían que se iba a abrir, mas o menos desde el 2015. Debo decir qu ela espera no ha merceido la pena. Si quieres ir a comprar, tiene mucha más variedad de tiendas el centro comercial de al lado, El Corredor. Pero en el apartado restauración tiene un ambiente muy bueno y mucha variedad. Resumen, para comer sí, para comprar no.',
    transporte: 'Yo fui en coche, y tiene fácil acceso desde la A2, además el parking es enorme, con lo que no encontrarás dificultades para aparcar.',
    presupuesto: 'Todo depende de cuanto te quieras gastar, yo que solo iba a ver que tal, me volví sin gastar nada.',
    alojamiento: '-',
    gasto: 0,
    likes: 41,
    comments: [
    ],
    culture: false,
    history: false,
    nature: false,
    business: true,
    gastronomy: true,
    sports: false,
    gallery: ["oasiz.png","oasiz1.jpg","oasiz2.jpg","oasiz3.jpg","oasiz4.jpg","oasiz5.jpg"]
  },

  {
    pathpic: "images/experiences/14-DavisCup/",
    title: 'Copa Davis',
    creador: 'BigRaiko',
    colaborador: 'CarlossBuche',
    fecha: '2021-12-05',
    descripcion: 'El pasado domingo fuimos a la final de la Copa Davis entre Rusia y Croacia. La verdad que presenciamos auténticos partidazos. Las instalaciones eran espectaculares y los equipos de la final no estaba nada mal. Ojalá que hubiese llegado España para haber disfrurado todavía mucho más. El primer partido estuvo, es impresionante como la veloidad que le imprime Rublev con la derecha. Pero el segundo partido fue el mejor sin dudas. Lo de Medvedev es algo fuera de lo normal, vaya forma de jugar, se le queda corto el número 2 del mundo. Rusia ganó bien y consiguió su 3º ensaladera. La única esperanza de los croatas era llegar vivos al tercer partido y poder ganar enlos dobles, pero los rusos se lo pusieron muy difícil.',
    transporte: 'En coche se llega bien al Madrid Arena, pero encontrar sitio para aparcar fue un poco complicado. No tengo ni idea si se puede llegar en metro o en bus.',
    presupuesto: 'Las entradas nos costaron 150€ a cada uno, y desde nuestro sitio en la fila 15 se veía muy bien. El parking nos costo 20€, un poco caro.',
    alojamiento: '-',
    gasto: 170,
    likes: 1,
    comments: [
    ],
    culture: false,
    history: false,
    nature: false,
    business: true,
    gastronomy: false,
    sports: true,
    gallery: ["davis.png","davis1.jpg","davis2.jpg","davis3.jpg","davis4.jpg","davis5.jpg"]
  },

  {
    pathpic: "images/experiences/15-UC3M/",
    title: 'UC3M Colme',
    creador: 'Menchh',
    colaborador: '',
    fecha: '2019-09-03',
    descripcion: 'Es un magnífico campus, muy grande y en perfectas condiciones. Al ser un campus un poco más alejado del centro de Madrid no hay un gran número de estudiantes, pero tampoco significa que esté muerto. Se organizan paelladas, eventos deportivos y charlas varias veces al año. Es un campus muy tranquilo, rodeado de campo y con gran cantidad de zonas comunes, tanto interiores como a lo lego de sus múltiples zonas verdes.',
    transporte: 'Sacate el carnet de coche, si no estas muerto. Como pretendas ir en bus puedes estar viajando 17 horas al día.',
    presupuesto: 'Pues la matrícula te sale a unos 1500€.',
    alojamiento: 'Otra opción es alquilar una casa en el pueblo, que a la larga te puede salir mejor que ir hasta alí todos los días.',
    gasto: 999,
    likes: 0,
    comments: [
      {
        username: "CarlossBuche",
        date: "2019-09-08",
        content: "En fin.",
        replay: []
      },
    ],
    culture: false,
    history: false,
    nature: false,
    business: true,
    gastronomy: false,
    sports: false,
    gallery: ["colme.png","colme1.jpg","colme2.jpg","colme3.jpg","colme4.jpg","colme5.jpg"]
  },

  {
    pathpic: "images/experiences/16-Dub/",
    title: 'Dubrovnik',
    creador: 'Menchh',
    colaborador: '',
    fecha: '2019-05-15',
    descripcion: 'Por toda su belleza, la ciudad amurallada de Dubrovnik es conocida como la Perla del Adriático. Pasear por su avenida principal, Stradun, o por sus estrechas callejuelas adyacentes es una gozada. Bajo las inmensas murallas y torres descubrirás monumentos impresionantes como la Puerta de Ploče, la Catedral, el Palacio Sponza, la Fuente de Onofrio, el Monasterio franciscano… Uno de los imprescindibles de Dubrovnik es pasear por sus murallas que rodean toda la ciudad. Desde ellas tendrás unas vistas magníficas y recorrerás la espectacular Torre Minceta o el Fuerte de San Juan.',
    transporte: 'El avión es la forma más habitual de llegar a Dubrovnik. Además, como se ha puesto de moda, el coste de los vuelos desde distintos puntos de España es muy asequible. Nosotros hemos viajado desde Barcelona con Vueling  y todo ha estado genial. Iberia también tiene vuelos directos desde Madrid. Desde otras ciudades también puedes volar con otras compañías, pero con escala.',
    presupuesto: 'Si piensas ver todo, hasta el último rincón y sin escatimar en gastos, ve preparando unos 400€ por persona',
    alojamiento: 'El alojamiento en la ciudad no es barato, pero podrás ahorrarte algo si te alojas extramuros. Una buena zona es la parte de Ploče.',
    gasto: 400,
    likes: 1,
    comments: [
    ],
    culture: false,
    history: false,
    nature: false,
    business: true,
    gastronomy: false,
    sports: false,
    gallery: ["dub.png","dub1.jpg","dub2.jpg","dub3.jpg","dub4.jpg","dub5.jpg"]
  }
]

//CAMBIO
var users = [
  /*{
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    birthdate: '',
    culture: false,
    history: false,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    terms: '',
    experiences: [

    ],
    colabs: [

    ],
    collections: [

    ],
    photo: '',
    likes:
  }*/
  {
    username: 'Juli08',
    password: '123456',
    name: 'Juli',
    lastname: '08',
    email: 'juli08@gmail.com',
    birthdate: '1993-06-18',
    culture: false,
    history: true,
    nature: true,
    business: false,
    gastronomy: true,
    sports: false,
    terms: 'on',
    experiences: [
      
    ],
    colabs: [

    ],
    collections: [
      {
        portada: 'images/experiences/NEW/portada-defecto.png',
        titulo: 'Viajar España',
        descripcion: 'Aquií guardo los viajes que quiero hacer por España. Pretendo recorrerme todos los rincones del país con mi caravana.',
        experiences: [
          'BlancaM+Un día en Madrid',
          'Mari17ng+La Barcelona de Gaudí',
          'BigRaiko+Playas en Llanes'
        ]
      }
    ],
    like_exp: [],
    photo: 'juli08.png',
    likes: 0
  },

  {
    username: 'BlancaM',
    password: '123456',
    name: 'Blanca',
    lastname: 'Mayoral',
    email: 'blancam@gmail.com',
    birthdate: '1984-07-06',
    culture: true,
    history: false,
    nature: false,
    business: true,
    gastronomy: false,
    sports: false,
    terms: 'on',
    experiences: [

    ],
    colabs: [

    ],
    collections: [

    ],
    like_exp: [],
    photo: "blancam.png",
    likes: 0
  },

  {
    username: 'Joao46',
    password: '123456',
    name: 'Joao',
    lastname: '46',
    email: 'joao46@gmail.com',
    birthdate: '1946-02-06',
    culture: false,
    history: false,
    nature: false,
    business: false,
    gastronomy: true,
    sports: false,
    terms: 'on',
    experiences: [

    ],
    colabs: [

    ],
    collections: [
      {
        portada: 'images/experiences/NEW/portada-defecto.png',
        titulo: 'Platos',
        descripcion: 'Comer, comer, comer y comerrr!!!',
        experiences: [
          'Juli08+Mejor paella de Valencia'
        ]
      }
    ],
    like_exp: [],
    photo: "joao46.png",
    likes: 0
  },

  {
    username: 'BigRaiko',
    password: '123456',
    name: 'Ricardo',
    lastname: 'Grande',
    email: 'bigraiko@gmail.com',
    birthdate: '1999-08-14',
    culture: true,
    history: true,
    nature: false,
    business: false,
    gastronomy: true,
    sports: true,
    terms: 'on',
    experiences: [

    ],
    colabs: [

    ],
    collections: [
      {
        portada: 'images/experiences/NEW/portada-defecto.png',
        titulo: 'Próximos viajes',
        descripcion: 'Aquí voy a poner los próximos viajes que voy a hacer. En cuanto se den, tendréis la experiencia por aquí. Un saludo.',
        experiences: [
          'BlancaM+Roma antigua',
          'Menchh+Dubrovnik'
        ]
      }
    ],
    like_exp: [],
    photo: 'BigRaiko.jpg',
    likes: 0
  },

  {
    username: 'Menchh',
    password: '123456',
    name: 'Carmen',
    lastname: 'Abella',
    email: 'menchh@gmail.com',
    birthdate: '2000-10-31',
    culture: false,
    history: false,
    nature: true,
    business: false,
    gastronomy: false,
    sports: false,
    terms: 'on',
    experiences: [

    ],
    like_exp: [],
    colabs: [

    ],
    collections: [
      {
        portada: 'images/experiences/NEW/portada-defecto.png',
        titulo: 'Kangus',
        descripcion: 'Poco a poco se irán subiendo los viajes con kangusss. No te lo pierdas',
        experiences: [
        ]
      }
    ],
    like_exp: [],
    photo: 'Menchh.jpg',
    likes: 0
  },

  {
    username: 'CarlossBuche',
    password: '123456',
    name: 'dfsddf',
    lastname: 'Camarero',
    email: 'carlossbuche@gmail.com',
    birthdate: '2000-04-05',
    culture: false,
    history: true,
    nature: false,
    business: false,
    gastronomy: false,
    sports: true,
    terms: 'on',
    experiences: [

    ],
    colabs: [

    ],
    collections: [
      {
        portada: 'images/Italy/gruta-azul.jpg',
        titulo: 'Verano 2019',
        descripcion: 'Vuelvo a escribir de madrugada, como hace tiempo, con la ventana abierta de par en par y respirando aire fresco. El mío ha sido un verano tranquilo, familiar a ratos y solitario por momentos, de vaciar la mente, de disfrutar de pequeñas cosas, de ordenar papeles y vida, de resetear el cerebro y cerrar etapa. Y lo he disfrutado como pocos. Era justamente lo que necesitaba: descansar, leer cómics, ver pelis de ciencia ficción y de terror, poner en orden mis plantas… y jugar un poco con mis lentes para el móvil.',
        experiences: [
          'CarlossBuche+Arenal Sound',
          'BlancaM+Roma antigua'
        ]
      },
      {
        portada: 'images/Italy/restaurante.jpg',
        titulo: 'Navidad',
        descripcion: 'La Navidad es una festividad religiosa en la que los cristianos conmemoran el nacimiento de Jesucristo. Se celebra el 25 de diciembre de cada año. De hecho, la palabra Navidad, como tal, procede del latín nativĭtas, nativātis que significa nacimiento.',
        experiences: [
        ]
      }
    ],
    like_exp: [],
    photo: 'CarlossBuche.jpg',
    likes: 0
  },

  {
    username: 'Mari17ng',
    password: '123456',
    name: 'Maria',
    lastname: 'Nuñez',
    email: 'mari17ng@gmail.com',
    birthdate: '2000-01-17',
    culture: false,
    history: false,
    nature: false,
    business: true,
    gastronomy: false,
    sports: false,
    terms: 'on',
    experiences: [

    ],
    colabs: [

    ],
    collections: [

    ],

    like_exp: [],
    photo: 'Mari17ng.jpg',
    likes: 0
  }
]


function fillPopupExp(user, title){
  
  let experiences=getExpCookies();
  let comentarios_recibidos="";
  for(var i=0; i<experiences.length; i++){
    exp=JSON.parse(experiences[i]);
    if(exp.creador==user && exp.title==title){
      document.getElementById("popexp-portada").src = exp.pathpic + exp.gallery[0];
      document.getElementById("experience-title").innerHTML = exp.title;
      document.getElementById("persona").innerHTML = exp.creador;
      document.getElementById("colaborador").innerHTML = exp.colaborador;
      document.getElementById("fecha").innerHTML = exp.fecha;
      document.getElementById("filter-descripcion-p").innerHTML = exp.descripcion;
      document.getElementById("filter-transporte-p").innerHTML = exp.transporte;
      document.getElementById("filter-presu-p").innerHTML = exp.presupuesto;
      document.getElementById("filter-alojamiento-p").innerHTML = exp.alojamiento;
      document.getElementById("popexp-gasto").innerHTML=exp.gasto;
      document.getElementById("popexp-likes").innerHTML = exp.likes;
      document.getElementById("popexp-comments").innerHTML = exp.comments.length;

      //Para los intereses
      document.getElementById("expculture").checked=exp.culture;
      document.getElementById("expnature").checked=exp.nature;
      document.getElementById("expgastronomy").checked=exp.gastronomy;
      document.getElementById("exphistory").checked=exp.history;
      document.getElementById("expbusiness").checked=exp.business;
      document.getElementById("expsports").checked=exp.sports;
      document.getElementById("expculture").disabled=true;
      document.getElementById("expnature").disabled=true;
      document.getElementById("expgastronomy").disabled=true;
      document.getElementById("exphistory").disabled=true;
      document.getElementById("expbusiness").disabled=true;
      document.getElementById("expsports").disabled=true;
      
      //Rellenar los comentarios escritos
      actualUser = getCookie(loggedInEmail);
      if (actualUser == ''){
        for(let j = 0; j <exp.comments.length; j++){

          comment=exp.comments[j];
          ////console.log(comentarios_recibidos);
          comentarios_recibidos+="<div class=\"comentario\">"+
                                    "<div class=\"comentario-contenido\">"+
                                      "<div class=\"inicial-comentario\">"+comment.username[0]+"</div>"+
                                      "<div class=\"comentario-texto\">"+
                                          "<p class=\"comentario-autor\"><b>"+comment.username+"</b>"+" "+comment.date+"</p>"+
                                          "<p>"+comment.content+"</p>"+
                                      "</div>"+
                                    "</div>"+
                                    "<div class=\"popexp-icons\">"+
                                                         
                                    "</div>"+
                                    "<div class=\"respuesta\" id=\"respuesta-comentario"+j+"\">"+
                                    "</div>"+
                                  "</div>";
        }
      }  else {
        ////console.log(exp.comments.length);
        for(let j = 0; j <exp.comments.length; j++){

          comment=exp.comments[j];
          ////console.log(comentarios_recibidos);
          comentarios_recibidos+="<div class=\"comentario\">"+
                                    "<div class=\"comentario-contenido\">"+
                                      "<div class=\"inicial-comentario\">"+comment.username[0]+"</div>"+
                                      "<div class=\"comentario-texto\">"+
                                          "<p class=\"comentario-autor\"><b>"+comment.username+"</b>"+" "+comment.date+"</p>"+
                                          "<p>"+comment.content+"</p>"+
                                      "</div>"+
                                    "</div>"+
                                    "<div class=\"popexp-icons\">"+
                                      "<div class=\"popexp-icons-grid\" onclick=\"responderComment('"+exp.creador+"+"+exp.title+"',"+j+")\">"+
                                          "<img src=\"images/iconos/responder.png\" alt=\"mg\">"+
                                          "<p id=\"responder"+j+"\"> Responder comentario</p>"+
                                      "</div>"+                     
                                    "</div>"+
                                    "<div class=\"respuesta\" id=\"respuesta-comentario"+j+"\">"+
                                    "</div>"+
                                  "</div>";
        }
      }

      mycomentarios_recibidos = document.getElementById("received-comments");
      mycomentarios_recibidos.innerHTML = comentarios_recibidos;


      for(let j = 0; j <exp.comments.length; j++){
        //Para las respuestas
        document.getElementById("respuesta-comentario"+j).innerHTML = '';
        respuestas_recibidas = document.getElementById("respuesta-comentario"+j).innerHTML;
        for(let k = 0; k < exp.comments[j].replay.length; k++){
          replay=exp.comments[j].replay[k];
          respuestas_recibidas+=  "<div class=\"respuesta\">"+
                                    "<div class=\"comentario-contenido\">"+
                                      "<div class=\"inicial-comentario\">"+replay.username[0]+"</div>"+
                                      "<div class=\"comentario-texto\">"+
                                          "<p class=\"comentario-autor\"><b>"+replay.username+"</b>"+" "+replay.date+"</p>"+
                                          "<p>"+replay.content+"</p>"+
                                      "</div>"+
                                    "</div>"+
                                  "</div>";
        }
        document.getElementById("respuesta-comentario"+j).innerHTML=respuestas_recibidas;
      }

      openReply = false;

      let id="restoimg";
      let galeria="";
      let gallery_viewer="";
      for(let j = 0; j <exp.gallery.length; j++){
        picture=exp.gallery[j];
        galeria+="<div class=\"grid-gallery__item\"  onclick=\"openGalleryViewer(this)\">"+
                           "<img class=\"grid-gallery__image\" src="+exp.pathpic+picture+" alt=\"foto\">"+
                           "</div>";

        gallery_viewer+="<img id="+id+j+" src="+exp.pathpic+picture+" alt=\"foto\">"
      }
      mygaleria = document.getElementById("galeria-popupexp");
      mygaleria.innerHTML = galeria;
      mygalleryviewer = document.getElementById("galleryviewer-resto");
      mygalleryviewer.innerHTML = gallery_viewer;

      //Para poner lo de nuevo comentario con la letra correspondiente
      actualUser = getCookie(loggedInEmail);
      let inicialLetter = '';
      if (actualUser == ''){
        newcomment = "";
      }  else {
        inicialLetter = JSON.parse(actualUser).username[0];
        newcomment = "<div class=\"comentario-contenido\">"+
                      "<div class=\"inicial-comentario\">"+inicialLetter+"</div>"+
                      "<div class=\"text-comentario\">"+
                        "<p id=\"error-add-comment\" class=\"error-message\"><b>Campo obligatorio</b></p>"+
                        "<textarea id=\"add-comment\" name=\"add-comment\" rows=\"10\" cols=\"50\" placeholder=\"Añade un nuevo comentario\"></textarea>"+
                        "<label for=\"add-comment\" style=\"display: 'none'\">.</label>"+
                      "</div>"+
                      "</div>"+
                      "<div class=\"popexp-icons\">"+ 
                        "<div class=\"signup-buttons\">"+
                        "<button type=\"button\" class=\"btn reset\" id=\"comment-reset\" onclick=\"borrarComentario()\">Borrar</button>"+
                        "<button type=\"button\" class=\"btn save\" id=\"comment-save\" onclick=\"comentar()\">Publicar</button>" +
                        "</div>"+
                    "</div>";
      }
      document.getElementById("new-comment").innerHTML = newcomment;
    }
  }

  if(loggedInEmail!=""){
    if(doILike(user, title)==true){
      document.getElementById("popexp-like-icon").src="images/iconos/heart-solid-24.png";
    }
    else {
      document.getElementById("popexp-like-icon").src="images/iconos/heart-regular-24.png";
    }
  }
  document.getElementById("popup-grid-item").style.display="flex";
}


function openGalleryViewer(element){
  let picpath="";
  document.getElementById("gallery-viewer").style.display="flex";
  let ap=element.innerHTML.split('"');
  for(let i=0; i<ap.length; i++){
    if (ap[i].includes("images") == true) {
      
      img=ap[i].split(">");
      let imgpath= img[0];
      ////console.log(img[0]);
      document.getElementById("viewer-picture").src=img[0];
    } 
  }
  let idpic="restoimg";
  let ce=getExpCookies();
  let pic=img[0];
  let picsplit=pic.split("/");
  pic=picsplit.pop();
  for(let i=0; i<ce.length; i++){
    let exp=JSON.parse(ce[i]);
    if (exp.gallery.includes(pic)){
      let index=exp.gallery.indexOf(pic);
      document.getElementById(idpic+index).style.border="3px solid black";
    }
  }

  document.getElementById("popup-grid-item-content").style.overflowY = "hidden";
}

function closeViewer(){
  document.getElementById("gallery-viewer").style.display="none";
  let idpic="restoimg";
  let pic=document.getElementById("viewer-picture").src;
  let picsplit=pic.split("/");
  pic=picsplit.pop();
  ////console.log(pic);
  let ce=getExpCookies();
  for(let i=0; i<ce.length; i++){
    let exp=JSON.parse(ce[i]);
    if (exp.gallery.includes(pic)){
      for(let i=1; i<exp.gallery.length; i++){
       // //console.log(idpic+i);
        document.getElementById(idpic+i).style.border="none";
      }
    }
  }
  document.getElementById("popup-grid-item-content").style.overflowY = "auto";
}

function pasaratras(){
  let idpic="restoimg";
  let pic=document.getElementById("viewer-picture").src;
  let picsplit=pic.split("/");
  pic=picsplit.pop();
  ////console.log(pic);
  let ce=getExpCookies();
  for(let i=0; i<ce.length; i++){
    let exp=JSON.parse(ce[i]);
    if (exp.gallery.includes(pic)){
      ////console.log(exp.gallery.indexOf(pic));
      let index=exp.gallery.indexOf(pic);
      let indexnewpic=index-1;
      ////console.log(indexnewpic);
      if(indexnewpic==-1){
        indexnewpic=exp.gallery.length-1;
      }//Si era la primera, va a la última.
      document.getElementById("viewer-picture").src=exp.pathpic+exp.gallery[indexnewpic];
      document.getElementById(idpic+indexnewpic).style.border="3px solid black";
      document.getElementById(idpic+index).style.border="none";
    }
  }
}

function pasarsiguiente(){
  let idpic="restoimg";
  let pic=document.getElementById("viewer-picture").src;
  let picsplit=pic.split("/");
  pic=picsplit.pop();
  ////console.log(pic);
  let ce=getExpCookies();
  for(let i=0; i<ce.length; i++){
    let exp=JSON.parse(ce[i]);
    if(exp.gallery.includes(pic)){
      ////console.log(exp.gallery.indexOf(pic));
      let index=exp.gallery.indexOf(pic);
      let indexnewpic=index+1;
      ////console.log(indexnewpic);
      if(indexnewpic==exp.gallery.length){
        indexnewpic=0;
      }//Si era la primera, va a la última.
      document.getElementById("viewer-picture").src=exp.pathpic+exp.gallery[indexnewpic];
      document.getElementById(idpic+indexnewpic).style.border="3px solid black";
      document.getElementById(idpic+index).style.border="none";
    }
  }

  //Ahora resaltamos el
}

/*LIKECARMEN*/
function Like(element){
  //Si esta registrado te deja dar like. Si no. No
  if(document.getElementById("account-li-login").style.display=="none"){
    let user = document.getElementById("persona").innerHTML;
    let title = document.getElementById("experience-title").innerHTML;
    let experiences=getExpCookies();
    for(var i=0; i<experiences.length; i++){
      exp=JSON.parse(experiences[i]);
      if(exp.creador==user && exp.title==title){
        if(element.src.includes("regular")){
          exp.likes+=1;
          document.getElementById("popexp-like-icon").src="images/iconos/heart-solid-24.png";
          if(element.id.includes("user")){
            document.getElementById("exp-like-icon-user"+title).src="images/iconos/heart-solid-24.png";
          }  
          if (document.getElementById("exp-like-icon"+title)){
            document.getElementById("exp-like-icon"+title).src="images/iconos/icons8-heart-30.png";
          }
          if (document.getElementById("exp-colab-like-icon"+title)){
            document.getElementById("exp-colab-like-icon"+title).src="images/iconos/heart-solid-24.png";
          }
          if (document.getElementById("exp-like-icon-user-colec"+title)){
            document.getElementById("exp-like-icon-user-colec"+title).src="images/iconos/heart-solid-24.png";
            document.getElementById("exp-likes-user-colec"+title).innerHTML = exp.likes;
          }
          
          setCookie(user+"+"+title, JSON.stringify(exp), 10);
          let likexp={
            user: user,
            title: title
          }
          let actualuser;
          let uc=getUsersCookies();
          for (var j=0; j<uc.length; j++){
            let myuser=JSON.parse(uc[j]);
            if(myuser.email==loggedInEmail){
              actualuser=myuser;
              actualuser.like_exp.push(likexp)
            }
          }
          setCookie(actualuser.email, JSON.stringify(actualuser), 10); 
        }
        else{
          exp.likes-=1;
          document.getElementById("popexp-like-icon").src="images/iconos/heart-regular-24.png";
          
          if(element.id.includes("user")){
            document.getElementById("exp-like-icon-user"+title).src="images/iconos/heart-regular-24.png";
          }  
          if (document.getElementById("exp-like-icon"+title)){
            document.getElementById("exp-like-icon"+title).src="images/iconos/mg.png";
          }
          if (document.getElementById("exp-colab-like-icon"+title)){
            document.getElementById("exp-colab-like-icon"+title).src="images/iconos/heart-regular-24.png";
          }
          
          setCookie(user+"+"+title, JSON.stringify(exp), 10); 
          //Eliminar la experiencia de los likes del usuario.
          let actualuser;
          let uc=getUsersCookies();
          for (var j=0; j<uc.length; j++){
            let myuser=JSON.parse(uc[j]);
            if(myuser.email==loggedInEmail){
              actualuser=myuser;
              for(var m=0; m<actualuser.like_exp.length; m++){
                if(user==actualuser.like_exp[m].user && title==actualuser.like_exp[m].title){
                  actualuser.like_exp.splice(m, 1);
                }
              }
            }
          }
          setCookie(actualuser.email, JSON.stringify(actualuser), 10); 

          if (document.getElementById("exp-like-icon-user-colec"+title)){
            document.getElementById("exp-like-icon-user-colec"+title).src="images/iconos/heart-regular-24.png";
            document.getElementById("exp-likes-user-colec"+title).innerHTML = exp.likes;
          }
        }
        document.getElementById("popexp-likes").innerHTML = exp.likes;
        
        if(element.id.includes("user")){
          document.getElementById("exp-likes-user"+title).innerText = exp.likes;
          document.getElementById("popuser-likes").innerText = exp.likes;
        }
        if (document.getElementById("exp-likes"+title)){
          document.getElementById("exp-likes"+title).innerText = exp.likes;
        }
        if (document.getElementById("exp-colab-likes"+title)){
          document.getElementById("exp-colab-likes"+title).innerText = exp.likes;
        }
      }
    }
    if (document.getElementById("user-username")){
      email = document.getElementById("email-user").innerHTML;
      ////console.log(email);
      if (document.getElementById("selector-experiencias").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
        ////console.log("exp")
        fillPopupUserExperience(email);
      }
      if (document.getElementById("selector-colaboraciones").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
        ////console.log("colab")
        fillPopupUserColabs(email);
      }
      //Mis experiencias
      if (document.getElementById("tab-experiences-button")){
        if (document.getElementById("popup-myexp").style.display == "flex" && document.getElementById("tab-experiences-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
          ////console.log("en my experiences");
          loadMyExperiences(loggedInEmail);
        }
      }
      //Mis colaboraciones
      if (document.getElementById("tab-collaborations-button")){
        if (document.getElementById("popup-myexp").style.display == "flex" && document.getElementById("tab-collaborations-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
          ////console.log("en my collaborations");
          loadMyCollaboration(loggedInEmail);
        }
      }
    }
    buildRankingUsers(getUsersCookies());
    actualizarMoreUsers();
  }else{
    document.getElementById("login").style.display = "block";
    document.getElementById("popup-grid-item").style.display="none";
    document.getElementById("popup-user-item").style.display="none";
    document.getElementById("popup-coleccion-item").style.display="none";
    document.body.style.overflowY = "hidden";
  }  
}

function LikeOut(element){
  //Si esta registrado te deja dar like. Si no. No
  ////console.log(element);
  if(document.getElementById("account-li-login").style.display=="none"){
    let user="";
    let title = document.getElementById(element.id);
    
    if(element.id.includes("user")){
      if (document.getElementById("popup-user-item").style.display == "flex"){
        user=document.getElementById("user-username").innerText;
        ////console.log("estas en user estanda");
        ////console.log(user);
      }
      else {
        user = document.getElementById("changeuser-username").innerText;
        ////console.log("en editar");
      }
      title = title.id.slice(18);
      if (document.getElementById("popup-coleccion-item").style.display == "flex"){
        title = title.slice(6);
        user = document.getElementById("creador"+title).innerText.slice(5);
        ////console.log(user);
      }
      ////console.log(title);
      ////console.log(user);
    }
    else if (element.id.includes("colab")){
      ////console.log("entra en colab");
      title = title.id.slice(19);
      ////console.log(title);
      ////console.log(document.getElementById("colab-"+title).innerHTML);
      user = document.getElementById("colab-"+title).innerHTML.slice(6);
      ////console.log(user);
    }
    else{
      title = title.id.slice(13);
      ////console.log(title);
      user = document.getElementById("creador"+title).innerHTML;
      user = user.slice(8, -4);
      ////console.log(user);
    }
    
    let experiences=getExpCookies();
    for(var i=0; i<experiences.length; i++){
      exp=JSON.parse(experiences[i]);
      if(exp.creador==user && exp.title==title){
        if(element.src.includes("mg") || element.src.includes("regular")){
          exp.likes+=1;
          //MIRARRR
          //document.getElementById("popexp-like-icon").src="images/iconos/heart-solid-24.png";
          if(element.id.includes("user")){
            if (element.id.includes("colec")){
              document.getElementById("exp-like-icon-user-colec"+title).src="images/iconos/heart-solid-24.png";
            }
            else {
              document.getElementById("exp-like-icon-user"+title).src="images/iconos/heart-solid-24.png";
            }
          }  
          if (document.getElementById("exp-like-icon"+title)){
            document.getElementById("exp-like-icon"+title).src="images/iconos/icons8-heart-30.png";
          }
          if (document.getElementById("exp-colab-like-icon"+title)){
            document.getElementById("exp-colab-like-icon"+title).src="images/iconos/heart-solid-24.png";
          }
          if (document.getElementById("exp-like-icon-user-colec"+title)){
            document.getElementById("exp-like-icon-user-colec"+title).src="images/iconos/heart-solid-24.png";
            document.getElementById("exp-likes-user-colec"+title).innerHTML = exp.likes;
          }

          
          ////console.log(title);
          setCookie(user+"+"+title, JSON.stringify(exp), 10); 
          let likexp={
            user: user,
            title: title
          }
          let actualuser;
          let uc=getUsersCookies();
          for (var j=0; j<uc.length; j++){
            let myuser=JSON.parse(uc[j]);
            if(myuser.email==loggedInEmail){
              actualuser=myuser;
              actualuser.like_exp.push(likexp)
            }
          }
          ////console.log(actualuser.like_exp);
          setCookie(actualuser.email, JSON.stringify(actualuser), 10); 
        }
        else{
          exp.likes-=1;
          if(element.id.includes("user")){
            if (element.id.includes("colec")){
              document.getElementById("exp-like-icon-user-colec"+title).src="images/iconos/heart-regular-24.png";
            }
            else {
              document.getElementById("exp-like-icon-user"+title).src="images/iconos/heart-regular-24.png";
            }
          }  
          if (document.getElementById("exp-like-icon"+title)){
            document.getElementById("exp-like-icon"+title).src="images/iconos/mg.png";
          }
          if (document.getElementById("exp-colab-like-icon"+title)){
            document.getElementById("exp-colab-like-icon"+title).src="images/iconos/heart-regular-24.png";
          }
          
          setCookie(user+"+"+title, JSON.stringify(exp), 10); 
          let actualuser;
          let uc=getUsersCookies();
          for (var j=0; j<uc.length; j++){
            let myuser=JSON.parse(uc[j]);
            if(myuser.email==loggedInEmail){
              actualuser=myuser;
              for(var m=0; m<actualuser.like_exp.length; m++){
                if(user==actualuser.like_exp[m].user && title==actualuser.like_exp[m].title){
                  actualuser.like_exp.splice(m, 1);
                }
              }
            }
          }
          ////console.log(actualuser.like_exp);
          setCookie(actualuser.email, JSON.stringify(actualuser), 10); 

          if (document.getElementById("exp-like-icon-user-colec"+title)){
            ////console.log("entra al de la colec")
            //Estoy con que desde colec no funciona bien el like desde fuera
            document.getElementById("exp-like-icon-user-colec"+title).src="images/iconos/heart-regular-24.png";
            document.getElementById("exp-likes-user-colec"+title).innerHTML = exp.likes;
          }
        }
        ////console.log("exp-likes"+title);
        
        if(element.id.includes("user")){
          if (element.id.includes("colec")){
            document.getElementById("exp-likes-user-colec"+title).innerText = exp.likes;
          }
          else {
            document.getElementById("exp-likes-user"+title).innerText = exp.likes;
            document.getElementById("popuser-likes").innerText = exp.likes;
          }
        }
        if (document.getElementById("exp-likes"+title)){
          document.getElementById("exp-likes"+title).innerText = exp.likes;
        }
        if (document.getElementById("exp-colab-likes"+title)){
          document.getElementById("exp-colab-likes"+title).innerText = exp.likes;
        }
      }
    }
    buildRankingUsers(getUsersCookies());
    actualizarMoreUsers();
  }
  else{
    document.getElementById("login").style.display = "block";
    document.getElementById("popup-grid-item").style.display="none";
    document.getElementById("popup-user-item").style.display="none";
    document.getElementById("popup-coleccion-item").style.display="none";
    document.body.style.overflowY = "hidden";
  }  
}

function preComment (element){
    //Si esta registrado te deja dar like. Si no. No
  if(document.getElementById("account-li-login").style.display=="none"){
    if (!element.id.includes("pop")){
      //Le has dado a comentar desde fuera
      let title = document.getElementById(element.id);
      title = title.id.slice(16);
      let user = document.getElementById("creador"+title).innerHTML;
      user = user.slice(8, -4);
      ////console.log(title);
      ////console.log(user);

      fillPopupExp(user, title);
      //Para que se ponga bien delante siempre
      if (document.getElementById("popup-user-item").style.display == 'flex'){
        document.getElementById("popup-grid-item").style.zIndex = 110;
      }
      else {
        document.getElementById("popup-grid-item").style.zIndex = 100;
      }
      document.getElementById("popup-coleccion-item").style.zIndex = 90;
      document.body.style.overflowY = "hidden";
    }
  }else{
    document.getElementById("login").style.display = "block";
    document.getElementById("popup-grid-item").style.display="none";
    document.getElementById("popup-user-item").style.display="none";
    document.getElementById("popup-coleccion-item").style.display="none";
    document.body.style.overflowY = "hidden";
  }
}

function anadirColeccion(element){
  if(document.getElementById("account-li-login").style.display=="none"){
    //Rellenar todavía
    //CAMBIOS
  }else{
    document.getElementById("login").style.display = "block";
    document.getElementById("popup-grid-item").style.display="none";
    document.getElementById("popup-user-item").style.display="none";
    document.getElementById("popup-coleccion-item").style.display="none";
    //Cierro todos los menús de opciones que hay
    let cerrarOut = document.getElementsByClassName("menu-ul").length;
    for(var i=0; i<cerrarOut; i++){
      document.getElementsByClassName("menu-ul")[i].style.display = "none";
    }
    let cerrar = document.getElementsByClassName("user-menu-ul").length;
    for(var i=0; i<cerrar; i++){
      document.getElementsByClassName("user-menu-ul")[i].style.display = "none";
    }
    document.body.style.overflowY = "hidden";
  }
}

function comentar(){
  if(document.getElementById("account-li-login").style.display=="none"){
    content = Array.from(document.querySelectorAll('#add-comment'));
    content.forEach(element => {
      //añade un event listener para cuando tiene focus on
      element.addEventListener('focus', function(){
        // quita el borde rojo
        element.style.border = "";
        // quita el mensaje de error
        document.getElementById("error-add-comment").style.visibility = "hidden";
      });
    });


    let myusername="";
    let uc=getUsersCookies();
    for (var i=0; i<uc.length; i++){
      let myuser=JSON.parse(uc[i]);
      if(myuser.email==loggedInEmail){
        myusername=myuser.username;
        ////console.log(myusername);
      }
    }
    let text=document.getElementById("add-comment").value;
    if (text == ""){
      document.getElementById("add-comment").style.border = "2px solid red";
      document.getElementById("error-add-comment").style.visibility = "visible";
    }
    else{
      let hoy = new Date().toISOString().split('T')[0];
      let comment={
        username: myusername,
        date: hoy,
        content: text,
        replay: []
      }

      ////console.log(comment);

      let title = document.getElementById("experience-title").innerText;
      ////console.log(title);
      let user = document.getElementById("persona").innerText;
      let experiences=getExpCookies();
      for(var i=0; i<experiences.length; i++){
        exp=JSON.parse(experiences[i]);
        if(exp.creador==user && exp.title==title){
          ////console.log("Estoy aquí")
            ////console.log("El tamaño de los comentarios antes es ");
            ////console.log(exp.comments.length);
            exp.comments.push(comment);
            ////console.log(comment);
            ////console.log("El tamaño de los comentarios despues es ");
            ////console.log(exp.comments.length);
            ////console.log(user+"+"+title);
            setCookie(user+"+"+title, JSON.stringify(exp), 10); 
            //Lo mostramos en el código:
            document.getElementById("add-comment").value="";
            comentarios_recibidos = document.getElementById("received-comments").innerHTML;
            comentarios_recibidos +=  "<div class=\"comentario\">"+
                                        "<div class=\"comentario-contenido\">"+
                                          "<div class=\"inicial-comentario\">"+comment.username[0]+"</div>"+
                                          "<div class=\"comentario-texto\">"+
                                              "<p class=\"comentario-autor\"><b>"+comment.username+"</b>"+" "+comment.date+"</p>"+
                                              "<p>"+comment.content+"</p>"+
                                          "</div>"+
                                        "</div>"+
                                        "<div class=\"popexp-icons\">"+
                                          "<div class=\"popexp-icons-grid\" onclick=\"responderComment('"+exp.creador+"+"+exp.title+"',"+(exp.comments.length-1)+")\">"+
                                              "<img src=\"images/iconos/responder.png\" alt=\"mg\">"+
                                              "<p p id=\"responder"+(exp.comments.length-1)+"\"> Responder comentario</p>"+
                                          "</div>"+                     
                                        "</div>"+
                                        "<div class=\"respuesta\" id=\"respuesta-comentario"+(exp.comments.length-1)+"\">"+
                                        "</div>"+
                                      "</div>";

              document.getElementById("received-comments").innerHTML=comentarios_recibidos;


          if(document.getElementById("selector-experiencias").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
            ////console.log("está en selector.experiencias");
            document.getElementById("exp-comments-user"+title).innerText = exp.comments.length;
          }
          if (document.getElementById("popexp-comments")){
            document.getElementById("popexp-comments").innerText = exp.comments.length;
          }
          //MARIIIIIIIIIII
          if (document.getElementById("exp-comments-t"+title)){
            if (document.getElementById("selector-colaboraciones").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%" ||
            document.getElementById("popup-coleccion-item").style.display == "flex" || document.getElementById("tab-collaborations-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%" 
            || document.getElementById("tab-experiences-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
              ////console.log("aquiiiiiiiiiii");
              document.getElementById("exp-comments-t"+title).innerText = exp.comments.length;
            }
          }   
        }
      }
    }
  }
}

function borrarComentario(){
  document.getElementById("add-comment").value="";
}

var openReply = false;
function responderComment(exp, posicion){
  //Si esta registrado te deja dar like. Si no. No
  if(document.getElementById("account-li-login").style.display=="none"){
    if (!openReply){
      //Cambio de responder a cancelar
      document.getElementById("responder"+posicion).innerHTML = "Cancelar respuesta";
      actualUser = getCookie(loginemail);
      inicialLetter = JSON.parse(actualUser).username[0];
      newreply = "<div class=\"comentario-contenido\">"+
                    "<div class=\"inicial-comentario\">"+inicialLetter+"</div>"+
                    "<div class=\"text-comentario\">"+
                        "<p id=\"error-add-reply"+posicion+"\" class=\"error-message\"><b>Campo obligatorio</b></p>"+
                        "<textarea class=\"add-reply\" id=\"add-reply"+posicion+"\" name=\"add-comment\" rows=\"10\" cols=\"50\" placeholder=\"Añade una nueva respuesta\"></textarea>"+
                        "<label for=\"add-comment\" style=\"display: 'none'\">.</label>"+
                    "</div>"+
                  "</div>"+
                  "<div class=\"popexp-icons\">"+ 
                      "<div class=\"signup-buttons\">"+
                      "<button type=\"button\" class=\"btn reset\" id=\"comment-reset\" onclick=\"borrarResponder("+posicion+")\">Borrar</button>"+
                      "<button type=\"button\" class=\"btn save\" id=\"comment-save\" onclick=\"responder("+posicion+")\">Publicar</button>" 
                      "</div>"+
                  "</div>";
      openReply = true;
      document.getElementById("respuesta-comentario"+posicion).innerHTML += newreply;
    }
    else if (document.getElementById("responder"+posicion).innerHTML.includes("Cancelar")){
      document.getElementById("responder"+posicion).innerHTML = "Responder comentario";

      //Para quitar lo de añadir comentario y mostrar los que tenga
      //Repetido casi en responder pero no igual
      let myusername="";
      let uc=getUsersCookies();
      for (var i=0; i<uc.length; i++){
        let myuser=JSON.parse(uc[i]);
        if(myuser.email==loggedInEmail){
          myusername=myuser.username;
        }
      }

      let title = document.getElementById("experience-title").innerText;
      let user = document.getElementById("persona").innerText;
      let experiences=getExpCookies();
      for(var i=0; i<experiences.length; i++){
        exp=JSON.parse(experiences[i]);
        if(exp.creador==user && exp.title==title){
            //Lo mostramos en el código:
            document.getElementById("respuesta-comentario"+posicion).innerHTML = '';
            respuestas_recibidas = document.getElementById("respuesta-comentario"+posicion).innerHTML;
            for(let j = 0; j <exp.comments[posicion].replay.length; j++){
              replay=exp.comments[posicion].replay[j];
              respuestas_recibidas+=  "<div class=\"respuesta\">"+
                                        "<div class=\"comentario-contenido\">"+
                                          "<div class=\"inicial-comentario\">"+replay.username[0]+"</div>"+
                                          "<div class=\"comentario-texto\">"+
                                              "<p class=\"comentario-autor\"><b>"+replay.username+"</b>"+" "+replay.date+"</p>"+
                                              "<p>"+replay.content+"</p>"+
                                          "</div>"+
                                        "</div>"+
                                      "</div>";
            }
            document.getElementById("respuesta-comentario"+posicion).innerHTML=respuestas_recibidas;
            openReply = false;
        }
      }
    }
  }else{
    document.getElementById("login").style.display = "block";
    document.getElementById("popup-grid-item").style.display="none";
    document.getElementById("popup-user-item").style.display="none";
  }
}

function responder(posicion){
  content = Array.from(document.querySelectorAll('#add-reply'+posicion));
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      // quita el mensaje de error
      document.getElementById("error-add-reply"+posicion).style.visibility = "hidden";
    });
  });

  let myusername="";
  let uc=getUsersCookies();
  for (var i=0; i<uc.length; i++){
    let myuser=JSON.parse(uc[i]);
    if(myuser.email==loggedInEmail){
      myusername=myuser.username;
    }
  }
  
  let text=document.getElementById("add-reply"+posicion).value;
  if (text == ""){
    document.getElementById("add-reply"+posicion).style.border = "2px solid red";
    document.getElementById("error-add-reply"+posicion).style.visibility = "visible";
  }
  else{
    let hoy = new Date().toISOString().split('T')[0]; 
    let reply={
      username: myusername,
      date: hoy,
      content: text
    }

    let title = document.getElementById("experience-title").innerText;
    ////console.log(title);
    let user = document.getElementById("persona").innerText;
    let experiences=getExpCookies();
    for(var i=0; i<experiences.length; i++){
      exp=JSON.parse(experiences[i]);
      if(exp.creador==user && exp.title==title){
        ////console.log("Estoy aquí")
          exp.comments[posicion].replay.push(reply);
          setCookie(user+"+"+title, JSON.stringify(exp), 10); 
          //Lo mostramos en el código:
          document.getElementById("respuesta-comentario"+posicion).innerHTML = '';
          respuestas_recibidas = document.getElementById("respuesta-comentario"+posicion).innerHTML;
          for(let j = 0; j <exp.comments[posicion].replay.length; j++){
            replay=exp.comments[posicion].replay[j];
            respuestas_recibidas+=  "<div class=\"respuesta\">"+
                                      "<div class=\"comentario-contenido\">"+
                                        "<div class=\"inicial-comentario\">"+replay.username[0]+"</div>"+
                                        "<div class=\"comentario-texto\">"+
                                            "<p class=\"comentario-autor\"><b>"+replay.username+"</b>"+" "+replay.date+"</p>"+
                                            "<p>"+replay.content+"</p>"+
                                        "</div>"+
                                      "</div>"+
                                    "</div>";
                                    
            ////console.log(comentarios_recibidos);
          }

          document.getElementById("respuesta-comentario"+posicion).innerHTML=respuestas_recibidas;
          openReply = false;
      }
    }
    document.getElementById("responder"+posicion).innerHTML = "Responder comentario";
  }
}

function borrarResponder(posicion){
  document.getElementById("add-reply"+posicion).value="";
}

/*Usuarios*/
function openExpUser(element){
  document.getElementById("popup-user-item").style.zIndex = 100;
  document.getElementById("popup-grid-item").style.zIndex = 100;
  document.getElementById("popup-coleccion-item").style.zIndex = 80;
  fillPopupUser(element.innerHTML);
}
function openUser(element){
  let html=element.innerHTML.split("<");
  let username;
  for (var i=0; i<html.length; i++){
    if (html[i].indexOf("h3>") == 0) {
      username= html[i].substring(3, html[i].length);
      ////console.log(username);
    }
  }
  document.getElementById("popup-user-item").style.zIndex = 80;
  document.getElementById("popup-coleccion-item").style.zIndex = 80;
  document.body.style.overflowY = "hidden";
  donde = 'exp'
  fillPopupUser(username);
}

function closeUser(){
  mostrarMenosUser();
  document.getElementById("popup-user-item").style.display = "none";
  document.body.style.overflowY = "visible";
  if (document.getElementById("popup-grid-item").style.display == 'flex'){
    document.body.style.overflowY = "hidden";
  }
}

function fillPopupUser(username){
  let users = getUsersCookies();
  for(var i=0; i<users.length; i++){
    user=JSON.parse(users[i]);
    if(user.username == username){
      if (user.photo == ''){
        document.getElementById("popuser-portada").src = "images/perfiles/user_azul.png";
      }else{
        document.getElementById("popuser-portada").src = "images/perfiles/" + user.photo;
      }
      document.getElementById("user-username").innerHTML = user.username;
      document.getElementById("nombre-user").innerHTML = user.name;
      document.getElementById("apellido-user").innerHTML = user.lastname;
      document.getElementById("cumple-user").innerHTML = user.birthdate;
      document.getElementById("email-user").innerHTML = user.email;
      document.getElementById("popuser-likes").innerHTML = user.likes;
      document.getElementById("popuser-public").innerHTML = user.experiences.length;

      //Para los intereses
      document.getElementById("userculture").checked=user.culture;
      document.getElementById("usernature").checked=user.nature;
      document.getElementById("usergastronomy").checked=user.gastronomy;
      document.getElementById("userhistory").checked=user.history;
      document.getElementById("userbusiness").checked=user.business;
      document.getElementById("usersports").checked=user.sports;
      document.getElementById("userculture").disabled=true;
      document.getElementById("usernature").disabled=true;
      document.getElementById("usergastronomy").disabled=true;
      document.getElementById("userhistory").disabled=true;
      document.getElementById("userbusiness").disabled=true;
      document.getElementById("usersports").disabled=true;
    }
  }
  //Para que se abra directamente en experiencias
  document.getElementById("selector-experiencias").style.background = "#483d8b";
  document.getElementById("selector-colecciones").style.background = "#000073";
  document.getElementById("selector-colecciones").style.borderTopLeftRadius = "20px";
  document.getElementById("selector-colecciones").style.borderBottomLeftRadius = "20px";
  document.getElementById("selector-colaboraciones").style.background = "#000073";
  document.getElementById("selector-colaboraciones").style.borderTopRightRadius = "20px";
  document.getElementById("selector-colaboraciones").style.borderBottomRightRadius = "20px";
  donde = 'exp';
  fillPopupUserExperience(document.getElementById("email-user").innerHTML);

  document.getElementById("popup-user-item").style.display="flex";
}

function mostrarMasUser(){
  document.getElementById("user-info-surname").style.display = "flex";
  document.getElementById("user-info-birthdate").style.display = "flex";
  document.getElementById("user-info-email").style.display = "flex";
  document.getElementById("mostrarmasuser").style.display = "none";
  document.getElementById("mostrarmenosuser").style.display = "flex";
  //Para los intereses
  document.getElementById("usertopic").style.display = "flex";
}
function mostrarMenosUser(){
  document.getElementById("user-info-surname").style.display = "none";
  document.getElementById("user-info-birthdate").style.display = "none";
  document.getElementById("user-info-email").style.display = "none";
  document.getElementById("mostrarmasuser").style.display = "flex";
  document.getElementById("mostrarmenosuser").style.display = "none";
  //Para los intereses
  document.getElementById("usertopic").style.display = "none";
}

var donde = 'exp';
function changePestanaUser(element){
  var pestana = document.getElementById(element.id);

  if (pestana.id == "selector-colecciones"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    pestana.style.borderTopLeftRadius = "20px";
    pestana.style.borderBottomLeftRadius = "20px";
    document.getElementById("selector-experiencias").style.background = "#000073";
    document.getElementById("selector-colaboraciones").style.background = "#000073";
    document.getElementById("selector-colaboraciones").style.borderTopRightRadius = "20px";
    document.getElementById("selector-colaboraciones").style.borderBottomRightRadius = "20px";

    //Cargar las colecciones del usuario
    ////console.log(document.getElementById("email-user").innerHTML);
    fillPopupUserCollection(document.getElementById("email-user").innerHTML);
  }
  if (pestana.id == "selector-experiencias"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    document.getElementById("selector-colecciones").style.background = "#000073";
    document.getElementById("selector-colecciones").style.borderTopLeftRadius = "20px";
    document.getElementById("selector-colecciones").style.borderBottomLeftRadius = "20px";
    document.getElementById("selector-colaboraciones").style.background = "#000073";
    document.getElementById("selector-colaboraciones").style.borderTopRightRadius = "20px";
    document.getElementById("selector-colaboraciones").style.borderBottomRightRadius = "20px";

    donde = 'exp';
    //Cargar las experiencias del usuario
    fillPopupUserExperience(document.getElementById("email-user").innerHTML);
  }
  if (pestana.id == "selector-colaboraciones"){
    //Cambiar color de la pestaña
    pestana.style.background = "#483d8b";
    pestana.style.borderTopRightRadius = "20px";
    pestana.style.borderBottomRightRadius = "20px";
    document.getElementById("selector-experiencias").style.background = "#000073";
    document.getElementById("selector-colecciones").style.background = "#000073";
    document.getElementById("selector-colecciones").style.borderTopLeftRadius = "20px";
    document.getElementById("selector-colecciones").style.borderBottomLeftRadius = "20px";

    donde = 'colab';
    //Cargar las colaboraciones del usuario
    fillPopupUserColabs(document.getElementById("email-user").innerHTML);
  }
}

function fillPopupUserCollection(email) {
  let experienceGrid = "";

  users = getUsersCookies();
  for (let k = 0; k < users.length; k++){
    user=JSON.parse(users[k]);
    if(user.email == email){

      //Muestro todas las collecciones
      for(var j=0; j<user.collections.length; j++){

        experienceGrid += "<div class=\"user-grid-item\">"+
                              "<div class=\"fondo1\">"+
                                  "<div>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"fondo2\">"+
                                  "<div>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"fondo3\">"+
                                  "<div>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"user-experience-picture\" onclick=\"openCollection(this)\">"+
                                "<a href=\"#popcolec-portada\">"+
                                  "<img src="+user.collections[j].portada+" alt=\"picture\">"+
                                "</a>"+
                                "<h3>"+user.collections[j].titulo+"</h3>"+
                                "<h2>"+user.username+"</h2>"+
                              "</div>"+
                              "<div class=\"logo-colec\">"+
                                  "<div class=\"logo-coleccion\">"+
                                      "<img src=\"images/iconos/libro.png\" alt=\"coleccion\">"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"user-grid-title\">"+
                                  "<h3>"+user.collections[j].titulo+"</h3>"+
                                  "<div class=\"user-grid-iconos\">"+
                                          "<div class=\"user-grid-longitud\">"+
                                              "<img id=\"colecc-icon\" src=\"images/iconos/coleccion.png\" alt=\"colecc\">"+
                                              "<p>"+user.collections[j].experiences.length+"</p>"+
                                          "</div>"+
                                          "<div class=\"user-grid-mg\">"+
                                              "<img id=\"menu-compartir\" src=\"images/iconos/icons8-compartir-30.png\" alt=\"colecc\"  onclick=\"openShare()\">"+
                                          "</div>"+
                                      "</div>"+
                              "</div>"+
                          "</div>";
        
      }
    } 
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\">No tiene colecciones</p><img src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    document.getElementById("user-experiences-grid").style.fontSize = "30px";
  }
  else {
    document.getElementById("user-experiences-grid").style.fontSize = "";
  }
  myexperiencesGrid = document.getElementById("user-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;
}

function fillPopupUserExperience(email){
  let experienceGrid = "";
  let experiences=getExpCookies();

  users = getUsersCookies();
  for (let k = 0; k < users.length; k++){
    user=JSON.parse(users[k]);
    if(user.email == email){

      for(let i = 0; i < user.experiences.length; i++){

        //Busco su experiencia correspondiente
        for(var j=0; j<experiences.length; j++){
          exp=JSON.parse(experiences[j]);
          if(exp.creador==user.username && exp.title == user.experiences[i]){
            let src="images/iconos/heart-regular-24.png";
            if(loggedInEmail!=""){
              if(doILike(exp.creador, exp.title)==true){
                src="images/iconos/heart-solid-24.png";
              }
            }

            experienceGrid += "<div class=\"user-grid-item\" >"+
                                "<div class=\"user-experience-picture\" onclick=\"openExp(this)\">"+
                                  "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                                  "<h3>"+exp.title+"</h3>"+
                                "</div>"+
                                "<div class=\"user-grid-title\">"+
                                    "<h3>"+exp.title+"</h3>"+
                                    "<div class=\"user-grid-iconos\">"+
                                        "<div class=\"user-grid-mg\">"+
                                            "<img id=\"exp-like-icon-user"+exp.title+"\" src="+src+" alt=mg  onclick=\"LikeOut(this)\">"+
                                            "<p id=\"exp-likes-user"+exp.title+"\">"+exp.likes+"</p>"+
                                        "</div>"+
                                        "<div class=\"user-grid-comment\">"+
                                          "<a  href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/icons8-burbuja-de-diаlogo-24.png\" alt=\"comment\" onclick=\"preComment(this)\"></a>"+
                                          "<p id=\"exp-comments-user"+exp.title+"\">"+exp.comments.length+"</p>"+
                                        "</div>"+
                                        "<div class=\"user-grid-menu\">"+
                                            "<img id=\"user-"+exp.title+"\" class=\"user-tres-puntos\" onclick=\"openMoreOpPopup(this)\" src=\"images/iconos/mas-negro.png\" alt=\"mas\">"+
                                            "<ul class=\"user-menu-ul\" id=\"menu-ul-pop"+exp.title+"\">"+
                                                "<li class=\"menu-li\" id=\"menu-compartir\" onclick=\"openShare()\">"+
                                                    "<p>Compartir</p>"+  
                                                    "<img src=\"images/iconos/compartir_gris.png\" alt=\"compartir\">"+
                                                "</li>"+
                                                "<li class=\"menu-li colec-menu\" id=\"menu-anadir-mycoleccion"+exp.title+"\"  onclick=\"anadirColeccion(this)\">"+
                                                  "<div class=\"añadir-colec-header\"><p>Añadir a colección</p>"+  
                                                  "<img src=\"images/iconos/anadir_gris.png\" alt=\"añadir\"></div>"+
                                                  "<ul class=\"user-menu-ul-add-colec\" id=\"menu-ul-mycolec"+ exp.title + "\">"+
                                                  "</ul>"+
                                                "</li>"+
                                                
                                                "<li class=\"menu-li\ menu-cancelar\" id=\"menu-cancelar"+exp.title+"\" onclick=\"closeMoreOpPopup(this)\">Cancelar</li>"+
                                            "</ul>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";
          }
        }
      }
    } 
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\">No tiene experiencias</p><img src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    document.getElementById("user-experiences-grid").style.fontSize = "30px";
  }
  else {
    document.getElementById("user-experiences-grid").style.fontSize = "";
  }
  myexperiencesGrid = document.getElementById("user-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;

  if(loggedInEmail != "" && !experienceGrid.includes("cara-triste")){
    Array.from(myexperiencesGrid.childNodes).forEach(experience => {
      experience.childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[1].addEventListener("mouseenter", function(event){
        tituloExperiencia = experience.childNodes[1].childNodes[0].innerText;
        menuListaAnadeMyColeccion("menu-ul-mycolec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[1].addEventListener("click", function(event){
        tituloExperiencia = experience.childNodes[1].childNodes[0].innerText;
        menuListaAnadeMyColeccion("menu-ul-mycolec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[1].addEventListener("mouseleave", function(event){
        experience.childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].innerHTML = "";
      })
    })
  }
}

function menuListaAnadeMyColeccion(listaElement, nombreExperiencia){
  if(nombreExperiencia == ""){
    document.getElementById("lista-colec-myexp").style.display = "flex";
    if(document.getElementById("user-menu-ul-container-id").style.display == "flex"){
      document.body.style.overflowY = "hidden";
      document.getElementById("user-menu-ul-container-id").style.display = "none";
      return;
    }
    document.getElementById("user-menu-ul-container-id").style.display = "flex";
    nombreExperiencia = document.getElementById("experience-title").innerHTML;
  
    if(loggedInEmail == ""){
      document.getElementById("login").style.display = "block";
      document.getElementById("user-menu-ul-container-id").style.display = "none";
      //lastPopUp = "popup-grid-item";
      //document.getElementById("popup-grid-item").style.display = "none";
      return;
    }
  }


  let ec = getExpCookies();
  let creador="";
  for(var j=0; j<ec.length; j++){
    let exp=JSON.parse(ec[j]);
    if(exp.title==nombreExperiencia){
      ////console.log(exp.title);
      creador=exp.creador;
      }
    }
    let checkExp=creador+"+"+nombreExperiencia;
    let html = "";
    let uc=getUsersCookies();
    for (let i=0; i<uc.length; i++){
    let myuser=JSON.parse(uc[i]);
    if(myuser.email==loggedInEmail){
      if(myuser.collections.length<1){

        html+= "<li class=\"menu-li no-colec\">" +
        "<p><i>No hay colecciones registradas :(</i></p>"+ "</li>";
      }else{
        for(let j=0; j<myuser.collections.length; j++){

          if(myuser.collections[j].experiences.indexOf(checkExp)==-1){
            
            html+= "<li class=\"menu-li\" onclick=\"addExpToMyCollection('"+nombreExperiencia+"', '"+myuser.collections[j].titulo+"')\">" +
            "<p>"+myuser.collections[j].titulo+"</p>"+ "</li>";
          }
        }
        if(html==""){
          html+= "<li class=\"menu-li no-colec\">" +
          "<p><i>Ya se encuentra en todas tus colecciones</i></p>"+ "</li>";
        }
      }
    }
  }
  ////console.log(html);
  ////console.log(listaElement);
  document.getElementById(listaElement).innerHTML = html;
}

function addExpToMyCollection(experience, coleccion){
  ////console.log("Los argumentos son: ");
  ////console.log(experience);
  ////console.log(coleccion);
  
  users = getUsersCookies();
  for (let i = 0; i < users.length; i++){
    user = JSON.parse(users[i]);
    if (user.email == loggedInEmail){
      break;
    }
  }

  let ec = getExpCookies();
  let creador="";
  for(var j=0; j<ec.length; j++){
    let exp=JSON.parse(ec[j]);
    if(exp.title==experience){
      ////console.log(exp.title);
      creador=exp.creador;
    }
  }

  for(var z=0; z <user.collections.length; z++){
    if(user.collections[z].titulo==coleccion){
      let addExp=creador+"+"+experience;
      ////console.log(addExp);
      user.collections[z].experiences.push(addExp);
    }  
  }

  setCookie(user.email, JSON.stringify(user), 10);
  if(document.getElementById("popup-grid-item").style.display == "flex"){
    document.getElementById("user-menu-ul-container-id").style.display = "none";
    document.getElementById("lista-colec-myexp").innerHTML="";

  } else {
    document.getElementById("menu-ul-mycolec"+experience).innerHTML="";
    ////console.log("menu-ul-pop"+experience);
    document.getElementById("menu-ul-pop"+experience).style.display = "none";
  }
  
  // lanza el snackbar para añadir experiencias a colecciones
  document.getElementById("snackbarbody").style.display="block";
  document.getElementById("snackbarbody").innerHTML = "Experiencia añadida correctamente a la colección";
  setTimeout(function() {
    document.getElementById("snackbarbody").style.display="none";},2000);

}

function fillPopupUserColabs(email) {
  let experienceGrid = "";
  let experiences=getExpCookies();

  users = getUsersCookies();
  for (let k = 0; k < users.length; k++){
    user=JSON.parse(users[k]);
    if(user.email == email){

      //Busco su experiencia correspondiente
      for(var j=0; j<experiences.length; j++){
        exp=JSON.parse(experiences[j]);
        if(exp.colaborador.includes(user.username)){

          let src="images/iconos/heart-regular-24.png";
          if(loggedInEmail!=""){
            if(doILike(exp.creador, exp.title)==true){
              src="images/iconos/heart-solid-24.png";
            }
          }

          experienceGrid += "<div class=\"user-grid-item\" >"+
                              "<div class=\"user-experience-picture\" onclick=\"openExp(this)\">"+
                                "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                                "<h3>"+exp.title+"</h3>"+
                                "<p id=\"colab-"+exp.title+"\"> Por: "+exp.creador+"</p>"+
                              "</div>"+
                              "<div class=\"logo-colab\">"+
                                  "<div>"+
                                      "<img src=\"images/iconos/colaborador.png\" alt=\"colaborar\">"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"user-grid-title\">"+
                                  "<h3>"+exp.title+"</h3>"+
                                  "<p> Creada por: "+exp.creador+"</p>"+
                                  "<div class=\"user-grid-iconos\">"+
                                      "<div class=\"user-grid-mg\">"+
                                          "<img id=\"exp-colab-like-icon"+exp.title+"\" src="+src+" alt=\"mg\"  onclick=\"LikeOut(this)\">"+
                                          "<p id=\"exp-colab-likes"+exp.title+"\">"+exp.likes+"</p>"+
                                      "</div>"+
                                      "<div class=\"user-grid-comment\">"+
                                        "<a href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/icons8-burbuja-de-diаlogo-24.png\" alt=\"comment\" onclick=\"preComment(this)\"></a>"+
                                        "<p id=\"exp-comments-t"+exp.title+"\">"+exp.comments.length+"</p>"+
                                      "</div>"+
                                      "<div class=\"user-grid-menu\">"+
                                            "<img id=\"user-"+exp.title+"\" class=\"user-tres-puntos\" onclick=\"openMoreOpPopup(this)\" src=\"images/iconos/mas-negro.png\" alt=\"mas\">"+
                                            "<ul class=\"user-menu-ul\" id=\"menu-ul-pop"+exp.title+"\">"+
                                                "<li class=\"menu-li\" id=\"menu-compartir\" onclick=\"openShare()\">"+
                                                    "<p>Compartir</p>"+  
                                                    "<img src=\"images/iconos/compartir_gris.png\" alt=\"compartir\">"+
                                                "</li>"+
                                                "<li class=\"menu-li colec-menu\" id=\"menu-anadir-mycoleccion"+exp.title+"\"  onclick=\"anadirColeccion(this)\">"+
                                                  "<div class=\"añadir-colec-header\"><p>Añadir a colección</p>"+  
                                                  "<img src=\"images/iconos/anadir_gris.png\" alt=\"añadir\"></div>"+
                                                  "<ul class=\"user-menu-ul-add-colec\" id=\"menu-ul-mycolec"+ exp.title + "\">"+
                                                  "</ul>"+
                                                "</li>"+
                                                
                                                "<li class=\"menu-li\ menu-cancelar\" id=\"menu-cancelar"+exp.title+"\" onclick=\"closeMoreOpPopup(this)\">Cancelar</li>"+
                                            "</ul>"+
                                        "</div>"+

                                  "</div>"+
                              "</div>"+
                          "</div>";
        }
      }
      
    } 
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\">No tiene colaboraciones</p><img src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    document.getElementById("user-experiences-grid").style.fontSize = "30px";
  }
  else {
    document.getElementById("user-experiences-grid").style.fontSize = "";
  }
  myexperiencesGrid = document.getElementById("user-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;

  if(loggedInEmail != "" && !experienceGrid.includes("cara-triste")){
    Array.from(myexperiencesGrid.childNodes).forEach(experience => {
      ////console.log(experience.childNodes[2].childNodes[2].childNodes[2].childNodes[1].childNodes[1]);
      ////console.log(experience.childNodes[0].childNodes[1].innerText)
      experience.childNodes[2].childNodes[2].childNodes[2].childNodes[1].childNodes[1].addEventListener("mouseenter", function(event){
        tituloExperiencia = experience.childNodes[0].childNodes[1].innerText;
        menuListaAnadeMyColeccion("menu-ul-mycolec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[2].childNodes[2].childNodes[2].childNodes[1].childNodes[1].addEventListener("click", function(event){
        tituloExperiencia = experience.childNodes[0].childNodes[1].innerText;
        menuListaAnadeMyColeccion("menu-ul-mycolec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[2].childNodes[2].childNodes[2].childNodes[1].childNodes[1].addEventListener("mouseleave", function(event){
        experience.childNodes[2].childNodes[2].childNodes[2].childNodes[1].childNodes[1].childNodes[1].innerHTML = "";
      })
    })
  }

}


function openCollection(element){
  donde = 'colab';
  let html=element.innerHTML.split("<");
  let username, title;
  for (var i=0; i<html.length; i++){
    if (html[i].indexOf("h3>") == 0) {
      title = html[i].substring(3, html[i].length);
    }
    if (html[i].indexOf("h2>") == 0) {
      username = html[i].substring(3, html[i].length);
    }
  }

  fillPopupUserCollectionOpen(username, title);
  document.getElementById("popup-coleccion-item").style.display = "flex";
  document.getElementById("popup-coleccion-item").style.zIndex = 100;
  document.body.style.overflowY = "hidden";
}



function closeCollection(){
  document.getElementById("popup-coleccion-item").style.display = "none";
}

function fillPopupUserCollectionOpen(username, title){
  let users = getUsersCookies();
  experienceGrid = '';
  for(var i=0; i<users.length; i++){
    user=JSON.parse(users[i]);
    if(user.username == username){
      //Una vez estoy en el usuario necesito saber cual es su coleccion que quiere ver
      for (let j = 0; j < user.collections.length; j++){
        if (user.collections[j].titulo == title){
          //Estoy en la coleccion, necesito guardar todas las experiencias que contiene
          document.getElementById("popcolec-portada").src = user.collections[j].portada;
          document.getElementById("colec-name").innerHTML = title;
          document.getElementById("colec-descripcion").innerHTML = user.collections[j].descripcion;
          document.getElementById("popcolec-coleccion").innerHTML = user.collections[j].experiences.length;

          //Busco las experiencias
          let experiences = getExpCookies();
          for (let k = 0; k < experiences.length; k++){
            exp = JSON.parse(experiences[k]);
            //Ahora esta experiencia veo si forma parte de las colecciones del usuario
            for (let z = 0; z < user.collections[j].experiences.length; z++){
              let entero = user.collections[j].experiences[z].split('+');
              if (exp.creador == entero[0] && exp.title == entero[1]){
                let src="images/iconos/heart-regular-24.png";
                if(loggedInEmail!=""){
                  if(doILike(exp.creador, exp.title)==true){
                    src="images/iconos/heart-solid-24.png";
                  }
                }
                experienceGrid += "<div class=\"user-grid-item\" >"+
                                    "<div class=\"user-experience-picture\" onclick=\"openExp(this)\">"+
                                      "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                                      "<h3>"+exp.title+"</h3>"+
                                      "<p>Por: "+exp.creador+"</p>"+
                                      "<pre id =\"creador"+exp.title+"\">"+exp.creador+"</pre>"+
                                    "</div>"+
                                    "<div class=\"user-grid-title\">"+
                                        "<h3>"+exp.title+"</h3>"+
                                        "<div class=\"user-grid-iconos\">"+
                                            "<div class=\"user-grid-mg\">"+
                                                "<img id=\"exp-like-icon-user-colec"+exp.title+"\" src="+src+" alt=\"mg\"  onclick=\"LikeOut(this)\">"+
                                                "<p id=\"exp-likes-user-colec"+exp.title+"\">"+exp.likes+"</p>"+
                                            "</div>"+
                                            "<div class=\"user-grid-comment\">"+
                                              "<a href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/icons8-burbuja-de-diаlogo-24.png\" alt=\"comment\" onclick=\"preComment(this)\"></a>"+
                                              "<p id=\"exp-comments-t"+exp.title+"\">"+exp.comments.length+"</p>"+
                                            "</div>"+
                                            "<div class=\"user-grid-menu\">"+
                                                "<img id=\"user-"+exp.title+"\" class=\"user-tres-puntos\" onclick=\"openMoreOpPopup(this)\" src=\"images/iconos/mas-negro.png\" alt=\"mas\">"+
                                                "<ul class=\"user-menu-ul\" id=\"menu-ul-pop"+exp.title+"\">"+
                                                    "<li class=\"menu-li\" id=\"menu-compartir\" onclick=\"openShare()\">"+
                                                        "<p>Compartir</p>"+  
                                                        "<img src=\"images/iconos/compartir_gris.png\" alt=\"compartir\">"+
                                                    "</li>"+
                                                    "<li class=\"menu-li\" id=\"menu-anadir-coleccion"+exp.title+"\"  onclick=\"anadirColeccion(this)\">"+
                                                        "<p>Añadir a colección</p>"+  
                                                        "<img src=\"images/iconos/anadir_gris.png\" alt=\"añadir\">"+
                                                    "</li>"+
                                                    "<li class=\"menu-li\ menu-cancelar\" id=\"menu-cancelar"+exp.title+"\" onclick=\"closeMoreOpPopup(this)\">Cancelar</li>"+
                                                "</ul>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>";
              }
            }
          }
        }
      }
    }
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\" id=\"no-tiene-colecc\">La coleccion no tiene experiencias</p><img id=\"cara-triste-colecc\" src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
  }
  myexperiencesGrid = document.getElementById("user-collection-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;
}

/*Ver mas experiencias*/
function viewMoreExp(element){
  let texto = element.innerHTML;
  if (texto.includes("Ver")){
    element.innerHTML = "Cerrar todas las experiencias";
    document.getElementById("titulo-experiencias").innerHTML = "Todas las experiencias";
    buildTotalExperiences(getExpCookies());
  }
  else {
    element.innerHTML = "Ver todas las experiencias";
    document.getElementById("titulo-experiencias").innerHTML = "Experiencias más visitadas";
    buildInitialExperiences(getExpCookies());
  }
}

function buildTotalExperiences(experiences){

  let experiencesGrid = "";

  for(let i = 0; i < experiences.length; i++){

  exp=JSON.parse(experiences[i]);

  let src_t="images/iconos/mg.png";
  if(loggedInEmail!=""){
    if(doILike(exp.creador, exp.title)==true){
      ////console.log("he dado mg");
      src_t="images/iconos/heart-solid-24.png";
      ////console.log(src_t);
    }
  }
    experiencesGrid+= "<div class=\"grid-item\">"+
                      "<div class=\"experience-picture\">"+
                          "<a href=\"#popexp-portada\">"+
                          "<div class=\"grid-overlay-container\" onclick=\"openExp(this)\">"+
                              "<div class=\"grid-overlay\"></div>"+
                              "<div class=\"grid-title\"><h3>"+exp.title+"</h3>"+
                                  "<div class=\"grid-line\" id=\"creador"+exp.title+"\"><p>Por: "+exp.creador+"</p></div>"+
                              "</div>"+
                          "</div>"+
                          "</a>"+
                          "<div class=\"grid-mg\">"+
                              "<img id=\"exp-like-icon"+exp.title+"\" src="+src_t+" alt=\"mg\"  onclick=\"LikeOut(this)\">"+
                              "<p id=\"exp-likes"+exp.title+"\">"+exp.likes+"</p>"+
                          "</div>"+
                          "<div class=\"grid-comment\">"+
                              "<a href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/comment.png\" alt=\"comment\" onclick=\"preComment(this)\"></a>"+
                              "<p id=\"exp-comments"+exp.title+"\">"+exp.comments.length+"</p>"+
                          "</div>"+
                          "<div class=\"grid-menu\">"+
                              "<img id=\""+exp.title+"\" class=\"tres-puntos\" onclick=\"openMoreOp(this)\" src=\"images/iconos/mas.png\" alt=\"mas\">"+
                              "<ul class=\"menu-ul\" id=\"menu-ul"+exp.title+"\">"+
                                  "<li class=\"menu-li\" id=\"menu-compartir\" onclick=\"openShare()\">"+
                                      "<p>Compartir</p>"+  
                                      "<img src=\"images/iconos/compartir_gris.png\" alt=\"compartir\">"+
                                  "</li>"+
                                  "<li class=\"menu-li colec-menu\" id=\"menu-anadir-coleccion"+exp.title+"\"  onclick=\"anadirColeccion(this)\">"+
                                      "<div class=\"añadir-colec-header\"><p>Añadir a colección</p>"+  
                                      "<img src=\"images/iconos/anadir_gris.png\" alt=\"añadir\"></div>"+
                                      "<ul class=\"user-menu-ul-add-colec\" id=\"menu-ul-colec"+ exp.title + "\">"+
                                      "</ul>"+
                                  "</li>"+
                                  "<li class=\"menu-li\ menu-cancelar\" id=\"menu-cancelar"+exp.title+"\" onclick=\"closeMoreOp(this)\">Cancelar</li>"+
                              "</ul>"+
                              /*<ul class=user-menu-ul id="menu-ul-colec"+exp.title>
                                    <li class=menu-li onclick=addExpToCollection("exp.title")></li>
                                      <p>exp.title</p>
                                    </li>
                                </ul>*/
                          "</div>"+
                          "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                      "</div>"+
                    "</div>";
  }
  ////console.log(experiencesGrid);

  myexperiencesGrid = document.getElementById("initial-experiences-grid");
  myexperiencesGrid.innerHTML = experiencesGrid;

  ////console.log("USUARIO: " + loggedInEmail);
  if(loggedInEmail != ""){
    Array.from(myexperiencesGrid.childNodes).forEach(experience => {
      experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].addEventListener("mouseenter", function(event){
        tituloExperiencia = experience.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;
        menuListaAnadeColeccion("menu-ul-colec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].addEventListener("click", function(event){
        tituloExperiencia = experience.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerText;
        menuListaAnadeColeccion("menu-ul-colec"+ tituloExperiencia, tituloExperiencia)
      })
      experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].addEventListener("mouseleave", function(event){
        experience.childNodes[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerHTML = "";
      })
    })
  }
}


/*Abrir more options popup user*/
function openMoreOpPopup(element) {
  let idTresPuntos = document.getElementById(element.id);
  document.getElementById("menu-ul-pop"+idTresPuntos.id.slice(5)).style.display = "flex";
}
function closeMoreOpPopup(element) {
  let idTresPuntos = document.getElementById(element.id);
  document.getElementById("menu-ul-pop"+idTresPuntos.id.slice(13)).style.display = "none";
}

function collectionMenuOptions(element){
  ////console.log("menu-ul-pop"+element.id.substring(element.id.length -1));
  document.getElementById("menu-ul-pop"+element.id.substring(element.id.length -1)).style.display = "flex";
}

function closeCollectionMenuOptions(element){
  let idTresPuntos = document.getElementById(element.id);
  ////console.log("menu-ul-pop"+idTresPuntos.id.slice(12))
  document.getElementById("menu-ul-pop"+idTresPuntos.id.slice(13)).style.display = "none";
}

function viewMoreUsers(element){
  let texto = element.innerHTML;
  if (texto.includes("Ver")){
    element.innerHTML = "Cerrar ranking completo";
    document.getElementById("ranking-completo").style.display = "block";
    actualizarMoreUsers();
  }
  else {
    element.innerHTML = "Ver ranking completo";
    document.getElementById("ranking-completo").style.display = "none";
  }
}

function actualizarMoreUsers(){
  //Saco los mg y las experiencias de cada uno
  likesUsers(getUsersCookies());
  //Los ordeno
  users_ordered = orderedUsers(getUsersCookies());

  //Dejo fuera los tres primeros
  let usersMore = "";
  for(let i = 3; i < users_ordered.length; i++){
    
    user = JSON.parse(users_ordered[i]);
    usersMore+="<li onclick=\"openUser(this)\">"+
                  "<div>"+
                    "<p class=\"puesto\">"+(i+1)+"</p>"+
                    "<h3>"+user.username+"</h3>"+
                  "</div>"+
                  "<div>"+
                    "<img src=\"images/iconos/mg-black.png\" alt=\"mg\">"+
                    "<p>"+user.likes+"</p>"+
                    "<img src=\"images/iconos/pub.png\" alt=\"pub\">"+
                    "<p>"+user.experiences.length+"</p>"+
                  "</div>"+
                "</li>";
  }
  myusersMore = document.getElementById("lista-ranking");
  myusersMore.innerHTML = usersMore;
}

/*PLANIFICAR*/
function openPlanificar(){
  document.getElementById("popup-planificar").style.display = "flex";
  document.body.style.overflowY = "hidden";
}

function closePlanificar(){
  document.getElementById("popup-planificar").style.display = "none";
  document.body.style.overflowY = "visible";
  //Vaciarlo
  resetPlanificar();
}

function savePlanificar(){
  content = Array.from(document.querySelectorAll('#planificar-form input'));
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      // quita el mensaje de error
      let errorMessage = "error-" + element.id;
      document.getElementById(errorMessage).style.visibility = "hidden";
    });
  });

  content2 = Array.from(document.querySelectorAll('#planificar-form textarea'));
  content2.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      // quita el mensaje de error
      let errorMessage = "error-" + element.id;
      document.getElementById(errorMessage).style.visibility = "hidden";
    });
  });

  var validated = true
  /* RELLENAR CON LLAMADAS A MÉTODOS DE VALIDACIÓN */
  if(document.getElementById("plan-titulo").value == ""){
    document.getElementById("plan-titulo").style.border = "2px solid red";
    document.getElementById("error-plan-titulo").innerHTML = "Campo obligatorio"
    document.getElementById("error-plan-titulo").style.visibility = "visible";
    validated = false;
  }
  if(document.getElementById("plan-descripcion").value == ""){
    document.getElementById("plan-descripcion").style.border = "2px solid red";
    document.getElementById("error-plan-descripcion").innerHTML = "Campo obligatorio"
    document.getElementById("error-plan-descripcion").style.visibility = "visible";
    validated = false;
  }
  if(document.getElementById("plan-presupuesto").value == ""){
    document.getElementById("plan-presupuesto").style.border = "2px solid red";
    document.getElementById("error-plan-presupuesto").innerHTML = "Campo obligatorio"
    document.getElementById("error-plan-presupuesto").style.visibility = "visible";
    validated = false;
  }
  if(!validateEmailPlan(document.getElementById("plan-email").value)){
    ////console.log("Invalid email");
    document.getElementById("plan-email").style.border = "2px solid red";
    document.getElementById("error-plan-email").style.visibility = "visible";
    validated = false;
  }

  if(validated){
    closePlanificar();
    document.getElementById("snackbar").style.display="block";
    document.getElementById("snackbar").innerHTML = "Planificación enviada"
    setTimeout(function() {
      document.getElementById("snackbar").style.display="none";},2000);
  }
}

function validateEmailPlan(email){
  if(email == ""){
    document.getElementById("error-plan-email").innerText = "Campo obligatorio";
    return false;
  }
  	
  let re = new RegExp('^[a-z0-9_.]+@[a-z0-9_]+[.][a-z0-9_]+$')
  ////console.log(email);
  if(!re.test(email)){
    document.getElementById("error-plan-email").innerText = "Formato: nombre@dominio.com";
    return false;
  }
  return true;
}

function resetPlanificar(){
  document.getElementById("planificar-form").reset();
  
  content = Array.from(document.querySelectorAll('#planificar-form input'));
  var all = false;
  content.forEach(element => {
    if (!all){
      // quita el borde rojo
      element.style.border = "";
      // quita el mensaje de error
      let errorMessage = "error-" + element.id;
      ////console.log(errorMessage);
      document.getElementById(errorMessage).style.visibility = "hidden";
      if(errorMessage == "error-plan-presupuesto"){all = true}
    }
  });
  //Descripcion
  descripcion = document.getElementById("plan-descripcion");
  descripcion.value = "";
    // quita el borde rojo
  descripcion.style.border = "";
    // quita el mensaje de error
  let errorMessage = "error-" + descripcion.id;
  ////console.log(errorMessage);
  document.getElementById(errorMessage).style.visibility = "hidden";

  //Email
  email = document.getElementById("plan-email");
    // quita el borde rojo
  email.style.border = "";
    // quita el mensaje de error
  errorMessage = "error-" + email.id;
  ////console.log(errorMessage);
  document.getElementById(errorMessage).style.visibility = "hidden";
}


/* CHAT */
function changeChatState(){
  var display = document.getElementById("conversacion-container").style.display;
  ////console.log(display);
  if(display == "none"){
    document.getElementById("conversacion-container").style.display = "flex";
    document.getElementById("chats-recientes").style.display = "none";
  } else {
    document.getElementById("conversacion-container").style.display = "none";
    document.getElementById("chats-recientes").style.display = "flex";
    document.getElementById("lista-recientes").style.display = "flex";
    document.getElementById("chats-recientes-header-text").innerText = "Conversaciones recientes";
    document.getElementById("volver-chats-buscador").style.display = "none";
    loadRecentConversations();
  }
}

function closeChat(){
  //restaura el estado de conversaciones recientes
  document.getElementById("conversacion-container").style.display = "none";
  document.getElementById("chat-user-search").style.display = "none";
  document.getElementById("lista-busqueda-chat").style.display = "none";
  document.getElementById("chats-recientes").style.display = "flex";
  document.getElementById("lista-recientes").style.display = "flex";

  document.getElementById("search-chat-input").value = "";
  loadRecentConversations();
  //oculta el chat
  document.getElementById("chat-popup").style.display = "none";
}

function showHideChat(){
  //setCookie("fulanito-ricardo", JSON.stringify({"id":"fulanito-ricardo", "conversation":[{"message": "hola qué tal??", "sender": "fulanito", "date": "hoy"},{"message": "bien y tú?", "sender": "ricardo", "date": "ahora"} ]}), 10)

  var display = document.getElementById("chat-popup").style.display;

  if(display == "none"){
    updateNotification();
    document.getElementById("chat-popup").style.display = "flex";
    loadRecentConversations();
  } else {
    closeChat();
  }
}

function updateNotification(){
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;

  var cookie = getCookie("notify-"+loggedinUsername);
  if(cookie != ""){
    // delete the cookie
    document.cookie = "notify-"+loggedinUsername + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // change notification icon
    document.getElementById("chat-icon-header").src = "images/iconos/icons8-chat-bubble-50.png";
    document.getElementById("chat-floating-button-image").src = "images/iconos/icons8-chat-bubble-50.png";
  }
}

function loadRecentConversations(){
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;
  // obtiene las conversaciones en las que aparece 
  var allCookies = document.cookie.split(";");

  var recentConversationsHTML = "";
  conversationCount = 0;
  allCookies.forEach(cookie => {
    conversation = JSON.parse(cookie.split("=")[1]);
    if(conversation.id != undefined){
      namesInConversation = conversation.id.split("-");
      if(namesInConversation.includes(loggedinUsername)){
        namesInConversation.forEach(name => {
          if(name != loggedinUsername && conversation.conversation.length != 0){
            ////console.log(conversation.id);
            photo = "user_azul.png";
            users = getUsersCookies();
            for (let x = 0; x < users.length; x++){
              user = JSON.parse(users[x]);
              if (user.username == name){
                photo = user.photo;
              }
              if (photo == ""){
                photo = "user_azul.png";
              }
            }
            recentConversationsHTML += "<li class=\"lista-recientes-item\" onclick=\"openConversation('"+conversation.id+"')\">" +
            "<div class=\"user-reciente-foto\"><img src=\"images/perfiles/"+photo+"\" alt=\"user\"></div><div class=\"user-reciente-info\">" +
            "<h4>"+name+"</h4><p>"+conversation.conversation.at(-1).message+"</p></div></li>"

            conversationCount += 1; 
          }
        })
      }
    }
  })
  if(conversationCount == 0){
    document.getElementById("lista-recientes").innerHTML = "<h3>No hay conversaciones recientes.</h3><h3>Puedes iniciar una conversación buscando a otro usuario.</h3>";
  } else {
    document.getElementById("lista-recientes").innerHTML = recentConversationsHTML;
  }
}

var currentConversationID = "";
function openConversation(conversationID){

  // cierra el buscador en caso de que esté abierto
  document.getElementById("chat-user-search").style.display = "none";
  document.getElementById("lista-busqueda-chat").style.display = "none";


  ////console.log(conversationID);
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;

  currentConversationID = conversationID

  // obtiene la conversación
  var conversation = getCookie(conversationID);
  if(conversation == ""){
    newCookie = {"id": conversationID, "conversation": []};
    setCookie(conversationID, JSON.stringify(newCookie), 10);
    conversation = newCookie.conversation;
  } else {
    conversation = JSON.parse(conversation).conversation;
  }
  ////console.log(conversation);

  // La plantilla para las conversaciones es:
  //{id: "id-conversacion", conversacion: [{mensaje: , emisor:  , fecha: }, ...]}

  var friend = "";
  if(conversationID.split("-")[0] == loggedinUsername){
    friend = conversationID.split("-")[1];
  } else {
    friend = conversationID.split("-")[0];
  }

  // rellenar con mensajes
  conversationHTML = "";
  conversation.forEach(message => {
    if(message.sender == loggedinUsername){
      conversationHTML += fillMessageRight(message.message);
    } else {
      conversationHTML += fillMessageLeft(message.message);
    }
  });

  // llegados a este punto, el html de la conversación está listo
  document.getElementById("conversacion").innerHTML = conversationHTML;

  // cambiar el nombre en el header
  document.getElementById("conversation-with").innerText = friend;

  // muestra la conversación
  document.getElementById("conversacion-container").style.display = "flex";
  document.getElementById("chats-recientes").style.display = "none";
  // lleva el scrol al final de la conversación
  //document.getElementById("conversacion").scrollIntoView(false);
  document.getElementById("conversacion").scrollTop = document.getElementById("conversacion").scrollHeight;

  //Ponemos foto de perfil
  users = getUsersCookies();
  for (let i = 0; i < users.length; i++){
    user = JSON.parse(users[i])
    if (user.username == friend){
      foto = "images/perfiles/" + user.photo;
      document.getElementById("chat-conversacion-header-usuario").scr = foto;
    }
  }

  // genera el listener para poder enviar mensajes pulsando enter
  document.getElementById("new-message").addEventListener("keyup", function(event){
    if(event.key=='enter'){
      //event.preventDefault();
      event.preventDefault();
      enviarMensaje();
    }
  });

}

function fillMessageLeft(text){
  message = "<div class=\"conversacion-izq\"><p>"+text+"</p></div>";
  return message;

}

function fillMessageRight(text){
  message = "<div class=\"conversacion-derecha\"><p>"+text+"</p></div>";
  return message;
}

function enviarMensaje(){
  ////console.log(document.getElementById("new-message").value);
  // recupera información necesaria
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;
  // obtiene el mensaje enviado
  var message = document.getElementById("new-message").value;
  if(message == ""){
    return false;
  }
  // añade el mensaje a la cookie de la conversación
  var conversationCookie = JSON.parse(getCookie(currentConversationID));
  var conversation = conversationCookie.conversation;

  conversation.push({"message": message, "sender": loggedinUsername, "date": new Date().getTime()})

  ////console.log(conversation);
  conversationCookie.conversation = conversation;

  // elimina el texto de la caja para escribir
  document.getElementById("new-message").value = "";

  //guarda los cambios en la cookie
  setCookie(currentConversationID, JSON.stringify(conversationCookie), 10);
  // añade notificación
  // obtiene el username del que no está logueado
  var notifyUser = "";
  if(currentConversationID.split("-")[0] != loggedinUsername){
    notifyUser = currentConversationID.split("-")[0];
  } else {
    notifyUser = currentConversationID.split("-")[1];
  }
  setCookie("notify-"+notifyUser, JSON.stringify({"conversations": currentConversationID}), 10);


  // recarga la conversación
  openConversation(currentConversationID);

}

function addNotification(user){
  cookie = getCookie("notifications-" + user);
  if(cookie == ""){
    newCookie = {"notifications": 0};
    setCookie("notifications-"+user, newCookie, 10);
  } else {
    cookie = JSON.parse(getCookie("notifications-" + user));  
    cookie.notifications = cookie.notifications + 1;
    setCookie("notifications-"+user, JSON.stringify(cookie), 10);
  }
  document.getElementById("chat-header").style.border = "2px solid red";
}

function deleteNotification(user){
  cookie = getCookie("notifications-" + user);
  if(cookie == ""){
    //nothing to do
  } else {
    cookie = JSON.parse(cookie);
    cookie.notifications = 0;
    setCookie("notifications-"+user, JSON.stringify(cookie), 10);

    document.getElementById("chat-header").style.border = "2px solid white";
  }

}

function showChatSearch(){
  // toggle display none/flex
  var display = document.getElementById("chat-user-search").style.display;

  if(display == "none"){
    document.getElementById("chat-user-search").style.display = "flex";
    document.getElementById("lista-busqueda-chat").style.display = "flex";
    document.getElementById("lista-recientes").style.display = "none";
    document.getElementById("volver-chats-buscador").style.display = "block";
    // Cambia el header
    document.getElementById("chats-recientes-header-text").innerText = "Iniciar nueva conversación";

    searchChat();
  } else {
    document.getElementById("chat-user-search").style.display = "none"
    document.getElementById("lista-busqueda-chat").style.display = "none";
    document.getElementById("lista-recientes").style.display = "flex";
    document.getElementById("chats-recientes-header-text").innerText = "Conversaciones receintes";

    document.getElementById("volver-chats-buscador").style.display = "none";

  }
}

function searchChat(){
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;
  // obtiene el texto a buscar
  var searchUser = document.querySelector("#search-chat-input").value;
  ////console.log(searchUser);
  
  // obtiene todas las cookies
  var allCookies = document.cookie.split(";");
  // filtra para obtener sólo las de las de los usuarios
  let re = new RegExp('^[a-z0-9_.]+@[a-z0-9_]+[.][a-z0-9_]+$');
  //////console.log(allCookies);

  userChatList = [];
  numCoincidencias = 0;

  allCookies.forEach(cookie => {
    cookiename = cookie.split("=")[0];
    cookiename = cookiename.replace(" ", "");
    // si el nombre de la cookie es un email...
    if(re.test(cookiename)){
      // comprobar que el texto buscado hace coincidencia con el usuario
      username = JSON.parse(cookie.split("=")[1]).username;
      //////console.log(cookiename.toLowerCase() + " --- " + loggedInEmail);
      if(username.toLowerCase().includes(searchUser.toLowerCase()) && 
      cookiename.toLowerCase() != loggedInEmail){
        // obtener el username del resultado
        result = JSON.parse(getCookie(cookiename)).username;
        // añadir elemento a la lista resultado
        userChatList.push(result);
        numCoincidencias += 1;
      }
    }
  });

  var resultsHTML = "";
  // con todas las coincidencias, montar la lista 
  userChatList.forEach(username => {
    // construye el id de la conversación (exista o no)
    conversationUsers = [loggedinUsername, username].sort();
    conversationID = conversationUsers[0] + "-" + conversationUsers[1];
    photo = '';
    users = getUsersCookies();
    for (let x = 0; x < users.length; x++){
      user = JSON.parse(users[x]);
      if (user.username == username){
        photo = user.photo;
      }
    }
    resultsHTML +=  "<li class=\"lista-recientes-item\" onclick=\"openConversation('"+conversationID+"')\">" +
    "<div class=\"user-reciente-foto\"><img src=\"images/perfiles/"+photo+"\" alt=\"user\"></div><div class=\"user-reciente-info\">" +
    "<h4>"+username+"</h4><p>"+"</p></div></li>"
  })
  if(numCoincidencias == 0){
    document.getElementById("lista-busqueda-chat").innerHTML = "<h3>No se han encontrado usuarios para la búsqueda " + searchUser + "</h3>";
  } else {
    document.getElementById("lista-busqueda-chat").innerHTML = resultsHTML;
  }
  return false; // avoids changing page
}

function searchColab(){
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;
  // obtiene el texto a buscar
  var searchUser = document.querySelector("#search-colab-input").value;
  //////console.log(searchUser);
  
  // obtiene todas las cookies
  var allCookies = document.cookie.split(";");
  // filtra para obtener sólo las de las de los usuarios
  let re = new RegExp('^[a-z0-9_.]+@[a-z0-9_]+[.][a-z0-9_]+$');

  userColabList = [];
  numCoincidencias = 0;

  allCookies.forEach(cookie => {
    cookiename = cookie.split("=")[0];
    cookiename = cookiename.replace(" ", "");
    
    // si el nombre de la cookie es un email...
    if(re.test(cookiename)){
      // comprobar que el texto buscado hace coincidencia con el usuario
      username = JSON.parse(cookie.split("=")[1]).username;
      ////console.log(cookiename.toLowerCase() + " --- " + loggedInEmail);
      if(username.toLowerCase().includes(searchUser.toLowerCase()) && 
      cookiename.toLowerCase() != loggedInEmail){
        // comprobar que el resultado no esté ya añadido
        addedColabs = document.getElementById("lista-colab").innerHTML.toLowerCase()
        if(!addedColabs.includes(username.toLowerCase())){
          // obtener el username del resultado
          result = JSON.parse(getCookie(cookiename)).username;
          // añadir elemento a la lista resultado
          userColabList.push(result);
          numCoincidencias += 1;
        }
      }
    }
  });

  ////console.log(userColabList);

  var resultsHTML = "";
  userSelected = "";
  // con todas las coincidencias, montar la lista 
  userColabList.forEach(username => {
    photo = 'user_blanco.png';
    users = getUsersCookies();
    for (let x = 0; x < users.length; x++){
      user = JSON.parse(users[x]);
      if (user.username == username){
        photo = user.photo;
        userSelected = username;
      }
      if (photo == ""){
        photo = 'user_azul.png';
      }
    }
    // construye el id de la conversación (exista o no)
    resultsHTML +=  "<li class=\"lista-recientes-item\" onclick=\"addColab(this,'"+userSelected+"','"+photo+"' )\">" +
    "<div class=\"user-reciente-foto\"><img src=\"images/perfiles/"+photo+"\" alt=\"user\"></div><div class=\"user-reciente-info\">" +
    "<h4>"+username+"</h4><p>"+"</p></div></li>"
  });
  if(numCoincidencias == 0){
    document.getElementById("lista-busqueda-colab").innerHTML = "<h3>No se han encontrado usuarios para la búsqueda " + searchUser + "</h3>";
  } else {
    document.getElementById("lista-busqueda-colab").innerHTML = resultsHTML;
  }
  return false; // avoids changing page
}

function addColab(element, username, photo){
  document.getElementById("lista-colab").innerHTML += "<li class=\"lista-recientes-item\">" + "<div class=\"user-reciente-foto\">"+"<img src=\"images/perfiles/"+photo+"\" alt=\"foto\">"+
                                                      "</div><div class=\"user-reciente-info\">" + "<h4>"+username+"</h4><p>"+"</p></div>"+
                                                      "<div class=\"remove-colab-search\" onclick=\"removeCollaboratorSearch('"+username+"')\"><img src=\"images/iconos/x.png\" alt=\"eliminar\"></div></li>";

  resultadosBusqueda = Array.from(document.getElementById("lista-busqueda-colab").childNodes);
  newListaBusqueda = "";
  childPos = 0;
  if(resultadosBusqueda.length != 0){
    resultadosBusqueda.forEach(resultado => {
      resultName = resultado.childNodes[1].childNodes[0].innerText;
      if(resultName != element.childNodes[1].childNodes[0].innerText){
        newListaBusqueda += document.getElementById("lista-busqueda-colab").childNodes[childPos].outerHTML;
      }
      childPos += 1;
    });
    document.getElementById("lista-busqueda-colab").innerHTML = newListaBusqueda;
  }
}

function removeCollaboratorSearch(username){
  newCollabList = "";
  childPos = 0;
  currentCollaborators = Array.from(document.getElementById("lista-colab").childNodes);
  if(currentCollaborators.length != 0){
    currentCollaborators.forEach(collaborator => {
      collabName = collaborator.childNodes[1].childNodes[0].innerText;
      if(collabName != username){
        newCollabList += document.getElementById("lista-colab").childNodes[childPos].outerHTML;
      }
      childPos += 1;
    });
    document.getElementById("lista-colab").innerHTML = newCollabList;
  }
}

function changeMyExperiencesState(element){
  var tabOption = element.id;
  switch (tabOption) {
    case "tab-collections-button":
      //document.getElementById("myexperiences").style.display = "none";
      //document.getElementById("mycollaborations").style.display = "none";
      //document.getElementById("mycollections").style.display = "flex";
      element.style.background = "#483d8b";
      element.style.borderTopLeftRadius = "20px";
      element.style.borderBottomLeftRadius = "20px";
      document.getElementById("tab-experiences-button").style.background = "#000073";
      document.getElementById("tab-collaborations-button").style.background = "#000073";
      document.getElementById("tab-collaborations-button").style.borderTopRightRadius = "20px";
      document.getElementById("tab-collaborations-button").style.borderBottomRightRadius = "20px";
      loadMyCollections(document.getElementById("email-myuser").innerHTML);
      break;
    case "tab-experiences-button":
      //document.getElementById("myexperiences").style.display = "flex";
      //document.getElementById("mycollaborations").style.display = "none";
      //document.getElementById("mycollections").style.display = "none";
      element.style.background = "#483d8b";
      document.getElementById("tab-collections-button").style.background = "#000073";
      document.getElementById("tab-collections-button").style.borderTopLeftRadius = "20px";
      document.getElementById("tab-collections-button").style.borderBottomLeftRadius = "20px";
      document.getElementById("tab-collaborations-button").style.background = "#000073";
      document.getElementById("tab-collaborations-button").style.borderTopRightRadius = "20px";
      document.getElementById("tab-collaborations-button").style.borderBottomRightRadius = "20px";
      loadMyExperiences(document.getElementById("email-myuser").innerHTML);
      break;
    case "tab-collaborations-button":
      //document.getElementById("myexperiences").style.display = "none";
      //document.getElementById("mycollaborations").style.display = "flex";
      //document.getElementById("mycollections").style.display = "none";
      element.style.background = "#483d8b";
      element.style.borderTopRightRadius = "20px";
      element.style.borderBottomRightRadius = "20px";
      document.getElementById("tab-experiences-button").style.background = "#000073";
      document.getElementById("tab-collections-button").style.background = "#000073";
      document.getElementById("tab-collections-button").style.borderTopLeftRadius = "20px";
      document.getElementById("tab-collections-button").style.borderBottomLeftRadius = "20px";
      loadMyCollaboration(document.getElementById("email-myuser").innerHTML);
      break;
    default:
      //Se pone en experiencias
      //document.getElementById("myexperiences").style.display = "flex";
      //document.getElementById("mycollaborations").style.display = "none";
      //document.getElementById("mycollections").style.display = "none";
      document.getElementById("tab-experiences-button").style.background = "#483d8b";
      document.getElementById("tab-collections-button").style.background = "#000073";
      document.getElementById("tab-collections-button").style.borderTopLeftRadius = "20px";
      document.getElementById("tab-collections-button").style.borderBottomLeftRadius = "20px";
      document.getElementById("tab-collaborations-button").style.background = "#000073";
      document.getElementById("tab-collaborations-button").style.borderTopRightRadius = "20px";
      document.getElementById("tab-collaborations-button").style.borderBottomRightRadius = "20px";
      loadMyExperiences(document.getElementById("email-myuser").innerHTML);
      break;
  }
}

function loadMyCollections(email) {
  let experienceGrid = "";

  //Le pongo para añadir una nueva
  //OJOOOOOOOOOOOOOOOOOOO meter el onclick con el pop up
  experienceGrid += "<div class=\"user-grid-item\" onclick=\"showAddCollection()\">"+
                        "<div class=\"fondo1\">"+
                              "<div>"+
                              "</div>"+
                          "</div>"+
                          "<div class=\"fondo2\">"+
                              "<div>"+
                              "</div>"+
                          "</div>"+
                          "<div class=\"fondo3\">"+
                              "<div>"+
                              "</div>"+
                        "</div>"+
                      "<div class=\"user-experience-picture\">"+
                          "<img src=\"images/plus-regular-72.png\" alt=\"Plus\">"+
                      "</div>"+
                      "<div class=\"user-grid-title\">"+
                          "<h3>Añade una nueva coleccion</h3>"+
                      "</div>"+
                    "</div>";

  users = getUsersCookies();
  for (let k = 0; k < users.length; k++){
    user=JSON.parse(users[k]);
    if(user.email == email){

      //Muestro todas las collecciones
      for(var j=0; j<user.collections.length; j++){

        experienceGrid += "<div class=\"user-grid-item\">"+
                              "<div class=\"fondo1\">"+
                                  "<div>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"fondo2\">"+
                                  "<div>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"fondo3\">"+
                                  "<div>"+
                                  "</div>"+
                              "</div>"+
                              "<div class=\"user-experience-picture\" onclick=\"openCollection(this)\">"+
                                "<a href=\"#popcolec-portada\">"+
                                  "<img src="+user.collections[j].portada+" alt=\"picture\">"+
                                "</a>"+
                                "<h3>"+user.collections[j].titulo+"</h3>"+
                                "<h2>"+user.username+"</h2>"+
                              "</div>"+
                              "<div class=\"logo-colec\">"+
                                  "<div class=\"logo-coleccion\">"+
                                      "<img src=\"images/iconos/libro.png\" alt=\"coleccion\">"+
                                  "</div>"+
                                  "<div class=\"colec-delete\" onclick=\"openConfirmDeleteCollection('"+user.collections[j].titulo+"')\"><img src=\"images/iconos/icons8-delete-trash-24.png\" alt=\"eliminar\"/></div>"+
                                  "<div class=\"colec-edit\" onclick=\"openEditCollection('"+user.collections[j].titulo+"', '"+user.username+"')\"><img src=\"images/iconos/icons8-edit-24.png\" alt=\"editar\"/></div>"+
                              "</div>"+
                              "<div class=\"user-grid-title\">"+
                                  "<h3>"+user.collections[j].titulo+"</h3>"+
                                  "<div class=\"user-grid-iconos\">"+
                                          "<div class=\"user-grid-mg\">"+
                                              "<img id=\"mycolecc-icon\" src=\"images/iconos/coleccion.png\" alt=\"colecc\">"+
                                              "<p>"+user.collections[j].experiences.length+"</p>"+
                                          "</div>"+
                                          "<div class=\"user-grid-mg\">"+
                                              "<img id=\"mymenu-compartir\" src=\"images/iconos/icons8-compartir-30.png\" alt=\"colecc\">"+
                                          "</div>"+
                                      "</div>"+
                              "</div>"+
                          "</div>";
        ////console.log(user.collections[j].titulo);
        
      }
    } 
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\">No tienes colecciones</p><img src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    document.getElementById("myuser-experiences-grid").style.fontSize = "30px";
  }
  else {
    document.getElementById("myuser-experiences-grid").style.fontSize = "";
  }
  myexperiencesGrid = document.getElementById("myuser-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;
}

function showAddCollection(){
  // muestra el popup para añadir una colección
  document.getElementById("popup-crear-coleccion").style.display = "flex";
}

function saveCreateColeccion(){
  content = Array.from(document.querySelectorAll('#crear-coleccion-form input'));
  result = {};
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      ////console.log(element);
      if (element.type != "checkbox"){
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        ////console.log(errorMessage);
        document.getElementById(errorMessage).style.display = "none";
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  //Añado los text area
  content = Array.from(document.querySelectorAll('#crear-coleccion-form textarea'));
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      ////console.log(element);
      // quita el mensaje de error
      let errorMessage = "error-" + element.id;
      document.getElementById(errorMessage).style.display = "none";
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  newCollection = {
    portada: '',
    titulo: '',
    descripcion: '',
    experiences: []
  }

  validated = true;
  if(!validatePhotoNewColec(result.crear_coleccion_portada)){
    document.getElementById("crear_coleccion_portada").style.border = "2px solid red";
    document.getElementById("error-crear_coleccion_portada").style.display = "flex";
    validated = false;
  }
  else {
    newCollection.portada = "images/experiences/NEW/";
    if (result.crear_coleccion_portada == ""){
      newCollection.portada += "portada-defecto.png";
    }
    else {
      newCollection.portada += result.crear_coleccion_portada.slice(12);
    }
  }
  if(result.crear_coleccion_titulo == "" || result.crear_coleccion_titulo.length >= 50){
    document.getElementById("crear_coleccion_titulo").style.border = "2px solid red";
    document.getElementById("error-crear_coleccion_titulo").style.display = "flex";
    if (result.crear_coleccion_titulo == ""){
      document.getElementById("error-crear_coleccion_titulo").innerText = "Campo obligatorio";
    }
    else {
      document.getElementById("error-crear_coleccion_titulo").innerText = "No puede tener más de 50 caracteres";
    }
    validated = false;
  }
  else{
    newCollection.titulo = result.crear_coleccion_titulo;
  }
  if(result.crear_coleccion_descripcion == ""){
    document.getElementById("crear_coleccion_descripcion").style.border = "2px solid red";
    document.getElementById("error-crear_coleccion_descripcion").style.display = "flex";
    document.getElementById("error-crear_coleccion_descripcion").innerText = "Campo obligatorio";
    validated = false;
  }
  else{
    newCollection.descripcion = result.crear_coleccion_descripcion;
  }

  ////console.log(result);

  if (validated){
    user = getCookie(loginemail);
    user = JSON.parse(user);
    //Una vez sabes que todo está bien hay que comprobar que no existe una colaboracion para ese usuario con dicho titulo
    let existe = false;
    for (let i = 0; i < user.collections.length; i++){
      if (user.collections[i].titulo == newCollection.titulo){
        existe = true;
        break;
      }
    }

    if (!existe){
      ////console.log(newCollection);
      user.collections.push(newCollection);
      ////console.log(user);
      setCookie(loggedInEmail, JSON.stringify(user), 10); 
      closeCrearColeccion();

      document.getElementById("snackbarbody").style.display="block";
      document.getElementById("snackbarbody").innerHTML = "Colección añadida correctamente";
      setTimeout(function() {
        document.getElementById("snackbarbody").style.display="none";},2000);
      
      loadMyCollections(loggedInEmail);
    }
    else {
      document.getElementById("snackbarbody").style.display="block";
      document.getElementById("snackbarbody").innerHTML = "Ya tienes una coleccion con ese título!";
      setTimeout(function() {
        document.getElementById("snackbarbody").style.display="none";},2000);
    }
  }
}

function validatePhotoNewColec(photo){
  if(photo == ""){
    return true;
  }
  let re = new RegExp("(gif|jpe?g|tiff?|png|webp|bmp)$");
  if(!re.test(photo.split('.')[1])){
    document.getElementById("error-crear_coleccion_portada").innerText = "Selecciona una imagen";
    return false
  }
  return true;
}

function borrar_imagen_coleccion (){
  document.getElementById("crear_coleccion_portada").value = "";
  document.getElementById("error-crear_coleccion_portada").style.display = "none";
  document.getElementById("crear_coleccion_portada").style.border = "";
}
function closeCrearColeccion(){
  document.getElementById("popup-crear-coleccion").style.display = "none";
  resetCreateColeccion();
}

function resetCreateColeccion(){
  document.getElementById("crear-coleccion-form").reset();
  document.getElementById("crear_coleccion_portada").style.border = "";
  document.getElementById("error-crear_coleccion_portada").style.display = "none";
  document.getElementById("crear_coleccion_titulo").style.border = "";
  document.getElementById("error-crear_coleccion_titulo").style.display = "none";
  document.getElementById("crear_coleccion_descripcion").style.border = "";
  document.getElementById("error-crear_coleccion_descripcion").style.display = "none";
}

var deletingCollection = "";
function openConfirmDeleteCollection(tituloColeccion){
  deletingCollection = tituloColeccion;
  document.getElementById("confirm-delete-collection").style.display = "block";
}
function closeConfirmDeleteCollection(){
  document.getElementById("confirm-delete-collection").style.display = "none";
  deletingCollection = "";
}

function deleteCollection(){
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  
  collections = loggedinCookie.collections;
  for(i = 0; i<collections.length; i++){
    if(collections[i].titulo == deletingCollection){
      collections.splice(i,1);
      break;
    }
  }

  setCookie(loggedInEmail, JSON.stringify(loggedinCookie), 10);
  loadMyCollections(loggedInEmail);
  closeConfirmDeleteCollection();

}

function loadMyExperiences(email){
  let experienceGrid = "";
  let experiences=getExpCookies();

  //Le pongo para añadir una nueva
  //OJOOOOOOOOOOOOOOOOOOO meter el onclick con el pop up
  experienceGrid += "<div class=\"user-grid-item\">"+
                      "<div class=\"user-experience-picture\" onclick=\"openMyExpNew()\">"+
                          "<img src=\"images/plus-regular-72.png\" alt=\"Plus\">"+
                      "</div>"+
                      "<div class=\"user-grid-title\">"+
                          "<h3>Añade una nueva experiencia</h3>"+
                      "</div>"+
                    "</div>";

  users = getUsersCookies();
  for (let k = 0; k < users.length; k++){
    user=JSON.parse(users[k]);
    if(user.email == email){

      for(let i = 0; i < user.experiences.length; i++){

        //Busco su experiencia correspondiente
        for(var j=0; j<experiences.length; j++){
          exp=JSON.parse(experiences[j]);
          if(exp.creador==user.username && exp.title == user.experiences[i]){
            let src="images/iconos/heart-regular-24.png";
            if(loggedInEmail!=""){
              if(doILike(exp.creador, exp.title)==true){
                src="images/iconos/heart-solid-24.png";
              }
            }

            experienceGrid += "<div class=\"user-grid-item\" >"+
                                "<div class=\"exp-delete\" onclick=\"openConfirmDeleteExperience('"+exp.creador+"+"+exp.title+"')\"><div class=\"img-exp-del\"><img src=\"images/iconos/icons8-delete-trash-24.png\" alt=\"eliminar\"/></div></div>"+
                                "<div class=\"exp-edit\" onclick=\"openEditExperience('"+exp.creador+"','"+exp.title+"')\"><div class=\"img-exp-edit\"><img src=\"images/iconos/icons8-edit-24.png\" alt=\"editar\"/></div></div>"+
                                "<div class=\"user-experience-picture\" onclick=\"openExp(this)\">"+
                                  "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                                  "<h3>"+exp.title+"</h3>"+
                                  "<p> Por: "+exp.creador+"</p>"+
                                "</div>"+
                                "<div class=\"user-grid-title\">"+
                                    "<h3>"+exp.title+"</h3>"+
                                    "<div class=\"user-grid-iconos\">"+
                                        "<div class=\"user-grid-mg\" style=\"cursor: default\">"+
                                            "<img id=\"exp-like-icon-user"+exp.title+"\" src="+src+" alt=\"mg\">"+
                                            "<p id=\"exp-likes-user"+exp.title+"\">"+exp.likes+"</p>"+
                                        "</div>"+
                                        "<div class=\"user-grid-comment\" style=\"cursor: default\">"+
                                          "<a  href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/icons8-burbuja-de-diаlogo-24.png\" alt=\"comment\"></a>"+
                                          "<p id=\"exp-comments-t"+exp.title+"\">"+exp.comments.length+"</p>"+
                                        "</div>"+
                                        
                                    "</div>"+
                                "</div>"+
                            "</div>";
          }
        }
      }
    } 
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\">No tienes experiencias</p><img src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    document.getElementById("myuser-experiences-grid").style.fontSize = "30px";
  }
  else {
    document.getElementById("myuser-experiences-grid").style.fontSize = "";
  }
  myexperiencesGrid = document.getElementById("myuser-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;
}
//Borar experiencia
var deletingExperience = "";
function openConfirmDeleteExperience(tituloExperiencia){
  deletingExperience = tituloExperiencia;
  document.getElementById("confirm-delete-experience").style.display = "block";
}

function closeConfirmDeleteExperience(){
  document.getElementById("confirm-delete-experience").style.display = "none";
  deletingExperience = "";
}

function deleteExperience(){
  userCookie = JSON.parse(getCookie(loggedInEmail));
  deleteCookie(deletingExperience);
  likesUsers(getUsersCookies());
  loadMyExperiences(loggedInEmail);
  
  users = getUsersCookies();

  experiences = getExpCookies();
  let texto = document.getElementById("ver-mas-experiencias").innerHTML;
  if (texto.includes("Ver")){
    buildInitialExperiences(experiences);
  }
  else {
    buildTotalExperiences(experiences);
  }
  buildRankingUsers(users);
  actualizarMoreUsers();

  //Hay que borrarla de las posibles colecciones que tenga un usuario
  resetCollections(userCookie);

  closeConfirmDeleteExperience();
}

function resetCollections(user){
  //Recorremos sus experiencias y si no existe la borro de las coleccion
  for(let i=  0; i < user.collections.length; i++){
    //Ahora me meto a las experiencias de esa coleccion
    for (let j = 0; j < user.collections[i].experiences.length; j++){
      existeCookie = getCookie(user.collections[i].experiences[j]);
      ////console.log(user.collections[i].experiences[j]);
      if (existeCookie == ""){
        ////console.log("borra la experiencia esa")
        //Significa que la han borrado la experiencia
        user.collections[i].experiences.splice(j,1);
      }
    }
  }
  setCookie(user.email, JSON.stringify(user), 10);
}
//Editar experiencia
//MARIAAAAAAAAAAAAAAAAAAA
function openEditExperience(user, title){

  // oculta scroll vertical del body
  document.body.style.overflowY = "hidden";
  fillEditExperience(user, title);
  document.getElementById("search-colab-exp-btn").style.display = "flex";  
  document.getElementById("search-colab-exp-input").style.display = "flex";
  document.getElementById("lista-busqueda-colab-exp").style.display = "flex";
  document.getElementById("colaborador-anadido").style.display= "flex";
  mostrarMasEditExp();
}

function fillEditExperience(username, title){
  ////console.log("entra en fillEditExperince");
  ////console.log(username);
  let experiences = getExpCookies();
  document.getElementById("lista-colab-exp").innerHTML = ""

  for(var i=0; i<experiences.length; i++){
    exp = JSON.parse(experiences[i]);
    if(exp.creador == username && exp.title == title){
      document.getElementById("popexp-editar-portada").src = exp.pathpic + exp.gallery[0];
      document.getElementById("editar_experience_title").innerHTML = exp.title;
      document.getElementById("popexp-editar-likes").innerHTML = exp.likes;
      document.getElementById("popexp-editar-comments").innerHTML = exp.comments.length;
      document.getElementById("popexp_editar_gasto").value = exp.gasto;
      document.getElementById("editar_persona").innerHTML = exp.creador;
      //document.getElementById("editar_colaboradores").value = exp.colaborador;
      document.getElementById("editar_fecha").innerHTML = exp.fecha;

      //Para los intereses
      document.getElementById("editar_expculture").checked=exp.culture;
      document.getElementById("editar_expnature").checked=exp.nature;
      document.getElementById("editar_expgastronomy").checked=exp.gastronomy;
      document.getElementById("editar_exphistory").checked=exp.history;
      document.getElementById("editar_expbusiness").checked=exp.business;
      document.getElementById("editar_expsports").checked=exp.sports;

      //Para las pestanas
      document.getElementById("editar_exp_descripcion").value = exp.descripcion;
      document.getElementById("editar_exp_transporte").value = exp.transporte;
      document.getElementById("editar_exp_presupuesto").value = exp.presupuesto;
      document.getElementById("editar_exp_alojamiento").value = exp.alojamiento;

      //Para poner los colaboradores que ya tiene
      colabs = exp.colaborador.split(" ");
      ////console.log(colabs[0]);
      ////console.log(colabs.length);
      users = getUsersCookies();
      for (let j = 0; j < colabs.length; j++){
        for (let z = 0; z < users.length; z++){
          user = JSON.parse(users[z]);
          if (user.username == colabs[j]){
            document.getElementById("lista-colab-exp").innerHTML += "<li class=\"lista-recientes-item\">" + "<div class=\"user-reciente-foto\">"+"<img src=\"images/perfiles/"+user.photo+"\" alt=\"foto\">"+
                                                                    "</div><div class=\"user-reciente-info\">" + "<h4>"+user.username+"</h4><p>"+"</p></div>"+
                                                                    "<div class=\"remove-colab-search\" onclick=\"removeCollaboratorExpSearch('"+user.username+"')\"><img src=\"images/iconos/x.png\" alt=\"eliminar\"></div></li>";
          }
        }
      }

      //Para la galeria
      let id="restoimg";
      let galeria="";
      let gallery_viewer="";
      for(let j = 0; j <exp.gallery.length; j++){
        picture=exp.gallery[j];
        galeria+="<div class=grid-gallery__item  onclick=\"openGalleryViewer(this)\">"+
                    "<img class=\"grid-gallery__image\" src="+exp.pathpic+picture+" alt=\"foto\">"+
                    "<div class=\"borrar-galeria\" onclick=\"borrarGaleria('"+exp.creador+"+"+exp.title+"','"+j+"')\">"+
                      "<img src=\"images/iconos/x.png\" alt=\"borrar-foto\">"+
                    "</div>"+
                  "</div>";

        gallery_viewer+="<img id="+id+j+" src="+exp.pathpic+picture+" alt=\"foto\">"
      }
      mygaleria = document.getElementById("galeria-popupexp-editar");
      mygaleria.innerHTML = galeria;
      mygalleryviewer = document.getElementById("galleryviewer-resto");
      mygalleryviewer.innerHTML = gallery_viewer;
    }
  }
  

  document.getElementById("popup-editar-grid-item").style.display = "flex";
}

function borrarGaleria(exp, posicion){
  expBuena = getCookie(exp);
  expBuena = JSON.parse(expBuena);
  ////console.log(posicion);
  expBuena.gallery.splice(posicion, 1);
  ////console.log(expBuena.gallery);

  if (expBuena.gallery.length == 0){
    expBuena.gallery.push("NoImage.jpg");
  }
  nombreCookie = expBuena.creador +"+"+expBuena.title;
  setCookie(nombreCookie, JSON.stringify(expBuena), 10); 
  
  if (document.getElementById("tab-experiences-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
    //Esta abierto en las experiencias
    openEditExperience(expBuena.creador, expBuena.title);
  }
  else {
    openEditExperienceColab(expBuena.creador, expBuena.title);
  }
}

//Para las editar coleccion
//AQUIIII

function openEditCollection(title, username){

 /*  document.getElementById("popup-coleccion-item").style.display = "flex";
  document.getElementById("popup-coleccion-item").style.zIndex = 100; */
  document.body.style.overflowY = "hidden";
  document.getElementById("popup-coleccion-item-edit").style.display = "flex";
  fillEditCollection(title, username);
}


function fillEditCollection(title, username){
  
  let users = getUsersCookies();
  experienceGrid = '';
  for(var i=0; i<users.length; i++){
    user=JSON.parse(users[i]);
    if(user.username == username){
      //Una vez estoy en el usuario necesito saber cual es su coleccion que quiere ver
      for (let j = 0; j < user.collections.length; j++){
        if (user.collections[j].titulo == title){
          //Estoy en la coleccion, necesito guardar todas las experiencias que contiene
          document.getElementById("popcolec-edit-portada").src = user.collections[j].portada;
          ////console.log(user.collections[j].portada);
          document.getElementById("colec-title-edit").innerHTML = user.collections[j].titulo;
          ////console.log(user.collections[j].descripcion);
          document.getElementById("editar_colec_descripcion").value=user.collections[j].descripcion;
          document.getElementById("popcolec-coleccion-edit").innerHTML=user.collections[j].experiences.length;
        }
      }
    }
  }

  fillEditCollectionExperiences(title, username);

}
  
function fillEditCollectionExperiences(title, username){
  ////console.log("Estoy aquí filleditcollectionexperiences")
  ////console.log(username);
  ////console.log(title);
  let users = getUsersCookies();
  experienceGrid = '';
  for(var i=0; i<users.length; i++){
    user=JSON.parse(users[i]);
    if(user.username == username){
      //Una vez estoy en el usuario necesito saber cual es su coleccion que quiere ver
      for (let j = 0; j < user.collections.length; j++){
        if (user.collections[j].titulo == title){
          //Busco las experiencias
          ////console.log("usuario y exp encontrados");
          let experiences = getExpCookies();
          for (let k = 0; k < experiences.length; k++){
            exp = JSON.parse(experiences[k]);
            //Ahora esta experiencia veo si forma parte de las colecciones del usuario
            for (let z = 0; z < user.collections[j].experiences.length; z++){
              let entero = user.collections[j].experiences[z].split('+');
              if (exp.creador == entero[0] && exp.title == entero[1]){
                let src="images/iconos/heart-regular-24.png";
                if(loggedInEmail!=""){
                  if(doILike(exp.creador, exp.title)==true){
                    src="images/iconos/heart-solid-24.png";
                  }
                }
                experienceGrid += "<div class=\"user-grid-item\" >"+
                                "<div class=\"exp-delete\" onclick=\"openConfirmDeleteExperienceCollection('"+exp.creador+"+"+exp.title+"')\"><div class=\"img-exp-del\"><img src=\"images/iconos/icons8-delete-trash-24.png\" alt=\"eliminar\"/></div></div>"+
                                    "<div class=\"user-experience-picture\" onclick=\"openExp(this)\">"+
                                      "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                                      "<h3>"+exp.title+"</h3>"+
                                      "<p>Por: "+exp.creador+"</p>"+
                                    "</div>"+
                                    "<div class=\"user-grid-title\">"+
                                        "<h3>"+exp.title+"</h3>"+
                                        "<div class=\"user-grid-iconos\">"+
                                            "<div class=\"user-grid-mg\">"+
                                                "<img id=\"exp-like-icon-user"+exp.title+"\" src="+src+" alt=\"mg\"  onclick=\"LikeOut(this)\">"+
                                                "<p id=\"exp-likes-user"+exp.title+"\">"+exp.likes+"</p>"+
                                            "</div>"+
                                            "<div class=\"user-grid-comment\">"+
                                              "<a href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/icons8-burbuja-de-diаlogo-24.png\" alt=\"comment\" onclick=\"preComment(this)\"></a>"+
                                              "<p id=\"exp-comments"+exp.title+"\">"+exp.comments.length+"</p>"+
                                            "</div>"+
                                            "<div class=\"user-grid-menu\">"+
                                                "<img id=\"user-"+exp.title+"\" class=\"user-tres-puntos\" onclick=\"openMoreOpPopup(this)\" src=\"images/iconos/mas-negro.png\" alt=\"mas\">"+
                                                "<ul class=\"user-menu-ul\" id=\"menu-ul-pop"+exp.title+"\">"+
                                                    "<li class=\"menu-li\" id=\"menu-compartir\" onclick=\"openShare()\">"+
                                                        "<p>Compartir</p>"+  
                                                        "<img src=\"images/iconos/compartir_gris.png\" alt=\"compartir\">"+
                                                    "</li>"+
                                                    "<li class=\"menu-li\" id=\"menu-anadir-coleccion"+exp.title+"\" onclick=\"anadirColeccion(this)\">"+
                                                        "<p>Añadir a colección</p>"+  
                                                        "<img src=\"images/iconos/anadir_gris.png\" alt=\"añadir\">"+
                                                    "</li>"+
                                                    "<li class=\"menu-li\ menu-cancelar\" id=\"menu-cancelar"+exp.title+"\" onclick=\"closeMoreOpPopup(this)\">Cancelar</li>"+
                                                "</ul>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>";
              }
            }
          }
        }
      }
    }
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\" id=\"no-tiene-mycolecc\">La coleccion no tiene experiencias</p><img id=\"cara-triste-mycolecc\"src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
  }
  myexperiencesGrid = document.getElementById("user-collection-experiences-grid-edit");
  myexperiencesGrid.innerHTML = experienceGrid;
 }
  
let id_deleteExp="";
function openConfirmDeleteExperienceCollection(id){

  ////console.log(id);
  id_deleteExp=id;
  document.getElementById("deleteExpColecc").style.display = "flex";
}
 
  
function guardarCambiosEditColecc(){
  //Los de experiencias eliminadas ya se han guardado, asi que tienen que guardarse solo la descripción.

  //Recorro los textarea de descripcion y ta
  content = Array.from(document.querySelectorAll('#cambiar-descripcion-popupexp textarea'));
  result = {};
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      element.style.border = "";
      if (element.type != "checkbox"){
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        document.getElementById(errorMessage).style.display = "none";
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  ////console.log(result);

  validated = true;
  if (result.editar_colec_descripcion == ""){
    document.getElementById("editar_colec_descripcion").style.border = "2px solid red";
    document.getElementById("error-editar_colec_descripcion").style.visibility = "visible";
    document.getElementById("error-editar_colec_descripcion").innerHTML = "Campo obligatorio"
    validated = false;
  }
  
  if (validated){
    let title=document.getElementById("colec-title-edit").innerHTML;
    let users = getUsersCookies();
    for(var i=0; i<users.length; i++){
      user=JSON.parse(users[i]);
      if(user.email == loggedInEmail){
        for(var j=0; j<user.collections.length; j++){
          if(user.collections[j].titulo==title){
            user.collections[j].descripcion=document.getElementById("editar_colec_descripcion").value;
            setCookie(user.email, JSON.stringify(user), 10);
            document.getElementById("popup-coleccion-item-edit").style.display = "none";
            document.getElementById("snackbarbody").style.display="block";
            document.getElementById("snackbarbody").innerHTML = "Colección modificada correctamente";
            setTimeout(function() {
              document.getElementById("snackbarbody").style.display="none";},2000);
  
              loadMyCollections(loggedInEmail);
            break;
          }
        }
      }
    }
  }
}


function handle_deleteExpColecc(){
  let id=id_deleteExp;
  let collectiontitle= document.getElementById("colec-title-edit").innerHTML;
  ////console.log(collectiontitle);
  let users = getUsersCookies();
  for(var i=0; i<users.length; i++){
    user=JSON.parse(users[i]);
    if(user.email == loggedInEmail){
      ////console.log("Estoy aquí 2");
      for(var j=0; j<user.collections.length; j++){
        if(user.collections[j].titulo==collectiontitle){
          ////console.log(user.collections[j].experiences.length);
          for(var z=0; z<user.collections[j].experiences.length; z++){
            ////console.log(user.collections[j].experiences[z]);
            ////console.log(id);
            if(user.collections[j].experiences[z]==id){
              ////console.log("He llegado");
              user.collections[j].experiences.splice(z, 1);
              ////console.log(user.collections[j].experiences);
              setCookie(user.email, JSON.stringify(user), 10);
              fillEditCollectionExperiences(user.collections[j].titulo, user.username);
            }
          }
        }
      }
    }
  }
  id_deleteExp="";
  document.getElementById("deleteExpColecc").style.display = "none";
  //document.getElementById("popcolec-coleccion-edit").innerHTML-=1;
  loadMyCollections(loggedInEmail);
}

function mostrarMasEditExp(){
  document.getElementById("exp-editar-info-colaboradores").style.display = "flex";
  document.getElementById("exp-editar-info-fecha").style.display = "flex";
  document.getElementById("editar-mostrarmas").style.display = "none";
  document.getElementById("editar-mostrarmenos").style.display = "flex";
  //Para los intereses
  document.getElementById("editar_exptopic").style.display = "flex";
}
function mostrarMenosEditExp(){
  document.getElementById("exp-editar-info-colaboradores").style.display = "none";
  document.getElementById("exp-editar-info-fecha").style.display = "none";
  document.getElementById("editar-mostrarmas").style.display = "flex";
  document.getElementById("editar-mostrarmenos").style.display = "none";
  //Para los intereses
  document.getElementById("editar_exptopic").style.display = "none";
}

function changeEditPestana(element){
  var tabOption = element.id;
  switch (tabOption) {
    case "pestana-descripcion-editar":
      element.style.background = "#483d8b";
      document.getElementById("pestana-transporte-editar").style.background = "#000073";
      document.getElementById("pestana-presu-editar").style.background = "#000073";
      document.getElementById("pestana-Alojamiento-editar").style.background = "#000073";

      document.getElementById("filter-descripcion-editar").style.display="flex";
      document.getElementById("filter-transporte-editar").style.display = "none";
      document.getElementById("filter-presu-editar").style.display = "none";
      document.getElementById("filter-alojamiento-editar").style.display = "none";
      break;
    case "pestana-transporte-editar":
      element.style.background = "#483d8b";
      document.getElementById("pestana-descripcion-editar").style.background = "#000073";
      document.getElementById("pestana-presu-editar").style.background = "#000073";
      document.getElementById("pestana-Alojamiento-editar").style.background = "#000073";

      document.getElementById("filter-descripcion-editar").style.display="none";
      document.getElementById("filter-transporte-editar").style.display = "flex";
      document.getElementById("filter-presu-editar").style.display = "none";
      document.getElementById("filter-alojamiento-editar").style.display = "none";
      break;
    case "pestana-presu-editar":
      element.style.background = "#483d8b";
      document.getElementById("pestana-descripcion-editar").style.background = "#000073";
      document.getElementById("pestana-transporte-editar").style.background = "#000073";
      document.getElementById("pestana-Alojamiento-editar").style.background = "#000073";

      document.getElementById("filter-descripcion-editar").style.display="none";
      document.getElementById("filter-transporte-editar").style.display = "none";
      document.getElementById("filter-presu-editar").style.display = "flex";
      document.getElementById("filter-alojamiento-editar").style.display = "none";
      break;
    default:
      element.style.background = "#483d8b";
      document.getElementById("pestana-descripcion-editar").style.background = "#000073";
      document.getElementById("pestana-transporte-editar").style.background = "#000073";
      document.getElementById("pestana-presu-editar").style.background = "#000073";

      document.getElementById("filter-descripcion-editar").style.display="none";
      document.getElementById("filter-transporte-editar").style.display = "none";
      document.getElementById("filter-presu-editar").style.display = "none";
      document.getElementById("filter-alojamiento-editar").style.display = "flex";
      break;
  }
}

function searchColabExp(){
  var loggedinCookie = JSON.parse(getCookie(loggedInEmail));
  var loggedinUsername = loggedinCookie.username;
  // obtiene el texto a buscar
  var searchUser = document.querySelector("#search-colab-exp-input").value;
  ////console.log(searchUser);
  
  // obtiene todas las cookies
  var allCookies = document.cookie.split(";");
  // filtra para obtener sólo las de las de los usuarios
  let re = new RegExp('^[a-z0-9_.]+@[a-z0-9_]+[.][a-z0-9_]+$');

  userColabList = [];
  numCoincidencias = 0;

  allCookies.forEach(cookie => {
    cookiename = cookie.split("=")[0];
    cookiename = cookiename.replace(" ", "");
    
    // si el nombre de la cookie es un email...
    if(re.test(cookiename)){
      // comprobar que el texto buscado hace coincidencia con el usuario
      username = JSON.parse(cookie.split("=")[1]).username;
      ////console.log(cookiename.toLowerCase() + " --- " + loggedInEmail);
      if(username.toLowerCase().includes(searchUser.toLowerCase()) && cookiename.toLowerCase() != loggedInEmail){
        // comprobar que el resultado no esté ya añadido
        addedColabs = document.getElementById("lista-colab-exp").innerHTML.toLowerCase()
        if(!addedColabs.includes(username.toLowerCase())){
          // obtener el username del resultado
          result = JSON.parse(getCookie(cookiename)).username;
          // añadir elemento a la lista resultado
          userColabList.push(result);
          numCoincidencias += 1;
        }
      }
    }
  });

  ////console.log(userColabList);

  var resultsHTML = "";
  userSelected = "";
  // con todas las coincidencias, montar la lista 
  userColabList.forEach(username => {
    photo = 'user_azul.png';
    users = getUsersCookies();
    for (let x = 0; x < users.length; x++){
      user = JSON.parse(users[x]);
      if (user.username == username){
        photo = user.photo;
        userSelected = username;
        if (photo == ""){
          photo = 'user_azul.png';
        }

        // construye el id de la conversación (exista o no)
        resultsHTML +=  "<li class=\"lista-recientes-item\" onclick=\"addColabExp(this,'"+userSelected+"','"+photo+"' )\">" +
        "<div class=\"user-reciente-foto\"><img src=\"images/perfiles/"+photo+"\" alt=\"user\"></div><div class=\"user-reciente-info\">" +
        "<h4>"+username+"</h4><p>"+"</p></div></li>";
      }
    }
  });
  if(numCoincidencias == 0){
    document.getElementById("lista-busqueda-colab-exp").innerHTML = "<h3>No se han encontrado usuarios para la búsqueda " + searchUser + "</h3>";
  } else {
    document.getElementById("lista-busqueda-colab-exp").innerHTML = resultsHTML;
  }
  return false; // avoids changing page
}

function addColabExp(element, username, photo){
  ////console.log(element);
  document.getElementById("lista-colab-exp").innerHTML += "<li class=\"lista-recientes-item\">" + "<div class=\"user-reciente-foto\">"+"<img src=\"images/perfiles/"+photo+"\" alt=\"user\">"+
                                                      "</div><div class=\"user-reciente-info\">" + "<h4>"+username+"</h4><p>"+"</p></div>"+
                                                      "<div class=\"remove-colab-search\" onclick=\"removeCollaboratorExpSearch('"+username+"')\"><img src=\"images/iconos/x.png\" alt=\"eliminar\"></div></li>";

  resultadosBusqueda = Array.from(document.getElementById("lista-busqueda-colab-exp").childNodes);
  newListaBusqueda = "";
  childPos = 0;
  if(resultadosBusqueda.length != 0){
    resultadosBusqueda.forEach(resultado => {
      resultName = resultado.childNodes[1].childNodes[0].innerText;
      if(resultName != element.childNodes[1].childNodes[0].innerText){
        newListaBusqueda += document.getElementById("lista-busqueda-colab-exp").childNodes[childPos].outerHTML;
      }
      childPos += 1;
    });
    document.getElementById("lista-busqueda-colab-exp").innerHTML = newListaBusqueda;
  }
}

function removeCollaboratorExpSearch(username){
  newCollabList = "";
  childPos = 0;
  currentCollaborators = Array.from(document.getElementById("lista-colab-exp").childNodes);
  if(currentCollaborators.length != 0){
    currentCollaborators.forEach(collaborator => {
      collabName = collaborator.childNodes[1].childNodes[0].innerText;
      if(collabName != username){
        newCollabList += document.getElementById("lista-colab-exp").childNodes[childPos].outerHTML;
      }
      childPos += 1;
    });
  }
  document.getElementById("lista-colab-exp").innerHTML = newCollabList;
}

function saveChangesExp(){
  //Recorro los textarea de descripcion y ta
  content = Array.from(document.querySelectorAll('#editar-pestana textarea'));
  result = {};
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      if (element.id == "error-crear_exp_gasto" || element.id == "editar_exp_descripcion"){
        // quita el borde rojo
        element.style.border = "";
        ////console.log(element);
        if (element.type != "checkbox"){
          // quita el mensaje de error
          let errorMessage = "error-" + element.id;
          document.getElementById(errorMessage).style.display = "none";
        }
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  //Meto lo de coger imagenes
  content = Array.from(document.querySelectorAll('#new-images input'));
  arrayFileNames = []
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      ////console.log(element);
      if (element.type != "checkbox" && element.id != "search-colab-input"){
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        ////console.log(errorMessage);
        document.getElementById(errorMessage).style.display = "none";
      }
    });
    // guarda el dato
    if(element.id == "nueva_exp_galeria"){
      fileList = Array.from(document.getElementById(element.id).files);
      fileList.forEach(file => {
        arrayFileNames.push(file.name);
      });
      result = {... result, ["files"]: arrayFileNames};
    } else {
      result = {...result, [element.id]: element.value};
    }
  });

  // recorrer todos los intereses y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('editar-topic'));
  content.forEach(changeint => {
    ////console.log(changeint.type);
    if(changeint.type == "checkbox"){
      result[changeint.id] = changeint.checked;
    }
  });

  //Por último meto el presupuesto
  content = Array.from(document.querySelectorAll('#euro input'));
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      ////console.log(element);
      if (element.type != "checkbox"){
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        document.getElementById(errorMessage).style.display = "none";
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });
  ////console.log(result);

  //Encuentro la experiencia sobre la que estas haciendo cambios
  title = document.getElementById("editar_experience_title").innerHTML;
  user = document.getElementById("editar_persona").innerHTML;
  ////console.log (title +"+"+ user);
  exp = getCookie(user+"+"+title);
  if (exp != ""){
    exp = JSON.parse(exp);
  }

  validated = true;
  //HAGO LAS COMPROBACIONES
  if (parseInt(result.popexp_editar_gasto, 10) < 0 || parseInt(result.popexp_editar_gasto, 10) > 1000){
    document.getElementById("popexp_editar_gasto").style.border = "2px solid red";
    document.getElementById("error-popexp_editar_gasto").style.display = "flex";
    document.getElementById("error-popexp_editar_gasto").innerText = "Debe estar entre 0-1000";
    validated = false;
  }
  else {
    exp.gasto = parseInt(result.popexp_editar_gasto, 10);
  }
  if(result.editar_exp_descripcion == ""){
    document.getElementById("editar_exp_descripcion").style.border = "2px solid red";
    document.getElementById("error-editar_exp_descripcion").style.display = "flex";
    document.getElementById("error-editar_exp_descripcion").innerText = "Campo obligatorio";
    validated = false;
  }
  else{
    exp.descripcion = result.editar_exp_descripcion;
  }
  

  // obtiene los colaboradores seleccionados
  colaboradores = "";
  colaboradoresElements = Array.from(document.getElementById("lista-colab-exp").childNodes);
  colaboradoresElements.forEach(colaboradorElement => {
    colaboradores += colaboradorElement.childNodes[1].childNodes[0].innerText + " ";
  });

  if (validated){

    if (exp.gallery[0] == "NoImage.jpg"){
      exp.gallery.slice(0,1);
    }
    //Como todo está bien relleno los campos que faltan
    exp.presupuesto = result.editar_exp_presupuesto;
    exp.transporte = result.editar_exp_transporte;
    exp.alojamiento = result.editar_exp_alojamiento;

    exp.culture = result.editar_expculture;
    exp.history = result.editar_exphistory;
    exp.nature = result.editar_expnature;
    exp.business = result.editar_expbusiness;
    exp.gastronomy = result.editar_expgastronomy;
    exp.sports = result.editar_expsports;
    exp.colaborador = colaboradores;

    for (let i = 0; i < arrayFileNames.length; i++){
      exp.gallery.push(arrayFileNames[i]);
    }

    ////console.log(exp);
    nombreCookie=exp.creador+"+"+exp.title;
    setCookie(nombreCookie, JSON.stringify(exp), 10); 

    closeEditExperience()
    document.getElementById("snackbarbody").style.display="block";
    document.getElementById("snackbarbody").innerHTML = "Experiencia modificada correctamente";
    setTimeout(function() {
      document.getElementById("snackbarbody").style.display="none";},2000);
    
    let texto = document.getElementById("ver-mas-experiencias").innerHTML;
    if (texto.includes("Ver")){
      buildInitialExperiences(getExpCookies());
    }
    else {
      buildTotalExperiences(getExpCookies());
    }
    buildRankingUsers(getUsersCookies());
    actualizarMoreUsers();
    if (document.getElementById("tab-experiences-button").style.background == "rgb(72, 61, 139) none repeat scroll 0% 0%"){
      loadMyExperiences(loggedInEmail);
    }
    else {
      loadMyCollaboration(loggedInEmail);
    }
  }
}

function closeEditExperience(){
  document.getElementById("popup-editar-grid-item").style.display = "none";

  //Reestablecer la pestana
  document.getElementById("pestana-descripcion-editar").style.background = "#483d8b";
  document.getElementById("pestana-transporte-editar").style.background = "#000073";
  document.getElementById("pestana-presu-editar").style.background = "#000073";
  document.getElementById("pestana-Alojamiento-editar").style.background = "#000073";

  document.getElementById("filter-descripcion-editar").style.display="flex";
  document.getElementById("filter-transporte-editar").style.display = "none";
  document.getElementById("filter-presu-editar").style.display = "none";
  document.getElementById("filter-alojamiento-editar").style.display = "none";
  
  document.getElementById("lista-busqueda-colab-exp").innerHTML = "";

  document.getElementById("search-colab-exp-input").value = "";
}

function borrar_imagen_edit_exp(){
  document.getElementById("nueva_exp_galeria").value = "";
}

function closeEditCollectionExperience(){
  document.getElementById("popup-coleccion-item-edit").style.display = "none";

 /* //Reestablecer la pestana
  document.getElementById("pestana-descripcion-editar").style.background = "#483d8b";
  document.getElementById("pestana-transporte-editar").style.background = "#000073";
  document.getElementById("pestana-presu-editar").style.background = "#000073";
  document.getElementById("pestana-Alojamiento-editar").style.background = "#000073";

  document.getElementById("filter-descripcion-editar").style.display="flex";
  document.getElementById("filter-transporte-editar").style.display = "none";
  document.getElementById("filter-presu-editar").style.display = "none";
  document.getElementById("filter-alojamiento-editar").style.display = "none";*/
}
//Nueva experiencia
function openMyExpNew(){
  document.getElementById("popup-crear-exp").style.display = "flex";
}

function closeMyExpNew(){
  document.getElementById("popup-crear-exp").style.display = "none";
  resetMyExpNew();
}

function borrar_imagen_exp (){
  document.getElementById("crear_exp_portada").value = "";
  document.getElementById("crear_exp_portada").style.border = "";
  document.getElementById("error-crear_exp_portada").style.display = "none";
}

function borrar_imagen_exp_gallery(){
  document.getElementById("crear_exp_galeria").value = "";
}

function saveMyExpNew(){
  content = Array.from(document.querySelectorAll('#crear-exp-form input'));
  ////console.log(content);
  result = {};
  arrayFileNames = []
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      // quita el borde rojo
      element.style.border = "";
      ////console.log(element);
      if (element.type != "checkbox" && element.id != "search-colab-input"){
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        ////console.log(errorMessage);
        document.getElementById(errorMessage).style.display = "none";
      }
    });
    // guarda el dato
    if(element.id == "crear_exp_galeria"){
      fileList = Array.from(document.getElementById(element.id).files);
      fileList.forEach(file => {
        arrayFileNames.push(file.name);
      });
      result = {... result, ["files"]: arrayFileNames};
    } else {
      result = {...result, [element.id]: element.value};
    }
  });

  ////console.log(arrayFileNames);
  //Añado los text area
  content = Array.from(document.querySelectorAll('#crear-exp-form textarea'));
  content.forEach(element => {
    //añade un event listener para cuando tiene focus on
    element.addEventListener('focus', function(){
      if(element.id == "crear_exp_descripcion"){
        // quita el borde rojo
        element.style.border = "";
        ////console.log(element);
        // quita el mensaje de error
        let errorMessage = "error-" + element.id;
        document.getElementById(errorMessage).style.display = "none";
      }
    });
    // guarda el dato
    result = {...result, [element.id]: element.value};
  });

  // recorrer todos los intereses y ver si se han seleccionado
  content = Array.from(document.getElementsByClassName('interest-newexp'));
  content.forEach(changeint => {
    ////console.log(changeint.type);
    if(changeint.type == "checkbox"){
      result[changeint.id] = changeint.checked;
    }
  });

  newExp = {
    pathpic: "",
    title: '',
    creador: '',
    colaborador: '',
    fecha: '',
    descripcion: '',
    transporte: '',
    presupuesto: '',
    alojamiento: '',
    gasto: 0,
    likes: 0,
    comments: [
    ],
    culture: false,
    history: false,
    nature: false,
    business: false,
    gastronomy: false,
    sports: false,
    gallery: []
  }
  validated = true;
  //HAGO LAS COMPROBACIONES
  if(!validatePhotoNew(result.crear_exp_portada)){
    document.getElementById("crear_exp_portada").style.border = "2px solid red";
    document.getElementById("error-crear_exp_portada").style.display = "flex";
    validated = false;
  }
  else {
    newExp.pathpic = "images/experiences/NEW/";
    if (result.crear_exp_portada == ""){
      newExp.gallery.push("portada-defecto.png");
    }
    else {
      newExp.gallery.push(result.crear_exp_portada.slice(12));
    }
  }
  if(result.crear_exp_titulo == "" || result.crear_exp_titulo.length >= 50){
    document.getElementById("crear_exp_titulo").style.border = "2px solid red";
    document.getElementById("error-crear_exp_titulo").style.display = "flex";
    if (result.crear_exp_titulo == ""){
      document.getElementById("error-crear_exp_titulo").innerText = "Campo obligatorio";
    }
    else {
      document.getElementById("error-crear_exp_titulo").innerText = "No puede tener más de 50 caracteres";
    }
    validated = false;
  }
  else{
    newExp.title = result.crear_exp_titulo;
  }
  if(result.crear_exp_descripcion == ""){
    document.getElementById("crear_exp_descripcion").style.border = "2px solid red";
    document.getElementById("error-crear_exp_descripcion").style.display = "flex";
    document.getElementById("error-crear_exp_descripcion").innerText = "Campo obligatorio";
    validated = false;
  }
  else{
    newExp.descripcion = result.crear_exp_descripcion;
  }
  if (parseInt(result.crear_exp_gasto, 10) == "NaN" || result.crear_exp_gasto == ""){
    document.getElementById("crear_exp_gasto").style.border = "2px solid red";
    document.getElementById("error-crear_exp_gasto").style.display = "flex";
    document.getElementById("error-crear_exp_gasto").innerText = "Debes introducir un número";
    validated = false;
  }
  else if (parseInt(result.crear_exp_gasto, 10) < 0 || parseInt(result.crear_exp_gasto, 10) > 1000){
    document.getElementById("crear_exp_gasto").style.border = "2px solid red";
    document.getElementById("error-crear_exp_gasto").style.display = "flex";
    document.getElementById("error-crear_exp_gasto").innerText = "Debes estar entre 0-1000";
    validated = false;
  }
  else {
    newExp.gasto = parseInt(result.crear_exp_gasto, 10);
  }

  // obtiene los colaboradores seleccionados
  colaboradores = "";
  colaboradoresElements = Array.from(document.getElementById("lista-colab").childNodes);
  colaboradoresElements.forEach(colaboradorElement => {
    colaboradores += colaboradorElement.childNodes[1].childNodes[0].innerText + " ";
  });

  if (validated){
    //Como todo está bien relleno los campos que faltan
    user = getCookie(loginemail);
    user = JSON.parse(user);
    ////console.log(user);
    newExp.creador = user.username;
    let hoy = new Date().toISOString().split('T')[0]; 
    newExp.fecha = hoy;
    newExp.transporte = result.crear_exp_transporte;
    newExp.presupuesto = result.crear_exp_presupuesto;
    newExp.alojamiento = result.crear_exp_alojamiento;
    newExp.culture = result.newexp_culture;
    newExp.history = result.newexp_history;
    newExp.nature = result.newexp_nature;
    newExp.business = result.newexp_business;
    newExp.gastronomy = result.newexp_gastronomy;
    newExp.sports = result.newexp_sports;
    newExp.colaborador = colaboradores;

    //Meto las imagenes elegidas
    for (let i = 0; i < arrayFileNames.length; i++){
      newExp.gallery.push(arrayFileNames[i]);
    }

    //Una vez sabes que todo está bien hay que comprobar que no existe una experiencia para ese usuario con dicho titulo
    let existe = false;
    experiences = getExpCookies();
    for (let i = 0; i < experiences.length; i++){
      exp = JSON.parse(experiences[i]);
      if (exp.creador == user.username && exp.title == newExp.title){
        existe = true;
        break;
      }
    }

    if (!existe){
      nombreCookie=user.username+"+"+newExp.title;
      setCookie(nombreCookie, JSON.stringify(newExp), 10); 
      closeMyExpNew()
      document.getElementById("snackbarbody").style.display="block";
      document.getElementById("snackbarbody").innerHTML = "Experiencia añadida correctamente";
      setTimeout(function() {
        document.getElementById("snackbarbody").style.display="none";},2000);
      
      let texto = document.getElementById("ver-mas-experiencias").innerHTML;
      if (texto.includes("Ver")){
        buildInitialExperiences(getExpCookies());
      }
      else {
        buildTotalExperiences(getExpCookies());
      }
      buildRankingUsers(getUsersCookies());
      actualizarMoreUsers();
      loadMyExperiences(loggedInEmail);
    }
    else {
      document.getElementById("snackbarbody").style.display="block";
      document.getElementById("snackbarbody").innerHTML = "Ya tienes una experiencia con ese título!";
      setTimeout(function() {
        document.getElementById("snackbarbody").style.display="none";},2000);
    }
  }
}

function validatePhotoNew(photo){
  if(photo == ""){
    return true;
  }
  let re = new RegExp("(gif|jpe?g|tiff?|png|webp|bmp)$");
  if(!re.test(photo.split('.')[1])){
    document.getElementById("error-crear_exp_portada").innerText = "Selecciona una imagen";
    return false
  }
  return true;
}

function resetMyExpNew(){
  document.getElementById("crear-exp-form").reset();
  document.getElementById("crear_exp_portada").style.border = "";
  document.getElementById("error-crear_exp_portada").style.display = "none";
  document.getElementById("crear_exp_titulo").style.border = "";
  document.getElementById("error-crear_exp_titulo").style.display = "none";
  document.getElementById("crear_exp_descripcion").style.border = "";
  document.getElementById("error-crear_exp_descripcion").style.display = "none";
  document.getElementById("crear_exp_gasto").style.border = "";
  document.getElementById("error-crear_exp_gasto").style.display = "none";

  document.getElementById("lista-busqueda-colab").innerHTML = "";
  document.getElementById("lista-colab").innerHTML = "";
}

function loadMyCollaboration(email){
  let experienceGrid = "";
  let experiences=getExpCookies();

  users = getUsersCookies();
  for (let k = 0; k < users.length; k++){
    user=JSON.parse(users[k]);
    if(user.email == email){

      //Busco su experiencia correspondiente
      for(var j=0; j<experiences.length; j++){
        exp=JSON.parse(experiences[j]);
        if(exp.colaborador.includes(user.username)){
          let src="images/iconos/heart-regular-24.png";
          if(loggedInEmail!=""){
            if(doILike(exp.creador, exp.title)==true){
              src="images/iconos/heart-solid-24.png";
            }
          }

          experienceGrid += "<div class=\"user-grid-item\" >"+
                              "<div class=\"exp-edit\" onclick=\"openEditExperienceColab('"+exp.creador+"','"+exp.title+"')\"><div class=\"img-exp-edit-colab\"><img src=\"images/iconos/icons8-edit-24.png\" alt=\"editar\"/></div></div>"+
                              "<div class=\"user-experience-picture\" onclick=\"openExp(this)\">"+
                                "<img src="+exp.pathpic+exp.gallery[0]+" alt=\"picture\">"+
                                "<h3>"+exp.title+"</h3>"+
                                "<p> Por: "+exp.creador+"</p>"+
                              "</div>"+
                              "<div class=\"user-grid-title\">"+
                                  "<h3>"+exp.title+"</h3>"+
                                  "<p> Creada por: "+exp.creador+"</p>"+
                                  "<div class=\"user-grid-iconos\">"+
                                      "<div class=\"user-grid-mg\" style=\"cursor: default\">"+
                                          "<img id=\"exp-like-icon"+exp.title+"\" src="+src+" alt=\"mg\">"+
                                          "<p id=\"exp-likes"+exp.title+"\">"+exp.likes+"</p>"+
                                      "</div>"+
                                      "<div class=\"user-grid-comment\" style=\"cursor: default\">"+
                                        "<a href=\"#add-comment\"><img id=\"exp-comment-icon"+exp.title+"\" src=\"images/iconos/icons8-burbuja-de-diаlogo-24.png\" alt=\"comment\"></a>"+
                                        "<p id=\"exp-comments-t"+exp.title+"\">"+exp.comments.length+"</p>"+
                                      "</div>"+
                                      
                                  "</div>"+
                              "</div>"+
                          "</div>";
        }
      }
      
    } 
  }
  if (experienceGrid == ""){
    experienceGrid = "<p class=\"no-tiene\">No tienes colaboraciones</p><img src=\"images/iconos/cara-triste.png\" alt=\"cara-triste\"></p>";
    document.getElementById("myuser-experiences-grid").style.fontSize = "30px";
  }
  else {
    document.getElementById("myuser-experiences-grid").style.fontSize = "";
  }
  myexperiencesGrid = document.getElementById("myuser-experiences-grid");
  myexperiencesGrid.innerHTML = experienceGrid;
   
}

function openEditExperienceColab(user, title){

  // oculta scroll vertical del body
  document.body.style.overflowY = "hidden";
  fillEditExperienceColab(user, title);
  mostrarMasEditExp();

  document.getElementById("search-colab-exp-btn").style.display = "none";  
  document.getElementById("search-colab-exp-input").style.display = "none";
  document.getElementById("lista-busqueda-colab-exp").style.display = "none";
  document.getElementById("colaborador-anadido").style.display = "none";
}

function fillEditExperienceColab(username, title){
let experiences = getExpCookies();
  document.getElementById("lista-colab-exp").innerHTML = ""

  for(var i=0; i<experiences.length; i++){
    exp = JSON.parse(experiences[i]);
    if(exp.creador == username && exp.title == title){
      document.getElementById("popexp-editar-portada").src = exp.pathpic + exp.gallery[0];
      document.getElementById("editar_experience_title").innerHTML = exp.title;
      document.getElementById("popexp-editar-likes").innerHTML = exp.likes;
      document.getElementById("popexp-editar-comments").innerHTML = exp.comments.length;
      document.getElementById("popexp_editar_gasto").value = exp.gasto;
      document.getElementById("editar_persona").innerHTML = exp.creador;
      //document.getElementById("editar_colaboradores").value = exp.colaborador;
      document.getElementById("editar_fecha").innerHTML = exp.fecha;

      //Para los intereses
      document.getElementById("editar_expculture").checked=exp.culture;
      document.getElementById("editar_expnature").checked=exp.nature;
      document.getElementById("editar_expgastronomy").checked=exp.gastronomy;
      document.getElementById("editar_exphistory").checked=exp.history;
      document.getElementById("editar_expbusiness").checked=exp.business;
      document.getElementById("editar_expsports").checked=exp.sports;

      //Para las pestanas
      document.getElementById("editar_exp_descripcion").value = exp.descripcion;
      document.getElementById("editar_exp_transporte").value = exp.transporte;
      document.getElementById("editar_exp_presupuesto").value = exp.presupuesto;
      document.getElementById("editar_exp_alojamiento").value = exp.alojamiento;

      //Para poner los colaboradores que ya tiene
      colabs = exp.colaborador.split(" ");
      ////console.log(colabs[0]);
      ////console.log(colabs.length);
      users = getUsersCookies();
      for (let j = 0; j < colabs.length; j++){
        for (let z = 0; z < users.length; z++){
          user = JSON.parse(users[z]);
          if (user.username == colabs[j]){
            document.getElementById("lista-colab-exp").innerHTML += "<li class=\"lista-recientes-item\">" + "<div class=\"user-reciente-foto\">"+"<img src=\"images/perfiles/"+user.photo+"\" alt=\"user\">"+
                                                                    "</div><div class=\"user-reciente-info\">" + "<h4>"+user.username+"</h4><p>"+"</p></div>"+
                                                                    "</li>";
          }
        }
      }

      //Para la galeria
      let id="restoimg";
      let galeria="";
      let gallery_viewer="";
      for(let j = 0; j <exp.gallery.length; j++){
        picture=exp.gallery[j];
        galeria+="<div class=\"grid-gallery__item\"  onclick=\"openGalleryViewer(this)\">"+
                            "<img class=\"grid-gallery__image\" src="+exp.pathpic+picture+" alt=\"foto\">"+
                            "<div class=\"borrar-galeria\" onclick=\"borrarGaleria('"+exp.creador+"+"+exp.title+"','"+j+"')\">"+
                              "<img src=\"images/iconos/x.png\" alt=\"borrar-foto\">"+
                            "</div>"+
                            "</div>";

        gallery_viewer+="<img id="+id+j+" src="+exp.pathpic+picture+" alt=\"foto\">"
      }
      mygaleria = document.getElementById("galeria-popupexp-editar");
      mygaleria.innerHTML = galeria;
      mygalleryviewer = document.getElementById("galleryviewer-resto");
      mygalleryviewer.innerHTML = gallery_viewer;

    }
  }


  document.getElementById("popup-editar-grid-item").style.display = "flex";
}

/*
var gallery = $('.gallery a').simpleLightbox({
  // default source attribute
  sourceAttr: 'href',

  // shows fullscreen overlay
  overlay: true,

  // shows loading spinner
  spinner: true,

  // shows navigation arrows
  nav: true,

  // text for navigation arrows
  navText: ['&larr;','&rarr;'],

  // shows image captions
  captions: true,
  captionDelay: 0,
  captionSelector: 'img',
  captionType: 'attr',
  captionPosition: 'bottom',
  captionClass: '',

  // captions attribute (title or data-title)
  captionsData: 'title',

  // shows close button
  close: true,

  // text for close button
  closeText: 'X',

  // swipe up or down to close gallery
  swipeClose: true,

  // show counter
  showCounter: true,

  // file extensions
  fileExt: 'png|jpg|jpeg|gif',

  // weather to slide in new photos or not, disable to fade
  animationSlide: true,

  // animation speed in ms
  animationSpeed: 250,

  // image preloading
  preloading: true,

  // keyboard navigation
  enableKeyboard: true,

  // endless looping
  loop:  true,

  // group images by rel attribute of link with same selector
  rel: false,

  // closes the lightbox when clicking outside
  docClose:  true,

  // how much pixel you have to swipe
  swipeTolerance: 50,

  // lightbox wrapper Class
  className: 'simple-lightbox',

  // width / height ratios
  widthRatio: 0.8,
  heightRatio: 0.9,

  // scales the image up to the defined ratio size
  scaleImageToRatio: false,

  // disable right click
  disableRightClick: false,

  // show an alert if image was not found
  alertError:  true,

  // alert message
  alertErrorMessage: 'Image not found, next image will be loaded',

  // additional HTML showing inside every image
  additionalHtml: false,

  // enable history back closes lightbox instead of reloading the page
  history: true,

  // time to wait between slides
  throttleInterval: 0,

  // Pinch to <a href="https://www.jqueryscript.net/zoom/">Zoom</a> feature for touch devices
  doubleTapZoom: 2,
  maxZoom: 10,

  // adds class to html element if lightbox is open
  htmlClass: 'has-lightbox',

  // RTL mode
  rtl: false,

  // elements with this class are fixed and get the right padding when lightbox opens
  fixedClass: 'sl-fixed',

  // fade speed in ms
  fadeSpeed: 300,

  // whether to uniqualize images
  uniqueImages: true,

  // focus the lightbox on open to enable tab control
  focus: true,
    
});*/

function colorLikesExp(){
  let html=document.getElementById("initial-experiences-grid").innerHTML.split("<h3>");
  ////console.log(html);
  ////console.log(html);
  let user, title;
  let users=[];
  let titles=[];
  for (var i=1; i<html.length; i++){
    let stop = html[i].indexOf("<");
    title= html[i].substring(0, stop);
    titles.push(title);
    let findtitle=html[i].split("Por: ")
    stop=findtitle[1].indexOf("<");
    user=findtitle[1].substring(0, stop);
    users.push(user);
  }


  for(var k=0; k<users.length; k++){
    if(doILike(users[k], titles[k])==true){
        id="exp-like-icon"+titles[k];  
        document.getElementById(id).src="images/iconos/icons8-heart-30.png";
    }
  }
}

function doILike(user, title){
  let uc=getUsersCookies();
  for (let i=0; i<uc.length; i++){
    let myuser=JSON.parse(uc[i]);
    if(myuser.email==loggedInEmail){
      for(let j=0; j<myuser.like_exp.length; j++){
        if(user==myuser.like_exp[j].user && title==myuser.like_exp[j].title){
          return true;
        }
      }
    }
  }

  return false;
}

function deleteCookie(name){
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function mostrarSenha() {
  let verSenha = document.getElementById("ver-senha");
  let desverSenha = document.getElementById("desver-senha");
  let input = document.getElementById("senha");

  if (verSenha.style.display == "block" || verSenha.style.display == "") {
    verSenha.style.display = "none";
    desverSenha.style.display = "block";
    input.type = "text";
  } else {
    verSenha.style.display = "block";
    desverSenha.style.display = "none";
    input.type = "password";
  }
}

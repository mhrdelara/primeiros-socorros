const urlParams = new URLSearchParams(window.location.search.split("?")[1]);
const valor = urlParams.get("valor");

document.querySelector("#recomendacao").innerHTML = valor;

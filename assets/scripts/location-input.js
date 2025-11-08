(() => {
  const resultado = urlParams.get("query");

  document.querySelector("#pesquisar").value = resultado;

  const input = document.getElementById("pesquisar");

  document.querySelector("#pesquisar").innerHTML = resultado;
  document.querySelector("#span").innerHTML = resultado;

  document.querySelector("#pesquisa").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const valorInput = input.value.trim();
    if (valorInput) {
      window.location.href = `?query=${encodeURIComponent(valorInput)}`;
    }
  });
})();

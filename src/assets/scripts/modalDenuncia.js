let modalAbertoDenuncia = false;

function showModalDenuncia() {
  modalAbertoDenuncia = true;
  let modal = document.querySelector(".modal");
  /**
   * @type {Element}
   */
  let bkModal = document.querySelector(".back-modal-denuncia");

  if (bkModal.classList.contains("disable")) {
    bkModal.classList.remove("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btnDenunciaFlag").addEventListener("click", () => {
    showModalDenuncia;
  });
});

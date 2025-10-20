let modalAberto = false;
let modalDeleteAberto = false;

function showModal() {
  modalAberto = true;
  let modal = document.querySelector(".modal");
  /**
   * @type {Element}
   */
  let bkModal = document.querySelector(".back-modal");

  if (bkModal.classList.contains("disable")) {
    bkModal.classList.remove("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

function closeModal() {
  if (modalDeleteAberto) return;

  modalAberto = false;
  let bkModal = document.querySelector(".back-modal");
  let modal = document.querySelector(".modal");

  modal.classList.add("disable");
  bkModal.classList.add("disable");
}

function showModalDelete() {
  modalDeleteAberto = true;
  let modal = document.querySelector(".confirm-modal-delete");
  let bkModal = document.querySelector(".back-modal");

  if (bkModal.classList.contains("disable")) {
    bkModal.classList.remove("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

function closeModalDelete() {
  modalDeleteAberto = false;
  let modal = document.querySelector(".confirm-modal-delete");
  modal.classList.add("disable");
}

function showModalExit() {
  let modal = document.querySelector(".confirm-modal-exit");
  let bkModal = document.querySelector(".back-modal");

  if (bkModal.classList.contains("disable")) {
    bkModal.classList.remove("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

function closeModalExit() {
  let modal = document.querySelector(".confirm-modal-exit");
  modal.classList.add("disable");
}

addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btnSimDelete").addEventListener("click", () => {
    closeModalDelete();
  });
  document.querySelector("#btnNaoDelete").addEventListener("click", () => {
    closeModalDelete();
  });
});

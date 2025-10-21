let modalAberto = false;
let modalDeleteAberto = false;
let modalExitAberto = false;

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
  closeAllModals();
  if (modalDeleteAberto) return;
  if (modalExitAberto) return;

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
  let bkModalDelete = document.querySelector(".back-modal-delete");

  if (bkModal.classList.contains("disable")) {
    bkModal.classList.remove("disable");
  }
  if (bkModalDelete.classList.contains("disable")) {
    bkModalDelete.classList.remove("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

function closeModalDelete() {
  modalDeleteAberto = false;
  let modal = document.querySelector(".confirm-modal-delete");
  let bkModalDelete = document.querySelector(".back-modal-delete");
  modal.classList.add("disable");
  bkModalDelete.classList.add("disable");
}

function showModalExit() {
  let modal = document.querySelector(".confirm-modal-exit");
  let bkModal = document.querySelector(".back-modal");
  let bkModalExit = document.querySelector(".back-modal-exit");

  if (bkModal.classList.contains("disable")) {
    bkModal.classList.remove("disable");
  }
  if (bkModalExit.classList.contains("disable")) {
    bkModalExit.classList.remove("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

function closeModalExit() {
  modalExitAberto = false;
  let modal = document.querySelector(".confirm-modal-exit");
  let bkModalExit = document.querySelector(".back-modal-exit");
  modal.classList.add("disable");
  bkModalExit.classList.add("disable");
}

addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btnSimDelete").addEventListener("click", () => {
    closeModalDelete();
  });
  document.querySelector("#btnNaoDelete").addEventListener("click", () => {
    closeModalDelete();
  });

  document.querySelector("#btnSimExit").addEventListener("click", () => {
    closeModalExit();
  });

  document.querySelector("#btnNaoExit").addEventListener("click", () => {
    closeModalExit();
  });
});

// back-model
//   ---  modal
//   ---  backmodal
//   ------ excluir conta
//   ------ sair conta
//   --------  confirmação

function closeAllModals() {
  let backModalExit = document.querySelector(".back-modal-exit");
  let confModalDelete = document.querySelector(".confirm-modal-delete");
  let modal = document.querySelector(".modal");
  let msgModalDelete = document.querySelector(".mensage-modal-delete");
  let msgModalExit = document.querySelector(".confirm-modal-exit");
  let backModal = document.querySelector(".back-modal");
  let backModalDelete = document.querySelector(".back-modal-delete");

  if (!backModalExit.classList.contains("disable")) {
    backModalExit.classList.add("disable");
  }
  if (!confModalDelete.classList.contains("disable")) {
    confModalDelete.classList.add("disable");
  }
  if (!modal.classList.contains("disable")) {
    modal.classList.add("disable");
  }
  if (!msgModalDelete.classList.contains("disable")) {
    msgModalDelete.classList.add("disable");
  }
  if (!msgModalExit.classList.contains("disable")) {
    msgModalExit.classList.add("disable");
  }
  if (!backModal.classList.contains("disable")) {
    backModal.classList.add("disable");
  }
  if (!backModalDelete.classList.contains("disable")) {
    backModalDelete.classList.add("disable");
  }
}

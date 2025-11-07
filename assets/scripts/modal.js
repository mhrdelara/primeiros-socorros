let modalAberto = false;
let modalDeleteAberto = false;
let modalExitAberto = false;
let modalMensageAberto = false;

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

function showModalMensage() {
  let modal = document.querySelector(".mensage-modal-delete");
  let modalForClose = document.querySelector(".confirm-modal-delete");

  if (!modalForClose.classList.contains("disable")) {
    modalForClose.classList.add("disable");
  }
  if (modal.classList.contains("disable")) {
    modal.classList.remove("disable");
  }
}

function closeModalMensage() {
  modalMensageAberto = false;
  let modal = document.querySelector(".confirm-modal-delete");
  let bkModalExit = document.querySelector(".back-modal-delete");
  modal.classList.add("disable");
  bkModalExit.classList.add("disable");
}

addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btnSimDelete").addEventListener("click", () => {
    showModalMensage();
  });
  document.querySelector("#btnNaoDelete").addEventListener("click", () => {
    closeModalDelete();
  });

  document.querySelector("#btnSimExit").addEventListener("click", () => {
    closeAllModals();
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
  let confirmModalDelete = document.querySelector(".confirm-modal-delete");
  let confirmModalExit = document.querySelector(".confirm-modal-exit");
  let modal = document.querySelector(".modal");
  let msgModalDelete = document.querySelector(".mensage-modal-delete");

  let backModal = document.querySelector(".back-modal");
  let backModalDelete = document.querySelector(".back-modal-delete");

  if (!backModalExit.classList.contains("disable")) {
    backModalExit.classList.add("disable");
  }
  if (!confirmModalDelete.classList.contains("disable")) {
    confirmModalDelete.classList.add("disable");
  }
  if (!modal.classList.contains("disable")) {
    modal.classList.add("disable");
  }
  if (!msgModalDelete.classList.contains("disable")) {
    msgModalDelete.classList.add("disable");
  }
  if (!confirmModalExit.classList.contains("disable")) {
    confirmModalExit.classList.add("disable");
  }
  if (!backModal.classList.contains("disable")) {
    backModal.classList.add("disable");
  }
  if (!backModalDelete.classList.contains("disable")) {
    backModalDelete.classList.add("disable");
  }
}
lassList.add("disable");
  }
  if (!backModalDelete.classList.contains("disable")) {
    backModalDelete.classList.add("disable");
  }
}
>>>>>>> joaozao

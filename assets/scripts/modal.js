function showModal(){
  let modal = document.querySelector(".modal")
  let bkModal = document.querySelector(".back-modal")

  bkModal.classList.toggle("disable")
  modal.classList.toggle("disable")

}

function closeModal(){
  showModal()
}
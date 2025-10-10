function closeModal(){
  let bkModal = document.querySelector(".back-modal")
  let modal = document.querySelector(".modal")
  
  bkModal.classList.add("disable")
  modal.classList.add("disable")
}

function showModal(){
  let bkModal = document.querySelector(".back-modal")
  let modal = document.querySelector(".modal")
  modal.classList.remove("disable")
  bkModal.classList.remove("disable")
}
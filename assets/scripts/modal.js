function closeModal(){
  let modal = document.querySelector(".back-modal")
  modal.classList.add("disable")
}

function showModal(){
   let modal = document.querySelector(".back-modal")
  modal.classList.remove("disable")
}
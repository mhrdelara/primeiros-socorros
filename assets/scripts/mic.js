const micBotao = document.getElementById("mic-btn");
const micMutado = document.getElementById("mutado");
const input = document.getElementById("pesquisar");

// Caminhos das imagens no seu PC ou projeto
const imgParado = "../assets/images/icons/microfone-mutado.svg"; // imagem normal
const imgGravando = "../assets/images/icons/stop.svg"; // imagem quando estiver ouvindo

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";

  micBotao.addEventListener("click", () => {
    recognition.start();
    micMutado.src = imgGravando; // muda a imagem quando começa
  });

  recognition.addEventListener("result", (event) => {
    input.value = event.results[0][0].transcript;
  });

  recognition.addEventListener("end", () => {
    micMutado.src = imgParado; // volta à imagem original quando termina
  });
}

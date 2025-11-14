const micBotao = document.getElementById("mic-btn");
const micMutado = document.getElementById("mutado");
const input = document.getElementById("pesquisar");

const imgParado = "/images/icons/microfone-mutado.svg";
const imgGravando = "/images/icons/stop.svg";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";

  micBotao.addEventListener("click", () => {
    recognition.start();
    micMutado.src = imgGravando;
  });

  recognition.addEventListener("result", (event) => {
    input.value = event.results[0][0].transcript;
  });

  recognition.addEventListener("end", () => {
    micMutado.src = imgParado;
  });
}

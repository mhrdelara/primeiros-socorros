function carregarVideos() {
  API_URL = "/videos";

  addEventListener("DOMContentLoaded", async () => {
    let main = document.querySelector(".main");
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(API_URL, options);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const dados = await response.json();
      dados.map((data) => {
        main.innerHTML += `
      <div class="card">
      <div class="content-card">
      <p class="price">${data.price}</p>
      <p class="title">${data.name}</p>
      <p class="description">${data.description}</p>
      
      </div>
      <button class="remove" onclick="removeProduct(${data.id})">X</button>
      </div>
      `;
      });
    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }
  });
}

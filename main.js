// Seleciona o elemento do bolo
const cake = document.getElementById("cake");

// Definição das camadas do bolo, em ordem
const layers = [
  { class: "plate" },
  { class: "cake" },
  { class: "filling" },
  { class: "cake" },
  { class: "filling" },
  { class: "cake" },
  { class: "icing" },
  { class: "candle" }
];

let i = 0;

// Função para adicionar camada por camada com animação
function dropLayer() {
  if (i >= layers.length) {
    showFlame();
    startBalloons();
    return;
  }

  const layerData = layers[i];
  const layer = document.createElement("div");
  layer.classList.add("layer", layerData.class);

  // Adiciona a chama se for a vela
  if (layerData.class === "candle") {
    const flame = document.createElement("div");
    flame.classList.add("flame");
    flame.id = "flame";
    layer.appendChild(flame);
  }

  cake.appendChild(layer);

  // Animação de queda
  layer.style.opacity = 0;
  layer.style.transform = "translateY(-100px)";
  setTimeout(() => {
    layer.style.opacity = 1;
    layer.style.transform = "translateY(0)";
  }, 10);

  i++;
  setTimeout(dropLayer, 500); // Próxima camada após 500ms
}

// Exibe a chama da vela
function showFlame() {
  const flame = document.getElementById("flame");
  if (flame) {
    flame.style.display = "block";
  }
}

// Inicia os balões subindo aleatoriamente
function startBalloons() {
  setInterval(() => {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${Math.random() * window.innerWidth}px`;
    balloon.style.background = getRandomColor();
    document.body.appendChild(balloon);

    // Remove balão após 5 segundos
    setTimeout(() => balloon.remove(), 5000);
  }, 300);
}

// Gera uma cor aleatória para os balões
function getRandomColor() {
  const colors = ["red", "blue", "green", "yellow", "orange", "pink", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Estrelinhas que aparecem ao clicar na tela
document.addEventListener("click", (e) => {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${e.clientX}px`;
  star.style.top = `${e.clientY}px`;
  document.body.appendChild(star);

  // Remove estrelinha após 1 segundo
  setTimeout(() => star.remove(), 1000);
});

// Inicia a animação do bolo
dropLayer();

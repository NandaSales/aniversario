// Seleciona o elemento do bolo
const cake = document.getElementById("cake");

// Camadas invertidas: de cima para baixo (vela no topo, prato no final)
const layers = [
  { class: "candle" },
  { class: "icing" },
  { class: "cake" },
  { class: "filling" },
  { class: "cake" },
  { class: "filling" },
  { class: "cake" },
  { class: "plate" }
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

  // Adiciona ao bolo
  cake.appendChild(layer);

  // Define estado inicial
  layer.style.opacity = 0;
  layer.style.transform = "translateY(-100px)";

  // Força reflow para ativar transição
  requestAnimationFrame(() => {
    layer.style.opacity = 1;
    layer.style.transform = "translateY(0)";
  });

  i++;
  setTimeout(dropLayer, 500); // próxima camada após 500ms
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

// Inicia a animação do bolo quando a página carregar
document.addEventListener("DOMContentLoaded", dropLayer);

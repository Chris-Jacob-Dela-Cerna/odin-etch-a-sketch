//  ---  DOM References  ---

const bodyTag = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const currentCanvasSize = document.getElementById("current-canvas-size")
const inputCanvasSize = document.getElementById("canvas-size");
const themeIcon = document.getElementById("theme-icon");
const themeInfo = document.getElementById("theme-info");
const themeSwitch = document.querySelector(".theme-switch");



//  ---  Configuration  ---

const maxGridSize = 100;
const defaultGridSize = 16;



//  ---  Page Theme  ---

themeSwitch.addEventListener("click", function() {
  bodyTag.classList.toggle("dark");
  bodyTag.classList.toggle("light");
  if (bodyTag.classList.contains("dark")) {
    themeSwitch.appendChild(themeInfo);
    themeSwitch.style["padding"] = "4px 12px 4px 8px";
    themeIcon.setAttribute("src", "img/dark_mode_icon.png");
    themeInfo.textContent = "Dark";
  } else {
    themeSwitch.appendChild(themeIcon);
    themeSwitch.style["padding"] = "4px 8px 4px 12px";
    themeIcon.setAttribute("src", "img/light_mode_icon.png");
    themeInfo.textContent = "Light";
  };
});



//  ---  Canvas  ---

let GridSize = defaultGridSize;


function renderCanvas(GridSize) {
  currentCanvasSize.textContent = `Current = ${GridSize}`
  canvas.replaceChildren()

  const totalSquares = GridSize * GridSize;
  const gridRatio = 100 / GridSize;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.style["flex"] = `1 1 ${gridRatio}%`;
    canvas.appendChild(square);
  };
}


inputCanvasSize.addEventListener("keydown", function(event) {
  if (event.key !== "Enter") return;

  const userInput = inputCanvasSize.value.trim()
  if (userInput === "") return;

  const sizeInput = Number(userInput)
  if (!Number.isInteger(sizeInput) || sizeInput < 1 || sizeInput > maxGridSize) return;

  inputCanvasSize.value = ""
  GridSize = sizeInput
  renderCanvas(GridSize)
});



//  ---  Initialization  ---

renderCanvas(GridSize);
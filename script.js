
//  ---  DOM References  ---

const bodyTag = document.querySelector("body");
const canvas = document.getElementById("canvas");
const currentCanvasSize = document.getElementById("current-canvas-size");
const inputCanvasSize = document.getElementById("canvas-size");
const palette = document.getElementById("palette");
const themeIcon = document.getElementById("theme-icon");
const themeInfo = document.getElementById("theme-info");
const themeSwitch = document.querySelector(".theme-switch");
const toolBoxEraser = document.getElementById("eraser");
const toolBoxPen = document.getElementById("pen");
const toolBoxTools = document.getElementById("tools");



//  ---  Configs and Globals  ---

const allToolsDOM = [toolBoxPen, toolBoxEraser];
const colors = [
  "#FFFFFF", "#F2F2F2", "#C0C0C0", "#4D4D4D",
  "#1A1A1A", "#000000"
];
const defaultGridSize = 16;
const maxGridSize = 100;

let activeColor = "#000000";
let activeTool = null;
let canvasMouseDown = false;
let eraserColor = "#FFFFFF";
let penColor = activeColor;
let gridSize = defaultGridSize;



//  ---  Utility  ---

function activeDisplay(activeElement, allElements, activeClass) {
  activeElement.classList.toggle(activeClass);
  allElements.filter(tool => tool !== activeElement)
             .forEach(otherElement => otherElement.classList.remove(activeClass));
}



//  ---  Page Theme  ---

themeSwitch.addEventListener("click", function() {
  bodyTag.classList.toggle("dark");
  bodyTag.classList.toggle("light");
  if (bodyTag.classList.contains("dark")) {
    themeSwitch.appendChild(themeInfo);
    themeSwitch.style["padding"] = "4px 12px 4px 8px";
    themeIcon.setAttribute("src", "img/dark_theme_icon.png");
    themeInfo.textContent = "Dark";
  } else {
    themeSwitch.appendChild(themeIcon);
    themeSwitch.style["padding"] = "4px 8px 4px 12px";
    themeIcon.setAttribute("src", "img/light_theme_icon.png");
    themeInfo.textContent = "Light";
  };
});



//  ---  Canvas  ---

function renderCanvas(gridSize) {
  canvas.replaceChildren();

  const totalSquares = gridSize * gridSize;
  const gridRatio = 100 / gridSize;
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.style["flex"] = `1 1 ${gridRatio}%`;
    canvas.appendChild(square);
  };

  currentCanvasSize.textContent = `Current: ${gridSize}`;
};

function useTool(target) {
  switch (activeTool) {
    case "pen":
      target.style["background-color"] = penColor;
      break;
    case "eraser":
      target.style["background-color"] = eraserColor;
      break;
  }
};

canvas.addEventListener("mousedown", (event) => {
  canvasMouseDown = true;
  useTool(event.target);
});
canvas.addEventListener("mousemove", (event) => {
  if (!canvasMouseDown) return;
  useTool(event.target);
});
canvas.addEventListener("mouseup", () => canvasMouseDown = false);



//  --- Toolbox  ---

function toggleTool(tool) {
  if (activeTool !== tool) {
    activeTool = tool;
  } else activeTool = null;
};

toolBoxTools.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;

  const targetTool = target.id;
  toggleTool(targetTool);

  let activeToolDOM = null;
  activeToolDOM = target;

  activeDisplay(activeToolDOM, allToolsDOM, "active-tool");
});



//  --- Color Palette ---

function toggleColor(color) {
  if (activeColor !== color) {
    activeColor = color;
  } else activeColor = null;
};

function renderPalette() {
  for (color of colors) {
    const button = document.createElement("button");
    button.style["background-color"] = color;
    if (color === activeColor) button.classList.toggle("active-color");
    palette.appendChild(button);
  }

  // activeDisplay(activeColor, palette.children)
}



//  ---  Canvas Settings  ---

inputCanvasSize.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;

  const userInput = inputCanvasSize.value.trim();
  if (userInput === "") return;

  const sizeInput = Number(userInput);
  if (!Number.isInteger(sizeInput) || sizeInput < 1 || sizeInput > maxGridSize) return;

  inputCanvasSize.value = "";
  gridSize = sizeInput;
  renderCanvas(gridSize);
});



//  ---  Initialization  ---

renderCanvas(gridSize);
renderPalette(activeColor);
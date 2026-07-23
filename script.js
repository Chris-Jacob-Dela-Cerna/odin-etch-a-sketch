
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
const defaultGridSize = 16;
const maxGridSize = 100;
const paletteColors = [
  "#FFFFFF", "#F7F7F7", "#E0E0E0", "#C0C0C0", 
  "#FFF3E0", "#FFE4C4", "#FFDBAC", "#F1C27D", 
  "#E0A96D", "#D4A24C", "#C68642", "#E8A33D", 
  "#F5B700", "#FFCC00", "#F4D03F", "#CA8A04", 
  "#B5A642", "#C4D600", "#A3D633", "#84CC16", 
  "#65A30D", "#4D8C3F", "#4ADE80", "#34C759", 
  "#2E9E5B", "#22863A", "#166534", "#1D8A6E", 
  "#2DD4BF", "#00C7B7", "#0F766E", "#0B4F4A", 
  "#22D3EE", "#38BDF8", "#007AFF", "#2563EB", 
  "#1E3A8A", "#0B1F3A", "#3B4A6B", "#6366F1", 
  "#7C3AED", "#AF52DE", "#6B21A8", "#86198F", 
  "#9333EA", "#FF2D92", "#9D174D", "#F43F5E", 
  "#FF3B30", "#B71C1C", "#8B2E1F", "#FF6B4A", 
  "#FF9500", "#C2410C", "#9A3412", "#7A3B10", 
  "#8D5524", "#6B4423", "#3E2723", "#2E1F17", 
  "#787066", "#808080", "#4D4D4D", "#1A1A1A", 
  "#000000"
]

let activeColor = "#000000";
let activeTool = null;
let canvasMouseDown = false;
let eraserColor = "#FFFFFF";
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
      target.style["background-color"] = activeColor;
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
  for (color of paletteColors) {
    const button = document.createElement("button");
    button.style["background-color"] = color;
    if (color === activeColor) button.classList.toggle("active-color");
    palette.appendChild(button);
  }
}

palette.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;

  toggleColor(target.style.getPropertyValue("background-color"));
  activeDisplay(target, Array.from(palette.children), "active-color");
});



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
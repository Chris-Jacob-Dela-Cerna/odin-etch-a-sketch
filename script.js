//  ---  DOM References  ---

const bodyTag = document.querySelector("body");
const canvas = document.querySelector(".canvas");
const currentCanvasSize = document.getElementById("current-canvas-size")
const inputCanvasSize = document.getElementById("canvas-size");
const themeIcon = document.getElementById("theme-icon");
const themeInfo = document.getElementById("theme-info");
const themeSwitch = document.querySelector(".theme-switch");
const toolBoxEraser = document.getElementById("eraser");
const toolBoxPen = document.getElementById("pen");
const toolBoxTools = document.getElementById("tools");



//  ---  Configuration  ---

const defaultGridSize = 16;
const maxGridSize = 100;
const allTools = [toolBoxPen, toolBoxEraser]

let activeTool = null;
let gridSize = defaultGridSize;



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
  currentCanvasSize.textContent = `Current: ${gridSize}`;
  canvas.replaceChildren();

  const totalSquares = gridSize * gridSize;
  const gridRatio = 100 / gridSize;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.style["flex"] = `1 1 ${gridRatio}%`;
    canvas.appendChild(square);
  };
};



//  --- Toolbox  ---

function toggleTool(tool) {
  if (activeTool !== tool) {
    activeTool = tool;
  } else activeTool = null;
};

function toolActiveDisplay(activeToolDOM, allTools) {
  activeToolDOM.classList.toggle("active")
  allTools.filter(tool => tool !== activeToolDOM)
          .forEach(otherTool => otherTool.classList.remove("active"));
}

toolBoxTools.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;

  const targetTool = target.id
  toggleTool(targetTool);

  let activeToolDOM = null
  if (targetTool === "pen") activeToolDOM = toolBoxPen;
  else if (targetTool === "eraser") activeToolDOM = toolBoxEraser;
  toolActiveDisplay(activeToolDOM, allTools)
});



//  --- Color Palette ---



//  ---  Canvas Settings  ---

inputCanvasSize.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;

  const userInput = inputCanvasSize.value.trim();
  if (userInput === "") return;

  const sizeInput = Number(userInput)
  if (!Number.isInteger(sizeInput) || sizeInput < 1 || sizeInput > maxGridSize) return;

  inputCanvasSize.value = "";
  gridSize = sizeInput;
  renderCanvas(gridSize);
});



//  ---  Initialization  ---

renderCanvas(gridSize);
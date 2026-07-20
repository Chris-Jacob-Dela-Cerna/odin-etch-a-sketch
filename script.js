//  ---  DOM References  ---

const bodyTag = document.querySelector("body");
const themeSwitch = document.querySelector(".theme-switch");
const themeIcon = document.getElementById("theme-icon");
const themeInfo = document.getElementById("theme-info");



//  ---  Configuration  ---

const defaultGridSize = 16



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
  }
});



//  ---  Canvas  ---

function renderCanvas(GridSize = ) {
  const totalSquares = GridSize * GridSize;
  const gridRatio = 100 / GridSize;
  const canvas = document.querySelector(".canvas");

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div")
    square.style["flex"] = `1 1 ${gridRatio}%`
    canvas.appendChild(square)
  };
}



// ---  Initialization  ---

renderCanvas()
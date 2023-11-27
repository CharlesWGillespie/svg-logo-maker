const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle } = require("./utils/shapes");

class SVG {
  constructor() {
    this.text = "";
    this.shape = "";
  }
  render() {
    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${this.shape}
            ${this.text}
        </svg>`;
  }
  setTextEl(text, color) {
    this.text = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  setShapeEl(shape) {
    this.shape = shape.render();
  }
}
const questions = [
  {
    name: "text",
    type: "input",
    message: "Enter up to three Characters",
  },
  {
    name: "text-color",
    type: "input",
    message: "Enter a color for the text",
  },
  {
    name: "shape",
    type: "list",
    message: "Select a Shape",
    choices: ["circle", "square", "triangle"],
  },
  {
    name: "shape-color",
    type: "input",
    message: "Enter a color for the shape",
  },
];

function createSVG(response) {
  const svgString = `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${response.shape}
        ${response.text}
    </svg>`;

  fs.writeFile("./test/logo", svgString, (err) => {
    if (err) {
      console.error("Error writing SVG file:", err);
    } else {
      console.log("logo was created");
    }
  });
}

async function init() {
  const response = await inquirer.prompt(questions);
  const svg = new SVG();

  if (!validateTextLength(response.text)) {
    console.log("Error: Text cannot be more than 3 characters in length.");
    return;
  }

  if (!validateColor(response.color)) {
    console.log(
      "Error: Color not found."
    );
    return;
  }

  svg.setTextEl(response.text, response["text-color"]);

  let shape;
  if (response.shape === "circle") {
    shape = new Circle();
  } else if (response.shape === "square") {
    shape = new Square();
  } else if (response.shape === "triangle") {
    shape = new Triangle();
  }

  shape.setColor(response["shape-color"]);
  svg.setShapeEl(shape);

  createSVG(svg);
}

function validateTextLength(text) {
  return text.length <= 3;
}

function validateColor(color) {
  const colorRegExp = /^(#[0-9A-Fa-f]{6}|[a-zA-Z]{6,})$/;
  return colorRegExp.test(color);
}

module.exports = {
  validateTextLength,
  validateColor,
};

init();
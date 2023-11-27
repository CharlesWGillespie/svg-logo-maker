class Circle {
  constructor() {
      this.color = '';
  }

  setColor(color) {
      this.color = color;
  }

  render() {
      return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
  }
};

class Square {
  constructor() {
      this.color = '';
  }

  setColor(color) {
      this.color = color;
  }

  render() {
      return `<rect x="50" height="100" width="100" fill="${this.color}">`;
  }
};

class Triangle {
  constructor() {
      this.color = '';
  }

  setColor(color) {
      this.color = color;
  }

  render() {
      return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
  }
};

module.exports = {
  Circle,
  Square,
  Triangle,
};
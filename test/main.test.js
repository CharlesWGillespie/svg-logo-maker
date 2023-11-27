const inquirer = require("inquirer");

const { validateTextLength, validateColor } = require("../main.js");

describe("User Input Validation", () => {
  describe("Text Input", () => {
    test("should only have 3 characters", () => {
      const textValidateResult = validateTextLength("aaa");
      expect(textValidateResult).toBe(true);

      const invalidTextValidateResult = validateTextLength("aaaa");
      expect(invalidTextValidateResult).toBe(false);
    });
  });

  describe("Color Input", () => {
    const validColor = "#1a2b3c";
    const invalidColor = "na";

    test("should only use correct color keyword or hexadecimal code", () => {
      const colorValidateResult = validateColor(validColor);
      expect(colorValidateResult).toBe(true);
    });

    test("should return false for an invalid color input", () => {
      const colorValidateResult = validateColor(invalidColor);
      expect(colorValidateResult).toBe(false);
    });
  });
});

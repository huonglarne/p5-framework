class Parameter {
  constructor(name, defaultValue, value = null) {
    this.name = name;
    this.default = defaultValue;
    this.value = value !== null ? value : defaultValue;
    this.controlElement = null;
    this.onChange = null;

    if (!window.parameterRegistry) {
      window.parameterRegistry = {};
    }
    window.parameterRegistry[name] = this;
  }

  // Abstract method - to be implemented by subclasses
  createControlElement() {
    throw new Error("createControlElement must be implemented by subclasses");
  }

  getValue() {
    return this.value;
  }

  setValue(newValue) {
    this.value = newValue;
    this.updateControlDisplay();
  }

  // Abstract method - to be implemented by subclasses
  updateControlDisplay() {
    throw new Error("updateControlDisplay must be implemented by subclasses");
  }

  reset() {
    this.setValue(this.default);
    if (this.onChange) {
      this.onChange(this.default);
    }
  }

  setCallback(callback) {
    this.onChange = callback;
    return this;
  }
}

class RangeParameter extends Parameter {
  constructor(name, defaultValue, min, max, interval, value = null) {
    super(name, defaultValue, value);
    this.min = min;
    this.max = max;
    this.interval = interval || 1;
  }

  createControlElement() {
    const container = document.createElement("div");
    container.style.marginBottom = "15px";

    const labelElement = document.createElement("label");
    labelElement.textContent = `${this.name}`;
    labelElement.style.cssText =
      "display: block; margin-bottom: 5px; font-weight: bold; font-size: 14px;";

    const slider = document.createElement("input");
    slider.type = "range";

    slider.min = this.min;
    slider.max = this.max;
    slider.value = this.value;
    slider.step = this.interval;
    slider.style.cssText = "width: 200px; margin: 0 10px;";

    const valueDisplay = document.createElement("span");
    valueDisplay.textContent = this.value;
    valueDisplay.style.cssText =
      "font-weight: bold; color: #333; font-size: 11px;";

    const self = this;
    slider.addEventListener("input", function () {
      const value = parseFloat(this.value);
      valueDisplay.textContent = value;
      self.value = value;
      if (self.onChange) {
        self.onChange(value);
      }
    });

    container.appendChild(labelElement);
    container.appendChild(slider);
    container.appendChild(valueDisplay);

    return container;
  }

  updateControlDisplay() {
    if (this.controlElement) {
      const slider = this.controlElement.querySelector('input[type="range"]');
      const valueDisplay = this.controlElement.querySelector("span");

      slider.value = this.value;
      valueDisplay.textContent = this.value;
    }
  }
}

class ColorParameter extends Parameter {
  constructor(name, defaultValue, value = null) {
    super(name, defaultValue, value);
  }

  createControlElement() {
    const container = document.createElement("div");
    container.style.marginBottom = "15px";

    const labelElement = document.createElement("label");
    labelElement.textContent = `${this.name}`;
    labelElement.style.cssText =
      "display: block; margin-bottom: 5px; font-weight: bold; font-size: 14px;";

    const colorPicker = document.createElement("input");
    colorPicker.type = "color";

    const rgbToHex = (r, g, b) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    colorPicker.value = rgbToHex(this.value[0], this.value[1], this.value[2]);
    colorPicker.style.cssText =
      "width: 50px; height: 30px; border: none; border-radius: 4px; cursor: pointer;";

    const rgbDisplay = document.createElement("span");
    rgbDisplay.textContent = `RGB(${this.value[0]}, ${this.value[1]}, ${this.value[2]})`;
    rgbDisplay.style.cssText =
      "margin-left: 10px; font-weight: bold; color: #333; font-size: 11px;";

    const self = this;
    colorPicker.addEventListener("input", function () {
      const hex = this.value;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      rgbDisplay.textContent = `RGB(${r}, ${g}, ${b})`;
      self.value = [r, g, b];
      if (self.onChange) {
        self.onChange([r, g, b]);
      }
    });

    container.appendChild(labelElement);
    container.appendChild(colorPicker);
    container.appendChild(rgbDisplay);

    return container;
  }

  updateControlDisplay() {
    if (this.controlElement) {
      const colorPicker = this.controlElement.querySelector(
        'input[type="color"]',
      );
      const rgbDisplay = this.controlElement.querySelector("span");

      const rgbToHex = (r, g, b) => {
        return (
          "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
      };

      colorPicker.value = rgbToHex(this.value[0], this.value[1], this.value[2]);
      rgbDisplay.textContent = `RGB(${this.value[0]}, ${this.value[1]}, ${this.value[2]})`;
    }
  }
}

class InputParameter extends Parameter {
  constructor(name, defaultValue, type = "text", value = null) {
    super(name, defaultValue, value);
    this.inputType = type; // 'text', 'number', etc.
  }

  createControlElement() {
    const container = document.createElement("div");
    container.style.marginBottom = "15px";

    const labelElement = document.createElement("label");
    labelElement.textContent = `${this.name}`;
    labelElement.style.cssText =
      "display: block; margin-bottom: 5px; font-weight: bold; font-size: 14px;";

    const input = document.createElement("input");
    input.type = this.inputType;
    input.value = this.value;
    input.style.cssText =
      "width: 200px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; margin: 0 10px; font-size: 11px;";

    const self = this;
    input.addEventListener("input", function () {
      let value = this.value;

      // Convert to number if it's a number input
      if (self.inputType === "number") {
        value = parseFloat(value) || 0;
      }

      self.value = value;
      if (self.onChange) {
        self.onChange(value);
      }
    });

    container.appendChild(labelElement);
    container.appendChild(input);

    return container;
  }

  updateControlDisplay() {
    if (this.controlElement) {
      const input = this.controlElement.querySelector("input");
      input.value = this.value;
    }
  }
}

class RandomParameter extends Parameter {
  constructor(name, defaultValue, min = 0, max = 100, value = null) {
    super(name, defaultValue, value);
    this.min = min;
    this.max = max;
  }

  createControlElement() {
    const container = document.createElement("div");
    container.style.marginBottom = "15px";

    const labelElement = document.createElement("label");
    labelElement.textContent = `${this.name}`;
    labelElement.style.cssText =
      "display: block; margin-bottom: 5px; font-weight: bold; font-size: 14px;";

    const inputContainer = document.createElement("div");
    inputContainer.style.cssText =
      "display: flex; align-items: center; gap: 10px;";

    const input = document.createElement("input");
    input.type = "number";
    input.value = this.value;
    input.style.cssText =
      "width: 100px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; font-size: 11px;";

    const randomButton = document.createElement("button");
    randomButton.textContent = "Random";
    randomButton.style.cssText =
      "padding: 5px 10px; background-color: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;";

    const rangeDisplay = document.createElement("span");
    rangeDisplay.textContent = `(${this.min} - ${this.max})`;
    rangeDisplay.style.cssText =
      "font-size: 10px; color: #666; margin-left: 5px;";

    const self = this;

    // Input change handler
    input.addEventListener("input", function () {
      let value = parseFloat(this.value) || 0;

      // Clamp value to min/max range
      value = Math.max(self.min, Math.min(self.max, value));
      this.value = value;

      self.value = value;
      if (self.onChange) {
        self.onChange(value);
      }
    });

    // Random button click handler
    randomButton.addEventListener("click", function () {
      const randomValue = Math.random() * (self.max - self.min) + self.min;
      const roundedValue = Math.round(randomValue * 100) / 100; // Round to 2 decimal places

      input.value = roundedValue;
      self.value = roundedValue;

      if (self.onChange) {
        self.onChange(roundedValue);
      }
    });

    // Hover effects for button
    randomButton.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#005a9e";
    });

    randomButton.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "#007acc";
    });

    inputContainer.appendChild(input);
    inputContainer.appendChild(randomButton);
    inputContainer.appendChild(rangeDisplay);

    container.appendChild(labelElement);
    container.appendChild(inputContainer);

    return container;
  }

  updateControlDisplay() {
    if (this.controlElement) {
      const input = this.controlElement.querySelector('input[type="number"]');
      input.value = this.value;
    }
  }
}

class BooleanParameter extends Parameter {
  constructor(name, defaultValue, value = null) {
    super(name, defaultValue, value);
  }

  createControlElement() {
    const container = document.createElement("div");
    container.style.cssText =
      "margin-bottom: 15px; display: flex; align-items: center;";

    const labelElement = document.createElement("label");
    labelElement.textContent = this.name;
    labelElement.style.cssText =
      "font-weight: bold; font-size: 14px; cursor: pointer; display: flex; align-items: center;";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = this.value;
    checkbox.style.cssText = "margin-right: 10px; width: 16px; height: 16px;";

    labelElement.prepend(checkbox);

    const self = this;
    checkbox.addEventListener("change", function () {
      const value = this.checked;
      self.value = value;
      if (self.onChange) {
        self.onChange(value);
      }
    });

    container.appendChild(labelElement);

    return container;
  }

  updateControlDisplay() {
    if (this.controlElement) {
      const checkbox = this.controlElement.querySelector(
        'input[type="checkbox"]',
      );
      if (checkbox) {
        checkbox.checked = this.value;
      }
    }
  }
}

function createParameterGroup(paramConfig, groupName = null) {
  const parameters = {};

  // Create a group container
  const groupContainer = document.createElement("div");
  groupContainer.style.cssText =
    "border: 2px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 20px; background-color: #f9f9f9;";

  // Add group title if provided
  if (groupName) {
    const titleElement = document.createElement("h3");
    titleElement.textContent = groupName;
    titleElement.style.cssText =
      "margin: 0 0 15px 0; padding: 0; font-size: 13px; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 8px;";
    groupContainer.appendChild(titleElement);
  }

  // Wait for controls container and add the group container
  const waitForContainer = () => {
    const controlsContainer = document.getElementById("controls");
    if (controlsContainer) {
      controlsContainer.appendChild(groupContainer);
    } else {
      setTimeout(waitForContainer, 100);
    }
  };
  waitForContainer();

  for (const [varName, config] of Object.entries(paramConfig)) {
    let param;

    if (config.type === COLOR_PARAMETER) {
      param = new ColorParameter(
        varName,
        config.default || config.value,
        config.value,
      );
    } else if (config.type === INPUT_PARAMETER) {
      param = new InputParameter(
        varName,
        config.default || config.value,
        config.type === "number" ? "number" : "text",
        config.value,
      );
    } else if (config.type === RANGE_PARAMETER) {
      param = new RangeParameter(
        varName,
        config.default || config.value,
        config.min,
        config.max,
        config.interval,
        config.value,
      );
    } else if (config.type === RANDOM_PARAMETER) {
      param = new RandomParameter(
        varName,
        config.default || config.value,
        config.min || 0,
        config.max || 100,
        config.value,
      );
    } else if (config.type === BOOLEAN_PARAMETER) {
      param = new BooleanParameter(
        varName,
        config.default || config.value,
        config.value,
      );
    }

    if (config.callback) {
      param.setCallback(config.callback);
    }

    param.controlElement = param.createControlElement();

    groupContainer.appendChild(param.controlElement);

    parameters[varName] = param;
  }

  return parameters;
}

function resetAllParameters() {
  if (window.parameterRegistry) {
    Object.values(window.parameterRegistry).forEach((param) => {
      param.reset();
    });
  }
}

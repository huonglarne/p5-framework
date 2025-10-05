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

    createControl() {
        // Wait for controls container to be ready
        const waitForContainer = () => {
            const container = document.getElementById('controls');
            if (container) {
                this.controlElement = this.createControlElement();
                container.appendChild(this.controlElement);
            } else {
                setTimeout(waitForContainer, 100);
            }
        };
        waitForContainer();
    }

    // Abstract method - to be implemented by subclasses
    createControlElement() {
        throw new Error('createControlElement must be implemented by subclasses');
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
        throw new Error('updateControlDisplay must be implemented by subclasses');
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
        const container = document.createElement('div');
        container.style.marginBottom = '15px';

        const labelElement = document.createElement('label');
        labelElement.textContent = `${this.name}`;
        labelElement.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';

        const slider = document.createElement('input');
        slider.type = 'range';

        slider.min = this.min;
        slider.max = this.max;
        slider.value = this.value;
        slider.step = this.interval;
        slider.style.cssText = 'width: 200px; margin: 0 10px;';

        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = this.value;
        valueDisplay.style.cssText = 'font-weight: bold; color: #333;';

        const self = this;
        slider.addEventListener('input', function () {
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
            const valueDisplay = this.controlElement.querySelector('span');

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
        const container = document.createElement('div');
        container.style.marginBottom = '15px';

        const labelElement = document.createElement('label');
        labelElement.textContent = `${this.name}`;
        labelElement.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';

        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';

        const rgbToHex = (r, g, b) => {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        };

        colorPicker.value = rgbToHex(this.value[0], this.value[1], this.value[2]);
        colorPicker.style.cssText = 'width: 50px; height: 30px; border: none; border-radius: 4px; cursor: pointer;';

        const rgbDisplay = document.createElement('span');
        rgbDisplay.textContent = `RGB(${this.value[0]}, ${this.value[1]}, ${this.value[2]})`;
        rgbDisplay.style.cssText = 'margin-left: 10px; font-weight: bold; color: #333;';

        const self = this;
        colorPicker.addEventListener('input', function () {
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
            const colorPicker = this.controlElement.querySelector('input[type="color"]');
            const rgbDisplay = this.controlElement.querySelector('span');

            const rgbToHex = (r, g, b) => {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            };

            colorPicker.value = rgbToHex(this.value[0], this.value[1], this.value[2]);
            rgbDisplay.textContent = `RGB(${this.value[0]}, ${this.value[1]}, ${this.value[2]})`;
        }
    }
}

class InputParameter extends Parameter {
    constructor(name, defaultValue, type = 'text', value = null) {
        super(name, defaultValue, value);
        this.inputType = type; // 'text', 'number', etc.
    }

    createControlElement() {
        const container = document.createElement('div');
        container.style.marginBottom = '15px';

        const labelElement = document.createElement('label');
        labelElement.textContent = `${this.name}`;
        labelElement.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';

        const input = document.createElement('input');
        input.type = this.inputType;
        input.value = this.value;
        input.style.cssText = 'width: 200px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; margin: 0 10px;';

        const self = this;
        input.addEventListener('input', function () {
            let value = this.value;

            // Convert to number if it's a number input
            if (self.inputType === 'number') {
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
            const input = this.controlElement.querySelector('input');
            input.value = this.value;
        }
    }
}


function createParameterGroup(paramConfig, groupName = null) {
    const parameters = {};

    // Create a group container
    const groupContainer = document.createElement('div');
    groupContainer.style.cssText = 'border: 2px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 20px; background-color: #f9f9f9;';

    // Add group title if provided
    if (groupName) {
        const titleElement = document.createElement('h3');
        titleElement.textContent = groupName;
        titleElement.style.cssText = 'margin: 0 0 15px 0; padding: 0; font-size: 16px; font-weight: bold; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 8px;';
        groupContainer.appendChild(titleElement);
    }

    // Wait for controls container and add the group container
    const waitForContainer = () => {
        const controlsContainer = document.getElementById('controls');
        if (controlsContainer) {
            controlsContainer.appendChild(groupContainer);
        } else {
            setTimeout(waitForContainer, 100);
        }
    };
    waitForContainer();

    for (const [varName, config] of Object.entries(paramConfig)) {
        let param;

        if (config.type === 'color') {
            param = new ColorParameter(
                varName,
                config.default || config.value,
                config.value
            );
        } else if (config.type === 'input' || config.type === 'text' || config.type === 'number') {
            param = new InputParameter(
                varName,
                config.default || config.value,
                config.type === 'number' ? 'number' : 'text',
                config.value
            );
        } else if (config.type === 'range' || ('min' in config && 'max' in config)) {
            param = new RangeParameter(
                varName,
                config.default || config.value,
                config.min,
                config.max,
                config.interval,
                config.value
            );
        }

        if (config.callback) {
            param.setCallback(config.callback);
        }

        // Override the parameter's createControl method to add to this group
        const originalCreateControl = param.createControl;
        param.createControl = function () {
            this.controlElement = this.createControlElement();
            groupContainer.appendChild(this.controlElement);
        };
        param.createControl();

        parameters[varName] = param;
    }

    return parameters;
}

function resetAllParameters() {
    if (window.parameterRegistry) {
        Object.values(window.parameterRegistry).forEach(param => {
            param.reset();
        });
    }
}
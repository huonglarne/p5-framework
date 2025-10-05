// Create controls container below the canvas
function createControlsContainer() {
    // Remove any existing controls container
    const existingControls = document.getElementById('controls');
    if (existingControls) {
        existingControls.remove();
    }

    // Create the controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controls';
    controlsContainer.style.cssText = `
        position: absolute;
        top: 420px;
        left: 10px;
        width: 380px;
        background: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
    `;

    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Controls';
    title.style.cssText = `
        margin: 0 0 15px 0;
        color: #333;
        font-size: 16px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 8px;
    `;
    controlsContainer.appendChild(title);

    // Create reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset All';
    resetButton.style.cssText = `
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        margin-bottom: 15px;
        transition: background-color 0.2s;
    `;
    
    resetButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#ff5252';
    });
    
    resetButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#ff6b6b';
    });

    resetButton.addEventListener('click', function() {
        if (window.resetAllParameters) {
            resetAllParameters();
        }
    });

    controlsContainer.appendChild(resetButton);

    // Create button container for better layout
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    `;

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Canvas & Params';
    saveButton.style.cssText = `
        background: #4ecdc4;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
        flex: 1;
    `;
    
    saveButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#45b7b8';
    });
    
    saveButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#4ecdc4';
    });

    saveButton.addEventListener('click', function() {
        // Get the title from the parameter registry
        let fileTitle = 'sketch';
        if (window.parameterRegistry && window.parameterRegistry.title) {
            const titleValue = window.parameterRegistry.title.getValue();
            if (titleValue && titleValue.trim()) {
                // Clean the title for use in filename (remove invalid characters)
                fileTitle = titleValue.trim()
                    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .toLowerCase();
            }
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        
        // Save canvas as PNG
        if (window.saveCanvas) {
            saveCanvas(`${fileTitle}-${timestamp}`, 'png');
        }
        
        // Save parameters as JSON
        if (window.parameterRegistry) {
            const paramsData = {};
            Object.keys(window.parameterRegistry).forEach(paramName => {
                const param = window.parameterRegistry[paramName];
                paramsData[paramName] = param.getValue();
            });
            
            const jsonData = JSON.stringify(paramsData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileTitle}-params-${timestamp}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else {
            console.warn('No parameters found to save');
            alert('No parameters available to save');
        }
    });

    // Create import button
    const importButton = document.createElement('button');
    importButton.textContent = 'Load Settings';
    importButton.style.cssText = `
        background: #a29bfe;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
        flex: 1;
    `;
    
    importButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#6c5ce7';
    });
    
    importButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#a29bfe';
    });

    // Create hidden file input for import
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const paramsData = JSON.parse(e.target.result);
                    loadParameterSettings(paramsData);
                } catch (error) {
                    alert('Error loading settings: Invalid JSON file');
                    console.error('Import error:', error);
                }
            };
            reader.readAsText(file);
        }
        // Reset file input to allow selecting the same file again
        event.target.value = '';
    });

    importButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Add buttons to button container
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(importButton);
    controlsContainer.appendChild(buttonContainer);

    // Add hidden file input to container
    controlsContainer.appendChild(fileInput);

    // Add controls container to the page
    document.body.appendChild(controlsContainer);

    return controlsContainer;
}

// Function to load parameter settings from imported data
function loadParameterSettings(paramsData) {
    if (!window.parameterRegistry) {
        console.warn('No parameter registry found');
        return;
    }

    let loadedCount = 0;
    let totalCount = 0;

    for (const paramName in paramsData) {
        totalCount++;
        const parameter = window.parameterRegistry[paramName];
        if (parameter) {
            try {
                parameter.setValue(paramsData[paramName]);
                if (parameter.onChange) {
                    parameter.onChange(paramsData[paramName]);
                }
                loadedCount++;
            } catch (error) {
                console.warn(`Error setting parameter ${paramName}:`, error);
            }
        } else {
            console.warn(`Parameter ${paramName} not found in registry`);
        }
    }

    // Show feedback to user
    if (loadedCount > 0) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.textContent = `Loaded ${loadedCount}/${totalCount} parameters`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00b894;
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    } else {
        alert('No matching parameters found in the settings file');
    }
}

// Keyboard shortcut handler
function keyPressed() {
    if (key === 'r' || key === 'R') {
        resetAllParameters();
    }
}

// Make sure it's available globally
window.keyPressed = keyPressed;

// Initialize controls when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createControlsContainer();
});

// Also create controls immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createControlsContainer);
} else {
    createControlsContainer();
}
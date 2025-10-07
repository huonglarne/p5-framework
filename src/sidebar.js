// Sidebar functionality
class Sidebar {
    constructor() {
        this.sidebar = null;
        this.sidebarToggle = null;
        this.mainContent = null;
        this.isOpen = false;

        this.init();
    }

    init() {
        // Get DOM elements
        this.sidebar = document.querySelector(".sidebar");
        this.sidebarToggle = document.querySelector(".sidebar-toggle");
        this.mainContent = document.querySelector("#main-content");

        // Bind events
        this.bindEvents();

        // Initialize controls in sidebar
        this.initializeControls();
    }

    initializeControls() {
        // Add controls to sidebar if createControlsContainer is available
        if (window.createControlsContainer) {
            const sidebarContent = document.querySelector(".sidebar-content");
            if (sidebarContent) {
                window.createControlsContainer(sidebarContent);
            }
        }
    }

    bindEvents() {
        // Toggle sidebar on button click
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener("click", () => this.toggle());
        }

        // Close sidebar on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
                this.close();
            }
        });

        // Close sidebar on outside click
        document.addEventListener("click", (e) => {
            if (
                this.isOpen &&
                !this.sidebar.contains(e.target) &&
                !this.sidebarToggle.contains(e.target)
            ) {
                this.close();
            }
        });
    }

    open() {
        if (this.sidebar && this.mainContent) {
            this.sidebar.classList.add("open");
            this.mainContent.classList.add("sidebar-open");
            this.isOpen = true;

            // Update toggle button text/icon
            if (this.sidebarToggle) {
                this.sidebarToggle.innerHTML = "✕";
                this.sidebarToggle.setAttribute("aria-label", "Close sidebar");
            }
        }
    }

    close() {
        if (this.sidebar && this.mainContent) {
            this.sidebar.classList.remove("open");
            this.mainContent.classList.remove("sidebar-open");
            this.isOpen = false;

            // Update toggle button text/icon
            if (this.sidebarToggle) {
                this.sidebarToggle.innerHTML = "☰";
                this.sidebarToggle.setAttribute("aria-label", "Open sidebar");
            }
        }
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    // Method to add content to sidebar
    addContent(content) {
        const sidebarContent = document.querySelector(".sidebar-content");
        if (sidebarContent) {
            sidebarContent.innerHTML = content;
        }
    }

    // Method to append content to sidebar
    appendContent(element) {
        const sidebarContent = document.querySelector(".sidebar-content");
        if (sidebarContent && element) {
            sidebarContent.appendChild(element);
        }
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    window.sidebar = new Sidebar();
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
    module.exports = Sidebar;
}

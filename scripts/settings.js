"use strict";

// DOM Reference
const lightModeCheckBox = document.getElementById('lightModeToggle');


lightModeCheckBox.addEventListener('change', function(event) {
    if (this.checked) {
        localStorage.setItem('appearanceMode', 'light')
        document.documentElement.classList.add('light-mode');
    } else {
        localStorage.setItem('appearanceMode', 'dark')
        document.documentElement.classList.remove('light-mode');
    }
});

// Persisting the light mode appearance after settings page load or refresh
window.addEventListener('load', function () {
    const savedAppearanceMode = localStorage.getItem('appearanceMode');
    if (savedAppearanceMode === 'light') {
        lightModeCheckBox.checked = true;
        document.documentElement.classList.add('light-mode');
    }
})
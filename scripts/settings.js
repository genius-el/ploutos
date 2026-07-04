"use strict";

// DOM Reference
let body = document.body;

let welcomeMessage = document.getElementById('welcomeMessage');

let logOutBtn = document.getElementById('logOutBtn');

let nameInStorage = localStorage.getItem('profileName');

// Profile Dropdown
let userProfile = document.getElementById('userProfile');
let profileDropdown = document.getElementById('profileDropdown');
let chosenUserName = document.getElementById('chosenUserName');

// Other DOM references
const lightModeCheckBox = document.getElementById('lightModeToggle');
const newUserNameInput = document.getElementById('newUserNameInput');
const currencySelect = document.getElementById('currencySelect');
const settingsMessage = document.getElementById('settingsMessage');

// Btn reference
const saveChangesBtn = document.getElementById('saveChangesBtn');

// Profile Dropdown functionality
userProfile.addEventListener('click', function () {
    profileDropdown.classList.remove('hidden');
})

body.addEventListener('click', function (event) {
    if (!userProfile.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.classList.add('hidden');
    }
})

// Personalized Welcome Message
welcomeMessage.textContent = `Welecome, ${nameInStorage}`;

chosenUserName.textContent = nameInStorage ? nameInStorage : 'User'; // Default to 'User' if no name is found in localStorage

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

let newUserName;
// Save changes button listener
saveChangesBtn.addEventListener('click', function() {
    
    newUserName = newUserNameInput.value;
    
    // SAFEGUARD AGAINST EMPTY USERNAME
    if (newUserName.trim() !== '') {
        localStorage.setItem('profileName', newUserName);
        settingsMessage.textContent = 'Changes saved successfully!';
        setTimeout(() => {
            settingsMessage.textContent = '';
        }, 3000);
    }  

    // Selected Currency Functionality
    const selectedCurrency = currencySelect.value;
    switch (selectedCurrency) {
        case 'NG':
            localStorage.setItem('currency', '₦');
            break;
        case 'USD':
            localStorage.setItem('currency', '$');
            break;
        case 'EUR':
            localStorage.setItem('currency', '€');
            break;
        case 'GBP': 
            localStorage.setItem('currency', '£');
            break;
    }
})

logOutBtn.addEventListener('click', function () {
    // Clear the local storage
    // localStorage.clear();

    // Redirect to the get started page
    window.location.href = '../pages/getStarted.html';
})

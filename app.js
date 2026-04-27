"use strict";

// Selecting DOM Elements

let body = document.body;

// Profile Dropdown
let userProfile = document.getElementById('userProfile');
let profileDropdown = document.getElementById('profileDropdown')

// Modals
let addEarningModal = document.getElementById('addEarningModal');
let addExpenseModal = document.getElementById('addExpenseModal');
let setBudgetModal = document.getElementById('setBudgetModal');

// overlay
let overlay = document.querySelector('.overlay');

// Buttons
let addEarningBtn = document.getElementById('addEarningBtn');
let addExpenseBtn = document.getElementById('addExpenseBtn');
let setBudgetBtn = document.getElementById('setBudgetBtn');
let closeButtons = document.querySelectorAll('.close-btn');

// Event Listeners
// Opening Modals
addEarningBtn.addEventListener('click', function () {
    addExpenseModal.classList.add('hidden');
    setBudgetModal.classList.add('hidden');
    overlay.classList.remove('hidden');
    addEarningModal.classList.remove('hidden');
});

addExpenseBtn.addEventListener('click', function () {
    addEarningModal.classList.add('hidden');
    setBudgetModal.classList.add('hidden');
    overlay.classList.remove('hidden');
    addExpenseModal.classList.remove('hidden');
})

setBudgetBtn.addEventListener('click', function () {
    addEarningModal.classList.add('hidden');
    addExpenseModal.classList.add('hidden');
    overlay.classList.remove('hidden');
    setBudgetModal.classList.remove('hidden');
})

// Closing Modals
function closeAllModals() {
    addEarningModal.classList.add('hidden');
    addExpenseModal.classList.add('hidden');
    setBudgetModal.classList.add('hidden');
    overlay.classList.add('hidden');
}

closeButtons.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

overlay.addEventListener('click', closeAllModals);

// Profile Dropdown functionality
userProfile.addEventListener('click', function () {
    profileDropdown.classList.remove('hidden');
})

body.addEventListener('click', function (event) {
    if (!userProfile.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.classList.add('hidden');
    }
})
"use strict";

// Selecting DOM Elements

let body = document.body;

// Card Summary Values
let currentEarningValue = document.getElementById('currentEarningValue');
let currentExpenseValue = document.getElementById('currentExpenseValue');
let currentBudgetValue = document.getElementById('currentBudgetValue');

// Profile Dropdown
let userProfile = document.getElementById('userProfile');
let profileDropdown = document.getElementById('profileDropdown')

// Modals
let addEarningModal = document.getElementById('addEarningModal');
let addExpenseModal = document.getElementById('addExpenseModal');
let setBudgetModal = document.getElementById('setBudgetModal');

// Add Earning Modal
let earningDate = document.getElementById('earning-date');
let earningDescription = document.getElementById('earning-description');
let earningAmount = document.getElementById('earning-amount');

// Add Expense Modal
let expenseDate = document.getElementById('expense-date');
let expenseDescription = document.getElementById('expense-description');
let expenseAmount = document.getElementById('expense-amount');

// Set Budget Modal
let budgetDate = document.getElementById('budget-date');
let budgetAmount = document.getElementById('budget-amount');

// overlay
let overlay = document.querySelector('.overlay');

// Buttons
let addEarningBtn = document.getElementById('addEarningBtn');
let addExpenseBtn = document.getElementById('addExpenseBtn');
let setBudgetBtn = document.getElementById('setBudgetBtn');
let closeButtons = document.querySelectorAll('.close-btn');

let submitEarningBtn = document.getElementById('submitEarningBtn');
let submitExpenseBtn = document.getElementById('submitExpenseBtn');
let submitBudgetBtn = document.getElementById('submitBudgetBtn');

// State Values
let earningValue = 0;
let expenseValue = 0;
let budgetValue = 0;

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

// Modals functionality
let earningTransactions = [];

let earningTransaction = {
    id: Date.now(),
    date: "",
    description: "",
    amount: "",
    type: "",
}

let expenseTransactions = [];

let expenseTransaction = {
    id: "",
    date: "",
    description: "",
    amount: "",
    type: "",
}

let budgetTransaction = {
    id: "",
    date: "",
    amount: "",
}




submitEarningBtn.addEventListener('click', function () {
    // Fetching inputs from Add Earning
    let actualEarningDate = earningDate.value;
    let actualEarningDescription = earningDescription.value;
    let actualEarningAmount = earningAmount.value;
    earningTransaction = {
        id: Date.now(),
        date: actualEarningDate,
        description: actualEarningDescription,
        amount: actualEarningAmount,  
        type: 'Earning'        
    }

    earningValue += Math.round((actualEarningAmount + Number.EPSILON) * 100) / 100;
})

submitExpenseBtn.addEventListener('click', function () {
    // Fetching inputs from Add Expense
    let actualExpenseDate = expenseDate.value;
    let actualExpenseDescription = expenseDescription.value;
    let actualExpenseAmount = expenseAmount.value;
    expenseTransaction = {
        id: Date.now(),
        date: actualExpenseDate,
        description: actualExpenseDescription,
        amount: actualExpenseAmount,  
        type: 'Expense'     
    }

    expenseValue += Math.round((actualExpenseAmount + Number.EPSILON) * 100) / 100;
})

submitBudgetBtn.addEventListener('click', function () {
    // Fetching inputs from Set Budget
    let actualBudgetDate = budgetDate.value;
    let actualBudgetAmount = budgetAmount.value;
    budgetTransaction = {
        id: Date.now(),
        date: actualBudgetDate,
        amount: actualBudgetAmount,
    }
    currentBudgetValue.textContent = Math.round((actualBudgetAmount + Number.EPSILON) * 100) / 100;
})




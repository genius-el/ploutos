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

// Transactions Table references
let tableBody = document.getElementById('tableBody');

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
let totalEarningValue = 0;
let totalExpenseValue = 0;
let fixedBudgetValue = 0;

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

let budgetTransactions = [];
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

    // Complicated method to round to 2 decimal places without floating point issues, but it works!
    // totalEarningValue += Math.round((Number(earningTransaction.amount) + Number.EPSILON) * 100) / 100;
    totalEarningValue += parseFloat(earningTransaction.amount);
    // Displaying the current earning value on the card summary
    currentEarningValue.textContent = `$${totalEarningValue.toFixed(2)}`;
    
    // Populating the earning transactions array
    earningTransactions.push(earningTransaction);

    // DYNAMICALLY CREATING AND ADDING EARNING TRANSACTION ROWS TO THE TRANSACTIONS TABLE
    // Create the row element
    const newEarningRow = document.createElement('tr');

    // Create the date cell
    const earningDateCell = document.createElement('td');
    earningDateCell.textContent = earningTransaction.date;

    // Create the amount cell
    const earningAmountCell = document.createElement('td');
    earningAmountCell.textContent = `$${earningTransaction.amount}`;

    // Create the description cell
    const earningDescriptionCell = document.createElement('td');
    earningDescriptionCell.textContent = earningTransaction.description;

    // Create type cell
    const earningTypeCell = document.createElement('td');
    earningTypeCell.textContent = earningTransaction.type;

    // Append each earning cell to the earning row
    newEarningRow.appendChild(earningDateCell);
    newEarningRow.appendChild(earningDescriptionCell);
    newEarningRow.appendChild(earningAmountCell);
    newEarningRow.appendChild(earningTypeCell);

    // Append the completed earning row to the table body
    tableBody.appendChild(newEarningRow);


    // Clearing all entries
    earningDate.value = "";
    earningAmount.value = "";
    earningDescription.value = "";

    

    closeAllModals();
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

    // Complicated method to round to 2 decimal places without floating point issues, but it works!
    // totalExpenseValue += Math.round((Number(expenseTransaction.amount) + Number.EPSILON) * 100) / 100;
    totalExpenseValue += parseFloat(expenseTransaction.amount);
    // Displaying the current expense value on the card summary
    currentExpenseValue.textContent = `$${totalExpenseValue.toFixed(2)}`;
    // Populating the expense transactions array
    expenseTransactions.push(expenseTransaction);

    // DYNAMICALLY CREATING AND ADDING EARNING TRANSACTION ROWS TO THE TRANSACTIONS TABLE
    // Create the row element
    const newExpenseRow = document.createElement('tr');

    // Create the date cell
    const expenseDateCell = document.createElement('td');
    expenseDateCell.textContent = expenseTransaction.date;

    // Create the amount cell
    const expenseAmountCell = document.createElement('td');
    expenseAmountCell.textContent = `$${expenseTransaction.amount}`;

    // Create the description cell
    const expenseDescriptionCell = document.createElement('td');
    expenseDescriptionCell.textContent = expenseTransaction.description;

    // Create type cell
    const expenseTypeCell = document.createElement('td');
    expenseTypeCell.textContent = expenseTransaction.type;

    // Append each expense cell to the expense row
    newExpenseRow.appendChild(expenseDateCell);
    newExpenseRow.appendChild(expenseDescriptionCell);
    newExpenseRow.appendChild(expenseAmountCell);
    newExpenseRow.appendChild(expenseTypeCell);

    // Append the completed expense row to the table body
    tableBody.appendChild(newExpenseRow);



    expenseDate.value = "";
    expenseAmount.value = "";
    expenseDescription.value = "";

    // Dynamically creating transaction rows from expense transaction
    closeAllModals();
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
    // Displaying the current budget value on the card summary
    // Complicated method to round to 2 decimal places without floating point issues, but it works!
    // currentBudgetValue.textContent = `$${Math.round(((Number(budgetTransaction.amount)) + Number.EPSILON) * 100) / 100}`;
    fixedBudgetValue = parseFloat(budgetTransaction.amount);
    currentBudgetValue.textContent = `$${fixedBudgetValue.toFixed(2)}`;

    budgetTransactions.push(budgetTransaction);

    budgetDate.value = "";
    budgetAmount.value = "";

    closeAllModals();
})




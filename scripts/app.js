"use strict";

// CONDITION FOR DISPLAYING THE GET STARTED PAGE
let nameInStorage = localStorage.getItem('profileName');

if (!nameInStorage) {
    // Redirects the user to the get started page only if user name does not exist. Else, the user remains on the dashboard page.
    window.location.href = "../pages/getStarted.html";
} else {
    // If user name exists, the dashboard page is displayed and the user can interact with the dashboard.
    document.body.style.display = "block";
}

// Selecting DOM Elements

let body = document.body;

let logOutBtn = document.getElementById('logOutBtn');

// Card References
let earningsCard = document.getElementById('earningsCard');
let expensesCard = document.getElementById('expensesCard');
let budgetCard = document.getElementById('budgetCard');

// Welcome Message Reference
let welcomeMessage = document.getElementById('welcomeMessage');

// Card Summary Values
let currentEarningValue = document.getElementById('currentEarningValue');
let currentExpenseValue = document.getElementById('currentExpenseValue');
let currentBudgetValue = document.getElementById('currentBudgetValue');

// Profile Dropdown
let userProfile = document.getElementById('userProfile');
let profileDropdown = document.getElementById('profileDropdown');
let chosenUserName = document.getElementById('chosenUserName');

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
let recentBudgetAmount = 0;

// Personalized Welcome Message
welcomeMessage.textContent = `Welcome, ${nameInStorage}!`;

// Profile Name Update
chosenUserName.textContent = nameInStorage;

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
let allTransactions = [];

let transaction = {
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

// Get the current selected currency
let currency = localStorage.getItem('currency');
if (!currency) {
    currency = '₦';
}

// DATA BUILDING BEGINS OR CONTINUES: Adding transactions to the transactions array and local storage
submitEarningBtn.addEventListener('click', function () {
    // Receiving inputs from Add Earning
    let actualEarningDate = earningDate.value;
    let actualEarningDescription = earningDescription.value;
    let actualEarningAmount = earningAmount.value;
    transaction = {
        id: Date.now(),
        date: actualEarningDate,
        description: actualEarningDescription,
        amount: actualEarningAmount,  
        type: 'Earning'        
    }

    // Populating the earning transactions array
    allTransactions.push(transaction);

    // Saving the earning transactions array to local storage
    saveToStorage();

    // Aggregating the total earning value for each transaction and updating the state variable
    totalEarningValue += parseFloat(transaction.amount);
           
    // VISUAL UI DISPLAY: Displaying current total earning value
    currentEarningValue.textContent = `${currency}${totalEarningValue.toFixed(2)}`;

    // VISUAL UI DISPLAY: Dynamically creating transaction rows from earning transaction
    createTransactionRow(transaction);

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
    transaction = {
        id: Date.now(),
        date: actualExpenseDate,
        description: actualExpenseDescription,
        amount: actualExpenseAmount,  
        type: 'Expense'     
    }

    // Populating the expense transactions array
    allTransactions.push(transaction);

    // Setting the expense transactions array in local storage
    saveToStorage();

    // Updating the total expense value state variable
    totalExpenseValue += parseFloat(transaction.amount);

    // VISUAL UI DISPLAY: Displaying current total expense value
    // Displaying the current expense value on the card summary
    currentExpenseValue.textContent = `${currency}${totalExpenseValue.toFixed(2)}`;

    // VISUAL UI DISPLAY: Dynamically creating transaction rows from expense transaction
    createTransactionRow(transaction);

    // Trigger check for budget warning system on expense submission
    checkBudgetWarning();

    // Clearing all entries
    expenseDate.value = "";
    expenseAmount.value = "";
    expenseDescription.value = "";

    closeAllModals();
})

submitBudgetBtn.addEventListener('click', function () {
    // Receiving inputs from Set Budget
    let actualBudgetDate = budgetDate.value;
    let actualBudgetAmount = budgetAmount.value;

    budgetTransaction = {
        id: Date.now(),
        date: actualBudgetDate,
        amount: actualBudgetAmount,
    }

    budgetTransactions.push(budgetTransaction);

    // Accessing the current budget value and displaying it on the card summary
    let recentBudget = budgetTransactions[budgetTransactions.length -  1];
    recentBudgetAmount = parseFloat(recentBudget.amount);

    // Setting the budget value in local storage
    localStorage.setItem('budget', recentBudgetAmount);

    currentBudgetValue.textContent = `${currency}${recentBudgetAmount.toFixed(2)}`;

    // Clearing all entries
    budgetDate.value = "";
    budgetAmount.value = "";

    closeAllModals();
})

function saveToStorage () {
    let allTransactionsArrayString = JSON.stringify(allTransactions);
    localStorage.setItem('allTransactions', allTransactionsArrayString);
}

// ON PAGE LOAD, CHECK IF THERE ARE ANY TRANSACTIONS OR BUDGET IN LOCAL STORAGE AND DISPLAY THEM


function loadTransactionsFromStorage () {
    // Check if transaction exists in storage
    let storedTransactions = localStorage.getItem('allTransactions');
    if (storedTransactions) {
        let parsedTransactions = JSON.parse(storedTransactions);
        // Where memory (earning transactions array) becomes in tune with local storage
        allTransactions = parsedTransactions;

        allTransactions.forEach((transaction) => {
            // DYNAMICALLY CREATING AND ADDING EARNING TRANSACTION ROWS TO THE TRANSACTIONS TABLE
            createTransactionRow(transaction);
        });

        // Getting the earnings and expenses arrays
        calculatingCurrentTransactionTotals();

        // Displaying current earning value on card summary
        // localStorage.getItem('currency');
        currentEarningValue.textContent = `${currency}${totalEarningValue.toFixed(2)}`; 

        // Displaying current expense value on card summary
        currentExpenseValue.textContent = `${currency}${totalExpenseValue.toFixed(2)}`;

        // Trigger check for budget warning system on page load
        checkBudgetWarning();
    }
}

// For budget from local storage
function loadBudgetFromStorage () {
    let storedBudgetTransaction = localStorage.getItem('budget');
    if (storedBudgetTransaction) {
        let budgetToUse = parseFloat(storedBudgetTransaction);
        // Where memory budget transaction becomes in tune with local storage
        recentBudgetAmount = budgetToUse;

        currentBudgetValue.textContent = `${currency}${budgetToUse.toFixed(2)}`;
    }
}

loadTransactionsFromStorage();
loadBudgetFromStorage();

function calculatingCurrentTransactionTotals () {
    // Getting the earnings and expenses arrays
    let earnings = allTransactions.filter(transaction => transaction.type === 'Earning');
    let expenses = allTransactions.filter(transaction => transaction.type === 'Expense');

    // Calculating total earnings amount
    totalEarningValue = earnings.reduce(function(total, transaction) {
        return total + parseFloat(transaction.amount);
    }, 0);

    // Calculating total expenses amount
    totalExpenseValue = expenses.reduce(function(total, transaction) {
        return total + parseFloat(transaction.amount)
    }, 0)
}

// Budget Warning System 
function checkBudgetWarning () {
    let budgetExpenseDiff = recentBudgetAmount - totalExpenseValue;
    if (budgetExpenseDiff <= 100 && recentBudgetAmount > 0) {
        expensesCard.classList.add('budget-warning');
    } else {
        expensesCard.classList.remove('budget-warning');
    }
}

function createTransactionRow (transaction) {
     // DYNAMICALLY CREATING AND ADDING EARNING TRANSACTION ROWS TO THE TRANSACTIONS TABLE
        // Create the row element
        const newRow = document.createElement('tr');

        // Create the date cell
        const dateCell = document.createElement('td');
        dateCell.textContent = transaction.date;

        // Create the amount cell
        const amountCell = document.createElement('td');
        amountCell.textContent = `${currency}${transaction.amount}`;

        // Create the description cell
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = transaction.description;

        // Create type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;

        // Create the delete button cell
        const deleteBtn = document.createElement('button');
        deleteBtn.dataset.id = transaction.id;
        deleteBtn.className = 'delete-transaction-btn';

        // creating the trash icon for font Awesome library
        const trashIcon = document.createElement('i');

        trashIcon.classList.add('fas', 'fa-trash');

        // (Optional) Improve accessiblity for decorative icons
        trashIcon.setAttribute('aria-hidden', 'true');

        deleteBtn.appendChild(trashIcon);


        // Append each cell and then the delete btn to the row
        newRow.appendChild(dateCell);
        newRow.appendChild(descriptionCell);
        newRow.appendChild(amountCell);
        newRow.appendChild(typeCell);
        newRow.appendChild(deleteBtn);

        // Append the completed row to the table body
        tableBody.appendChild(newRow);
}

// DELETE transaction functionality
tableBody.addEventListener('click', function (event) {
    if (event.target.closest('.delete-transaction-btn')) {
        const transactionIdToDelete = Number(event.target.closest('.delete-transaction-btn').dataset.id);
        // Filter allTransactions to remove the deleted ID
        let updatedTransactions = allTransactions.filter(transaction => transaction.id !== transactionIdToDelete);
        allTransactions = updatedTransactions;

        // Save to storage
        saveToStorage();

        // Recalculating totals
        calculatingCurrentTransactionTotals();

        // Update the card summary with the new totals
        currentEarningValue.textContent = `${currency}` + `${totalEarningValue.toFixed(2)}`;
        
        currentExpenseValue.textContent = `${currency}` + `${totalExpenseValue.toFixed(2)}`;
        // Re-rendering the transactions table
        renderTransactionsTable();

        // Trigger check for budget warning system after deletion
        checkBudgetWarning();
    }
})

// Render existing transactions after deletions
function renderTransactionsTable () {
    // Clear the table body before re-rendering to avoid duplicates
    tableBody.innerHTML = "";

    // Re-render all transactions
    allTransactions.forEach(transaction => {
        createTransactionRow(transaction)
    })
}

// LogOut functionality
logOutBtn.addEventListener('click', function () {
    // Clear the local storage
    // localStorage.clear();

    // Redirect to the get started page
    window.location.href = '../pages/getStarted.html';
})

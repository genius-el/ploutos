'use strict';

// Select DOM elements
const earningsBarFill = document.querySelector('.earnings-bar-fill');
const expensesBarFill = document.querySelector('.expenses-bar-fill');
const budgetBarFill = document.querySelector('.budget-bar-fill');

const earningsAmountText = document.querySelector('.earnings-amount');
const earningsPercentageText = document.querySelector('.earnings-percentage');

const expensesAmountText = document.querySelector('.expenses-amount');
const expensesPercentageText = document.querySelector('.expenses-percentage');

const budgetAmountText = document.querySelector('.budget-amount');
const budgetPercentageText = document.querySelector('.budget-percentage');

// Retrieve and parse All Transactions from local storage
const allTransactionsString = localStorage.getItem('allTransactions');
const allTransactions = JSON.parse(allTransactionsString);

// Retrieve and parse Budget from local storage
const budgetString = localStorage.getItem('budget');
let budget = parseFloat(budgetString);

let earnings;
let expenses;
let totalEarnings;
let totalExpenses;
// Safeguard against null or undefined values for allTransactions
if (!allTransactions) {
    console.error('All Transactions data is not available in local storage.');
    earnings = 0;
    expenses = 0;
    totalEarnings = 0;
    totalExpenses = 0;
} else {
    // Filtering out the earnings and the expenses from the All Transactions array
    earnings = allTransactions.filter(transaction => transaction.type === 'Earning');
    expenses = allTransactions.filter(transaction => transaction.type === 'Expense');

    // Summing up the earnings and the expenses
    totalEarnings = earnings.reduce(function(total, transaction) {
        return total + parseFloat(transaction.amount);
    }, 0);

    totalExpenses = expenses.reduce(function(total, transaction) {
        return total + parseFloat(transaction.amount);
    }, 0);
}

let earningsPercentage;
let expensesPercentage;
let budgetPercentage;

// Safeguard against division by undefined or unset budget values
if (!budget) {
    console.error('Budget is zero or not defined. Cannot calculate percentages.');
    budget = 0; // Ensure budget is set to zero to avoid NaN in calculations
    earningsPercentage = 0;
    expensesPercentage = 0;
    budgetPercentage = 0;
} else {
    // Calculate percentages against budget
    earningsPercentage = (totalEarnings / budget) * 100;
    expensesPercentage = (totalExpenses / budget) * 100;

    // Budget percentage is always 100%; it is the metric to be measured against
    budgetPercentage = 100;
}

// Calculate earnings pixel height
const earningsPixel = (earningsPercentage / 100) * 200;

const expensesPixel = (expensesPercentage / 100) * 200;

const budgetPixel = (budgetPercentage / 100) * 200;

earningsBarFill.style.height = earningsPixel + 'px';
expensesBarFill.style.height = expensesPixel + 'px';
budgetBarFill.style.height = budgetPixel + 'px';

earningsAmountText.textContent = `${totalEarnings.toFixed(2)}`;
earningsPercentageText.textContent = `${earningsPercentage.toFixed()}%`;

expensesAmountText.textContent = `${totalExpenses.toFixed(2)}`;
expensesPercentageText.textContent = `${expensesPercentage.toFixed()}%`;

budgetAmountText.textContent = `${budget.toFixed(2)}`;
budgetPercentageText.textContent = `${budgetPercentage.toFixed()}%`;


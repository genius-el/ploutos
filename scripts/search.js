"use strict";

// DOM REFERENCES
let body = document.body;

let welcomeMessage = document.getElementById('welcomeMessage');

let logOutBtn = document.getElementById('logOutBtn');

let nameInStorage = localStorage.getItem('profileName');

// Profile Dropdown
let userProfile = document.getElementById('userProfile');
let profileDropdown = document.getElementById('profileDropdown');
let chosenUserName = document.getElementById('chosenUserName');

// Other DOM references
const searchField = document.getElementById('searchField');
const searchResultsCards = document.getElementById('searchResults');

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
welcomeMessage.textContent = `Welcome, ${nameInStorage}`;

chosenUserName.textContent = nameInStorage ? nameInStorage : 'User'; // Default to 'User' if no name is found in localStorage

// Declaring the filteredSearchArray amd parsedTransactions globally to be easily accessed by the delete event listener
let filteredSearchArray;
let parsedTransactions;
// Event Listeners
// const deleteTransaction
searchField.addEventListener('input', () => {
    // Get the search input value
    let searchInput = searchField.value;

    // SAFEGUARD AGAINST EMPTY SEARCH INPUTS
    if (searchInput.trim() === '') {
        searchResultsCards.innerHTML = '';  // Clear the results container
        return;
    }

    let lowerSearchInput = searchInput.toLowerCase(); // Convert entry to lowerCase

    // Get all Transactions from the local storage
    let storedTransactions = localStorage.getItem('allTransactions') || '[]';
    parsedTransactions = JSON.parse(storedTransactions);

    // Filter function to select out matched results
    filteredSearchArray = parsedTransactions.filter(transaction => {
        let searchTransactionValuesArray = Object.values(transaction); //Extracting and storing the values of keys in each filter loop iteration in an array form
        let lowerSearchTransactionValuesArray = searchTransactionValuesArray.map(element => String(element).toLowerCase()); // Converting each element of the array into lower case for search input matching

        return lowerSearchTransactionValuesArray.some(element => element.includes(lowerSearchInput));
    })
    // Clear previous search results before displaying new ones
    searchResultsCards.innerHTML = '';
    createSearchResultsCards(filteredSearchArray);

})

// Get the current selected currency
let currency = localStorage.getItem('currency');
if (!currency) {
    currency = '₦';
}


// Create cards for the search results
function createSearchResultsCards(array) {
    array.forEach(transactionObject => {
        const searchRow = document.createElement('div');
        searchRow.className = 'search-row';

        const searchDate = document.createElement('div');
        searchDate.textContent = transactionObject.date;

        const searchDescription = document.createElement('div');
        searchDescription.textContent = transactionObject.description;

        const searchAmount = document.createElement('div');
        searchAmount.textContent = `${currency}` +  transactionObject.amount;

        const searchType = document.createElement('div');
        searchType.textContent = transactionObject.type;

        const deleteBtn = document.createElement('button');
        deleteBtn.dataset.id = transactionObject.id; // Store the transaction ID in a data attribute for later use in delete functionality
        deleteBtn.className = 'delete-transaction-btn';

        // Creating the trash icon for font Awesome library
        const trashIcon = document.createElement('i');

        trashIcon.classList.add('fas', 'fa-trash');

        // (Optional): Improve accessibility for decorative icons
        trashIcon.setAttribute('aria-hidden', 'true');

        deleteBtn.appendChild(trashIcon);

        // Append each search result element and the delete button to the search row
        searchRow.appendChild(searchDate);
        searchRow.appendChild(searchDescription);
        searchRow.appendChild(searchAmount);
        searchRow.appendChild(searchType);
        searchRow.appendChild(deleteBtn);

        // Append the search row to the search results container
        searchResultsCards.appendChild(searchRow);
    })
}

// SEARCH DELETE BUTTON FUNCTIONALITY
searchResultsCards.addEventListener('click', function(event) {
    if (event.target.closest('.delete-transaction-btn')) {
        const transactionIdToDelete = Number(event.target.closest('.delete-transaction-btn').dataset.id);
        // Delete the transaction from the filtered search
        filteredSearchArray = filteredSearchArray.filter(transaction => transaction.id !== transactionIdToDelete);

        // Delete the transaction in the parsed transactions from local storage and update the local storage 
        parsedTransactions = parsedTransactions.filter(transaction => transaction.id !== transactionIdToDelete);
        localStorage.setItem('allTransactions', JSON.stringify(parsedTransactions))

        // Rerender search results
        searchResultsCards.innerHTML = '';
        createSearchResultsCards(filteredSearchArray);
    }
})


logOutBtn.addEventListener('click', function () {
    // Clear the local storage
    // localStorage.clear();

    // Redirect to the get started page
    window.location.href = '../pages/getStarted.html';
})


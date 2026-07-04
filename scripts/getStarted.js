// Get Started page JavaScript
"use strict";

// DOM References
const userNameInput = document.getElementById('userNameInput');
const errorMessage = document.getElementById('errorMessage');

// Button Reference
const getStartedBtn = document.getElementById('getStartedBtn');


// Get Started Button Event Listener
getStartedBtn.addEventListener('click', () => {
    // Retrieving user name
    let userName = userNameInput.value;
    
    if (userName.trim() === '') {
        errorMessage.textContent = 'Username is required!'
        
    } else {
        // No need for JSON.stringify since we are storing a simple string, not an object or array.
        // let nameString = JSON.stringify(profileName);

        // Storing the username in localStorage
        localStorage.setItem('profileName', userName);
        alert(`Welcome, ${userName}! Your username has been saved.`);
        // Redirecting to dashboard page after storing the username in localStorage
        window.location.href = '../index.html';
    }
})
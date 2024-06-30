let signupBtn = document.getElementById('signupBtn');
let signinBtn = document.getElementById('signinBtn');
let nameField = document.getElementById('nameField');
let confirmField = document.getElementById('confirmField');
let title = document.getElementById('title');
let error = document.querySelector('.error');
let inputs = document.querySelectorAll('input');

// Function to reset input field styles and remove error messages
function resetFieldStyles() {
    inputs.forEach(input => {
        input.style.borderColor = '';
        let errorMsg = input.parentElement.querySelector('.field-error');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

// Function to add event listeners to remove error on input
function addInputEventListeners() {
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
            let errorMsg = input.parentElement.querySelector('.field-error');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });
}

// Function to check if all input fields are filled based on mode
function checkFields(isSignup) {
    let allFilled = true;
    inputs.forEach(input => {
        if ((isSignup || (!isSignup && (input.id === 'email' || input.id === 'password'))) &&
            input.style.maxHeight !== '0px' && input.value === '') {
            allFilled = false;
            input.style.borderColor = 'red';
            let errorSpan = document.createElement('span');
            errorSpan.classList.add('field-error');
            errorSpan.style.color = 'red';
            errorSpan.style.fontSize = '10px';
            errorSpan.innerText = 'This field is required';
            input.parentElement.appendChild(errorSpan);
        }
    });
    return allFilled;
}

// Function to handle form toggle
function toggleForm(isSignup) {
    resetFieldStyles(); // Reset field styles when toggling forms
    if (isSignup) {
        nameField.style.maxHeight = '65px';
        confirmField.style.maxHeight = '65px';
        title.innerText = 'Sign Up';
        signupBtn.classList.remove('disabled');
        signinBtn.classList.add('disabled');
    } else {
        nameField.style.maxHeight = '0';
        confirmField.style.maxHeight = '0';
        title.innerText = 'Sign In';
        signupBtn.classList.add('disabled');
        signinBtn.classList.remove('disabled');
    }
    error.style.display = 'none'; // Hide error message when toggling forms
}

// Prevent default form submission
document.querySelector('form').onsubmit = function(e) {
    e.preventDefault();
};

// Separate function to handle button clicks
function handleButtonClick(isSignup) {
    resetFieldStyles(); // Reset field styles before validation
    error.style.display = 'none'; // Hide error message initially
    if (checkFields(isSignup)) {
        location.reload(); // Reload the page if all fields are filled
    } else {
        error.style.display = 'block'; // Show error message if any field is empty
        setTimeout(() => {
            error.style.display = 'none'; // Hide error message after a short delay
        }, 3000); // 3 seconds delay
    }
}

// Event listener for Sign Up button
signupBtn.onclick = function() {
    handleButtonClick(true);
};

// Event listener for Sign In button
signinBtn.onclick = function() {
    handleButtonClick(false);
};

// Initial toggle state
toggleForm(true);

// Add event listeners to inputs
addInputEventListeners();

// Separate toggle form click handlers to switch between Sign In and Sign Up forms
document.getElementById('signinBtn').addEventListener('click', function() {
    if (signinBtn.classList.contains('disabled')) {
        toggleForm(false);
    }
});

document.getElementById('signupBtn').addEventListener('click', function() {
    if (signupBtn.classList.contains('disabled')) {
        toggleForm(true);
    }
});

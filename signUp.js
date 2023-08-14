const containerForm = document.getElementById("form-container");
let errorDiv;
errorDiv = document.createElement("div");
errorDiv.classList.add("errorDiv");
errorDiv.id = "errorDiv";
let password;

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function (event) {
    validate(event);
});

function validateEmail(input) {
    const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    return re.test(input.value);
}

function validatePhoneNumber(input) {
    const re = new RegExp("^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$");
    return re.test(input.value);
}

function validatePassword(input) {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");
    return re.test(input.value);
}

// 0 - name/surname, 1 - email, 2 - phone, 3 - passwords do not match
function displayError(option) {
    let errorMessage;
    let errorAdvice;
    let errorP = document.createElement("p");
    let errorAdviceP = document.createElement("p");

    errorDiv.innerHTML = '';

    if (option === "fname" || option === "lname") {
        errorMessage = "Invalid first or last name.";
        const errorP = document.createElement("p");
        errorP.innerText = errorMessage;
        errorDiv.appendChild(errorP);
        errorDiv.classList.add("name");
    }
    else if (option === "mail") {
        errorMessage = "Invalid email.";
        errorP.innerText = errorMessage;
        errorDiv.appendChild(errorP);
        errorDiv.classList.add("mail");
    }
    else if (option === "phone-number") {
        errorMessage = "Invalid phone number.";
        errorP.innerText = errorMessage;

        errorAdvice = "Valid format: 123 456 7890";
        errorAdviceP.innerText = errorAdvice;

        errorDiv.appendChild(errorP);
        errorDiv.appendChild(errorAdviceP);
        errorDiv.classList.add("phone");
    }
    else if (option === "password") {
        errorMessage = "Invalid password.";
        errorP.innerText = errorMessage;

        errorAdvice = "Password must be min. 8 char. long. A-Z a-z 0-9 required.";
        errorAdviceP.innerText = errorAdvice;

        errorDiv.appendChild(errorP);
        errorDiv.appendChild(errorAdviceP);
        errorDiv.classList.add("password");
    }
    else {
        errorMessage = "Passwords do not match.";
        errorP.innerText = errorMessage;
        errorDiv.appendChild(errorP);
        errorDiv.classList.add("confirm-password");
    }


    containerForm.insertAdjacentElement('afterbegin', errorDiv);
}

function validate(event){
    let hasError = false;
    let validateElements = document.getElementsByClassName("validate");
    let inputs = Array.prototype.filter.call(validateElements,
        function(element){
            return element.nodeName === 'INPUT';
        });

    // Loop through the inputs to be validated

    for(let i= 0; i < inputs.length; i ++ ){
        let input = inputs[i];
        let currentId = input.getAttribute("id");
        if(input.value.length === 0 && (currentId === "fname" || currentId === "lname")){
            displayError(currentId);
            // error class
            input.classList.add("err");
            hasError = true;
            break;
        }
        if (currentId === "mail") {
            if (!validateEmail(input)) {
                displayError(currentId);
                input.classList.add("err");
                hasError = true;
                break;
            }

        }
        if (currentId === "phone-number") {
                if (!validatePhoneNumber(input)) {
                    displayError(currentId);
                    input.classList.add("err");
                    hasError = true;
                    break;
                }

        }
        if (currentId === "password") {
            password = input.value;
            if (!validatePassword(input)) {
                displayError(currentId);
                input.classList.add("err");
                hasError = true;
                break;
            }
        }
        if (currentId === "confirm-password") {
            if (!input.value === password)  {
                displayError(currentId);
                input.classList.add("err");
                hasError = true;
                break;
            }
        }
        // if (containerForm.contains(errorDiv)) {
        //     containerForm.removeChild(errorDiv);
        // }
        /// add option for comparing passwords
        input.classList.remove("err");
    }
    if (hasError) {
        event.preventDefault();
    }
}
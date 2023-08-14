let errorDiv;
errorDiv = document.createElement("div");
errorDiv.classList.add("errorDiv");
errorDiv.id = "errorDiv";

function validateEmail(input) {
    const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    return re.test(input.value);
}

function validatePhoneNumber(input) {
    const re = new RegExp("^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$\n");
    return re.test(input.value);
}

function validatePassword(input) {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\n");
    return re.test(input.value);
}

// 0 - name/surname, 1 - email, 2 - phone, 3 - passwords do not match
function displayError(option) {
    let errorMessage;
    let errorAdvice;
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
        const errorP = document.createElement("p");
        errorP.innerText = errorMessage;
        errorDiv.appendChild(errorP);
        errorDiv.classList.add("mail");
    }
    else if (option === "phone-number") {
        errorMessage = "Invalid phone number.";
        const errorP = document.createElement("p");
        errorP.innerText = errorMessage;

        errorAdvice = "Valid format: 123 456 7890";
        const errorAdviceP = document.createElement("p");
        errorAdviceP.innerText = errorAdvice;

        errorDiv.appendChild(errorP);
        errorDiv.appendChild(errorAdviceP);
        errorDiv.classList.add("phone");
    }
    else if (option === "password") {
        errorMessage = "Invalid password.";
        ///
    }
    else {
        errorMessage = "Passwords do not match.";
    }

    const containerForm = document.getElementById("form-container");
    containerForm.insertAdjacentElement('afterbegin', errorDiv);
}

function validate(event){
    let validateElements = document.getElementsByClassName("validate");
    let inputs = Array.prototype.filter.call(validateElements,
        function(element){
            return element.nodeName === 'INPUT';
        });

    // Loop through the inputs to be validated

    for(let i=0; i < inputs.length; i ++ ){
        let input = inputs[i];
        if (document.getElementById("errorDiv")) {
            let tempElement = document.getElementById("errorDiv");
            tempElement.remove();
        }
        if(input.value.length === 0){
            // generic placeholder
            input.placeholder = "Invalid value.";
            // error class
            input.classList.add("err");
            event.preventDefault();
            break;
        }
        if (input.getAttribute("id") === "mail") {
            if (!validateEmail(input)) {
                displayError(input.getAttribute("id"));
                input.classList.add("err");
                event.preventDefault();
                break;
            }
            else {
                if (errorDiv.classList.contains("mail")) {
                    errorDiv.innerHTML('');
                }
            }

        }

        else if (input.getAttribute("id") === "phone-number") {
                if (!validatePhoneNumber(input)) {
                    displayError(input.getAttribute("id"));
                    input.classList.add("err");
                    event.preventDefault();
                    break;
                }
                else {
                    if (errorDiv.classList.contains("phone")) {
                        errorDiv.innerHTML('');
                    }
                }

        }
        else if (input.getAttribute("id") === "password" && !validatePassword(input)) {
            displayError(input.getAttribute("id"));
            input.classList.add("err");
            event.preventDefault();
        }

        /// add option for comparing passwords
        input.classList.remove("err");
    }
}
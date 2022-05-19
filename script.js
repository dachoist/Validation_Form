let inputs = document.querySelectorAll('input');
let errors = {
    'name_surname': [],
    'username': [],
    'email': [],
    'password': [],
    'repeat_password': []
};

inputs.forEach(element=>{
    element.addEventListener('change', e => {
        let currentInput = e.target
        let inputValue = currentInput.value
        let inputName = currentInput.getAttribute('name')
        //inputName get name of that input through getAttribute

        if(inputValue.length > 4) {
            errors[inputName] = []
            
            switch(inputName) {
                case 'name_surname':
                    let validation = inputValue.trim()
                    validation = validation.split(" ");
                    if(validation.length < 2) {
                        errors[inputName].push('You need name and surname')
                    }
                break;

                case 'email':
                    if(!validateEmail(inputValue)) {
                        errors[inputName].push('Email adress not correct')
                    }
                break;

                case 'repeat_password':
                    let password = document.querySelector('input[name="password"]').value
                    if(inputValue !== password) {
                        errors[inputName].push('Passwords don\'t match')
                    }
                break;

            }

        } else {
            errors[inputName] = ["Input must have at least 5 characters"]
        }
        populateErrors()

    })
});

const populateErrors = () => {

    for(let elem of document.querySelectorAll('ul')) {
        elem.remove();
    }

    for(let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`)
        let parentElement = input.parentElement
        let errorsElement = document.createElement('ul')
        parentElement.appendChild(errorsElement)

        errors[key].forEach(error => {
            let li = document.createElement('li')
            li.className = "error_message"
            li.innerText = error;

            errorsElement.appendChild(li)
        })
    }

}

const validateEmail = email => {
    if(email.includes("@") && email.includes(".com")) {
        return true
    }
    return false
}
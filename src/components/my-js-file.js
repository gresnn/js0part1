console.log('LOGIN');


emailElement = document.getElementById('email');
passwordElement = document.getElementById('password');
agreeElement = document.getElementById('agree');



document.getElementById('process-button').addEventListener('click', validateForm);
function validateForm3() {
    alert('4325345435');

}
function validateForm() {
    let isValid = true;
    if (emailElement.value && emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        emailElement.classList.remove('is-invalid');
    } else {
        emailElement.classList.add('is-invalid');
        isValid = false;
    }


    if (passwordElement.value && passwordElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        passwordElement.classList.remove('is-invalid');
    } else {
        passwordElement.classList.add('is-invalid');
        isValid = false;
    }

    // if (passwordElement.value) {
    //     passwordElement.classList.remove('is-invalid');
    // } else {
    //     passwordElement.classList.add('is-invalid');
    //     isValid = false;
    // }

    if (agreeElement.checked) {
        agreeElement.classList.remove('is-invalid');
    } else {
        agreeElement.classList.add('is-invalid');
        isValid = false;
    }

    isValid ?  alert('SUCSESS') : console.log('isValid = false');



   return isValid;


}


// document.getElementById('process-button-sing-up').addEventListener('click', validateForm3);


function validateForm2() {
    let isValid = true;

    if (nameElement.value) {
        nameElement.classList.remove('is-invalid');
    } else {
        nameElement.classList.add('is-invalid');
        isValid = false;
    }



    if (emailElement.value && emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        emailElement.classList.remove('is-invalid');
    } else {
        emailElement.classList.add('is-invalid');
        isValid = false;
    }

    if (passwordElement.value && passwordElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        passwordElement.classList.remove('is-invalid');
    } else {
        passwordElement.classList.add('is-invalid');
        isValid = false;
    }

    if (passwordRepeatElement.value && passwordRepeatElement.value === passwordElement.value) {
        passwordRepeatElement.classList.remove('is-invalid');
    } else {
        passwordRepeatElement.classList.add('is-invalid');
        isValid = false;
    }

    if (agreeElement.checked) {
        agreeElement.classList.remove('is-invalid');
    } else {
        agreeElement.classList.add('is-invalid');
        isValid = false;
    }

    return isValid;
}
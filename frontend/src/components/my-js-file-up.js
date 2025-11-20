export class SignUpForm {
    constructor() {
        console.log('LOG-UP');

        // Инициализация элементов формы
        this.nameElement = document.getElementById('name');
        this.lastNameElement = document.getElementById('last-name');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.agreeElement = document.getElementById('agree');
        this.commomErrorElement = document.getElementById('common-error');

        // Привязка обработчика к кнопке
        document.getElementById('process-button-sing-up')
            .addEventListener('click', this.validateForm.bind(this));
    }

    validateForm() {
        let isValid = true;

        // Проверка имени (формат: Фамилия Имя)
        if (this.nameElement.value &&
            this.nameElement.value.match(/^[А-Я][а-яё]+\s[А-Я][а-яё]+/)) {
            this.nameElement.classList.remove('is-invalid');
        } else {
            this.nameElement.classList.add('is-invalid');
            isValid = false;
        }

        // Проверка email
        if (this.emailElement.value &&
            this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        // Проверка пароля (минимум 8 символов, цифры, строчные и прописные буквы)
        if (this.passwordElement.value &&
            this.passwordElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        // Проверка совпадения паролей
        if (this.passwordRepeatElement.value &&
            this.passwordRepeatElement.value === this.passwordElement.value) {
            this.passwordRepeatElement.classList.remove('is-invalid');
        } else {
            this.passwordRepeatElement.classList.add('is-invalid');
            isValid = false;
        }

        // Проверка согласия (опционально, можно включить)
        // if (this.agreeElement.checked) {
        //     this.agreeElement.classList.remove('is-invalid');
        // } else {
        //     this.agreeElement.classList.add('is-invalid');
        //     isValid = false;
        // }

        // Результат валидации
        isValid ? alert('SUCSESS') : console.log('isValid = false');

        return isValid;
    }



}

// Использование:
// const signUpForm = new SignUpForm();

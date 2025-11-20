export class SignInForm {


    constructor() {
        console.log('LOGIN');

        // Инициализация элементов формы
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.agreeElement = document.getElementById('agree');

        // Привязка обработчика к кнопке
        const processButton = document.getElementById('process-button');
        if (processButton) {
            processButton.addEventListener('click', this.validateForm.bind(this));
        }
    }

    // Основной метод валидации для формы входа
    validateForm() {
        let isValid = true;

        // Валидация email
        if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        // Валидация пароля (минимум 8 символов, цифры, строчные и прописные буквы)
        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        // Проверка чекбокса согласия
        if (this.agreeElement.checked) {
            this.agreeElement.classList.remove('is-invalid');
        } else {
            this.agreeElement.classList.add('is-invalid');
            isValid = false;
        }

        // Итог валидации
        if (isValid) {
            alert('SUCSESS');
        } else {
            console.log('isValid = false');
        }

        return isValid;
    }

}


// Инициализация валидатора при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//     const formValidator = new FormIn();
// });
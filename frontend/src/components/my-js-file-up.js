export class SignUpForm {
    constructor(page) {
        console.log('LOG-UP');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('userlastname');


        this.page = page;

        // Инициализация элементов формы
        // this.fullNameElement = document.getElementById('name');
        this.nameElement = document.getElementById('name');

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');


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

        const fullName = this.nameElement.value;
        console.log(fullName);
        console.log('typeof fullName   ' + typeof fullName);
        // alert('fullName ' + fullName);

        const [name, lastName] = fullName.split(" ");

        console.log(name);   // "Костылев"
        console.log(lastName);  // "Татьяна"
        // alert(name + '  ' +  lastName);




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
        // isValid ? alert('SUCSESS') : console.log('isValid = false');

        // Итог валидации
        if (isValid) {
            alert('ФОРМА ЗАПОЛНЕНА ВЕРНО !');
            this.processForm2();
        } else {
            console.log('isValid = false');
            alert('ОШИБКИ В ПОЛЯХ ФОРМЫ !');
        }


        return isValid;
    }

    // Запрос на backend и получение ответа
    async processForm2() {

        const fullName = this.nameElement.value;
        console.log('fullName   ' + fullName);
        console.log('typeof fullName   ' + typeof fullName);
        // alert('fullName ' + fullName);
        const [name, lastName] = fullName.split(" ");
        console.log('Name   ' + name);
        console.log('lAST Name   ' + lastName);
        // alert(name + '  ' +  lastName);

        // "name": "Роман",
        //     "lastName": "Чернов",
        //     "email": "roman@itlogia.ru",
        //     "password": "12345678Qq",
        //     "passwordRepeat": "12345678Qq"


        // console.log(fullName);
        // alert('fullName ' + fullName);


        const email = this.emailElement.value;
        const password = this.passwordElement.value;
        const passwordRepeat = this.passwordRepeatElement.value;
        console.log(name);
        console.log(lastName);
        console.log(email);
        console.log(password);
        console.log(passwordRepeat);
        // alert('email ' + email);
        // alert('password ' + password);
        // alert('rememberMe ' + rememberMe);

        console.log('JSON.stringify :  ' + JSON.stringify({
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            passwordRepeat: passwordRepeat

        }));

        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                lastName: lastName,
                email: email,
                password: password,
                passwordRepeat: passwordRepeat
            })
        });

        // console.log(response);
        console.log(response.status);
        // alert(response.status);
        if (response.status < 200 || response.status >=300) {

            const bedResult = await response.json();
            // alert('ОШИБКА !!!! ' + bedResult.message);
            console.log(bedResult.message);
            // alert(bedResult.message);
            // isValid ? alert('SUCSESS') : console.log('isValid = false');
            // alert(bedResult.validation[0].message);
            bedResult.validation ? alert('ОШИБКА[0] ! ' + bedResult.validation[0].message) : alert('ОШИБКА !!!! ' + bedResult.message);
            // alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ! ' + ' response.status - ' +response.message);
            // location.href = '#/sign-up';
            // alert('response.status - ' +response.status);
        }
        else {
            const result = await response.json();
            console.log(result.user.id);
            console.log(result.user.email);
            console.log(result.user.name);
            console.log(result.user.lastName);
            alert('ПОЛЬЗОВАТЕЛЬ ' + result.user.name  + '  ' + result.user.lastName + ' СОЗДАН !');
            this.processForm3();


            // alert('result ' + result.user.name);
            // alert('result ' + result.user.lastName);

        }

        // alert('response.status ' + response.status);
        // const result = await response.json();
        // console.log(result);
        // alert('result ' + result.message);

        // if (!response) {
        //     alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
        // }
        // if (response) {
        // if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
        //     throw new Error(result.message);
        // }
        // alert('YES ПОЛЬЗОВАТЕЛ!');
        // console.log(response);
        // location.href = '#/';



        // Auth.setTokens(result.accessToken, result.refreshToken);
        // Auth.setUserInfo({
        //     fullName: result.fullName,
        //     userId: result.userId,
        //     userEmail: result.userEmail
        // })
        // location.href = '#/';
        // }
        // else {
        //     alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
        // }

    }

    async processForm3() {


        const email = this.emailElement.value;
        const password = this.passwordElement.value;

        console.log(email);
        console.log(password);

        // alert('email ' + email);
        // alert('password ' + password);
        // alert('rememberMe ' + rememberMe);

        console.log('JSON.stringify :  ' + JSON.stringify({
            email: email,
            password: password,
            // rememberMe: rememberMe,

        }));

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                // rememberMe: rememberMe,
            })
        });

        // console.log(response);
        console.log(response.status);
        // alert(response.status);
        if (response.status < 200 || response.status >=300) {
            alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ! ' + ' response.status - ' +response.status);
            location.href = '#/sign-up';
            // alert('response.status - ' +response.status);
        }
        else {
            const result = await response.json();
            console.log(result);
            console.log(result.user.id);
            console.log(result.user.name);
            console.log(result.user.lastName);

            console.log(result.tokens.accessToken);
            console.log(result.tokens.refreshToken);
            // alert('result ' + result.user.name);
            // alert('result ' + result.user.lastName);

            let accessTokenKey = 'accessToken';
            let refreshTokenKey = 'refreshToken';
            let userId = result.user.id;
            let userName = result.user.name;
            let userLastName = result.user.lastName;
            localStorage.setItem(accessTokenKey, result.tokens.accessToken);
            localStorage.setItem(refreshTokenKey, result.tokens.refreshToken);
            localStorage.setItem('userid', userId);
            localStorage.setItem('username', userName);
            localStorage.setItem('userlastname', userLastName);
            console.log(localStorage.accessToken);
            console.log(localStorage.refreshToken);
            console.log(localStorage.userid);
            console.log(localStorage.username);
            console.log(localStorage.userlastname);
            // alert(localStorage.accessTokenKey);
            // alert(localStorage.refreshTokenKey);
            // JSON.stringify({refreshToken: refreshToken})
            location.href = '#/';
        }

        // alert('response.status ' + response.status);
        // const result = await response.json();
        // console.log(result);
        // alert('result ' + result.message);

        // if (!response) {
        //     alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
        // }
        // if (response) {
        // if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
        //     throw new Error(result.message);
        // }
        // alert('YES ПОЛЬЗОВАТЕЛ!');
        // console.log(response);
        // location.href = '#/';



        // Auth.setTokens(result.accessToken, result.refreshToken);
        // Auth.setUserInfo({
        //     fullName: result.fullName,
        //     userId: result.userId,
        //     userEmail: result.userEmail
        // })
        // location.href = '#/';
        // }
        // else {
        //     alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
        // }

    }

}

// Использование:
// const signUpForm = new SignUpForm();

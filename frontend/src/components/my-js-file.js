export class SignInForm {
    constructor(page) {
        console.log('LOGIN');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('userlastname');
        this.page = page;

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
        // if (this.agreeElement.checked) {
        //     this.agreeElement.classList.remove('is-invalid');
        // } else {
        //     this.agreeElement.classList.add('is-invalid');
        //     isValid = false;
        // }

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


        const email = this.emailElement.value;
        const password = this.passwordElement.value;
        const rememberMe = this.agreeElement.checked;
        console.log(email);
        console.log(password);
        console.log(rememberMe);
        // alert('email ' + email);
        // alert('password ' + password);
        // alert('rememberMe ' + rememberMe);

        console.log('JSON.stringify :  ' + JSON.stringify({
            email: email,
            password: password,
            rememberMe: rememberMe,

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
                rememberMe: rememberMe,
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
            alert('accessTokenKey и refreshTokenKey созданы, переходим на главную!!!');
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

    // }


    processForm() {
        // alert('SUCSESS 222222 SUCSESS');
        if (this.validateForm()) {

            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value;
            console.log(email);
            console.log(password);
            alert('SUCSESS 222222 SUCSESS');


            if (this.page === 'signup') {

                try {
                    const result = CustomHttp.request(config.host + '/signup', "POST", {
                        name: this.fields.find(item => item.name === 'name').element.value,
                        lastName: this.fields.find(item => item.name === 'lastName').element.value,
                        email: email,
                        password: password,
                    });

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }
                        //    location.href = '#/choice';
                    }
                } catch (error) {
                    alert(error);
                    return console.log(error);
                }

            }
            // else {
            try {
                const result = CustomHttp.request(config.host + '/login', "POST", {
                    email: email,
                    password: password,
                });
                if (!result) {
                    alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
                }
                if (result) {
                    if (result.error || !result.accessToken || !result.refreshToken || !result.fullName || !result.userId) {
                        throw new Error(result.message);
                    }


                    Auth.setTokens(result.accessToken, result.refreshToken);
                    Auth.setUserInfo({
                        fullName: result.fullName,
                        userId: result.userId,
                        userEmail: result.userEmail
                    })
                    location.href = '#/choice';
                }
                // else {
                //     alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ!');
                // }

            } catch (error) {
                console.log(error);
                alert(error);
            }
        }

        //     sessionStorage

        let cart = sessionStorage.getItem('cart');
        let userTest = [];
        let paramString = '';
        this.fields.forEach(item => {
            paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
            console.log(item.element.value);
            userTest.push(item.element.value);
            console.log(userTest);
            console.log('cart  ' + cart);
            console.log(sessionStorage);
            //
        })
        console.log(userTest);
        if (sessionStorage.length === 0) {
            sessionStorage.setItem('userName', JSON.stringify(userTest));
            console.log(sessionStorage);
        }
        // console.log(sessionStorage);
        userTest = JSON.parse(sessionStorage.getItem('userName'));
        console.log(typeof userTest);
        console.log(userTest);
        //   location.href = '#/choice' + paramString;
    }


}


// Инициализация валидатора при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//     const formValidator = new FormIn();
// });
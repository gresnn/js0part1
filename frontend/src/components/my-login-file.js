export class SignInForm {
    constructor(page) {
        // console.log('LOGIN');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        localStorage.removeItem('userlastname');
        // this.page = page;

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
            // alert('ФОРМА ЗАПОЛНЕНА ВЕРНО !');
            this.authLogin();
        } else {
            console.log('isValid = false');
            alert('ОШИБКИ В ПОЛЯХ ФОРМЫ !');
        }

        return isValid;
    }

    // Запрос на backend и получение ответа
    async authLogin() {


        const email = this.emailElement.value;
        const password = this.passwordElement.value;
        const rememberMe = this.agreeElement.checked;
        // console.log(email);
        // console.log(password);
        // console.log(rememberMe);

        // console.log('JSON.stringify :  ' + JSON.stringify({
        //     email: email,
        //     password: password,
        //     rememberMe: rememberMe,
        //
        // }));

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
        // console.log(response.status);
        // alert(response.status);
        if (response.status < 200 || response.status >=300) {
            // alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ! ' + ' response.status - ' +response.status);
            alert('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ! -или- ОШИБКА В ПОЧТЕ ИЛИ ПАРОЛЕ!');
            // location.href = '#/sign-up';
            // alert('response.status - ' +response.status);
        }
        else {
            const result = await response.json();
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
            // console.log(localStorage.accessToken);
            // console.log(localStorage.refreshToken);
            // console.log(localStorage.userid);
            // console.log(localStorage.username);
            // console.log(localStorage.userlastname);

            // alert('ПОЛЬЗОВАТЕЛЬ В СИСТЕМЕ !');
            // location.href = '#/';
            this.getUserAmount();
            // Ваш код, где раньше был alert()
            function showSuccessToast() {
                document.getElementById('userAlert').innerText = localStorage.username + '  ' + localStorage.userlastname;
                const toastElement = document.getElementById('liveToast');
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
                setTimeout(() => {
                    location.href = '#/';
                }, 3000);
            }
            // Вызов функции
            showSuccessToast();

            // alert(localStorage.accessTokenKey);
            // alert('accessTokenKey и refreshTokenKey созданы, переходим на главную!!!');
         }
    }

    // }
  async getUserAmount() {

        try {
            let myAccessToken = localStorage.getItem('accessToken');
            // console.log(myAccessToken);
            // sessionStorage.clear();
            if (!myAccessToken) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/balance', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': myAccessToken,
                }
            });

            // console.log(response);
            // console.log(response.status);

            if (response.status === 401) {
                console.log('Данные response.status устарели !!!! === 401!');
                // alert('Данные response.status устарели !!!! === 401!');
                ////////////////////

                const response = await fetch('http://localhost:3000/api/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        // 'x-auth-token': constRefreshToken,
                    },
                    body: JSON.stringify({refreshToken: myRefreshToken})
                });

                // console.log(response);
                // console.log(response.status);

                if (response && response.status === 200) {
                    const result = await response.json();
                    if (result && !result.error) {
                        localStorage.setItem('accessToken', result.tokens.accessToken);
                        localStorage.setItem('refreshToken', result.tokens.refreshToken);
                        this.init();
                        // return;
                    }
                }
                /////////////////////////
                // console.log(response.status);
                if (response.status === 400) {
                    console.log('Данные response.status устарели !!!! === 400!');
                    // alert('Данные response.status устарели !!!! === 400!');
                    ////////////////////
                    localStorage.clear();
                    // location.href = '#/sign-in';

                }
            } else {

                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка сервера: ' + response.status);
                    return;
                }
                const result = await response.json();
                console.log(result.balance);
                // alert('OK!!!!!! при загрузке данных');
                // console.log(userAmount); // Выводим итог userAmount
                localStorage.setItem('userAmount', result.balance);
            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }
    }
}


// Инициализация валидатора при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//     const formValidator = new FormIn();
// });
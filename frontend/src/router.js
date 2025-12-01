import {SignInForm} from "./components/my-js-file.js";
import {SignUpForm} from "./components/my-js-file-up.js";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('page-title');
        this.contentPageElement = document.getElementById('content');
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/main.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {

                }
            },


            {
                route: '#/404',
                title: 'Страница не найдена',
                template: '/templates/404.html',
                useLayout: false,
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {

                }
            },

            {
                route: '#/sign-up',
                title: 'Регистрация',
                template: 'templates/sign-up.html',
                useLayout: false,
                styles: 'styles/my-style.css',
                styles1: 'styles/adminlte.min.css',
                load: () => {
                    new SignUpForm();
                }
            },

            {
                route: '#/sign-in',
                title: 'Вход в аккаунт',
                template: 'templates/sign-in.html',
                useLayout: false,
                styles: 'styles/my-style.css',
                styles1: 'styles/adminlte.min.css',
                load: () => {
                    new SignInForm();
                }
            },
            {
                route: '#/all-items',
                title: 'Доходы и расходы',
                template: 'templates/all-items.html',
                useLayout: 'templates/layout.html',
                // template: 'templates/all-items.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/outcome',
                title: 'Расходы',
                template: 'templates/outcome.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/new-item',
                title: 'Создание дохода/расхода',
                template: 'templates/new-item.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/edit-item',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-item.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/edit-income',
                title: 'Редактирование дохода',
                template: 'templates/edit-income.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/edit-outcome',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-outcome.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/make-income',
                title: 'Редактирование дохода/расхода',
                template: 'templates/make-income.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/make-outcome',
                title: 'Редактирование дохода/расхода',
                template: 'templates/make-outcome.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            }
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash;
        console.log(urlRoute);
        // alert(urlRoute);
        if (!urlRoute) {
            console.log('No nameUser found!');
            window.location.href = '#/sign-in';
            return;
        }

        let nameUser = localStorage.getItem('username');
        let lastNameUser = localStorage.getItem('userlastname');
        console.log(nameUser + '  ' + lastNameUser);
        // alert(nameUser + '  ' + lastNameUser);
        // if (nameUser) {
        //     console.log('No route found!');
        //     alert('!!!!!!!!!!!!!!No route found!');
        //     window.location.href = '#/';
        //     return;
        // }

        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        });
        console.log(newRoute);
        if (!newRoute) {
            console.log('No route found!');
            alert('No route found!');
            window.location.href = '#/404';
            return;
        }


        if (newRoute.template) {
            // document.body.className = '';
            let contentBlock = this.contentPageElement;
            if (newRoute.useLayout) {
                this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                contentBlock = document.getElementById('content-layout');

                let nameUser = localStorage.getItem('username');
                let lastNameUser = localStorage.getItem('userlastname');
                console.log(nameUser + '  ' + lastNameUser);
                if (!nameUser) {
                    document.getElementById('userDashboard').innerText = 'Roman Chernov';
                    // window.location.href = '#/sign-in';
                } else {
                    document.getElementById('userDashboard').innerText = nameUser + ' ' + lastNameUser;
                }

            }
            let nameUser = localStorage.getItem('username');
            let lastNameUser = localStorage.getItem('userlastname');
            console.log(nameUser + '  ' + lastNameUser);
            contentBlock.innerHTML = await fetch(newRoute.template).then(response => response.text());
        }
        else {

            console.log(localStorage.accessToken);
            console.log(localStorage.refreshToken);
            console.log(localStorage.userid);
            console.log(localStorage.username);
            console.log(localStorage.userlastname);
            console.log('newRoute.template');
            // alert('newRoute.template');
            window.location = '#/sign-up';
        }


        // document.getElementById('content').innerHTML =
        //     await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('styles1').setAttribute('href', newRoute.styles1);
        document.getElementById('page-title').innerHTML = newRoute.title;
        newRoute.load()
    }
}
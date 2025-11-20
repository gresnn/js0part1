import {SignInForm} from "./components/my-js-file.js";
import {SignUpForm} from "./components/my-js-file-up.js";

export class Router {
    constructor() {
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/sign-up',
                title: 'Регистрация',
                template: 'templates/sign-up.html',
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
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/outcome',
                title: 'Расходы',
                template: 'templates/outcome.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/new-item',
                title: 'Создание дохода/расхода',
                template: 'templates/new-item.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/edit-item',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-item.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/edit-income',
                title: 'Редактирование дохода',
                template: 'templates/edit-income.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/edit-outcome',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-outcome.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/make-income',
                title: 'Редактирование дохода/расхода',
                template: 'templates/make-income.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            },
            {
                route: '#/make-outcome',
                title: 'Редактирование дохода/расхода',
                template: 'templates/make-outcome.html',
                styles: 'styles/my-style.css',
                load: () => {

                }
            }
        ]
    }

    async openRoute() {
        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        });

        if (!newRoute) {
            window.location.href = '#/';
            return;
        }

        document.getElementById('content').innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('styles1').setAttribute('href', newRoute.styles1);
        document.getElementById('page-title').innerHTML = newRoute.title;
        newRoute.load()
    }
}
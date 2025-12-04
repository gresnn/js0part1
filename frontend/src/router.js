import {SignInForm} from "./components/my-login-file.js";
import {SignUpForm} from "./components/my-signup-file.js";
import {UserLogging} from "./utils/user-logging.js";
import {AuthTokens} from "./utils/auth-tokens.js";

export class Router {
    constructor() {
        // this.titlePageElement = document.getElementById('page-title');
        // this.contentPageElement = document.getElementById('content');
        // this.contentPageLayoutElement = document.getElementById('content-layout');
        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                template: 'templates/main.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                    // new AuthTokens();
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
                    // new AuthTokens();
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
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();

                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: 'templates/income.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/outcome',
                title: 'Расходы',
                template: 'templates/outcome.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/new-item',
                title: 'Создание дохода/расхода',
                template: 'templates/new-item.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/edit-item',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-item.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/edit-income',
                title: 'Редактирование дохода',
                template: 'templates/edit-income.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/edit-outcome',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-outcome.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/make-income',
                title: 'Создание дохода/расхода',
                template: 'templates/make-income.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            },
            {
                route: '#/make-outcome',
                title: 'Создание дохода/расхода',
                template: 'templates/make-outcome.html',
                useLayout: 'templates/layout.html',
                styles: 'styles/my-style.css',
                styles1: 'styles/my-style.css',
                load: () => {
                    new UserLogging();
                }
            }
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash;
        console.log('urlRoute  ' + urlRoute);
        // alert(urlRoute);
        if (!urlRoute) {
            console.log('No nameUser found!');
            window.location.href = '#/sign-in';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === window.location.hash.split('?')[0];
        });
        // console.log(this.routes);
        // console.table(this.routes);
        // console.log('this.routes   ' , this.routes);
        if (!newRoute) {
            console.log('No route found!');
            alert('No route found!');
            window.location.href = '#/404';
            return;
        }


        if (newRoute.template) {
            // let contentBlock = document.getElementById('content');
            if (newRoute.useLayout) {
                document.getElementById('content').innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                // contentBlock = document.getElementById('content-layout');
                document.getElementById('content-layout').innerHTML = await fetch(newRoute.template).then(response => response.text());
            } else {
                document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
            }

        } else {
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
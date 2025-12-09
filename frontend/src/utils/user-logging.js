import {AuthTokens} from "./auth-tokens.js";

export class UserLogging {
    constructor() {

        let nameUser = localStorage.getItem('username');
        let lastNameUser = localStorage.getItem('userlastname');
        console.log(nameUser + '  ' + lastNameUser);
        if (!nameUser) {
            document.getElementById('userDashboard').innerText = '*** ***';
            document.getElementById('mobileUserDashboard').innerText = '*** ***';
            // window.location.href = '#/sign-in';
        } else {

            const userElement = document.getElementById('userDashboard');
            const mobileUserElement = document.getElementById('mobileUserDashboard');
            if (userElement) {
                userElement.innerText = nameUser + ' ' + lastNameUser;
            } else {
                console.error('Ошибка: элемент #UserElement не найден!');
            }
            if (mobileUserElement) {
                mobileUserElement.innerText = nameUser + ' ' + lastNameUser;
            } else {
                console.error('Ошибка: элемент #mobileUserElement не найден!');
            }
            // document.getElementById('userDashboard').innerText = nameUser + ' ' + lastNameUser;
            // document.getElementById('mobileUserDashboard').innerText = nameUser + ' ' + lastNameUser;
        }
        // new PieChart('myPieChart', chartConfig);
        new AuthTokens();
        // new Auth();



    }
}
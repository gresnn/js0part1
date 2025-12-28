
export class MyMakeItem {
    constructor() {
        // alert('export class MyMakeItem');
        this.makeItem = sessionStorage.getItem('makeItem'); // тип операции - строка "income"
        this.newTitle = document.getElementById('newTitle');
        this.newMobileTitle = document.getElementById('newMobileTitle');

        // Получаем элементы
        const amountInput = document.getElementById('amountItem');
        const errorMessage = document.getElementById('amountError');
        const saveBtn = document.getElementById('saveEditBtn');
        // Регулярное выражение для проверки: только цифры (целые числа) saveEditBtn
        const numberRegex = /^\d+$/;
        saveBtn.classList.remove('disabled');
        // Функция проверки ввода
        function validateInput() {
            const value = amountInput.value.trim();
            // Если поле пустое — скрываем подсказку
            if (value === '') {
                errorMessage.style.display = 'none';
                return;
            }

            // Проверяем соответствие регулярному выражению
            if (numberRegex.test(value)) {
                // Ввод корректен — скрываем подсказку
                errorMessage.style.display = 'none';
                saveBtn.classList.remove('disabled');
                // sessionStorage.setItem('errorSave', JSON.stringify(false)); // сумма операции - число 25000
            } else {
                // Ввод некорректен — показываем подсказку
                errorMessage.style.display = 'block';
                saveBtn.classList.add('disabled');
                // sessionStorage.setItem('errorSave', JSON.stringify(true)); // сумма операции - число 25000
            }
        }

        // Вешаем обработчики событий
        amountInput.addEventListener('input', validateInput); // При каждом вводе
        amountInput.addEventListener('blur', validateInput);   // При потере фокуса
        amountInput.addEventListener('focus', () => {
            // При фокусе можно дополнительно очистить подсказку
            errorMessage.style.display = 'none';
        });

       if (this.makeItem === 'makeIncome') {

       }
        this.typeElement = document.getElementById('typeItem'); // поле ввода тип операции - "Доход"
        if (this.makeItem === 'makeIncome') {
            this.typeElement.value = 'Доход';
            this.typeElement.style.color = 'green';
            this.newTitle.innerText = 'Создание дохода';
            this.newMobileTitle.innerText = 'Создание дохода';
        }
        if (this.makeItem === 'makeOutcome') {
            this.typeElement.value = 'Расход';
            this.typeElement.style.color = 'red';
            this.newTitle.innerText = 'Создание расхода';
            this.newMobileTitle.innerText = 'Создание расхода';
        }
        this.typeElement.readOnly = true;


        const form = document.getElementById('myForm');
        const constInput = document.getElementById('typeItem');
        const originalValue = constInput.value; // Сохраняем исходное значение

        form.addEventListener('reset', function(e) {
            // После стандартного сброса восстанавливаем нужное значение
            setTimeout(() => {
                constInput.value = originalValue;
                // saveBtn.classList.add('disabled');
                errorMessage.style.display = 'none';
            }, 0);
        });


        // this.categoryElement = document.getElementById('categoryItem'); // поле ввода категория операции - строка "Сбережения"


        // Получаем элемент select
        const select = document.getElementById('categoryListItem');

        if (this.typeElement.value === 'Расход') {
            this.initOutcome()
                .then(array => {
                    array.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.id;
                        option.textContent = item.title;
                        select.appendChild(option);
                    });

                    this.categoryNumber = document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;

                    console.log('this.categoryNumber   ' + this.categoryNumber);

                    this.categoryIndex = document.getElementById('categoryListItem').selectedIndex;
                    console.log('this.categoryNum   ' + this.categoryIndex);
                    // if (this.categoryIndex === 0) {
                    //     alert('00000000000000000000000000000');
                    // }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }

        if (this.typeElement.value === 'Доход') {
            this.initIncome()
                .then(array => {
                    array.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.id;
                        option.textContent = item.title;
                        select.appendChild(option);
                    });
                    this.categoryNumber = document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
                    console.log('this.categoryNumber   ' + this.categoryNumber);
                    this.categoryIndex = document.getElementById('categoryListItem').selectedIndex;
                    console.log('this.categoryNum   ' + this.categoryIndex);
                    // if (this.categoryIndex === 0) {
                    //     alert('00000000000000000000000000000');
                    // }

                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }


        this.amountElement = document.getElementById('amountItem');

        this.dateElement = document.getElementById('dateItem');

        this.dateFrom = document.getElementById('dateFrom'); // скрытое отображение календаря
        this.dateFrom.value = this.dateElement.value; // дата в календаре - из поля отображения даты операции - строка 2025-12-31

        // Обработка клика по кнопке "dateBtn"
        const btn = document.getElementById('dateBtn'); // дата в календаре - "кнопка"
        btn.addEventListener('click', () => {
            this.dateFrom.showPicker(); // Открывает native-календарь
        });

        this.dateFrom.addEventListener('change', function () {
            document.getElementById('dateItem').value = this.value; // меняем дату в календаре
            // console.log(document.getElementById('dateItem').value);
        });


        this.commentElement = document.getElementById('commentItem');

        this.list = [];
        // this.init();

        // document.addEventListener('DOMContentLoaded', function() {
            const save2Btn = document.getElementById('saveEditBtn');
            const form2 = document.getElementById('myForm');

        // Сохраняем контекст this в переменную
        const self = this; // или const instance = this;

        // Отключаем автоматическое открытие модального окна
        save2Btn.removeAttribute('data-bs-toggle');
        save2Btn.removeAttribute('data-bs-target');

            save2Btn.addEventListener('click', function(event) {
                // Отменяем стандартное действие ссылки (переход по href)
                event.preventDefault();

                // Получаем все обязательные поля формы
                const fields = form2.querySelectorAll('#typeItem, #categoryListItem, #amountItem, #dateItem, #commentItem');
                let isValid = true;

                // Проходим по всем полям
                fields.forEach(field => {
                    const value = field.value.trim();
                    // console.log(value);
                    if (!value || value === field.getAttribute('value')) {
                        // Если поле пустое или содержит placeholder-значение
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });

                // Если все поля заполнены — можно отправлять данные
                if (isValid) {
                    // alert('Форма заполнена корректно! Можно сохранять.');

                    document.getElementById('typeItem').value === 'Расход' ? document.getElementById('typeItem').value = 'expense' : document.getElementById('typeItem').value = 'income';
                    self.edit();

                    const modalElement = document.getElementById('staticBackdrop');
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();

                } else {
                    alert('Пожалуйста, заполните все обязательные поля.');
                }
            });
    }

    // init() {
    //
    //     // Находим кнопку save и назначаем обработчик
    //
    //         alert('СОХРАНЯЕМ !!!!  ');
    //         // this.typeElement.value === 'Расход' ? this.typeElement.value = 'expense' : this.typeElement.value = 'income';
    //         console.log(document.getElementById('typeItem').value);
    //         console.log(parseInt(document.getElementById('amountItem').value));
    //         console.log(document.getElementById('dateItem').value);
    //         console.log(document.getElementById('commentItem').value)
    //         console.log(this.idCategory);
    //
    //         // this.edit();
    //
    //
    //     // Находим кнопку cancel и назначаем обработчик
    //     // const cancelEditButton = document.getElementById('cancelEditBtn');
    //     // const saveBtn = document.getElementById('saveEditBtn');
    //     // const errorMessage = document.getElementById('amountError');
    //     // // console.log(cancelEditButton);
    //     // saveBtn.classList.remove('disabled');
    //     // cancelEditButton.onclick = () => {
    //     //     saveBtn.classList.remove('disabled');
    //     //     errorMessage.style.display = 'none';
    //     //     // alert('cancelEditButton  !!!!  ');
    //     //     this.typeElement = document.getElementById('typeItem');
    //     //     this.typeElement.style.removeProperty('color');
    //     //     this.typeElement.value = this.typeId.replace(/"/g, '');
    //     //     this.typeElement.value === 'expense' ? this.typeElement.style.color = 'red' : this.typeElement.style.color = 'green';
    //     //     this.typeElement.value === 'expense' ? this.typeElement.value = 'Расход' : this.typeElement.value = 'Доход';
    //     //
    //     //     this.categoryListElement = document.getElementById('categoryListItem');
    //     //     this.categoryListElement.innerHTML = '<option id="categoryItem" value="">' + this.categoryNumber + '</option>';
    //     //
    //     //     // Получаем элемент select
    //     //     const select = document.getElementById('categoryListItem');
    //     //
    //     //     if (this.typeElement.value === 'Расход') {
    //     //         this.initOutcome()
    //     //             .then(array => {
    //     //                 array.forEach(item => {
    //     //                     const option = document.createElement('option');
    //     //                     option.value = item.id;
    //     //                     option.textContent = item.title;
    //     //                     select.appendChild(option);
    //     //                 });
    //     //                 this.categoryNumber = document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
    //     //                 console.log('this.categoryNumber   ' + this.categoryNumber);
    //     //             })
    //     //             .catch(error => {
    //     //                 console.error('Ошибка:', error);
    //     //             });
    //     //     }
    //     //
    //     //     if (this.typeElement.value === 'Доход') {
    //     //         this.initIncome()
    //     //             .then(array => {
    //     //                 array.forEach(item => {
    //     //                     const option = document.createElement('option');
    //     //                     option.value = item.id;
    //     //                     option.textContent = item.title;
    //     //                     select.appendChild(option);
    //     //                 });
    //     //                 this.categoryNumber = document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
    //     //                 console.log('this.categoryNumber   ' + this.categoryNumber);
    //     //             })
    //     //             .catch(error => {
    //     //                 console.error('Ошибка:', error);
    //     //             });
    //     //     }
    //     //
    //     //     // this.categoryNumber =  document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
    //     //     //
    //     //     // console.log('this.categoryNumber   ' + this.categoryNumber);
    //     //
    //     //     this.amountElement = document.getElementById('amountItem');
    //     //     if (this.amountId) {
    //     //         this.amountElement.value = this.amountId.replace(/"/g, '');
    //     //     }
    //     //     this.dateElement = document.getElementById('dateItem');
    //     //     if (this.dateId) {
    //     //         this.dateElement.value = this.dateId.replace(/"/g, '');
    //     //     }
    //     //     this.commentElement = document.getElementById('commentItem');
    //     //     if (this.commentId) {
    //     //         this.commentElement.value = this.commentId.replace(/"/g, '');
    //     //     }
    //     // };
    // }

    async edit() {

        // alert('55555555555555555555555555555555555555555');
        // this.categoryNumber = document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
        // this.idCategory = this.list.find(item => item.title === this.categoryNumber)?.id;
        console.log(document.getElementById('typeItem').value);
        let typeItem = document.getElementById('typeItem').value;
        console.log(document.getElementById('categoryListItem').selectedIndex);
        console.log(document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].value);
        let categoryItem = parseInt(document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].value);
        console.log(parseInt(document.getElementById('amountItem').value));
        let amountItem = parseInt(document.getElementById('amountItem').value);
        console.log(document.getElementById('dateItem').value);
        let dataItem = document.getElementById('dateItem').value;
        console.log(document.getElementById('commentItem').value);
        let commentItem = document.getElementById('commentItem').value;

        try {
            let myRefreshToken = localStorage.getItem('refreshToken');
            let token = localStorage.getItem('accessToken');
            console.log(token);

            if (!token) {
                console.log('Token not found');
                return;
            }
            // this.typeElement.value === 'Расход' ? this.typeElement.value = 'expense' : this.typeElement.value = 'income';
            const response = await fetch('http://localhost:3000/api/operations', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    type: typeItem,
                    amount: amountItem,
                    date: dataItem,
                    comment: commentItem,
                    category_id: categoryItem,
                })
            });


///////////////////////////////////

            if (response.status === 401) {
                console.log('Данные response.status устарели !!!! === 401!');
                const response = await fetch('http://localhost:3000/api/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        // 'x-auth-token': constRefreshToken,
                    },
                    body: JSON.stringify({refreshToken: myRefreshToken})
                });

                if (response && response.status === 200) {
                    const result = await response.json();
                    if (result && !result.error) {
                        localStorage.setItem('accessToken', result.tokens.accessToken);
                        localStorage.setItem('refreshToken', result.tokens.refreshToken);
                        this.edit();
                    }
                }
                /////////////////////////

            } else {

                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка сервера: ' + response.status);
                    return;
                }
                // }
                const result = await response.json();
                console.log(result);


            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }

    }


    async initIncome() {
        try {

            let token = localStorage.getItem('accessToken');
            let myRefreshToken = localStorage.getItem('refreshToken');
            // sessionStorage.clear();
            if (!token) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/categories/income', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                }
            });

            console.log(response);
            console.log(response.status);

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

                console.log(response);
                console.log(response.status);

                if (response && response.status === 200) {
                    const result = await response.json();
                    if (result && !result.error) {
                        localStorage.setItem('accessToken', result.tokens.accessToken);
                        localStorage.setItem('refreshToken', result.tokens.refreshToken);
                        this.initIncome();
                        // return;
                    }
                }
                /////////////////////////

            } else {

                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка сервера: ' + response.status);
                    return;
                }
                // }
                const result = await response.json();
                console.log('result  ' + result);
                this.list = result;
                let thisList = this.list;
                console.log('this.list  ' + this.list);
                return thisList;

            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }
    }

    async initOutcome() {
        try {

            let token = localStorage.getItem('accessToken');
            let myRefreshToken = localStorage.getItem('refreshToken');
            // sessionStorage.clear();
            if (!token) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/categories/expense', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                }
            });

            console.log(response);
            console.log(response.status);

            if (response.status === 401) {
                console.log('Данные response.status устарели !!!! === 401!');

                const response = await fetch('http://localhost:3000/api/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        // 'x-auth-token': constRefreshToken,
                    },
                    body: JSON.stringify({refreshToken: myRefreshToken})
                });

                console.log(response);
                console.log(response.status);

                if (response && response.status === 200) {
                    const result = await response.json();
                    if (result && !result.error) {
                        localStorage.setItem('accessToken', result.tokens.accessToken);
                        localStorage.setItem('refreshToken', result.tokens.refreshToken);
                        this.initOutcome();
                        // return;
                    }
                }


            } else {

                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка сервера: ' + response.status);
                    return;
                }
                // }
                const result = await response.json();
                console.log('result  ', result);
                this.list = result;
                let thisList = this.list;
                console.log('this.list  ', this.list);
                return thisList;

            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }
    }

}
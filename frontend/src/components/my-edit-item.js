export class MyEditItem {
    constructor() {
        // alert('export class MyEditItem');
        this.itemId = sessionStorage.getItem('itemId'); // ID операции - число 1
        this.typeId = sessionStorage.getItem('typeId'); // тип операции - строка "income"
        this.dateId = sessionStorage.getItem('dateId'); // дата операции - строка 2025-12-31
        this.categoryId = sessionStorage.getItem('categoryId'); // категория операции - строка "Сбережения"
        this.amountId = sessionStorage.getItem('amountId'); // сумма операции - число 25000
        // sessionStorage.setItem('errorSave', JSON.stringify(false)); // сумма операции - число 25000

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

        // console.log(errorSave); // выводим в консоль this.errorSave
        // alert(errorSave); // выводим в консоль this.errorSave
        this.commentId = sessionStorage.getItem('commentId'); // комментарий операции - строка "Комментарий..."

        this.typeElement = document.getElementById('typeItem'); // поле ввода тип операции - "Доход"
        this.typeElement.value = '';
        this.typeElement.style.removeProperty('color');
        if (this.typeId) { // ниже - убираем вторые кавычки у типа операции - строка "income"
            this.typeElement.value = this.typeId.replace(/"/g, '');
        }
        // ниже три строчки - в поле типа операции пишем слово "Доход" или "Расход" зелёным или красным цветом и ставим запрет редактирования
        this.typeElement.value === 'expense' ? this.typeElement.style.color = 'red' : this.typeElement.style.color = 'green';
        this.typeElement.value === 'expense' ? this.typeElement.value = 'Расход' : this.typeElement.value = 'Доход';
        this.typeElement.readOnly = true;
        console.log(this.typeElement.value); // выводим в консоль тип операции - Доход или Расход
        // alert(this.typeElement.value);

        this.categoryElement = document.getElementById('categoryItem'); // поле ввода категория операции - строка "Сбережения"
        if (this.categoryId) { // ниже - убираем вторые кавычки у категории операции - строка "Сбережения"
            this.categoryElement.innerHTML = `
            <option value="">${this.categoryId.replace(/"/g, '')}</option>
                   `;
        }

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
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }


        this.amountElement = document.getElementById('amountItem');
        if (this.amountId) { // ниже - убираем вторые кавычки у поля суммы операции - число 25000
            this.amountElement.value = this.amountId.replace(/"/g, '');
        }


        this.dateElement = document.getElementById('dateItem');
        if (this.dateId) { // ниже - убираем вторые кавычки у поля отображения даты операции - строка 2025-12-31
            this.dateElement.value = this.dateId.replace(/"/g, '');
        }


        this.dateFrom = document.getElementById('dateFrom'); // скрытое отображение календаря
        this.dateFrom.value = this.dateElement.value; // дата в календаре - из поля отображения даты операции - строка 2025-12-31

        // Обработка клика по кнопке "dateBtn"
        const btn = document.getElementById('dateBtn'); // дата в календаре - "кнопка"
        btn.addEventListener('click', () => {
            this.dateFrom.showPicker(); // Открывает native-календарь
        });

        this.dateFrom.addEventListener('change', function () {
            document.getElementById('dateItem').value = this.value; // меняем дату в календаре
            console.log(document.getElementById('dateItem').value);
        });
        console.log(this.dateElement.value);

        this.commentElement = document.getElementById('commentItem');
        if (this.commentId) { // ниже - убираем вторые кавычки у поля комментарий операции - строка "Комментарий..."
            this.commentElement.value = this.commentId.replace(/"/g, '');
        }
        this.list = [];
        this.init();

    }

    init() {

        // Находим кнопку save и назначаем обработчик
        const saveEditButton = document.getElementById('saveEditBtn');
        // console.log(saveEditButton);
        saveEditButton.onclick = () => {
                // alert('СОХРАНЯЕМ !!!!  ');
                this.edit();
        };

        // Находим кнопку cancel и назначаем обработчик
        const cancelEditButton = document.getElementById('cancelEditBtn');
        const saveBtn = document.getElementById('saveEditBtn');
        const errorMessage = document.getElementById('amountError');
        // console.log(cancelEditButton);
        saveBtn.classList.remove('disabled');
        cancelEditButton.onclick = () => {
            saveBtn.classList.remove('disabled');
            errorMessage.style.display = 'none';
            // alert('cancelEditButton  !!!!  ');
            this.typeElement = document.getElementById('typeItem');
            this.typeElement.style.removeProperty('color');
            this.typeElement.value = this.typeId.replace(/"/g, '');
            this.typeElement.value === 'expense' ? this.typeElement.style.color = 'red' : this.typeElement.style.color = 'green';
            this.typeElement.value === 'expense' ? this.typeElement.value = 'Расход' : this.typeElement.value = 'Доход';

            this.categoryListElement = document.getElementById('categoryListItem');
            this.categoryListElement.innerHTML = '<option id="categoryItem" value="">' + this.categoryNumber + '</option>';

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
                    })
                    .catch(error => {
                        console.error('Ошибка:', error);
                    });
            }

            // this.categoryNumber =  document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
            //
            // console.log('this.categoryNumber   ' + this.categoryNumber);

            this.amountElement = document.getElementById('amountItem');
            if (this.amountId) {
                this.amountElement.value = this.amountId.replace(/"/g, '');
            }
            this.dateElement = document.getElementById('dateItem');
            if (this.dateId) {
                this.dateElement.value = this.dateId.replace(/"/g, '');
            }
            this.commentElement = document.getElementById('commentItem');
            if (this.commentId) {
                this.commentElement.value = this.commentId.replace(/"/g, '');
            }
        };
    }

    async edit() {
        this.categoryNumber = document.getElementById('categoryListItem').options[document.getElementById('categoryListItem').selectedIndex].text;
        this.idCategory = this.list.find(item => item.title === this.categoryNumber)?.id;
        try {
            let myRefreshToken = localStorage.getItem('refreshToken');
            let token = localStorage.getItem('accessToken');
            console.log(token);

            if (!token) {
                console.log('Token not found');
                return;
            }
            this.typeElement.value === 'Расход' ? this.typeElement.value = 'expense' : this.typeElement.value = 'income';
            const response = await fetch('http://localhost:3000/api/operations/' + this.itemId, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    type: this.typeElement.value,
                    amount: parseInt(this.amountElement.value),
                    date: this.dateElement.value,
                    comment: this.commentElement.value,
                    category_id: this.idCategory,
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

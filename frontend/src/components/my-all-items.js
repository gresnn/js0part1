export class MyAllItems {
    constructor() {

        this.list = [];
        // sessionStorage.setItem('dateFrom','');
        // sessionStorage.setItem('dateTo', '');
        sessionStorage.setItem('intervalFrom', '');
        sessionStorage.setItem('intervalTo', '');
        this.from = '';
        this.to = '';

        const dayElement = document.getElementById('today');
        // dayElement.classList.add('btn-today-active');
        dayElement.classList.remove('btn-today-active');
        const weekElement = document.getElementById('week');
        // weekElement.classList.add('btn-today-active');
        // weekElement.classList.remove('btn-today-active');
        const monthElement = document.getElementById('month');
        // monthElement.classList.remove('btn-today-active');
        const yearElement = document.getElementById('year');
        // yearElement.classList.remove('btn-today-active');
        const allElement = document.getElementById('all');
        // allElement.classList.remove('btn-today-active');


        const dayElementM = document.getElementById('todayM');
        // dayElement.classList.add('btn-today-active');
        dayElementM.classList.remove('btn-today-active');
        const weekElementM = document.getElementById('weekM');
        // weekElement.classList.add('btn-today-active');
        // weekElementM.classList.remove('btn-today-active');
        const monthElementM = document.getElementById('monthM');
        // monthElementM.classList.remove('btn-today-active');
        const yearElementM = document.getElementById('yearM');
        // yearElement.classList.remove('btn-today-active');
        const allElementM = document.getElementById('allM');
        // allElementM.classList.remove('btn-today-active');
        const dateFromM = document.getElementById('dateFromM');
        const dateToM = document.getElementById('dateToM');
// Функция обновления отображения дат (можно адаптировать под интерфейс)
        function updateDateDisplay(dateFrom, dateTo, period) {
            // console.log('Текущий диапазон: (' + period + ') - c ' + dateFrom + ' по ' + dateTo);
            // console.log(dateFrom);
            // console.log(dateTo);
            sessionStorage.setItem('dateFrom', dateFrom);
            sessionStorage.setItem('dateTo', dateTo);
            // console.log(sessionStorage.getItem('dateFrom'));
            // console.log(sessionStorage.getItem('dateTo'));
            document.getElementById('interval').disabled = true;
            document.getElementById('intervalM').disabled = true;
            document.getElementById('dateFromBtn').textContent = 'с   Дата';
            document.getElementById('dateToBtn').textContent = 'по   Дата';
        }


// Обработчики кликов Сегодня
        document.getElementById('today').addEventListener('click', () => {
            // alert('dayElement.classList.add(\'btn-today-active\');')
            dayElement.classList.add('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.remove('btn-today-active');
            document.getElementById('dateFromBtn').classList.remove('btn-today-active');
            document.getElementById('dateToBtn').classList.remove('btn-today-active');

            function getTodayMoscow() {
                const now = new Date();
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: 'Europe/Moscow' // явно задаём часовой пояс Москвы
                };
                const formatter = new Intl.DateTimeFormat('en-CA', options); // 'en-CA' → YYYY-MM-DD
                return formatter.format(now);
            }

            // console.log(getTodayMoscow()); // '2025-12-18'
            const dateFrom = getTodayMoscow();
            const dateTo = getTodayMoscow();
            const period = 'день';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();

        });

        // Обработчик мобильный Сегодня
        document.getElementById('todayM').addEventListener('click', () => {
            // alert('dayElement.classList.add(\'btn-today-active\');')
            dayElementM.classList.add('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            dateFromM.classList.remove('btn-today-active');
            dateToM.classList.remove('btn-today-active');
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'Сегодня';
            // document.getElementById('todayMobileText').classList.add('btn-today-active');
            function getTodayMoscow() {
                const now = new Date();
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: 'Europe/Moscow' // явно задаём часовой пояс Москвы
                };
                const formatter = new Intl.DateTimeFormat('en-CA', options); // 'en-CA' → YYYY-MM-DD
                return formatter.format(now);
            }

            // console.log(getTodayMoscow()); // '2025-12-18'
            const dateFrom = getTodayMoscow();
            const dateTo = getTodayMoscow();
            const period = 'день';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();

        });

// Обработчики кликов НЕДЕЛЯ
        document.getElementById('week').addEventListener('click', () => {;
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.add('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.remove('btn-today-active');
            document.getElementById('dateFromBtn').classList.remove('btn-today-active');
            document.getElementById('dateToBtn').classList.remove('btn-today-active');
            function getWeekBoundsMoscow(date = new Date()) {
                const d = new Date(date); // копируем дату, чтобы не мутировать исходную
                // Определяем: понедельник (начало недели)
                const day = d.getDay(); // 0 (вс) … 6 (сб)
                const diff = d.getDate() - (day === 0 ? 6 : day - 1); // если вс → берём предыдущий пн
                const startOfWeek = new Date(d.getFullYear(), d.getMonth(), diff);


                // Определяем воскресенье (конец недели)
                const endOfWeek = new Date(d.getFullYear(), d.getMonth(), diff + 6, 23, 59, 59);


                // Форматируем в московском времени
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                };
                const formatter = new Intl.DateTimeFormat('en-CA', options); // YYYY-MM-DD


                return {
                    dateFrom: formatter.format(startOfWeek),
                    dateTo: formatter.format(endOfWeek)
                };
            }

// Пример использования
            const { dateFrom, dateTo } = getWeekBoundsMoscow();
            // console.log('Начало недели (пн):', dateFrom); // '2025-12-15'
            // console.log('Конец недели (вс):', dateTo);   // '2025-12-21'
            const period = 'неделя';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });


        // Обработчики мобильный НЕДЕЛЯ
        document.getElementById('weekM').addEventListener('click', () => {;
            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.add('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            dateFromM.classList.remove('btn-today-active');
            dateToM.classList.remove('btn-today-active');
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'НЕДЕЛЯ';
            function getWeekBoundsMoscow(date = new Date()) {
                const d = new Date(date); // копируем дату, чтобы не мутировать исходную
                // Определяем: понедельник (начало недели)
                const day = d.getDay(); // 0 (вс) … 6 (сб)
                const diff = d.getDate() - (day === 0 ? 6 : day - 1); // если вс → берём предыдущий пн
                const startOfWeek = new Date(d.getFullYear(), d.getMonth(), diff);


                // Определяем воскресенье (конец недели)
                const endOfWeek = new Date(d.getFullYear(), d.getMonth(), diff + 6, 23, 59, 59);


                // Форматируем в московском времени
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                };
                const formatter = new Intl.DateTimeFormat('en-CA', options); // YYYY-MM-DD


                return {
                    dateFrom: formatter.format(startOfWeek),
                    dateTo: formatter.format(endOfWeek)
                };
            }

// Пример использования
            const { dateFrom, dateTo } = getWeekBoundsMoscow();
            // console.log('Начало недели (пн):', dateFrom); // '2025-12-15'
            // console.log('Конец недели (вс):', dateTo);   // '2025-12-21'
            const period = 'неделя';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });


// Обработчики кликов МЕСЯЦ
        document.getElementById('month').addEventListener('click', () => {
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.add('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.remove('btn-today-active');
            document.getElementById('dateFromBtn').classList.remove('btn-today-active');
            document.getElementById('dateToBtn').classList.remove('btn-today-active');
            const dateFrom = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
            // console.log(dateFrom); // 2025-12-01'

            const dateTo = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
            // console.log(dateTo); // '2025-12-31'
            const period = 'месяц';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });

        // Обработчики мобильный МЕСЯЦ
        document.getElementById('monthM').addEventListener('click', () => {
            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.add('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            dateFromM.classList.remove('btn-today-active');
            dateToM.classList.remove('btn-today-active');
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'МЕСЯЦ';
            const dateFrom = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
            // console.log(dateFrom); // 2025-12-01'

            const dateTo = new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
            // console.log(dateTo); // '2025-12-31'
            const period = 'месяц';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });


        // Обработчики кликов ГОД
        document.getElementById('year').addEventListener('click', () => {
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.add('btn-today-active');
            allElement.classList.remove('btn-today-active');
            document.getElementById('dateFromBtn').classList.remove('btn-today-active');
            document.getElementById('dateToBtn').classList.remove('btn-today-active');
            // Начало года
            const dateFrom = `${new Date().getFullYear()}-01-01`;
            // Конец года
            const dateTo = `${new Date().getFullYear()}-12-31`;
            const period = 'ГОД';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });

        // Обработчики мобильный ГОД
        document.getElementById('yearM').addEventListener('click', () => {
            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.add('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            dateFromM.classList.remove('btn-today-active');
            dateToM.classList.remove('btn-today-active');
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'ГОД';
            // Начало года
            const dateFrom = `${new Date().getFullYear()}-01-01`;
            // Конец года
            const dateTo = `${new Date().getFullYear()}-12-31`;
            const period = 'ГОД';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });

        // Обработчики кликов ВЕЧНОСТЬ
        document.getElementById('all').addEventListener('click', () => {
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.add('btn-today-active');
            document.getElementById('dateFromBtn').classList.remove('btn-today-active');
            document.getElementById('dateToBtn').classList.remove('btn-today-active');
            const dateFrom = '1970-01-01'; // означает "все время"
            const dateTo = '2099-12-31';
            const period = 'вечность';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });


        // Обработчики мобильный ВЕЧНОСТЬ
        document.getElementById('allM').addEventListener('click', () => {
            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.add('btn-today-active');
            dateFromM.classList.remove('btn-today-active');
            dateToM.classList.remove('btn-today-active');
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'ЗА ВСЁ ВРЕМЯ';
            const dateFrom = '1970-01-01'; // означает "все время"
            const dateTo = '2099-12-31';
            const period = 'вечность';
            updateDateDisplay(dateFrom, dateTo, period);
            this.init();
        });


        // Для кнопки "Интервал" можно открыть модальное окно или активировать поля ввода
        // console.log(sessionStorage.getItem('intervalFrom'));
        // console.log(sessionStorage.getItem('intervalTo'));
        if (sessionStorage.getItem('intervalFrom') || sessionStorage.getItem('intervalTo')) {
            document.getElementById('interval').removeAttribute('disabled');
            document.getElementById('intervalM').removeAttribute('disabled');
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'Интервал c ' + sessionStorage.getItem('intervalFrom') + ' по ' + sessionStorage.getItem('intervalTo');

        }

        document.getElementById('interval').addEventListener('click', () => {
            // alert('intervalintervalintervalintervalinterval !');
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.remove('btn-today-active');
            document.getElementById('interval').classList.add('btn-today-active');
            if (!sessionStorage.getItem('dateFrom') || !sessionStorage.getItem('dateTo')) {
                alert('НЕТ ДАТЫ НАЧАЛА ИЛИ ДАТЫ КОНЦА !');
                document.getElementById('todayMobileText').classList.add('text-danger');
                document.getElementById('interval').disabled = true;
                return;
            }

            if (sessionStorage.getItem('dateFrom') > sessionStorage.getItem('dateTo')) {
                alert('ДАТА НАЧАЛА ПОЗЖЖЕ ДАТЫ КОНЦА !');
                document.getElementById('interval').classList.remove('btn-today-active');
                // document.getElementById('interval').classList.add('btn-today-danger');
                document.getElementById('interval').disabled = true;
                return
            }

            this.init();
        });


        document.getElementById('intervalM').addEventListener('click', () => {
            // alert('НЕТ intervalMintervalMintervalMintervalM !');

            document.getElementById('todayMobileText').classList.remove('text-danger');

            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            document.getElementById('intervalM').classList.add('btn-today-active');
            // document.getElementById('intervalM').classList.add('btn-today-active');
            // Здесь можно показать поля для ручного ввода дат
            document.getElementById('todayMobileText').hidden = false;
            document.getElementById('todayMobileText').innerText = 'Интервал c ' + sessionStorage.getItem('dateFrom') + ' по ' + sessionStorage.getItem('dateTo');
            if (!sessionStorage.getItem('dateFrom') || !sessionStorage.getItem('dateTo')) {
                alert('НЕТ ДАТЫ НАЧАЛА ИЛИ ДАТЫ КОНЦА !');
                document.getElementById('todayMobileText').classList.add('text-danger');
                document.getElementById('intervalM').disabled = true;
                return;
            }
            if (sessionStorage.getItem('dateFrom') > sessionStorage.getItem('dateTo'))  {
                alert('ДАТА НАЧАЛА ПОЗЖЖЕ ДАТЫ КОНЦА !');
                document.getElementById('todayMobileText').classList.add('text-danger');
                document.getElementById('intervalM').disabled = true;
                return
            }
            this.init();
        });


        // Пример обработки кликов по кнопкам: "c" и "по"
        const btn = document.getElementById('dateFromBtn');
        const input = document.getElementById('dateFrom');
        const inputM = document.getElementById('dateFromM');

        btn.addEventListener('click', () => {
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.remove('btn-today-active');
            btn.classList.add('btn-today-active');
            input.showPicker(); // Открывает native-календарь
        });

        input.addEventListener('change', () => {
            btn.textContent = input.value ? 'с' + '   ' + input.value : 'с   Дата';
            sessionStorage.setItem('intervalFrom', 'true');
            sessionStorage.setItem('dateFrom', input.value);
            // console.log(sessionStorage.getItem('intervalFrom'));
            // console.log(sessionStorage.getItem('intervalTo'));
            if (sessionStorage.getItem('intervalFrom') && sessionStorage.getItem('intervalTo')) {
                document.getElementById('interval').removeAttribute('disabled');
            }
        });

        inputM.addEventListener('change', () => {
            document.getElementById('intervalM').classList.add('btn-today-active');
            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            // btnM.classList.add('btn-today-active');
            // btn.textContent = input.value ? 'с' + '   ' + input.value : 'с   Дата';
            sessionStorage.setItem('intervalFrom', 'true');
            sessionStorage.setItem('dateFrom', inputM.value);
            // console.log(sessionStorage.getItem('intervalFrom'));
            // console.log(sessionStorage.getItem('intervalTo'));
            // console.log(sessionStorage.getItem('dateFrom'));
            if (sessionStorage.getItem('intervalFrom') && sessionStorage.getItem('intervalTo')) {
                // document.getElementById('interval').removeAttribute('disabled');
                document.getElementById('intervalM').removeAttribute('disabled');
                // document.getElementById('todayMobileText').hidden = false;
                // document.getElementById('todayMobileText').innerText = 'Интервал c ' + sessionStorage.getItem('intervalFrom') + ' по ' + sessionStorage.getItem('intervalTo');

            }
        });

        const btnTo = document.getElementById('dateToBtn');
        const inputTo = document.getElementById('dateTo');
        const inputToM = document.getElementById('dateToM');

        btnTo.addEventListener('click', () => {
            dayElement.classList.remove('btn-today-active');
            weekElement.classList.remove('btn-today-active');
            monthElement.classList.remove('btn-today-active');
            yearElement.classList.remove('btn-today-active');
            allElement.classList.remove('btn-today-active');
            btnTo.classList.add('btn-today-active');
            inputTo.showPicker(); // Открывает native-календарь
        });

        inputTo.addEventListener('change', () => {
            btnTo.textContent = inputTo.value ? 'по       ' + '   ' + inputTo.value : 'по   Дата';
            sessionStorage.setItem('intervalTo', 'true');
            sessionStorage.setItem('dateTo', inputTo.value);
            // console.log(sessionStorage.getItem('intervalFrom'));
            // console.log(sessionStorage.getItem('intervalTo'));
            if (sessionStorage.getItem('intervalFrom') && sessionStorage.getItem('intervalTo')) {
                document.getElementById('interval').removeAttribute('disabled');
            }
        });

        inputToM.addEventListener('change', () => {
            document.getElementById('intervalM').classList.add('btn-today-active');
            dayElementM.classList.remove('btn-today-active');
            weekElementM.classList.remove('btn-today-active');
            monthElementM.classList.remove('btn-today-active');
            yearElementM.classList.remove('btn-today-active');
            allElementM.classList.remove('btn-today-active');
            // btnM.classList.add('btn-today-active');
            // btnTo.textContent = inputTo.value ? 'по       ' + '   ' + inputTo.value : 'по   Дата';
            sessionStorage.setItem('intervalTo', 'true');
            sessionStorage.setItem('dateTo', inputToM.value);
            // console.log(sessionStorage.getItem('intervalFrom'));
            // console.log(sessionStorage.getItem('intervalTo'));
            // console.log(sessionStorage.getItem('dateTo'));
            if (sessionStorage.getItem('intervalFrom') && sessionStorage.getItem('intervalTo')) {
                // document.getElementById('interval').removeAttribute('disabled');
                document.getElementById('intervalM').removeAttribute('disabled');
                // document.getElementById('todayMobileText').hidden = false;
                // document.getElementById('todayMobileText').innerText = 'Интервал c ' + sessionStorage.getItem('intervalFrom') + ' по ' + sessionStorage.getItem('intervalTo');

            }
        });

        document.getElementById('makeIncome').addEventListener('click', () => {
            sessionStorage.clear();
            sessionStorage.setItem('makeItem', 'makeIncome');
            // console.log('makeIncome');
            // alert('makeIncome');
            location.href = '#/new-item';
        });
        document.getElementById('makeOutcome').addEventListener('click', () => {
            sessionStorage.clear();
            sessionStorage.setItem('makeItem', 'makeOutcome');
            // console.log('makeOutcome');
            // alert('makeOutcome');
            location.href = '#/new-item';

        });

        this.initOne();
    }

    initOne() {
        // alert('initOne()');
        const todayElement = document.getElementById('all');
        const todayElementM = document.getElementById('allM');
        if (todayElementM) {
            todayElementM.click(); // запускаем обработчик клика программно
            todayElementM.classList.add('btn-today-active');

            // console.log('Элемент с id="today" // запускаем обработчик клика программно в DOM');
        } else {
            console.error('Элемент с id="today" не найден в DOM');
        }
        if (todayElement) {
            todayElement.click(); // запускаем обработчик клика программно
            todayElement.classList.add('btn-today-active');
            // console.log('Элемент с id="today" // запускаем обработчик клика программно в DOM');
        } else {
            console.error('Элемент с id="today" не найден в DOM');
        }
// ★ Дополнительно: убираем класс при уходе мыши (если нужно)
//         todayElement.addEventListener('mouseleave', () => {
//             todayElement.classList.remove('btn-today-active');
//         });

        // document.getElementById('today').click();
    }

    async init() {

        try {
            let myAccessToken = localStorage.getItem('accessToken');
            let myRefreshToken = localStorage.getItem('refreshToken');
           let dateFrom = sessionStorage.getItem('dateFrom');
            let dateTo = sessionStorage.getItem('dateTo');
            // console.log(dateFrom);
            // console.log(dateTo);
            // console.log(myAccessToken);
            // sessionStorage.clear();
            if (!myAccessToken) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/operations?period=interval&dateFrom=' + dateFrom + '&dateTo=' + dateTo, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': myAccessToken,
                }
            });
            //
            // console.log(response);
            // console.log(response.status);
            // if (response.status === 400) {
            //     console.log('Данные response.status устарели !!!! === 400!');
            //     alert('Данные response.status устарели !!!! === 400!');
            //     ////////////////////
            //     localStorage.clear();
            //     // location.href = '#/sign-in';
            //
            // }
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
                //
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
                    alert('Данные response.status устарели !!!! === 400!');
                    ////////////////////
                    localStorage.clear();
                    // location.href = '#/sign-in';

                }
            } else {

                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка сервера: ' + response.status);
                    return;
                }
                // }
                const result = await response.json();
                // console.log(result);
                this.list = result;
                this.processLoad();

            }

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }
    }

    processLoad() {
        // alert('начинаем динамически загружать страницу !!!');
        // console.log(this.list);
        const listOptionsElement = document.getElementById('load-table');
        // console.log(listOptionsElement);
        listOptionsElement.innerHTML = '';
        let i = 0;
        let type = 'Доход';
        let typeColor = 'green';
        if (this.list && this.list.length > 0) {
            this.list.forEach(item => {
                i = i + 1;
                type = item.type === 'expense' ? 'Расход' : 'Доход';
                typeColor = item.type === 'expense' ? 'red' : 'green';
                // Уникальный ID для кнопки редактирования
                const number = `${i}`;
                const editButtonId = `btn-item-edit-${item.id}`;
                const deleteButtonId = `btn-item-delete-${item.id}`;
                // console.log(editButtonId);
                // console.log('deleteButtonId   ' + deleteButtonId);
                const listMainTrElement = document.createElement('tr');
                listMainTrElement.setAttribute('data-id', item.id);
                // console.log(listMainTrElement);
                listMainTrElement.innerHTML = `
                <th scope="row">${i}</th>
                <td style="color: ${typeColor}">${type}</td>
                <td>${item.category}</td>
                <td>${item.amount}</td>
                <td>${item.date}</td>
                <td>${item.comment}</td>
                <td>
                    <svg id="${deleteButtonId}" data-bs-toggle="modal" data-bs-target="#staticBackdrop" width="13" height="15"
                         viewBox="0 0 13 15" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 5.5C4.27614 5.5 4.5 5.72386 4.5 6V12C4.5 12.2761 4.27614 12.5 4 12.5C3.72386 12.5 3.5 12.2761 3.5 12V6C3.5 5.72386 3.72386 5.5 4 5.5Z"
                              fill="black"/>
                        <path d="M6.5 5.5C6.77614 5.5 7 5.72386 7 6V12C7 12.2761 6.77614 12.5 6.5 12.5C6.22386 12.5 6 12.2761 6 12V6C6 5.72386 6.22386 5.5 6.5 5.5Z"
                              fill="black"/>
                        <path d="M9.5 6C9.5 5.72386 9.27614 5.5 9 5.5C8.72386 5.5 8.5 5.72386 8.5 6V12C8.5 12.2761 8.72386 12.5 9 12.5C9.27614 12.5 9.5 12.2761 9.5 12V6Z"
                              fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M13 3C13 3.55228 12.5523 4 12 4H11.5V13C11.5 14.1046 10.6046 15 9.5 15H3.5C2.39543 15 1.5 14.1046 1.5 13V4H1C0.447715 4 0 3.55228 0 3V2C0 1.44772 0.447715 1 1 1H4.5C4.5 0.447715 4.94772 0 5.5 0H7.5C8.05229 0 8.5 0.447715 8.5 1H12C12.5523 1 13 1.44772 13 2V3ZM2.61803 4L2.5 4.05902V13C2.5 13.5523 2.94772 14 3.5 14H9.5C10.0523 14 10.5 13.5523 10.5 13V4.05902L10.382 4H2.61803ZM1 3V2H12V3H1Z"
                              fill="black"/>
                    </svg>
                </td>
                <td>
                    <a id="${editButtonId}">
                        <svg style="margin-left: 10px" width="16" height="16" viewBox="0 0 16 16"
                             fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z"
                                  fill="black"/>
                        </svg>
                    </a>
                </td>
                `;

                listOptionsElement.appendChild(listMainTrElement);

                // Находим кнопку РЕДАКТИРОВАНИЯ и назначаем обработчик
                const btnElement = document.getElementById(editButtonId);
                // console.log(btnElement);
                btnElement.onclick = () => {
                    sessionStorage.setItem('itemId', JSON.stringify(item.id));
                    sessionStorage.setItem('typeId', JSON.stringify(item.type));
                    sessionStorage.setItem('dateId', JSON.stringify(item.date));
                    sessionStorage.setItem('categoryId', JSON.stringify(item.category));
                    sessionStorage.setItem('amountId', JSON.stringify(item.amount));
                    sessionStorage.setItem('commentId', JSON.stringify(item.comment));
                    location.href = '#/edit-item';
                    // this.chooseId(item.id);  // Передаем ID элемента
                };
                // Находим кнопку УДАЛЕНИЯ и назначаем обработчик
                const buttonDelete = document.getElementById(deleteButtonId);
                // console.log(buttonDelete);
                buttonDelete.onclick = () => {
                    // 1. Получаем модальное окно и кнопку удаления
                    const modal = document.getElementById('staticBackdrop');
                    const deleteModalButton = document.getElementById('deleteModalItem');
                    deleteModalButton.onclick = () => {
                        // console.log(item.id, item.category);
                        alert('ВЫ ТОЛЬКО ЧТО УДАЛИЛИ ЗАПИСЬ НОМЕР ' + number + ' - ' + type + ' - ' + item.category + ' - ' + item.amount + ' - ' + item.date + ' - ' + item.comment);
                        this.deleteItem(item.id);  // Передаем ID элемента
                    };                };
            });
        }


        const data = this.list;
        let total = 0;
        // console.log(data);
        for (const item of data) {
            if (item.type === 'income') {
                total += item.amount;
            } else if (item.type === 'expense') {
                total -= item.amount;
            }
        }
        // console.log(total); // Выводим итог userAmount
        let userAmount = document.getElementById('userAmount');
        // console.log(userAmount); // Выводим итог userAmount
        userAmount.innerText = total;
        // alert(total); // Выводим итог userAmount
        localStorage.setItem('userAmount', total);
        // this.putAmout();
        this.putAmout();
    }

    async deleteItem(elementId) {
        // console.log(elementId);

        // alert('ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР !!!');

        try {
            let token = localStorage.getItem('accessToken');
            // console.log(token);

            if (!token) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/operations/' + elementId, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                }
            });

            // console.log(response);
            // console.log(response.status);

            if (!response.ok) { // Более короткая проверка статуса
                alert('Ошибка сервера: ' + response.status);
                return;
            }

            const result = await response.json();
            // console.log(result);

            // alert('Данные DELETE !!!!');
            location.href = '#/all-items';
            // this.processLoad();

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }


    }
    async putAmout() {
        let userAmount = localStorage.getItem('userAmount');
        // console.log('userAmount   ' + userAmount);
        // console.log(userTextAmount); // Выводим итог userAmount
        try {
            let token = localStorage.getItem('accessToken');
            // console.log(userAmount);
            if (!token) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/balance', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    newBalance: userAmount,
                })
            });
            //
            // console.log(response);
            // console.log(response.status);

            if (!response.ok) { // Более короткая проверка статуса
                alert('Ошибка сервера: ' + response.status);
                return;
            }

            const result = await response.json();
            // console.log(result);

            // alert('Данные DELETE !!!!');
            // location.href = '#/all-items';
            // this.processLoad();

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }
    }

    // chooseId(element) {
    //     console.log(element);
    //     location.href = '#/edit-income';
    //     //  location.href = '#/test?name=' + this.routeParams.name + '&lastName=' + this.routeParams.lastName + '&email=' + this.routeParams.email + '&id=' + dataId;
    //     alert(element);
    //     sessionStorage.setItem('incomeId', JSON.stringify(element));
    // }
}
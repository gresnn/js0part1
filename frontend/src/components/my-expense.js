export class MyExpense {
    constructor() {
        this.listIncome = [];
        this.initExpense();
    }

    async initExpense() {
        try {
            let token = localStorage.getItem('accessToken');
            console.log(token);
            let myRefreshToken = localStorage.getItem('refreshToken');
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
                // alert('Данные response.status устарели !!!! === 401!');
                ////////////////////

                const response = await fetch('http://localhost:3000/api/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        // 'x-auth-token': constRefreshToken,
                    },
                    body: JSON.stringify({refreshToken:  myRefreshToken})
                });

                console.log(response);
                console.log(response.status);

                if (response && response.status === 200) {
                    const result = await response.json();
                    if (result && !result.error) {
                        localStorage.setItem('accessToken', result.tokens.accessToken);
                        localStorage.setItem('refreshToken', result.tokens.refreshToken);
                        this.initExpense();
                        // return;
                    }
                }

                /////////////////////////
                // new Refresh();
            }
            else {
                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка!!!!!!!! сервера: ' + response.status);
                    return;
                }
                const result = await response.json();
                console.log(result);
                this.list = result;
                // console.log(this.list);
                // alert('Данные загружены!');
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
        const titleOptionsElement = document.getElementById('outcome-title');
        const listOptionsElement = document.getElementById('outcome-options');
        if (this.list && this.list.length > 0) {
            this.list.forEach(item => {

                // console.log(item);
                const listOptionElement = document.createElement('div');
                listOptionElement.className = 'col-md-6 col-xl-4 mb-3';
                listOptionElement.setAttribute('data-id', item.id);

                const listDiv1TextElement = document.createElement('div');
                listDiv1TextElement.className = 'card h-100';

                const listDiv2TextElement = document.createElement('div');
                listDiv2TextElement.className = 'card-body';

                // Уникальный ID для кнопки редактирования
                const editButtonId = `btn-outcome-edit-${item.id}`;
                const deleteButtonId = `btn-outcome-delete-${item.id}`;
                // console.log(editButtonId);
                // console.log(deleteButtonId);
                listDiv2TextElement.innerHTML = `
                <h4 class="card-title" style="color: #290661">${item.title}</h4>
                <a id="${editButtonId}" class="btn btn-primary">Редактировать</a>
                <a id="${deleteButtonId}" class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Удалить</a>
            `;

                listDiv1TextElement.appendChild(listDiv2TextElement);
                listOptionElement.appendChild(listDiv1TextElement);
                listOptionsElement.appendChild(listOptionElement);

                // Находим кнопку РЕДАКТИРОВАНИЯ и назначаем обработчик
                const btnElement = document.getElementById(editButtonId);
                // console.log(btnElement);
                btnElement.onclick = () => {
                    sessionStorage.setItem('outcomeId', JSON.stringify(item.id));
                    sessionStorage.setItem('outcomeItem', JSON.stringify(item.title));
                    location.href = '#/edit-outcome';
                    // this.setId(item.id);  // Передаем ID элемента
                };

                // Находим кнопку УДАЛЕНИЯ и назначаем обработчик
                const btnDelElement = document.getElementById(deleteButtonId);
                // console.log(btnDelElement);
                btnDelElement.onclick = () => {

                    // 1. Получаем модальное окно и кнопку удаления
                    const modal = document.getElementById('staticBackdrop');
                    const deleteModalButton = document.getElementById('deleteModalItem');
                    // console.log(modal);
                    // console.log(deleteModalButton);

                    deleteModalButton.onclick = () => {
                        this.deleteId(item.id);  // Передаем ID элемента
                        // location.href = '#/edit-outcome';
                    };
                };
            });
        }

        if (this.list && this.list.length === 0) {
            // alert('EMPTY страницa !!!');
            // titleOptionsElement.innerText = 'Добавьте новый вид расхода';

            // Добавляем финальный блок ПОСЛЕ всех элементов
            const addButtonElement = document.createElement('div');
            addButtonElement.className = 'col-md-6 col-xl-4 mb-3';

            addButtonElement.innerHTML = `
        <div class="card text-center h-100">
            <div class="card-body d-flex flex-column justify-content-center align-items-center p-0">
            <div class="pt-3">Добавьте новый расход</div>
                <a href="#/make-outcome" class="p-0 text-secondary text-decoration-none">
                    <p class="h2">+</p>
                </a>
            </div>
        </div>
    `;

            listOptionsElement.appendChild(addButtonElement);

        }
        else {

            // Добавляем финальный блок ПОСЛЕ всех элементов
            const addButtonElement = document.createElement('div');
            addButtonElement.className = 'col-md-6 col-xl-4 mb-3';

            addButtonElement.innerHTML = `
        <div class="card text-center h-100">
            <div class="card-body d-flex justify-content-center align-items-center">
                <a href="#/make-outcome" class="p-3 p-xl-0 text-secondary text-decoration-none">
                    <p class="h2">+</p>
                </a>
            </div>
        </div>
    `;

            listOptionsElement.appendChild(addButtonElement);

        }
    }

    async deleteId(element) {
        // console.log(element);
        // sessionStorage.setItem('outcomeId', JSON.stringify(element));
        // alert('ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР !!!');

        try {
            let token = localStorage.getItem('accessToken');
            console.log(token);

            if (!token) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/categories/expense/' + element, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                }
            });

            console.log(response);
            console.log(response.status);

            if (!response.ok) { // Более короткая проверка статуса
                alert('Ошибка сервера: ' + response.status);
                return;
            }

            const result = await response.json();
            console.log(result);

            // alert('Данные DELETE !!!!');
            location.href = '#/outcome';
            // this.processLoad();

        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }

// Находим кнопку и назначаем обработчик modal
//        const btnDelElement = document.getElementById(deleteModalItem);
//        console.log(btnDelElement);


    }


}

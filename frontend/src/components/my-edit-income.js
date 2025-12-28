export class MyEditIncome {
    constructor() {
        this.elementId = sessionStorage.getItem('incomeId');
        console.log(this.elementId);
        this.elementName = sessionStorage.getItem('incomeItem');
        console.log(this.elementName);
        // alert(this.elementName);
        this.textElement = document.getElementById('textInput');
        // console.log(this.textElement);

        // const str = '"QWERTY"';
        // const result = str.replace(/"/g, '');
        // console.log(result); // QWERTY

        this.textElement.value = this.elementName.replace(/"/g, '');
        this.list = [];
        this.init();
        // this.edit();
    }

    init() {
        // Находим кнопку save и назначаем обработчик
        const saveEditButton = document.getElementById('saveEditBtn');
        console.log(saveEditButton);
        saveEditButton.onclick = () => {
                this.edit();
        };

        // Находим кнопку cancel и назначаем обработчик

        const textElement = document.getElementById('textInput');
        // console.log(textElement);
        const cancelEditButton = document.getElementById('cancelEditBtn');
        console.log(cancelEditButton);
        cancelEditButton.onclick = () => {
            this.textElement.value = this.elementName.replace(/"/g, '');
        };
    }

    async edit() {
        // alert("sessionStorage.getItem('incomeId') + '  ' + sessionStorage.getItem('incomeItem')");

        try {
            let myRefreshToken = localStorage.getItem('refreshToken');
            let token = localStorage.getItem('accessToken');
            console.log(token);

            if (!token) {
                console.log('Token not found');
                return;
            }

            const response = await fetch('http://localhost:3000/api/categories/income/' + this.elementId, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    // title: this.inputElement.value,
                    title: this.textElement.value,
                })
            });

            console.log(response);
            console.log(response.status);
///////////////////////////////////

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
                        this.edit();
                        // return;
                    }
                }
                /////////////////////////

            }
            else {

                if (!response.ok) { // Более короткая проверка статуса
                    alert('Ошибка сервера: ' + response.status);
                    return;
                }
                // }
                const result = await response.json();
                console.log(result);


            }

//////////////////////////
//             if (!response.ok) { // Более короткая проверка статуса
//                 alert('Ошибка сервера: ' + response.status);
//                 return;
//             }
//
//             const result = await response.json();
//             console.log(result);
//
//             // alert('Данные  edit !');


        } catch (error) {
            console.error('Ошибка запроса:', error);
            alert('Произошла ошибка при загрузке данных');
        }



    }




}

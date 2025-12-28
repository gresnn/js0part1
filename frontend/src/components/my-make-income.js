export class MakeIncome {
    constructor() {
        this.inputElement = document.getElementById('formInput');
        this.list = [];
        this.init();
    }

    init() {
        console.log(this.inputElement);
        console.log(this.inputElement.value);
        // Находим кнопку и назначаем обработчик

        const btnElement = document.getElementById('createBtn');
        console.log(btnElement);
        btnElement.onclick = () => {
            this.createIncome();  // Передаем ID элемента
        };
    }


   async createIncome() {
        // alert('ОТПРАВЛЯЕМ ЗАПРОС НА СЕРВЕР !!!');
       console.log(this.inputElement);
       console.log(this.inputElement.value);

       try {
           let myRefreshToken = localStorage.getItem('refreshToken');
           let token = localStorage.getItem('accessToken');
           console.log(token);

           if (!token) {
               console.log('Token not found');
               return;
           }

           const response = await fetch('http://localhost:3000/api/categories/income', {
               method: 'POST',
               headers: {
                   'Content-type': 'application/json',
                   'Accept': 'application/json',
                   'x-auth-token': token,
               },
               body: JSON.stringify({
                   title: this.inputElement.value,
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
                       this.createIncome();
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
                // alert('Данные загружены!');
               location.href = '#/income';

           }

//////////////////////////
//            if (!response.ok) { // Более короткая проверка статуса
//                alert('Ошибка сервера: ' + response.status);
//                return;
//            }
//
//            const result = await response.json();
//            console.log(result);
//
//            // alert('Данные загружены!');
//            location.href = '#/income';
//            // this.processLoad();

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

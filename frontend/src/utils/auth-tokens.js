export class AuthTokens {
    constructor() {
        this.init();
    }
    init() {
        const accessToken = localStorage.getItem('accessToken');
        // alert(accessToken);
        if (!accessToken) {
            // alert('NOT accessToken !');
            window.location.href = '#/sign-in';
        } else {
            // alert('YES accessToken !');
        }
    }
}
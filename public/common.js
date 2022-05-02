function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function init(response_type) {
    let btn = document.getElementById('btnAction');

    let params = new URLSearchParams(window.location.hash.substring(1));
    let id_token = params.get('id_token');
    let callback = window.location.origin + window.location.pathname;

    if (id_token) {
        claims = parseJwt(id_token);
        console.log(claims);

        let info = document.getElementById('info');
        info.innerHTML = 'User ID ' + claims.sub + ' with E-mail ' + claims.email;
        btn.href = window.location.pathname;
        btn.innerText = 'Logout'
    } else {
        btn.href = 'https://webexapis.com/v1/authorize?'+
            'response_type=' + response_type +
            '&client_id=Cf65ef9d4495665e67da03e5993453c208149242d5ede68328b75f2bdef6ccfb4'+
            '&redirect_uri='+ callback +
            '&scope=openid%20email'+
            '&state=' + Math.random() +
            '&nonce=' + Math.random();
        btn.innerText = "Login"
    }
}



export const retrieveToken = ()=> {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return `${userToken.tokenType} ${userToken.accessToken}`;
}

export const calculaIdade = (nascimento)=> {
    let hoje = new Date(Date.now())
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
}

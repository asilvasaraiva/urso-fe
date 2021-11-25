

export function getRawToken(){
    try {
        return sessionStorage.getItem('token');
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const retrieveToken = () => {
    const tokenExist = getRawToken();
    if (tokenExist) {
        let rawToken = sessionStorage.getItem('token');
        const userToken = JSON.parse(rawToken);
        return `${userToken.tokenType} ${userToken.accessToken}`;        
    } else {
        return null;
    }
}

export const calculaIdade = (nascimento) => {
    let hoje = new Date(Date.now())
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
}

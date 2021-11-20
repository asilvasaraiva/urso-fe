import { useState } from 'react';

export default function retrieveToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return `${userToken.tokenType} ${userToken.accessToken}`;
}
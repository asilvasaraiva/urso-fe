import React, { useState, useEffect } from 'react';

import UserEdit from './userEdit';

const UserList = ({ listUsers }) => {
    const [userList, setUserList] = useState(listUsers);

    useEffect(() => {
        setUserList(listUsers);
    }, [listUsers])

    const renderedList = listUsers.map(user => {
        return (
            <div className="item" key={user.idUser}>
                <div className="right floated content">
                    <button className="ui primary button" > Editar</button>
                    <button className="ui negative button"> Excluir</button>
                </div>
                <div className="content">
                    {user.name} {user.surname}
                    <div className="description">{user.email}</div>
                </div>
            </div>
        )
    })




    return (
        <div className="ui relaxed divided list">{renderedList}</div>
    );
}

export default UserList;
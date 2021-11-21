import React, { useState, useEffect } from 'react';
import AxiosRequest from '../AxiosRequest';
import retrieveToken from '../useToken';
import Spinner from '../Spinner';


const UserList = ({ listUsers ,updateParentList}) => {
    const [userList, setUserList] = useState(listUsers);
    const [spinActive, setSpinActive] = useState(false)

    useEffect(() => {
        setUserList(listUsers);
    }, [listUsers]);

    const changeAdmin = async (idUser) => {
        setSpinActive(true)
        let authorization = retrieveToken();
        await AxiosRequest.get(`/admin/${idUser}/admin`, { headers: { Authorization: authorization } });
        const newList = await AxiosRequest.get('/users/', { headers: { Authorization: authorization } });
        setSpinActive(false)
        updateParentList(newList.data);
    }

    const renderedList = userList.map(user => {
        return (
            <div className="item" key={user.idUser}>
                <div className="right floated content">
                    <button
                        className={`ui ${user.admin ? 'primary' : 'green'} button`}
                        onClick={() => changeAdmin(user.idUser)}>
                        {user.admin ? 'Revogar ADMIN' : 'Tornar Admin'}
                    </button>
                    <button
                        className="ui negative button">
                        Excluir usuário
                    </button>
                </div>
                <div className="content">
                    {user.name} {user.surname} {user.admin ? <b>[Administrador]</b> : <i>(Usuário)</i>}
                    <div className="description">{user.email}</div>
                </div>
            </div>
        )
    })


    return (
        <div className="ui relaxed divided list">
            {renderedList}
            {spinActive && <Spinner />}
        </div>
    );
}

export default UserList;
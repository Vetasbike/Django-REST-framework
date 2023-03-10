import Table from "react-bootstrap/Table";
import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <Table striped bordered hover>
            <thead key="thead">
            <tr>
                <th>
                    Имя пользователя
                </th>
                <th>
                    Имя
                </th>
                <th>
                    Фамилия
                </th>
                <th>
                    Почта
                </th>
            </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem key={user.id} user={user} />)}
            </tbody>
        </Table>
    )
}

export default UserList

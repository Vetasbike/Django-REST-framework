import Table from "react-bootstrap/Table";
import React from "react";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.createdAt}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <Table striped bordered hover>
            <thead key="thead">
            <tr>
                <th>
                    Проект
                </th>
                <th>
                    Текст заметки
                </th>
                <th>
                    Автор заметки
                </th>
                <th>
                    Создано
                </th>
            </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
            </tbody>
        </Table>
    )
}

export default TodoList

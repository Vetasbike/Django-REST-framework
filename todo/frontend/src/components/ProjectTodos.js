import {useParams} from "react-router-dom";
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

const ProjectTodosList = ({todos}) => {
    let {id} = useParams()
    let filteredTodos = todos.filter((todo) => todo.project === +id);
    return (
        <Table striped bordered hover>
            <thead key="thead">
                <tr>
                    <th>
                        ID проекта
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
                {filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
            </tbody>
        </Table>
    )
}

export default ProjectTodosList

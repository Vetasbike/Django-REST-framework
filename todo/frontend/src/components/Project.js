import Table from "react-bootstrap/Table";
import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useState} from "react";

const ProjectItem = ({project, allUsers, delete_project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`${project.id}`}>{project.name}</Link>
            </td>
            <td>
                <Link to={`${project.id}`}>{project.link}</Link>
            </td>
            <td>
                {project.users.map((userId) => {
                    let user = allUsers.find(user => user.id === userId)
                    return user.username + ' '
                })}
            </td>
            <td>
                <Button onClick={() => delete_project(project.id)}
                        type="button" variant="outline-danger" size="sm">Удалить</Button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, users, delete_project}) => {
    const [value, set_value] = useState("")
    const filtered_projects = projects.filter((project) => {
        return project.name.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <div>
            <div className="form-group my-3">
                <div className="col-3">
                    <label htmlFor="search">Поиск</label>
                    <input type="text" name="search" className="form-control"
                           onChange={(event) => set_value(event.target.value)}/>
                </div>
            </div>

            <Table striped bordered hover>
                <thead key="thead">
                <tr>
                    <th>
                        ID проекта
                    </th>
                    <th>
                        Название проекта
                    </th>
                    <th>
                        Ссылка на репозиторий
                    </th>
                    <th>
                        Авторы
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filtered_projects.map((project) => <ProjectItem key={project.id}
                                                                 project={project}
                                                                 allUsers={users}
                                                                 delete_project={delete_project}/>)}
                </tbody>
            </Table>
            <div className="row">
                <div>
                    <Link to='/projects/create'>Создать</Link>
                </div>
                <div>
                    <Link to='/projects/update'>Обновить</Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectList

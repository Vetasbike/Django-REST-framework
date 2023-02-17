import Table from "react-bootstrap/Table";
import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`${project.id}`}>{project.name}</Link>
            </td>
            {/*<td>*/}
            {/*    {project.name}*/}
            {/*</td>*/}
            <td>
                {project.link}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <Table striped bordered hover>
            <thead key="thead">
            <tr>
                <th>
                    Проекты
                </th>
                {/*<th>*/}
                {/*    Имя проекта*/}
                {/*</th>*/}
                <th>
                    Ссылка на репозиторий
                </th>
            </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem key={project.id} project={project} />)}
            </tbody>
        </Table>
    )
}

export default ProjectList

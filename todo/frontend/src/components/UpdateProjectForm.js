import React from 'react';
import {Navigate} from "react-router-dom";


class UpdateProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            name: '',
            link: '',
            users: [],
            is_added: false
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }

    handleSubmit(event) {
        this.props.update_project(this.state.id, this.state.name, this.state.link, this.state.users)
        this.setState({isAdded: true})
        event.preventDefault()
    }

    render() {
        if(this.state.isAdded) {
            return <Navigate replace to="/projects"/>
        }
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group mt-3">
                    <label htmlFor="id">ID проекта</label><br></br>
                    <select className="form-control disabled" name="id"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item, index) =>
                            <option key={index}
                                    value={item.id}>{item.id}
                            </option>)}
                    </select>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="name">Проект</label>
                    <input type="text" name="name" placeholder="Имя проекта" className="form-control"
                           value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="link">Ссылка на репозиторий</label>
                    <input type="text" name="link" placeholder="http://127.0.0.1:8000/api/projects/"
                           className="form-control"
                           value={this.state.link} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="users">Авторы проекта</label>
                    <select name="users" multiple onChange={(event) => this.handleUsersChange(event)}
                            className='form-control'>
                        {this.props.users.map((item, index) =>
                            <option
                                key={index}
                                value={item.id}>{item.username}
                            </option>)}
                    </select>
                </div>

                <div className="mt-3">
                    <input type="submit" className="btn btn-primary" value="Сохранить"/>
                </div>

            </form>
        );
    }
}

export default UpdateProjectForm

import React from 'react';
import {Navigate} from "react-router-dom";

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: props.projects[0]?.id,
            text: '',
            user: props.users[0]?.id,
            isAdded: false,
            isActive: true,
            initialStatus: 1,
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.project, this.state.text, this.state.user, this.state.isActive)
        this.setState({isAdded: true})
        event.preventDefault()
    }

    render() {
        if (this.state.isAdded) {
            return <Navigate replace to="/todos/"/>
        }
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group mt-3">
                    <label htmlFor="project">Имя проекта</label>
                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                    </select>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="text">Текст заметки</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="user">Автор заметки</label>
                    <select name="user" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item, index) =>
                            <option
                                key={index}
                                value={item.id}>{item.username}
                            </option>)}
                    </select>
                </div>

                <div className="form-group mt-3 mr2-m">
                    <label htmlFor='isActive'>Начальный статус заметки&nbsp;</label>
                    <input type='checkbox' name='isActive'
                           value={this.state.isActive} checked
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="mt-3">
                    <input type="submit" className="btn btn-primary" value="Сохранить"/>
                </div>

            </form>
        );
    }
}

export default TodoForm

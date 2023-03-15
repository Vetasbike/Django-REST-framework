import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState({
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="d-flex align-content-center mt-3">
                    <div className="form-group me-3">
                        <label htmlFor="login">Логин</label>
                        <input type="text" name="login" placeholder="" className="form-control"
                               value={this.state.login} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group me-3">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" placeholder=""
                               className="form-control"
                               value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                    </div>
                </div>
                <div className="mt-3">
                    <input type="submit" className="btn btn-primary" value="Сохранить"/>
                </div>
            </form>
        );
    }
}

export default LoginForm

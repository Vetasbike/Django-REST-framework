import {ReactComponent as ReactLogo} from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import {Container, Nav, Navbar} from "react-bootstrap";
import Footer from "./components/Footer";
import UserList from './components/User';
import ProjectList from './components/Project';
import ProjectTodosList from './components/ProjectTodos';
import TodoList from './components/Todo';
import NotFound404 from "./components/NotFound404";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import UpdateProjectForm from "./components/UpdateProjectForm";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'authorized_user': '',
        }
    }

    create_project(name, link, users) {
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                alert('Ссылка на репозиторий некорректна или не указаны авторы')
            })
    }

    update_project(id, name, link, users) {
        const headers = this.get_headers()
        const data = {id: id, name: name, link: link, users: users}
        axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                alert('Ссылка на репозиторий некорректна или не указаны авторы')
            })
    }

    create_todo(project, text, user, isActive) {
        const headers = this.get_headers()
        const data = {project: project, text: text, user: user, isActive: isActive}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                this.load_data()
            })
            .catch(error => {
                console.log(error)
                alert('Не указан текст заметки')
                this.setState({todos: []})
            })
    }

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                    this.load_data()
                }
            ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                    this.load_data()
                    console.log(response)
                }
            ).catch(error => {
            this.setState({todos: []})
        })
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token/', data)
            .then(response => {
                this.set_token(response.data['token'], username)
            })
            .catch(error => alert('Неверный логин или пароль'))
    }

    set_token(token, authorized_user) {
        const cookies = new Cookies()
        cookies.set('token', token)
        localStorage.setItem('authorized_user', authorized_user)
        this.setState({'authorized_user': localStorage.getItem('authorized_user')})
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        localStorage.setItem('authorized_user', '')
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.setState({'authorized_user': localStorage.getItem('authorized_user')})
    }

    render() {
        if (this.is_auth() && this.state.authorized_user) {
            return (
                <Container className="d-flex flex-column min-vh-100">
                    <Container className="p-5 mb-4 bg-light rounded-3">
                        <BrowserRouter>
                            <Navbar bg="dark" variant="dark">
                                <Container>
                                    <ReactLogo width="30" height="30"/>
                                    <Nav className="me-auto">
                                        <Nav.Link as={Link} to="/">Пользователи</Nav.Link>
                                        <Nav.Link as={Link} to="/projects">Проекты</Nav.Link>
                                        <Nav.Link as={Link} to="/todos">Todo</Nav.Link>
                                        {this.is_auth() ?
                                            <Nav.Link
                                                onClick={() => this.logout()}>[{this.state.authorized_user}]</Nav.Link> :
                                            <Nav.Link as={Link} to="/"></Nav.Link>}
                                    </Nav>
                                </Container>
                            </Navbar>
                            <Routes>
                                <Route exact path='/' element={<UserList users={this.state.users}/>}/>
                                <Route exact path='/users' element={<UserList users={this.state.users}/>}/>
                                <Route exact path='/projects'
                                       element={<ProjectList projects={this.state.projects}
                                                             users={this.state.users}
                                                             delete_project={(id) => this.delete_project(id)}/>}/>
                                <Route path='/projects/create' element={
                                    <ProjectForm users={this.state.users}
                                                 create_project={(name, link, users) =>
                                                     this.create_project(name, link, users)}/>}/>
                                <Route path='/projects/update' element={
                                    <UpdateProjectForm users={this.state.users}
                                                       projects={this.state.projects}
                                                       update_project={(id, name, link, users) =>
                                                           this.update_project(id, name, link, users)}/>}/>
                                <Route path='/projects/:id' element={
                                    <ProjectTodosList todos={this.state.todos}/>}/>

                                <Route exact path='/todos'
                                       element={<TodoList todos={this.state.todos}
                                                          delete_todo={(id) => this.delete_todo(id)}/>}/>
                                <Route exact path='/todos/create' element={
                                    <TodoForm projects={(this.state.projects)}
                                              users={this.state.users}
                                              create_todo={(project, text, user, isActive) => this.create_todo(project, text, user, isActive)}/>}/>
                                <Route exact path='/login' element={
                                    <LoginForm get_token={(username, password) => this.get_token(username, password)
                                    }/>}/>
                                <Route path='*' element={<NotFound404/>}/>
                            </Routes>
                            <Footer/>
                        </BrowserRouter>
                    </Container>
                </Container>)
        } else {
            return (
                <Container className="d-flex flex-column min-vh-100">
                    <Container className="p-5 mb-4 bg-light rounded-3">
                        <BrowserRouter>
                            <Navbar bg="dark" variant="dark">
                                <Container>
                                    <ReactLogo width="30" height="30"/>
                                </Container>
                            </Navbar>
                            <Routes>
                                <Route path="/" element={<Navigate replace to="/login/"/>}/>
                                <Route path="/users/" element={<Navigate replace to="/login/"/>}/>
                                <Route path="/projects/" element={<Navigate replace to="/login/"/>}/>
                                <Route path="/todos/" element={<Navigate replace to="/login/"/>}/>
                                <Route path="/login/" element={
                                    <LoginForm get_token={(username, password) => this.get_token(username, password)
                                    }/>}/>
                                <Route path="*" element={<NotFound404/>}/>
                            </Routes>
                        </BrowserRouter>
                    </Container>
                </Container>
            )
        }
    }
}

export default App;

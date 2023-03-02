import logo, {ReactComponent as ReactLogo} from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import {Container, Nav, Navbar} from "react-bootstrap";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import UserList from './components/User';
import ProjectList from './components/Project';
import ProjectTodosList from './components/ProjectTodos';
import TodoList from './components/Todo';
import NotFound404 from "./components/NotFound404";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
        }
    }

    get_token(username, password) {
        const data = {username: username, password:password}
        axios.post('http://127.0.0.1:8000/api-token/', data)
            .then(response => {this.set_token(response.data['token'])})
            .catch(error => alert('Неверный логин или пароль'))
    }

    set_token(token) {
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_auth() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
        this.setState({'users': []}, () => this.load_data())
        this.setState({'projects': []}, () => this.load_data())
        this.setState({'todos': []}, () => this.load_data())
    }

    get_headers() {
        let headers = {
            'Content-Type': 'applications/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
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
    }

    render() {
        return (

        <Container className="p-2">
            <Container className="p-5 mb-4 bg-light rounded-3">
                <BrowserRouter>
                    {/*<Menu /> */}
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <ReactLogo width="30" height="30" />
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Пользователи</Nav.Link>
                                    <Nav.Link as={Link} to="/projects">Проекты</Nav.Link>
                                    <Nav.Link as={Link} to="/todos">Todo</Nav.Link>
                                    {/*<Nav.Link as={Link} to="/login">Вход</Nav.Link>*/}
                                    {this.is_auth() ?
                                        <Nav.Link onClick={()=>this.logout()}>Выход</Nav.Link> :
                                        <Nav.Link as={Link} to="/login">Вход</Nav.Link>}
                                </Nav>
                        </Container>
                    </Navbar>
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} />
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                            <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                            <Route path='/projects/:id' element={<ProjectTodosList todos={this.state.todos} />} />
                            <Route exact path='/users' element={<UserList users={this.state.users} />} />
                            <Route exact path='/login' element={
                                <LoginForm get_token={(username, password) => this.get_token(username, password)
                                } />} />
                            <Route path='*' element={<NotFound404 />} />
                        </Routes>
                    <Footer />
                </BrowserRouter>
            </Container>
        </Container>
        )
    }
}

export default App;

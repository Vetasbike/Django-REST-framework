import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import UserList from './components/User';
import ProjectList from './components/Project';
import ProjectTodosList from './components/ProjectTodos';
import TodoList from './components/Todo';
import NotFound404 from "./components/NotFound404";
import {BrowserRouter, Route, Routes} from "react-router-dom";



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
        <Container className="p-2">
            <Container className="p-5 mb-4 bg-light rounded-3">
                <BrowserRouter>
                    <Menu />
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} />
                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                            <Route exact path='/todos' element={<TodoList todos={this.state.todos} />} />
                            <Route path='/projects/:id' element={<ProjectTodosList todos={this.state.todos} />} />
                            <Route exact path='/users' element={<UserList users={this.state.users} />} />
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

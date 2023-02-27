import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import Footer from "./components/Footer";
import UserList from './components/User';
import Menu from "./components/Menu";
import {Container} from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
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
    }

    render() {
        return (
            <Container className="p-2">
                <Container className="p-5 mb-4 bg-light rounded-3">
                    <div className='header'>
                        <Menu/>
                    </div>
                    <div className='main'>
                        <UserList users={this.state.users}/>
                    </div>
                    <div className='footer'>
                        <Footer/>
                    </div>
                </Container>
            </Container>
        )
    }
}

export default App;

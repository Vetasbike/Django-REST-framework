import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ReactComponent as ReactLogo} from '../logo.svg';

const MenuItem = () => {
    return (

    <Navbar bg="dark" variant="dark">
        <Container>
            <ReactLogo width="30" height="30" />
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Пользователи</Nav.Link>
                <Nav.Link as={Link} to="/projects">Проекты</Nav.Link>
                <Nav.Link as={Link} to="/todos">Todo</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    )
}

export default MenuItem

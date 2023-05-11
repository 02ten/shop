import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ABOUT_ROUTE, CATALOG_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="light" variant="light">
            <Container class="container-fluid">
                <NavLink
                    style={{color: 'black', textDecoration: 'none'}}
                    to={HOME_ROUTE}>
                    Магазин игрушек
                </NavLink>
                <Nav className="me-2">
                    <NavLink className="me-2" style={{color: 'black', textDecoration: 'none'}}
                             to={CATALOG_ROUTE}>Каталог</NavLink>
                    <NavLink className="me-2" style={{color: 'black', textDecoration: 'none'}}
                             to={ABOUT_ROUTE}>О нас</NavLink>
                </Nav>
                {user.isAuth ?
                    <Nav>
                        <Button variant={"outline-dark"} className="ms-2"
                                onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "black"}}>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default Header;
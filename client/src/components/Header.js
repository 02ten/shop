import React, {useContext, useEffect} from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {
    ABOUT_ROUTE,
    ADMIN_CATEGORIES_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_PRODUCTS_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    CATALOG_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE
} from "../utils/consts";
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {fetchCategories} from "../http/categoryAPI";

const Header = observer(() => {
    const {user} = useContext(Context)
    const {categories} = useContext(Context)
    const navigate = useNavigate()
    console.log(user.user.roles.includes('admin'))
    useEffect(() => {
        fetchCategories().then(data => categories.setCategories(data))
    }, [])
    const logOut = () => {
        user.setUser({'roles': ['not auth']})
        user.setIsAuth(false)
        window.localStorage.setItem('token', null)
    }
    return (
        <Navbar className="navbar navbar-dark bg-dark fixed-top navbar-expand-md">
            <Container class="container-fluid">
                <div className="collapse navbar-collapse">
                    <NavLink className='navbar-brand me-4 '
                             style={{textDecoration: 'none'}}
                             to={HOME_ROUTE}>
                        Магазин игрушек
                    </NavLink>
                    <NavLink className='nav-item text-light me-2 mt-1'
                             style={{textDecoration: 'none'}}
                             to={HOME_ROUTE}>
                        Главная
                    </NavLink>
                    <Nav className="nav-item me-2 pt-1">
                        <NavDropdown className="nav-item me-2" style={{textDecoration: 'none'}}
                                     title="Каталог">

                            {categories.categories.map(item =>
                                <NavDropdown.Item>
                                    <NavLink key={item.id} className="nav-item me-2 text-dark"
                                             style={{textDecoration: 'none'}}
                                             to={CATALOG_ROUTE+item.id}>{item.name}</NavLink>
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                        <NavLink className="nav-item text-light me-2 mt-2" style={{textDecoration: 'none'}}
                                 to={ABOUT_ROUTE}>О нас</NavLink>
                    </Nav>
                </div>
                {user.isAuth ?
                    <Nav>
                        {user.user.roles.includes('admin') ?
                            <Nav className="nav-item me-2 pt-1">
                                <NavDropdown className="nav-item me-2" style={{textDecoration: 'none'}}
                                             title="Админ панель">
                                    <NavDropdown.Item>
                                        <NavLink className="nav-item me-2 text-dark" style={{textDecoration: 'none'}}
                                                 to={ADMIN_CATEGORIES_ROUTE}>Категории</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink className="nav-item me-2 text-dark" style={{textDecoration: 'none'}}
                                                 to={ADMIN_PRODUCTS_ROUTE}>Товары</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink className="nav-item me-2 text-dark" style={{textDecoration: 'none'}}
                                                 to={ADMIN_ORDERS_ROUTE}>Заказы</NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <></>
                        }
                        <Nav className="ml-auto" style={{}}>
                            <Button
                                className="btn  ms-1  btn-outline-light"
                                variant={"outline-light"}

                                onClick={() => navigate(CART_ROUTE)}>Корзина</Button>
                        </Nav>
                        <Button type="button" className="btn  ms-1  btn-outline-light"
                                variant={"outline-light"}
                                onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{}}>
                        <Button
                            className="btn  ms-1  btn-outline-light"
                            variant={"outline-light"}

                            onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default Header;
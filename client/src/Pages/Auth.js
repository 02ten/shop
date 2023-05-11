import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";


const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const click = async () => {
        try{
            if (isLogin) {
                const data = await login(email, password)
                user.setUser(data);
                user.setIsAuth(true);
                navigate(HOME_ROUTE);
            } else {
                const data = await registration(name, email, password, phone)
                navigate(LOGIN_ROUTE)
            }
        }catch (e){
            console.log(e)
            alert(e.response.data)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Введите e-mail"
                                  value={email}
                                  onChange={e => setEmail(e.target.value)}
                                  type="email"
                    ></Form.Control>

                    <Form.Control className="mt-3" placeholder="Введите пароль"
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                  type="password"
                    ></Form.Control>
                    {isLogin ? <></> :
                        <>
                            <Form.Control className="mt-3" placeholder="Введите имя"
                                          value={name}
                                          onChange={e => setName(e.target.value)}
                            ></Form.Control>
                            <Form.Control className="mt-3" placeholder="Введите номер телефона"
                                          value={phone}
                                          onChange={e => setPhone(e.target.value)}
                            ></Form.Control>
                        </>

                    }

                </Form>
                <div className="d-flex justify-content-between mt-3 ">
                    {isLogin ?
                        <>
                            <div>Нет аккаунта? <NavLink style={{textDecoration: "none"}}
                                                        to={REGISTRATION_ROUTE}>Зарегестрироваться</NavLink>
                            </div>
                            <Button variant={"outline-success"} onClick={click}>Войти</Button>
                        </>
                        :
                        <>
                            <div>Уже есть аккаунт? <NavLink style={{textDecoration: "none"}}
                                                            to={LOGIN_ROUTE}>Авторизоваться</NavLink>
                            </div>
                            <Button variant={"outline-success"} onClick={click}>Регистрация</Button>
                        </>
                    }

                </div>
            </Card>
        </Container>
    );
};

export default Auth;
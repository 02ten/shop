import React, {useContext} from 'react';
import {Context} from "../index";
import '../css/home.css'
import slider from '../assets/slider.jpg'
import slider2 from '../assets/slider2.jpg'
import slider3 from '../assets/slider3.jpg'
import index from '../assets/index1.jpg'
import index2 from '../assets/index2.jpg'
import index3 from '../assets/index3.jpg.webp'
import {NavLink} from "react-router-dom";
import {ABOUT_ROUTE, CATALOG_ROUTE, LOGIN_ROUTE} from "../utils/consts";
const Home = () => {
    return (

        <main>

            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active"
                            aria-current="true"
                            aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">

                        <img src={slider} alt=""></img>
                        <div className="container">
                            <div className="carousel-caption text-start ">
                                <h1>Вход и регистрация</h1>
                                <p>Для удобства пользования сайтом войдите или зарегистрируйтесь</p>
                                <p><NavLink to={LOGIN_ROUTE} className="btn btn-lg btn-primary"
                                      data-bs-target="#loginForm">Войти или зарегистрироваться</NavLink></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={slider2} alt=""/>
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Каталог</h1>
                                <p>С полным перечнем товаров можете ознакомиться в нашем катологе</p>
                                <p><NavLink to={CATALOG_ROUTE} className="btn btn-lg btn-primary">Каталог</NavLink></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={slider3} alt=""/>
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1>Подробнее о нас вы можете ознакомиться на отдельной странице</h1>
                                <p><NavLink to={ABOUT_ROUTE} className="btn btn-lg btn-primary" href="/about">О нас</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container marketing">
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">В нашем магазине</h2>
                        <p className="lead">Вы можете найти различные игрушки. По хорошим ценам</p>
                    </div>
                    <div className="col-md-5">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500"
                             height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                             aria-label="Placeholder: 500x500"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <image href={index}></image>
                            >
                        </svg>

                    </div>
                </div>

                <hr className="featurette-divider"/>
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Быстрая доставка </h2>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500"
                             height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                             aria-label="Placeholder: 500x500"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <image href={index2}></image>
                            >
                        </svg>
                    </div>
                </div>

                <hr className="featurette-divider"/>
                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">Различные способы оплаты</h2>
                    </div>
                    <div className="col-md-5">
                        <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                             width="500"
                             height="500" xmlns="http://www.w3.org/2000/svg" role="img"
                             aria-label="Placeholder: 500x500"
                             preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#eee"/>
                            <image href={index3}></image>
                            >
                        </svg>
                    </div>
                </div>

                <hr className="featurette-divider"/>
            </div>
        </main>
    );
};

export default Home;
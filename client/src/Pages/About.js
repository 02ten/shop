import React from 'react';

const About = () => {
    return (
        <div className="container my-5 px-4">
            <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                <div className="col top-cover center-block">
                    <div className="p-5">
                        <h3>Способы доставки</h3>
                        <p><b>Самовывоз</b><br/>
                            Самовывоз производится по адресу г.Москва, пр. Вернандского, 78. Работа осуществляется с
                            9:00 -
                            21:00, ежедневно
                            <br/>
                                <b>Доставка курьером</b><br/>
                                Доставка курьером производится только в городе Москва, в пределах МКАД. Стоимость
                                доставки 199
                                рублей, вне зависимостри от суммы заказа. Предоплата не требуется
                                <br/>
                                    <h3>Как с нами связаться</h3>
                                    <b>E-mail: </b> toyshop@gmail.com <br/>
                                    <b>Телефон: </b> +7(495)535-35-35 <br/>
                                    <b>Whatsapp/Telegram: </b>+7(985)234-42-12 <br/>
                                    <h3>Юридическая информация</h3>
                                    Продажа товаров в интернет-магазине toyshop осуществляется Обществом с ограниченной
                                    ответственностью
                                    «toyshop.ru»
                                    Юридический адрес: пр. Вернадского, 78, Москва, 119454 ИНН/КПП 222222222/22222222
                        </p>
                    </div>
                </div>
                <div className="col top-cover center-block">
                    <div className="p-5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7568.150218052035!2d37.47744829591578!3d55.67117373428238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54dc1d23b51c3%3A0x74763ed59c81ccb6!2z0KDQotCjINCc0JjQoNCt0JA!5e0!3m2!1sru!2sru!4v1652121309873!5m2!1sru!2sru"
                            width="100%" height="500" style={{border:'solid black'}} allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
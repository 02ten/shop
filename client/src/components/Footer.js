import React from 'react';
import { SlSocialVkontakte } from "react-icons/sl";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span className="ms-3 mb-3 mb-md-0 text-muted">@Магазин игрушек</span>
            </div>
            <span className="text-muted">Горячая линия +7(499)238-42-42</span>
            <ul className="nav mt-2 col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a className="text-muted" href="#">
                    <FaWhatsapp size={40}></FaWhatsapp>
                </a></li>
                <li className="ms-3"><a className="text-muted" href="#">
                    <FaTelegramPlane size={40}></FaTelegramPlane>
                </a></li>
                <li className="ms-3"><a className="text-muted" href="https://vk.com">
                    <SlSocialVkontakte size={40}></SlSocialVkontakte>
                </a></li>
            </ul>
        </footer>
    );
};

export default Footer;
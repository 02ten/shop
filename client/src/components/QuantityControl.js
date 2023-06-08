import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createCart, fetchCart} from "../http/cartAPI";
import {Context} from "../index";

const QuantityControl = observer(({item}) => {
    const [quantity, setQuantity] = useState(1)
    const {cart} = useContext(Context)
    const decreaseQuantity = () => {
        const newQty = quantity - 1
        if (newQty > 0)
            setQuantity(newQty)
    }
    const increaseQuantity = () => {
        const newQty = quantity + 1
        if (newQty < 11)
            setQuantity(newQty)
    }
    const addToCart = (id) => {
        createCart(id, quantity)
        fetchCart().then(data => {
            cart.setCart(data.cart)
            cart.setTotal(data.total)
        })

    }
    return (
        <div className="d-flex flex-column justify-content-center">
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    <li className="page-item">
                        <Button className="page-link minusButton" onClick={() => decreaseQuantity()}
                                id={item.id}><b>-</b></Button>
                    </li>
                    <li className="page-item">
                        <input type="text" value={quantity} className="form-control text-center"
                               onKeyDown={() => {
                                   return false
                               }}
                               style={{maxWidth: "55px"}}
                        />
                    </li>
                    <li className="d-flex justify-content-center page-item">
                        <Button className="page-link plusButton" id={item.id}
                                onClick={() => increaseQuantity()}><b>+</b></Button>
                    </li>
                </ul>
            </nav>
            <button type="submit" className="btn btn-outline-dark mt-auto addToCart" onClick={()=>addToCart(item.id)}>
                Добавить в корзину
            </button>

        </div>
    );
});

export default QuantityControl;
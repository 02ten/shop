import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {fetchCategories} from "../http/categoryAPI";
import {fetchProducts} from "../http/productAPI";
import {Button, Form, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {deleteCart, fetchCart, updateCart} from "../http/cartAPI";
import {BiRuble} from "react-icons/bi";
import {RxCross1} from "react-icons/rx";
import {createOrder} from "../http/orderAPI";

const Cart = observer(() => {

    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState('')
    const [status, setStatus] = useState({ kindOfStand: 1});
    const { kindOfStand } = status;
    const [total,setTotal] = useState(0)
    const {cart} = useContext(Context)
    const {products} = useContext(Context)
    useEffect(() => {
        fetchCart().then(data => {
            cart.setCart(data)}
        ).finally(() => {
            cart.cart.cart.map(item =>
                {
                    setTotal(total + item.subtotal)
                }
            )
            setLoading(false)}

        )

    }, [])


    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    const createOrders = () =>{
        const formData = {
            'address': address,
            'payment': parseInt(status.kindOfStand) === 0? 'Картой': 'Наличными',
        }
        createOrder(formData)
        window.location.reload()
    }
    const handleChange = e => {
        e.persist();
        console.log(status);

        setStatus(prevState => ({
            ...prevState,
            kindOfStand: e.target.value
        }));
    };

    return (
        <div className="container">
            <main className="py-5">
                <div className="row g-5 py-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Ваша корзина</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                cart.cart.cart.map(item =>
                                    <CartItem key={item.id} item={item}></CartItem>
                                )
                            }
                            <hr/>
                            <li className="list-group-item d-flex justify-content-between">
                                <div>
                                    <h3 id="totalAmount">Сумма заказа: {total} <BiRuble className="mb-1"
                                                                                        size={30}/></h3>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Оформление заказа</h4>
                        <form id="new_order_form">
                            <div className="col-12">
                                <Form>
                                    <Form.Label>Адрес</Form.Label>
                                    <Form.Control
                                        value={address}
                                        placeholder="г. Москва, пр. Вернадского 78"
                                        onChange={e=>setAddress(e.target.value)}
                                    ></Form.Control>
                                    <hr className="my-4"/>
                                    <h4>Оплата</h4>
                                    <Form.Group
                                        controlId="activeId"
                                    >
                                        <Form.Check
                                            value={1}
                                            type="radio"
                                            label="Наличными"
                                            onChange={handleChange}
                                            checked={kindOfStand === '1'}
                                        />
                                        <Form.Check
                                            value={0}
                                            type="radio"
                                            label="Картой"
                                            onChange={handleChange}
                                            checked={kindOfStand === '0'}
                                        />
                                    </Form.Group>

                                </Form>
                            </div>
                            <hr className="my-4"/>
                        </form>
                        <div>
                            {cart.cart.cart.length === 0 ?
                                <p>Ваша корзина пуста</p>
                                :
                                <Button form="new_order_form" className="w-100 btn btn-primary btn-lg"
                                         onClick={()=>createOrders()}>Оформить заказ</Button>
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
});

const CartItem = observer(({item}) => {
    const [subTotal, setSubTotal] = useState(item.subtotal)
    const [quantity, setQuantity] = useState(parseInt(item.quantity))
    const increaseQuantity = () => {
        const newQty = quantity+1
        if (newQty < 11){
            updateCart(item.product.id, newQty).then((data) => setSubTotal(data.total))
            setQuantity(newQty)
            window.location.reload()
        }

    }
    const decreaseQuantity = () => {
        const newQty = quantity-1
        console.log(newQty)
        if (newQty > 0){
            updateCart(item.product.id, newQty).then((data) => setSubTotal(data.total))
            setQuantity(newQty)
            window.location.reload()
        }
    }

    const removeFromCart = () => {
        deleteCart(item.product.id)
        window.location.reload()
    }
    return (
        <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h7 className="my-0">{item.product.name}</h7>
                <br/>
                <div className="d-flex flex-column justify-content-center">
                    <nav className="d-flex justify-content-center">
                        <ul className="pagination">
                            <li className="page-item">
                                <Button className="page-link minusButton" onClick={() => decreaseQuantity()}><b>-</b></Button>
                            </li>
                            <li className="page-item">
                                <input type="text" value={quantity} className="form-control text-center"
                                       onKeyDown={() => {
                                           return false
                                       }}
                                       style={{maxHeight: "40px", maxWidth: "55px"}}
                                />
                            </li>
                            <li className="d-flex justify-content-center page-item">
                                <Button className="page-link plusButton"
                                        onClick={() => increaseQuantity()}><b>+</b></Button>
                            </li>
                        </ul>
                    </nav>
                </div>
                x
                <small className="text-muted">{item.product.price}</small>
            </div>
            <div className="justify-content-end">
                            <span className="text-muted productSubTotal"
                            >{subTotal}</span> <BiRuble className="mb-1"
                                                        size={20}/>
                <button type="submit" onClick={() => removeFromCart()}>
                    <RxCross1 size={15}/>
                </button>

            </div>
        </li>
    )
})

export default Cart;
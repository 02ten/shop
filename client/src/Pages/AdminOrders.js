import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {deleteCategories, fetchCategories} from "../http/categoryAPI";
import {fetchProducts} from "../http/productAPI";
import {Button, Card, Container, Spinner} from "react-bootstrap";
import {BiRuble} from "react-icons/bi";
import QuantityControl from "../components/QuantityControl";
import {fetchOrders} from "../http/orderAPI";
import AdminUpdateCategory from "../components/modals/AdminUpdateCategory";
import AdminAddCategory from "../components/modals/AdminAddCategory";
import Moment from "react-moment";

const AdminOrders = () => {
    const [loading, setLoading] = useState(true)
    const {orders} = useContext(Context)
    useEffect(() => {
        fetchOrders().then(data => {
            orders.setOrders(data)
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    console.log(orders.orders.orders)
    return (
        <main className="mt-4 ms-3">
            {
                orders.orders.orders.map(item =>
                    <OrdersItem key={item.id} item={item}></OrdersItem>
                )
            }
        </main>
    );
};
const OrdersItem = ({item}) => {
    const {categories} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false);
    const deleteCategory = (id) => {
        deleteCategories(id)
        fetchCategories().then(data => {
            categories.setCategories(data)
        })
        window.location.reload()
    }
    return (
        <Container className="d-flex" style={{justifyContent: "space-between"}}>
            <Card className="ps-2 py-2 my-2" style={{width: "80%", textAlign: "left"}}>
                <div>Имя: {item.user.name}</div>
                <div>Телефон: {item.user.telephone}</div>
                <div>Адрес: {item.address}</div>
                <div>Тип оплаты: {item.payment}</div>
                <div>Дата создания: <Moment date =  {item.creationDate} format='DD.MM.YYYY HH:MM'/></div>
                <div>Сумма: {item.summary}</div>
            </Card>
            <Card className="ps-2 py-2 my-2" style={{width: "80%", textAlign: "left"}}>
                <div>Товары:</div>
                {
                    item.productsList.map(item =>
                            <Products key={item.id} item={item}></Products>

                    )
                }
            </Card>
        </Container>
    )
}
const Products = ({item}) =>{
    return(
        <div>
            <div>Наименование: {item.product.name}</div>
            <div>Подытог: {item.product.price} X {item.quantity} = {item.subtotal}</div>
            <img className="card-img-top" style={{ width: "150px",
                height: "100px",    }} src={item.product.urlToPhoto} alt="..."/>
        </div>

)
}
export default AdminOrders;
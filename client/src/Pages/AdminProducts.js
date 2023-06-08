import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {BiRuble} from "react-icons/bi";
import {deleteProducts, fetchAllProducts, fetchProducts} from "../http/productAPI";
import AdminAddProduct from "../components/modals/AdminAddProduct";
import {fetchCategories} from "../http/categoryAPI";
import AdminUpdateCategory from "../components/modals/AdminUpdateCategory";
import AdminUpdateProduct from "../components/modals/AdminUpdateProduct";

const AdminProducts = observer(() => {
    const [loading, setLoading] = useState(true)
    const {categories} = useContext(Context)
    const {products} = useContext(Context)
    const [productsCat, setProductsCat] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        fetchCategories().then(data => categories.setCategories(data))
        fetchAllProducts().then(data => {
            products.setAllProducts(data)
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    const changeProducts = (id) =>{
        fetchProducts(id).then((data)=>{products.setAllProducts(data)})
        console.log(products.allProducts)
    }
    return (
        <main className="mt-4 ms-3">
            <Row>
                <Col md={2}>
                    <Button variant={"outline-success"} onClick={() => setModalVisible(true)}>Добавить
                        товар</Button>
                    <div>
                        {categories.categories.map(item =>
                            <Button key={item.id} className="nav-item mt-3 me-2 text-dark"
                                    style={{textDecoration: 'none'}}
                                    variant={"outline-dark"}
                                    onClick={()=>changeProducts(item.id)}
                            >{item.name}</Button>
                        )}
                    </div>
                </Col>
                {products.allProducts.map(item =>
                    <AdminProductsItem key={item.id} item={item}></AdminProductsItem>
                )}
            </Row>
            <AdminAddProduct show={modalVisible} onHide={() => setModalVisible(false)}></AdminAddProduct>
        </main>
    );
});
const AdminProductsItem = observer(({item}) => {
    const {categories} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false);
    const {products} = useContext(Context)
    const deleteProduct = (id) => {
        deleteProducts(id)
        fetchProducts(item.category.id).then(data=>products.setAllProducts(data))
        window.location.reload()
    }
    return (
        <Col md={2}>
            <Card>
                <div>
                    <div className="d-flex justify-content-center">
                        <img className="mt-2"
                             style={{
                                 width: "150px",
                                 height: "150px",
                                 alignSelf: "center",
                                 border: "solid",
                                 borderWidth: "3px",
                                 borderColor: "gray"
                             }} src={item.urlToPhoto}></img>
                    </div>
                    <h3 className="mb-2" style={{textAlign: "center"}}>{item.name}</h3>
                    <div className="m-3" style={{textAlign: "center"}}>Цена: {item.price} <BiRuble className="mb-1"
                                                                                                   size={20}/></div>
                    <div className="m-3" style={{textAlign: "center"}}>{item.category.name}</div>
                    <div className="d-flex justify-content-around">
                        <Button style={{width: "45%", alignSelf: "center"}} className="my-2" variant="outline-success"
                                onClick={()=> setModalVisible(true)}>Обновить</Button>
                        <Button style={{width: "45%", alignSelf: "center"}} className="my-2" variant="outline-danger"
                                onClick={() => deleteProduct(item.id, item.category) }>Удалить</Button>
                    </div>
                    <AdminUpdateProduct show={modalVisible} item={item} onHide={() => setModalVisible(false)}></AdminUpdateProduct>
                </div>
            </Card>
        </Col>

    )

})

export default AdminProducts;
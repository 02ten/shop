import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {createCategories, fetchCategories} from "../../http/categoryAPI";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createProducts, fetchAllProducts, fetchProducts, updateProducts} from "../../http/productAPI";

const AdminUpdateProduct = observer(({item, show, onHide}) => {
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [file, setFile] = useState(item.urlToPhoto);
    const [category_id, setCategory_id] = useState(item.category.id);
    const [categoryName, setCategoryName] = useState(item.category.name)
    const {categories} = useContext(Context)
    const {products} = useContext(Context)
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updateProduct = () => {
        if (item.urlToPhoto == file) {
            const formData = {
                'id': item.id,
                'name': name,
                'price': price,
                'urlToPhoto': item.urlToPhoto,
                'category': categoryName
            }
            onHide()
            updateProducts(formData)
            fetchAllProducts().then(data => products.setAllProducts(data))
        } else {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const formData = {
                    'id': item.id,
                    'name': name,
                    'price': price,
                    'urlToPhoto': evt.target.result,
                    'category': categoryName
                }
                onHide()
                updateProducts(formData)
            };
            reader.readAsDataURL(file)
            fetchAllProducts().then(data => products.setAllProducts(data))
        }
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></Form.Control>
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                        value={price}
                        type="number"
                        min='1'
                        onChange={e => setPrice(e.target.value)}
                    ></Form.Control>
                    <Form.Label>Категория</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle>{categoryName}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.categories.map(categories =>
                                <Dropdown.Item
                                    onClick={e => {
                                        setCategory_id(categories.id)
                                        setCategoryName(categories.name)
                                    }}
                                    key={categories.id}>
                                    {categories.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Label
                    >Изображение</Form.Label>
                    <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={selectFile}></Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => updateProduct()}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AdminUpdateProduct;

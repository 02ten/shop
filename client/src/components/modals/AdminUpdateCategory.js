import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {createCategories, fetchCategories, updateCategories} from "../../http/categoryAPI";
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const AdminUpdateCategory = observer(({item, show, onHide}) => {
    const [name, setName] = useState(item.name);
    const {categories} = useContext(Context)
    const addCategory = () => {
        const formData = {
            'id':item.id,
            'name': name
        }
        onHide()
        updateCategories(formData)
        fetchCategories().then(data => categories.setCategories(data))
        window.location.reload()
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
                    Добавить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AdminUpdateCategory;
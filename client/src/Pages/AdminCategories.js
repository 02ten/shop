import React, {useContext, useEffect, useState} from 'react';
import {check} from "../http/userAPI";
import {Button, Card, Container, Spinner} from "react-bootstrap";
import {deleteCategories, fetchCategories} from "../http/categoryAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AdminUpdateCategory from "../components/modals/AdminUpdateCategory";
import AdminAddCategory from "../components/modals/AdminAddCategory";
import {useNavigate} from "react-router-dom";
import {ADMIN_CATEGORIES_ROUTE} from "../utils/consts";

const AdminCategories = observer(() => {
    const [loading, setLoading] = useState(true)
    const {categories} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        fetchCategories().then(data => {
            categories.setCategories(data)
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <main className="mt-4 ms-3">
            <Button variant={"outline-success"} onClick={() => setModalVisible(true)}>Добавить категорию</Button>
            {categories.categories.map(item =>
                <AdminCategoriesItem key={item.id} item={item}></AdminCategoriesItem>
            )}
            <AdminAddCategory show={modalVisible} onHide={()=>setModalVisible(false)}></AdminAddCategory>
        </main>
    );
});
const AdminCategoriesItem = observer(({item}) => {
    const {categories} = useContext(Context)
    const [modalVisible, setModalVisible] = useState(false);
    const deleteCategory = (id) =>{
        deleteCategories(id)
        fetchCategories().then(data => {
            categories.setCategories(data)})
        window.location.reload()
    }
    return(
        <Container className="d-flex" style={{justifyContent:"space-between"}}>
            <Card className="ps-2 py-2 my-2" style={{width:"80%", textAlign:"left"}}>
                <div>{item.name}</div>
            </Card>
            <Button variant={"outline-success"} className="mt-2" style={{height:"90%"}} onClick={() => setModalVisible(true)}>
                Изменить
            </Button>
            <AdminUpdateCategory show={modalVisible} item={item} onHide={() => setModalVisible(false)}></AdminUpdateCategory>
            <Button variant={"outline-danger"} className="mt-2" style={{height:"90%"}} onClick={() => deleteCategory(item.id)}>
                Удалить
            </Button>
        </Container>
    )

})

export default AdminCategories;
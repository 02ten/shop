import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {fetchCategories} from "./http/categoryAPI";

function App() {
    const {user} = useContext(Context)
    const {orders} = useContext(Context)
    const {categories} = useContext(Context)
    const {products} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCategories().then(data =>
        categories.setCategories(data)
        )
        check().then(data => {
            if (data === 'Not auth') {
                user.setIsAuth(false)
                user.setUser({'roles': ['not auth']})
            } else {
                user.setIsAuth(true)
                const formData = {
                    'id': data.id,
                    'email': data.email,
                    'name': data.name,
                    'telephone': data.telephone,
                    'roles': data.roles
                }
                user.setUser(formData)
            }
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <Header></Header>
            <AppRouter></AppRouter>
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;

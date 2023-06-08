import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchAllProducts, fetchProducts} from "../http/productAPI";
import {fetchCategories} from "../http/categoryAPI";
import {Spinner} from "react-bootstrap";
import {Context} from "../index";
import {BiRuble} from "react-icons/bi";
import QuantityControl from "../components/QuantityControl";

const Catalog = () => {
    const [loading, setLoading] = useState(true)
    const {categories} = useContext(Context)
    const {products} = useContext(Context)
    const {id} = useParams()
    useEffect(() => {
        fetchCategories().then(data => categories.setCategories(data))
        fetchProducts(id).then(data => {
            products.setAllProducts(data)
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <section>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        products.allProducts.map(item =>
                            <CatalogItem key={item.id} item={item}></CatalogItem>
                        )
                    }
                </div>
            </div>
        </section>
    );
};
const CatalogItem = ({item}) => {
    return (
            <div className="card h-100 me-3 mt-2">
                <img className="card-img-top" src={item.urlToPhoto} alt="..."/>
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{item.name}</h5>
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <p className="text-center">Цена: {item.price} <BiRuble className="mb-1"
                                                                           size={20}/></p>
                    <div className="container">
                        <div>
                            <QuantityControl item={item}/>
                        </div>

                    </div>
                </div>
        </div>
    );
}

export default Catalog;
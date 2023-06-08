import {makeAutoObservable} from "mobx";

export default class ProductsStore{
    constructor() {
        this._products = []
        this._allProducts = []
        makeAutoObservable(this)
    }
    setAllProducts(products){
        this._allProducts=products
    }
    get allProducts(){
        return this._allProducts
    }
    setProducts(products){
        this._categories=products
    }
    get products(){
        return this._categories
    }
}
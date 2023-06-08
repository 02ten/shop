import {makeAutoObservable} from "mobx";

export default class CartStore{
    constructor() {
        this._cart = []
        this._total = 0.0
        makeAutoObservable(this)
    }
    setCart(cart){
        this._cart=cart
    }
    get cart(){
        return this._cart
    }
    setTotal(total){
        this._total=total
    }
    get total(){
        return this._total
    }
}
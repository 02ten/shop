import {makeAutoObservable} from "mobx";

export default class CategoriesStore{
    constructor() {
        this._categories = []
        makeAutoObservable(this)
    }
    setCategories(categories){
        this._categories=categories
    }
    get categories(){
        return this._categories
    }
}
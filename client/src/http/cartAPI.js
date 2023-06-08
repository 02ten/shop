import {$authHost, $host} from "./index";

export const fetchCart = async () => {
    const {data} = await $authHost.get('/cart')
    return data
}
export const createCart = async (id,qty) => {
    await $authHost.post('/cart/'+id+'/'+qty)
}
export const updateCart = async (id,qty) => {
    console.log(id,qty)
    const {data} = await $authHost.post('/cart/update/'+id+'/'+qty)
    return data
}
export const deleteCart = async (id) => {
    await $authHost.delete('/cart/'+id)
}
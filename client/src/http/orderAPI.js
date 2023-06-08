import {$authHost} from "./index";

export const fetchOrders = async () => {
    const {data} = await $authHost.get('/admin/orders')
    console.log(data)
    return data
}
export const createOrder = async (formData) => {
    console.log(formData)
    await $authHost.post('/order',formData)
}
export const updateOrder = async (id,qty) => {
    console.log(id,qty)
    const {data} = await $authHost.post('/cart/update/'+id+'/'+qty)
    return data
}
export const deleteOrder = async (id) => {
    await $authHost.delete('/cart/'+id)
}
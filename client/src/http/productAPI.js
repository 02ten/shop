import {$authHost, $host} from "./index";

export const fetchAllProducts = async () => {
    const {data} = await $host.get('/products')
    return data
}
export const fetchProducts = async (id) => {
    const {data} = await $host.get('/products/'+id)
    return data
}
export const updateProducts = async (formData) => {
    await $authHost.put('/admin/products',formData)
}
export const deleteProducts = async (id) => {
    console.log(id)
    await $authHost.delete('/admin/products/'+id)
}
export const createProducts = async (formData) => {
    console.log(formData)
    await $authHost.post('/admin/products',formData)
}
import {$authHost, $host} from "./index";

export const fetchCategories = async () => {
    const {data} = await $host.get('/category')
    return data
}
export const updateCategories = async (formData) => {
    await $authHost.put('/admin/categories',formData)
}
export const deleteCategories = async (id) => {
    await $authHost.delete('/admin/categories/'+id)
}
export const createCategories = async (formData) => {
    await $authHost.post('/admin/categories',formData)
}
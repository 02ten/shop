import jwtDecode from "jwt-decode";
import {$authHost, $host} from "./index";

export const registration = async (name, username, password, telephone) => {
    const response = await $host.post('/registration', {name, telephone, username, password})
    return response
}
export const login = async (username, password) => {
    const {data} = await $host.post('/login', {username, password})
    window.localStorage.setItem('token', data.access_token)
    const formData = {
        'id': data.id,
        'email': data.email,
        'name': data.name,
        'telephone': data.telephone,
        'roles': data.roles
    }
    return formData
}

export const check = async () => {
    const {data} = await $authHost.get('/check')
    window.localStorage.setItem('token', data.access_token)
    return data
}
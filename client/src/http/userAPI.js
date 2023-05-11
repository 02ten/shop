import jwtDecode from "jwt-decode";
import {$host} from "./index";

export const registration = async (name, username, password, telephone) => {
    const response = await $host.post('/registration', {name, telephone, username, password})
    return response
}
export const login = async (email, password) => {
    const {data} = await $host.post('/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const response = await $host.post('/user/register')
    return response
}
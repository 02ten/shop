import jwtDecode from "jwt-decode";
import {$host} from "./index";

export const registration = async (name, username, password, telephone) => {
    const response = await $host.post('/registration', {name, telephone, username, password})
    return response
}
export const login = async (username, password) => {
    const {data} = await $host.post('/login', {username, password})
    console.log(data)
    console.log(data.access_token)
    localStorage.setItem('token', data.access_token)
    return jwtDecode(data.access_token)
}

export const check = async () => {
    const response = await $host.post('/user/register')
    return response
}
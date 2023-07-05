import axios from 'axios'


export const USERS_API = axios.create({
    baseURL: 'http://localhost:3003/todreams/v1/api/users'
})
import axios from 'axios'


export const USERS_API = axios.create({
    baseURL: 'https://todreams-backend.onrender.com/todreams/v1/api/users'
})
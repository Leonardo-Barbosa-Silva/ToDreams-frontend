import axios from 'axios'


export const GOALS_API = axios.create({
    baseURL: 'https://todreams-backend.onrender.com/todreams/v1/api/goals'
})
import { USERS_API } from "../../apis/users"


// Register user
const register = async (userData) => {
    const resp = await USERS_API.post('/register', userData)

    if (resp.data.userToken) {
        localStorage.setItem('userToken', JSON.stringify(resp.data))
    }

    return resp.data
}


// Login user
const login = async (userData, thunkAPI) => {
    const resp = await USERS_API.post('/login', userData)

    return resp.data
}


// Logout user
const logout = async () => {
    localStorage.removeItem('userToken')
}


// Verify token
const verifyToken = async (jwtToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const resp = await USERS_API.get('/me', config)
    
    return resp.data
}




export const authService = {
    register,
    login,
    logout,
    verifyToken
}
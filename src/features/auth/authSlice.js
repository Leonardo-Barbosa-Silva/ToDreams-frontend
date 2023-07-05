import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from './authService'


const initialState = {  
    user: null,
    token: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isRegistered: false,
    isLogged: false,
    message: '',
    messageUser: '',
    mode: 'light'
}


export const verifyToken = createAsyncThunk(
    'auth/jwt',
    async (token, thunkAPI) => {
        try {
            return await authService.verifyToken(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData, thunkAPI)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        await authService.logout()
        dispatch(reset())
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState,
        resetAlert: (state) => {
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        changeMode: (state) => {
            state.mode === "light" ? state.mode = "dark" :  state.mode = "light"
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.isRegistered = true
                state.isLogged = false
                state.user = action.payload
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.isLogged = true
                state.isRegistered = true
                state.user = action.payload
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.isLogged = false
                state.isRegistered = false
                state.user = null
                state.token = null
                state.messageUser = action.payload
            })
    }
})




export const { reset, resetAlert, changeMode } = authSlice.actions
export default authSlice.reducer
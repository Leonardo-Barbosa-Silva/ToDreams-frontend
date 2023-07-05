import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { goalService } from "./goalService"

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const createGoal = createAsyncThunk(
    'goal/create',
    async (goalText, thunkAPI) => {
        try {
            const { token } = await thunkAPI.getState().auth

            return (await goalService.createGoal(goalText, token))

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteGoal = createAsyncThunk(
    'goal/delete',
    async (goalID, thunkAPI) => {
        try {
            const { token } = await thunkAPI.getState().auth

            return (await goalService.deleteGoal(goalID, token))

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getGoals = createAsyncThunk(
    'goals/get',
    async (_, thunkAPI) => {
        try {
            const { token } = await thunkAPI.getState().auth

            return (await goalService.getGoals(token))

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: () => initialState,
        resetAlert: (state) => {
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.message = ''
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload.item)
                state.message = action.payload.message
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.message = ''
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload.item
                state.message = action.payload.message
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.goals = []
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.message = ''
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter( (goal) => (
                        goal._id !== action.payload._id
                    )
                )
                state.message = action.payload.message
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    }
})



export const { reset, resetAlert } = goalSlice.actions
export default goalSlice.reducer
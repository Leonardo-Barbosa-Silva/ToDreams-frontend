import { GOALS_API } from '../../apis/goals'


// Request for create a new goal
const createGoal = async (goalText, userToken) => {
    // Authorization bearer user token
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    // Goal's create request
    const resp = await GOALS_API.post('/create', { text: goalText }, config)

    return resp.data
}


// Request for delete a goal
const deleteGoal = async (goalID, userToken) => {
    // Authorization bearer user token
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    // Goal's delete request
    const resp = await GOALS_API.delete(`/delete/${goalID}`, config)

    return resp.data
}



const getGoals = async (userToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    // Get goals request
    const resp = await GOALS_API.get('/my', config)

    return resp.data
}






export const goalService = {
    createGoal,
    deleteGoal,
    getGoals
}
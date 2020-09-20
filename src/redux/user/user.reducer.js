import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

// state is something redux store will going to pass to reducer whenever action is fire
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
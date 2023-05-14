import {UserActionTypes} from "../actions/user";

const userReducer = (state, action) => {
    if (action.type === UserActionTypes.USER_DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        }
    }

    if (action.type === UserActionTypes.USER_CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: undefined,
            alertText: '',
        };
    }

    if (action.type === UserActionTypes.SETUP_USER_BEGIN) {
        return {
            ...state,
            showAlert: false,
            isLoading: true
        };
    }

    if (action.type === UserActionTypes.SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload
        };
    }

    if (action.type === UserActionTypes.SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.alertText,
        };
    }

    if (action.type === UserActionTypes.LOGOUT_USER) {
        return {
            ...state,
            isLoading: false,
            showAlert: false,
            alertType: undefined,
            alertText: '',
            user: undefined
        };
    }

    throw new Error(`no such action`);
};

export { userReducer };

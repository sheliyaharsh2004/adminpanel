import * as ActionType from "../ActionType";

export const initalstate = {
  isLoading: false,
  doctor: [],
  error: "",
};

export const doctorReducer = (state = initalstate, action) => {
    switch (action.type) {
        case ActionType.LOADING_DOCTOR:
            return {
                ...state,
                isLoading: true,
                error: ""
            }
        case ActionType.GET_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: action.payload,
                error: ""
            }
        case ActionType.POST_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.concat(action.payload),
                error: ""
            }
        case ActionType.DELETE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.filter((d , i) => d.id !== action.payload),
                error: ""
            }
        case ActionType.UPDATE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.map((u) => {
                    if (u.id === action.payload.id) {
                        return action.payload
                    }else{
                        return u
                    }
                }),
                error: ""
            }
        case ActionType.ERROR_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: [],
                error: action.payload
                }
            default:
                return state;
    }
};

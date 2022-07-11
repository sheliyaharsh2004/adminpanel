import * as ActionType from "../ActionType";

export const initalstate = {
  isLoading: false,
  medicine: [],
  error: "",
};

export const medicineReducer = (state = initalstate, action) => {
    switch (action.type) {
        case ActionType.LOADING_MEDICINE:
            return {
                ...state,
                isLoading: true,
                error: ""
            }
        case ActionType.GET_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: ""
            }
        case ActionType.POST_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.concat(action.payload),
                error: ""
            }
        case ActionType.DELETE_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.filter((d , i) => d.id !== action.payload),
                error: ""
            }
        case ActionType.UPDATE_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.map((u) => {
                    if (u.id === action.payload.id) {
                        return action.payload
                    }else{
                        return u
                    }
                }),
                error: ""
            }
        case ActionType.ERROR_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: [],
                error: action.payload
                }
            default:
                return state;
    }
};

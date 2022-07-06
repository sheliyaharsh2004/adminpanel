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
                medicine: [],
                error: ""
            }
        case ActionType.GET_MEDICINE:
            return {
                ...state,
                isLoaing: false,
                medicine: action.payload,
                error: "",
            };
        case ActionType.ERROR_MEDICINE:
            return {
                ...state,
                isLoaing: false,
                medicine: [],
                error: ""
                }
            default:
                return state;
        }
};

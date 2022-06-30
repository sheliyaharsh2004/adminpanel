import * as ActionType from '../ActionType'

export const increment = () => (dispatch) =>{
    dispatch ({type : ActionType.INCREMENTED})
}

export const decrement = () => (dispatch) =>{
    dispatch ({type : ActionType.DECREMENTED})
}
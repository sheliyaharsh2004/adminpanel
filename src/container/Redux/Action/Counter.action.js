import * as ActionType from '../ActionType'

export const incremented = () => (dispatch) =>{
    dispatch ({type : ActionType.INCREMENTED})
}

export const decremented = () => (dispatch) =>{
    dispatch ({type : ActionType.DECREMENTED})
}
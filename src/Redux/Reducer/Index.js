import { combineReducers } from "redux";
import { Counterreducer } from "./Counter.reducer";
import { medicineReducer } from "./medicine.reducer";

export const rootreducer = combineReducers({
    counter : Counterreducer,
    medicine : medicineReducer
  })
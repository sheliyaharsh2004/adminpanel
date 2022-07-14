import { combineReducers } from "redux";
import { Counterreducer } from "./Counter.reducer";
import { doctorReducer } from "./doctor.reducrr";
import { medicineReducer } from "./medicine.reducer";

export const rootreducer = combineReducers({
    counter : Counterreducer,
    medicine : medicineReducer,
    doctor : doctorReducer
  })
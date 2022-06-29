import { combineReducers } from "redux";
import { Counterreducer } from "./Counter.reducer";

export const rootreducer = combineReducers({
    counter : Counterreducer
  })
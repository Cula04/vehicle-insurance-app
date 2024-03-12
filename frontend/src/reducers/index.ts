import { combineReducers } from "redux";
import { insurancePolicyReducer } from "./insurancePolicyReducer";

// Combine Reducers
export const rootReducer = combineReducers({
  insurancePolicy: insurancePolicyReducer,
});

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// Define a type for the slice state
interface InsurancePolicyState {
  value: any;
}

// Define the initial state using that type
const initialState: InsurancePolicyState = {
  value: {
    name: "",
    city: "",
    birthDate: new Date(),
    vehiclePower: 0,
    basePrice: 0,
    totalPrice: 0,
    modifiers: {},
  },
};

export const insurancePolicySlice = createSlice({
  name: "insurancePolicy",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserData: (state, action: PayloadAction<any>) => {
      state.value = { ...state.value, ...action.payload };
    },
    updateModifier: (
      state,
      action: PayloadAction<{
        key: any; //Coverages | Discounts | Surcharges;
        active: boolean;
      }>
    ) => {
      const { key, active } = action.payload;
      const modifiers = {
        ...state.value.modifiers,
        [key]: { amount: state.value.modifiers?.[key]?.amount ?? 0, active },
      };

      state.value = { ...state.value, modifiers };
    },
  },
});

export const { updateUserData, updateModifier } = insurancePolicySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInsurancePolicy = (state: RootState) => {
  return state.insurancePolicy?.value;
};

export const insurancePolicyReducer = insurancePolicySlice.reducer;

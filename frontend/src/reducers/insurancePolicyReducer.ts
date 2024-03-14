import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isKeyInEnum } from "../helpers/enums";
import { RootState } from "../store/store";
import {
  Coverages,
  Discounts,
  InsurancePolicy,
  Surcharges,
  UserData,
} from "../types";
import { OutputDto } from "../types/output.dto";

// Define a type for the slice state
interface InsurancePolicyState {
  data: InsurancePolicy;
  loading: boolean;
  error?: string;
}

// Define the initial state using that type
const initialState: InsurancePolicyState = {
  data: {
    name: "",
    city: "",
    birthDate: "",
    vehiclePower: 0,
    basePrice: 0,
    totalPrice: 0,
    discounts: {},
    surcharges: {},
    coverages: {},
  },
  loading: false,
};

const fetchPolicy = async (
  policy: InsurancePolicy
): Promise<OutputDto<InsurancePolicy>> => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/insurance/calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(policy),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return await response.json();
};

export const calculatePolicy = createAsyncThunk(
  "insurancePolicy/calculatePolicy",
  async (
    userData: UserData,
    { getState }
  ): Promise<OutputDto<InsurancePolicy>> => {
    const state = getState() as RootState;
    const policy = { ...state.insurancePolicy.data, ...userData };
    return fetchPolicy(policy);
  }
);

export const recalculatePolicy = createAsyncThunk(
  "insurancePolicy/recalculatePolicy",
  async (
    data: {
      key: Discounts | Surcharges | Coverages;
      active: boolean;
    },
    { getState }
  ): Promise<OutputDto<InsurancePolicy>> => {
    const { key, active } = data;
    const state = getState() as RootState;
    const policy = structuredClone(state.insurancePolicy.data);

    if (isKeyInEnum(key, Discounts)) {
      policy.discounts[key] = {
        active,
        available: policy.discounts[key]?.available ?? false,
        amount: policy.discounts[key]?.amount ?? 0,
      };
    }
    if (isKeyInEnum(key, Surcharges)) {
      policy.surcharges[key] = {
        active,
        available: policy.surcharges[key]?.available ?? false,
        amount: policy.surcharges[key]?.amount ?? 0,
      };
    }
    if (isKeyInEnum(key, Coverages)) {
      policy.coverages[key] = {
        active,
        available: policy.coverages[key]?.available ?? false,
        amount: policy.coverages[key]?.amount ?? 0,
      };
    }

    return fetchPolicy(policy);
  }
);

export const insurancePolicySlice = createSlice({
  name: "insurancePolicy",
  initialState,
  reducers: {
    updateModifier: (
      state,
      action: PayloadAction<{
        key: Discounts | Surcharges | Coverages;
        active: boolean;
      }>
    ) => {
      const { key, active } = action.payload;

      if (isKeyInEnum(key, Discounts)) {
        state.data.discounts[key] = {
          active,
          available: state.data.discounts[key]?.available ?? false,
          amount: state.data.discounts[key]?.amount ?? 0,
        };
      }
      if (isKeyInEnum(key, Surcharges)) {
        state.data.surcharges[key] = {
          active,
          available: state.data.surcharges[key]?.available ?? false,
          amount: state.data.surcharges[key]?.amount ?? 0,
        };
      }
      if (isKeyInEnum(key, Coverages)) {
        state.data.coverages[key] = {
          active,
          available: state.data.coverages[key]?.available ?? false,
          amount: state.data.coverages[key]?.amount ?? 0,
        };
      }
    },
    resetToInitialState: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculatePolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculatePolicy.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) state.data = action.payload.data;
      })
      .addCase(calculatePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(recalculatePolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(recalculatePolicy.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) state.data = action.payload.data;
      })
      .addCase(recalculatePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateModifier, resetToInitialState } =
  insurancePolicySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInsurancePolicy = (state: RootState) => {
  return state.insurancePolicy;
};

export const insurancePolicyReducer = insurancePolicySlice.reducer;

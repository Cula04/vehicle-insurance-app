import { isKeyInEnum } from "../helpers/enums";
import {
  recalculatePolicy,
  selectInsurancePolicy,
} from "../reducers/insurancePolicyReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Coverages } from "../types";

export const SideBar = () => {
  const { data: insurancePolicy, loading } = useAppSelector(
    selectInsurancePolicy
  );
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (key: string, active: boolean) => {
    if (isKeyInEnum(key, Coverages))
      dispatch(recalculatePolicy({ key, active }));
  };

  const renderCoverages = () => {
    return Object.entries(insurancePolicy.coverages)
      .filter(([key, value]) => isKeyInEnum(key, Coverages) && value.available)
      .map(([key, value], index) => {
        return (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={key}
              name={key}
              value={key}
              className="form-checkbox h-5 w-5"
              disabled={loading}
              checked={value.active}
              onChange={(e) => handleCheckboxChange(key, e.target.checked)}
            />
            <label htmlFor={key} className="ml-2 text-gray-800">
              {key}
            </label>
          </div>
        );
      });
  };

  return (
    <div className="bg-gray-200 p-4">
      <h3 className="text-xl font-semibold mb-4">Coverages:</h3>
      {renderCoverages()}
    </div>
  );
};

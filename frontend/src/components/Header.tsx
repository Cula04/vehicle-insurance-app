import { isKeyInEnum } from "../helpers/enums";
import {
  recalculatePolicy,
  selectInsurancePolicy,
} from "../reducers/insurancePolicyReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Discounts, Surcharges } from "../types";

export const Header = () => {
  const { data: insurancePolicy, loading } = useAppSelector(
    selectInsurancePolicy
  );
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (key: string, active: boolean) => {
    if (isKeyInEnum(key, Discounts) || isKeyInEnum(key, Surcharges))
      dispatch(recalculatePolicy({ key, active }));
  };

  const renderCheckBoxes = () => {
    const checkBoxes = [
      ...Object.entries(insurancePolicy.discounts),
      ...Object.entries(insurancePolicy.surcharges),
    ];
    return checkBoxes
      .filter(
        ([key, value]) =>
          (isKeyInEnum(key, Discounts) || isKeyInEnum(key, Surcharges)) &&
          value.available
      )
      .map(([key, value], index) => {
        let disabled = false;
        if (key === Surcharges.STRONG_CAR) disabled = true;
        return (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={key}
              name={key}
              value={key}
              className="form-checkbox h-5 w-5"
              checked={value.active}
              disabled={disabled || loading}
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
    <header className="bg-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-wrap space-x-12">{renderCheckBoxes()}</div>
          <div className="float-right font-bold text-green-900">
            Total Price: {insurancePolicy.totalPrice}€
          </div>
        </div>
      </div>
    </header>
  );
};

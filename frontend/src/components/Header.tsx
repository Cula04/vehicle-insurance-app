import { selectInsurancePolicy } from "../reducers/insurancePolicyReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const Header = () => {
  const insurancePolicy = useAppSelector(selectInsurancePolicy);
  const dispatch = useAppDispatch();

  const checkBoxes = ['a','s']

  const totalPrice = 122;

  const renderCheckBoxes = () => {
    return checkBoxes.map((item, index) => (
      <div key={index} className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          id={item}
          name={item}
          value={item}
          className="form-checkbox text-green-500"
        />
        <label htmlFor={item} className="text-gray-800">
          {item}
        </label>
      </div>
    ));
  };

  return (
    <header className="bg-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-wrap space-x-12">{renderCheckBoxes()}</div>
          <div className="float-right">
            Total Price: {totalPrice.toFixed(2)}€
          </div>
        </div>
      </div>
    </header>
  );
};

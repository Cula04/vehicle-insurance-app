import { ChangeEvent, FormEvent, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Header } from "../components/Header";
import { ModifierList } from "../components/ModifierList";
import { SideBar } from "../components/SideBar";
import {
  calculatePolicy,
  resetToInitialState,
  selectInsurancePolicy,
} from "../reducers/insurancePolicyReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { UserData } from "../types";

interface Field {
  label: string;
  id: string;
  name: keyof UserData;
  type: string;
  required?: boolean;
}

const fields: Field[] = [
  { label: "Name", id: "name", name: "name", type: "text", required: true },
  {
    label: "Birth Date",
    id: "birthDate",
    name: "birthDate",
    type: "date",
    required: true,
  },
  { label: "City", id: "city", name: "city", type: "text", required: true },
  {
    label: "Vehicle Power (kW)",
    id: "vehiclePower",
    name: "vehiclePower",
    type: "number",
    required: true,
  },
  { label: "Voucher (€)", id: "voucher", name: "voucher", type: "number" },
  {
    label: "Price Match (€)",
    id: "priceMatch",
    name: "priceMatch",
    type: "number",
  },
];

const processFormInput = (name: string, value: string) => {
  switch (name) {
    case "name":
      return value;
    case "birthDate":
      return new Date(value).toISOString().split("T")[0];
    case "city":
      return value;
    case "vehiclePower":
      return Number(value);
    case "voucher":
    case "priceMatch":
      return value ? Number(value) : undefined;
    default:
      return value;
  }
};

export const Insurance: React.FC = () => {
  const { data: insurancePolicy, loading } = useAppSelector(
    selectInsurancePolicy
  );
  const dispatch = useAppDispatch();

  const userDate = (
    insurancePolicy.birthDate.length > 0
      ? new Date(insurancePolicy.birthDate)
      : new Date()
  )
    .toISOString()
    .split("T")[0];
  const initialState: UserData = {
    name: insurancePolicy.name,
    city: insurancePolicy.city,
    birthDate: userDate,
    vehiclePower: insurancePolicy.vehiclePower,
    voucher: insurancePolicy.voucher,
    priceMatch: insurancePolicy.priceMatch,
  };
  const [formData, setFormData] = useState<UserData>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: processFormInput(name, value),
    });
  };

  const handleResetForm = () => {
    setFormData(initialState);
    dispatch(resetToInitialState());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(calculatePolicy(formData));
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-3/4 sm:w-full">
          <form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={field.id} className="block mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required={field.required}
                />
              </div>
            ))}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
              </button>
              <button
                type="button"
                className="bg-red-700 text-white px-4 py-2 rounded-lg ml-4"
                onClick={handleResetForm}
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Reset"}
              </button>
            </div>
          </form>
          <div className="max-w-lg mx-auto my-12 bg-gray-200 rounded-md p-4">
            <div className="flex justify-between items-center my-2 border-b border-gray-600">
              <p className="text-lg font-semibold">Base Price:</p>
              <p className="text-lg">{insurancePolicy.basePrice} €</p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center my-2">
                <p className="text-lg font-semibold">Discounts:</p>
                <ModifierList modifiers={insurancePolicy.discounts} />
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-lg font-semibold">Surcharges:</p>
                <ModifierList modifiers={insurancePolicy.surcharges} />
              </div>
              <div className="flex justify-between items-center my-2">
                <p className="text-lg font-semibold">Coverages:</p>
                <ModifierList modifiers={insurancePolicy.coverages} />
              </div>
              <div className="flex justify-between items-center my-2 border-t border-gray-600">
                <p className="text-lg font-semibold">Price Match:</p>
                <p className="text-lg">{insurancePolicy.priceMatch} €</p>
              </div>
              <div className="flex justify-between items-center my-2 border-gray-600">
                <p className="text-lg font-semibold">Voucher:</p>
                <p className="text-lg">{insurancePolicy.voucher} €</p>
              </div>
              <div className="flex justify-between items-center my-2 border-t border-gray-600">
                <p className="text-lg font-semibold">Total Price:</p>
                <p className="text-lg">{insurancePolicy.totalPrice} €</p>
              </div>
            </div>
          </div>
          <div />
        </div>
        {/* SideBar */}
        <div className="w-1/4 sm:w-64">
          <SideBar />
        </div>
      </div>
    </>
  );
};


import React, { ChangeEvent, FormEvent, useState } from "react";
import { selectInsurancePolicy } from "../reducers/insurancePolicyReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const processFormInput = (name: string, value: string) => {
  switch (name) {
    case "name":
      return value;
    case "birthDate":
      return new Date(value);
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
  const insurancePolicy = useAppSelector(selectInsurancePolicy);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<any>(
    insurancePolicy ?? {
      name: "",
      birthDate: new Date(),
      city: "",
      vehiclePower: 0,
      voucher: 0,
      priceMatch: 0,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: processFormInput(name, value),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData,formData,formData", formData);
    // Add logic to submit form data
  };

  console.log("----", insurancePolicy);

  return (
    <form className="max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="birthDate" className="block mb-2">
          Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={(formData.birthDate ?? new Date()).toISOString().split("T")[0]}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block mb-2">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="vehiclePower" className="block mb-2">
          Vehicle Power (kW)
        </label>
        <input
          type="number"
          id="vehiclePower"
          name="vehiclePower"
          value={formData.vehiclePower === 0 ? "" : formData.vehiclePower}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="voucher" className="block mb-2">
          Voucher (€)
        </label>
        <input
          type="number"
          id="voucher"
          name="voucher"
          value={
            !formData.voucher || formData.voucher === 0 ? "" : formData.voucher
          }
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priceMatch" className="block mb-2">
          Price Match (€)
        </label>
        <input
          type="number"
          id="priceMatch"
          name="priceMatch"
          value={
            !formData.priceMatch || formData.priceMatch === 0
              ? ""
              : formData.priceMatch
          }
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

import React, { useEffect } from "react";
import { InsurancePolicy } from "../types";
import { OutputDto } from "../types/output.dto";

export const History: React.FC = () => {
  const [data, setData] = React.useState<InsurancePolicy[]>([]);

  useEffect(() => {
    const fetchPolicyLogs = async (): Promise<void> => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/insurance/logs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const { data }: OutputDto<InsurancePolicy[]> = await response.json();
      if (data) setData(data);
    };

    fetchPolicyLogs();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Birth Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              City
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Vehicle Power
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Voucher
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Price Match
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Base Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Discounts
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Surcharges
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Coverages
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
            >
              Total Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((policy, index) => (
            <tr key={index}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.name}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.birthDate.split("T")[0]}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.city}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.vehiclePower}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.voucher ?? "-"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.priceMatch ?? "-"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.basePrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {Object.entries(policy.discounts)
                  .filter(([_, data]) => data.active)
                  .map(([discount, data], index) => (
                    <div key={index}>
                      {discount}: {data?.amount ?? 0}
                    </div>
                  ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {Object.entries(policy.surcharges)
                  .filter(([_, data]) => data.active)
                  .map(([discount, data], index) => (
                    <div key={index}>
                      {discount}: {data?.amount ?? 0}
                    </div>
                  ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {Object.entries(policy.coverages)
                  .filter(([_, data]) => data.active)
                  .map(([discount, data], index) => (
                    <div key={index}>
                      {discount}: {data?.amount ?? 0}
                    </div>
                  ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {policy.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

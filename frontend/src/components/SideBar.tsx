export const SideBar = () => {
  const coverages = [
    "Collision",
    "Comprehensive",
    "Liability",
    "Personal Injury Protection",
    "Uninsured Motorist",
  ];
  const renderCoverages = () => {
    return coverages.map((coverage, index) => (
      <div key={index} className="mb-2">
        <input
          type="checkbox"
          id={coverage}
          name={coverage}
          value={coverage}
          className="form-checkbox text-green-500"
        />
        <label htmlFor={coverage} className="ml-2 text-gray-800">
          {coverage}
        </label>
      </div>
    ));
  };

  return (
    <div className="bg-gray-200 p-4">
      <h3 className="text-xl font-semibold mb-4">Coverages:</h3>
      {renderCoverages()}
    </div>
  );
};

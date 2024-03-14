import { Coverages, Discounts, ModifierData, Surcharges } from "../types";

type Props = {
  modifiers: {
    [key in Coverages | Discounts | Surcharges]?: ModifierData;
  };
};

export const ModifierList: React.FC<Props> = ({ modifiers }) => {
  const modifierElements: JSX.Element[] = [];

  Object.entries(modifiers || {}).forEach(([key, modifier]) => {
    if (modifier.active) {
      modifierElements.push(
        <div
          key={key}
          className="flex justify-between items-center py-1 space-x-3"
        >
          <p>{key}</p>
          <p>{modifier.amount} €</p>
        </div>
      );
    }
  });
  return (
    <div className="flex flex-col">
      <div className="p-2">
        {modifierElements.length > 0 ? modifierElements : <p>-</p>}
      </div>
    </div>
  );
};

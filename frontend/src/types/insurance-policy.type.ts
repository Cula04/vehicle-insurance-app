import { Coverages } from "./coverages.enum";
import { Discounts } from "./discounts.enum";
import { Surcharges } from "./surcharges.enum";
import { UserData } from "./user-data.type";

export type ModifierData = {
  active: boolean;
  available: boolean;
  amount: number;
};

export type InsurancePolicy = UserData & {
  basePrice: number;
  totalPrice: number;
  discounts: { [key in Discounts]?: ModifierData };
  surcharges: { [key in Surcharges]?: ModifierData };
  coverages: { [key in Coverages]?: ModifierData };
};

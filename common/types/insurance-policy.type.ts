import { Coverages } from "./coverages.enum";
import { Discounts } from "./discounts.enum";
import { Surcharges } from "./surcharges.enum";
import { UserData } from "./user-data.type";

type InsurancePriceModifiers = {
  [key in Coverages | Discounts | Surcharges]?: {
    active: boolean;
    amount: number;
  };
};

export type InsurancePolicy = UserData & {
  basePrice: number;
  totalPrice: number;
  modifiers: InsurancePriceModifiers;
};

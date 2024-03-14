export enum Discounts {
  COMMERCIAL = "Commercial discount",
  ADVISER = "Adviser discount",
  VIP = "VIP discount",
}

export type DiscountsType = keyof typeof Discounts;

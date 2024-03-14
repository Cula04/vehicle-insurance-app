export enum ModifierCategory {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export enum ModifierTitle {
  BONUS_PROTECTION = 'bonusProtection',
  AO_PLUS_OVER = 'aoPlusOver',
  AO_PLUS_UNDER = 'aoPlusUnder',
  GLASS_PROTECTION = 'glassProtection',
  COMMERCIAL_DISCOUNT = 'commercialDiscount',
  ADVISER_DISCOUNT = 'adviserDiscount',
  VIP_DISCOUNT = 'vipDiscount',
  STRONG_CAR_SURCHARGE = 'strongCarSurcharge',
}

export type ModifiersRecord = {
  title: ModifierTitle;
  amount: number;
  category: ModifierCategory;
};

export enum Coverages {
  BONUS_PROTECTION = "Bonus Protection",
  AO_PLUS = "AO Plus",
  GLASS_PROTECTION = "Glass Protection",
}

export type CoveragesType = keyof typeof Coverages;

import { BaseEntity } from 'src/common/base-classes/base.entity';
import { Coverages, Discounts, InsurancePolicy, Surcharges } from '../types';
import { ModifierTitle } from '../types/modifiers-record.type';
import { BasePriceEntity } from './base-price.entity';
import { ModifiersEntity } from './modifiers.entity';

export class InsurancePolicyEntity extends BaseEntity<InsurancePolicy> {
  private constructor(props: InsurancePolicy, id?: string) {
    super(props, id);
  }

  public static create(
    props: InsurancePolicy,
    id?: string,
  ): InsurancePolicyEntity {
    const entity = new InsurancePolicyEntity(props, id);
    return entity;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get birthDate() {
    return this.props.birthDate;
  }

  get city() {
    return this.props.city;
  }

  get vehiclePower() {
    return this.props.vehiclePower;
  }

  get voucher() {
    return this.props.voucher;
  }

  get priceMatch() {
    return this.props.priceMatch;
  }

  get basePrice() {
    return this.props.basePrice;
  }

  set basePrice(value: number) {
    this._props.basePrice = value;
  }

  get totalPrice() {
    return this.props.totalPrice;
  }

  set totalPrice(value: number) {
    this._props.totalPrice = value;
  }

  get discounts() {
    return this.props.discounts;
  }

  get surcharges() {
    return this.props.surcharges;
  }

  get coverages() {
    return this.props.coverages;
  }

  get age() {
    return new Date().getFullYear() - this.birthDate.getFullYear();
  }

  // match price if priceMatch is available
  matchTotalPrice(modifierEntities: ModifiersEntity[]): boolean {
    if (this.priceMatch <= 0) return false;

    const fixedTotalPrice = this.priceMatch;

    // Bonus protection
    const bonusProtection = modifierEntities.find(
      (e) => e.title === ModifierTitle.BONUS_PROTECTION,
    ).amount;
    const bonusProtectionMultiplier =
      bonusProtection *
      (this.coverages[Coverages.BONUS_PROTECTION].active ? 1 : 0);

    // Commercial discount
    const commercialDiscount = modifierEntities.find(
      (e) => e.title === ModifierTitle.COMMERCIAL_DISCOUNT,
    ).amount;
    const commercialDiscountMultiplier =
      commercialDiscount *
      (this.discounts[Discounts.COMMERCIAL].active ? 1 : 0);

    // VIP discount
    const vipDiscount = modifierEntities.find(
      (e) => e.title === ModifierTitle.VIP_DISCOUNT,
    ).amount;
    const vipDiscountMultiplier =
      vipDiscount * (this.discounts[Discounts.VIP].active ? 1 : 0);

    // calculate base price to match price after all modifiers
    const newBasePrice =
      fixedTotalPrice /
      ((1 + bonusProtectionMultiplier - commercialDiscountMultiplier) *
        (1 - vipDiscountMultiplier));
    this.basePrice = newBasePrice;

    // Set all these modifiers to false, as they are not possible to include if priceMatching is active
    this.surcharges[Surcharges.STRONG_CAR].active = false;
    this.coverages[Coverages.AO_PLUS].active = false;
    this.coverages[Coverages.GLASS_PROTECTION].active = false;
    this.discounts[Discounts.ADVISER].active = false;

    return true;
  }

  calculateTotalPrice(
    modifierEntities: ModifiersEntity[],
    basePriceEntity: BasePriceEntity,
  ): void {
    // Check if base price matching is active
    const basePriceIsMatched = this.matchTotalPrice(modifierEntities);
    if (!basePriceIsMatched) this.basePrice = basePriceEntity.price;

    // --- Surcharges ---
    // Strong car surcharge
    const strongCarSurcharge = modifierEntities.find(
      (e) => e.title === ModifierTitle.STRONG_CAR_SURCHARGE,
    ).amount;
    this.surcharges[Surcharges.STRONG_CAR] = {
      available: this.vehiclePower > 100 && !basePriceIsMatched,
      active: this.vehiclePower > 100 && !basePriceIsMatched,
      amount: this.basePrice * strongCarSurcharge,
    };

    // --- Coverages ---
    // Bonus protection
    const bonusProtection = modifierEntities.find(
      (e) => e.title === ModifierTitle.BONUS_PROTECTION,
    ).amount;
    this.coverages[Coverages.BONUS_PROTECTION] = {
      available: true,
      active: this.coverages?.[Coverages.BONUS_PROTECTION]?.active,
      amount: +(this.basePrice * bonusProtection).toFixed(2),
    };

    // Glass protection
    const glassProtection = modifierEntities.find(
      (e) => e.title === ModifierTitle.GLASS_PROTECTION,
    ).amount;
    this.coverages[Coverages.GLASS_PROTECTION] = {
      available: true,
      active:
        this.coverages[Coverages.GLASS_PROTECTION]?.active &&
        !basePriceIsMatched,
      amount: this.vehiclePower * glassProtection,
    };

    // AO Plus
    const ageOver = modifierEntities.find(
      (e) => e.title === ModifierTitle.AO_PLUS_OVER,
    ).amount;
    const ageUnder = modifierEntities.find(
      (e) => e.title === ModifierTitle.AO_PLUS_UNDER,
    ).amount;
    this.coverages[Coverages.AO_PLUS] = {
      available: true,
      active:
        (this.coverages[Coverages.AO_PLUS].active && !basePriceIsMatched) ??
        false,
      amount: this.age < 30 ? ageUnder : ageOver,
    };

    // --- Discounts ---
    // Commercial discount
    const commercialDiscount = modifierEntities.find(
      (e) => e.title === ModifierTitle.COMMERCIAL_DISCOUNT,
    ).amount;
    this.discounts[Discounts.COMMERCIAL] = {
      available: true,
      active: this.discounts[Discounts.COMMERCIAL].active ?? false,
      amount: this.basePrice * commercialDiscount,
    };

    // Adviser discount
    const adviserDiscount = modifierEntities.find(
      (e) => e.title === ModifierTitle.ADVISER_DISCOUNT,
    ).amount;
    const numberOfActiveCoverages = Object.values(this.coverages).filter(
      (c) => c.active,
    ).length;
    const adviserDiscountActive =
      this.discounts[Discounts.ADVISER].active && numberOfActiveCoverages >= 2;
    const priceOfActiveCoverages = Object.values(this.coverages).reduce(
      (acc, c) => (c.active ? acc + c.amount : acc),
      0,
    );
    this.discounts[Discounts.ADVISER] = {
      available: numberOfActiveCoverages >= 2,
      active: adviserDiscountActive,
      amount: priceOfActiveCoverages * adviserDiscount,
    };

    // VIP discount
    const vipDiscount = modifierEntities.find(
      (e) => e.title === ModifierTitle.VIP_DISCOUNT,
    ).amount;
    const vipDiscountActive =
      this.discounts[Discounts.VIP].active &&
      (this.vehiclePower > 80 || basePriceIsMatched);
    const priceOfActiveSurcharges = Object.values(this.surcharges).reduce(
      (acc, c) => (c.active ? acc + c.amount : acc),
      0,
    );
    const priceOfActiveDiscounts = Object.values(this.discounts).reduce(
      (acc, c) => (c.active ? acc + c.amount : acc),
      0,
    );
    // calculate total price by adding all active coverages and surcharges and subtracting all active discounts from base price
    const tempTotalPrice =
      this.basePrice +
      priceOfActiveCoverages +
      priceOfActiveSurcharges -
      priceOfActiveDiscounts;
    this.discounts[Discounts.VIP] = {
      available: this.vehiclePower > 80,
      active: vipDiscountActive,
      amount: tempTotalPrice * vipDiscount,
    };

    // Calculate final price
    const vipDiscountAmount = this.discounts[Discounts.VIP].active
      ? this.discounts[Discounts.VIP].amount
      : 0;
    const finalTotalPrice = tempTotalPrice - vipDiscountAmount - this.voucher;
    this.totalPrice = Math.max(+finalTotalPrice.toFixed(2), 0);
  }
}

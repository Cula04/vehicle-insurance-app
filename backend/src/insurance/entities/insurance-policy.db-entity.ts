import { Column, Entity, ObjectIdColumn } from 'typeorm';
import {
  Coverages,
  Discounts,
  InsurancePolicy,
  ModifierData,
  Surcharges,
} from '../types';
import { InsurancePolicyEntity } from './insurance-policy.entity';

export const InsurancePolicyDBName = 'insurance_policies';

@Entity({ name: InsurancePolicyDBName })
export class InsurancePolicyDbEntity implements InsurancePolicy {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Column()
  city: string;

  @Column()
  vehiclePower: number;

  @Column()
  voucher?: number;

  @Column()
  priceMatch?: number;

  @Column()
  basePrice: number;

  @Column()
  totalPrice: number;

  @Column()
  discounts: { [key in Discounts]?: ModifierData };

  @Column()
  surcharges: { [key in Surcharges]?: ModifierData };

  @Column()
  coverages: { [key in Coverages]?: ModifierData };

  toDomainEntity?() {
    return InsurancePolicyEntity.create(
      {
        name: this.name,
        birthDate: this.birthDate,
        city: this.city,
        vehiclePower: this.vehiclePower,
        voucher: this.voucher,
        priceMatch: this.priceMatch,
        basePrice: this.basePrice,
        totalPrice: this.totalPrice,
        discounts: this.discounts,
        surcharges: this.surcharges,
        coverages: this.coverages,
      },
      this._id,
    );
  }

  static fromDomainEntity(
    entity: InsurancePolicyEntity,
  ): InsurancePolicyDbEntity {
    return {
      _id: entity.id,
      name: entity.name,
      birthDate: entity.birthDate,
      city: entity.city,
      vehiclePower: entity.vehiclePower,
      voucher: entity.voucher,
      priceMatch: entity.priceMatch,
      basePrice: entity.basePrice,
      totalPrice: entity.totalPrice,
      discounts: entity.discounts,
      surcharges: entity.surcharges,
      coverages: entity.coverages,
    };
  }
}

export const InsurancePolicyDBColumns: {
  [key in keyof InsurancePolicyDbEntity]: keyof InsurancePolicyDbEntity;
} = {
  _id: '_id',
  name: 'name',
  birthDate: 'birthDate',
  city: 'city',
  vehiclePower: 'vehiclePower',
  voucher: 'voucher',
  priceMatch: 'priceMatch',
  basePrice: 'basePrice',
  totalPrice: 'totalPrice',
  discounts: 'discounts',
  surcharges: 'surcharges',
  coverages: 'coverages',
};

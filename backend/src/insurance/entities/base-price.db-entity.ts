import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { BasePriceRecord } from '../types/base-price.type';
import { BasePriceEntity } from './base-price.entity';

export const BasePriceDBName = 'base_price';

@Entity({ name: BasePriceDBName })
export class BasePriceDbEntity implements BasePriceRecord {
  @ObjectIdColumn()
  _id: string;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column()
  price: number;

  toDomainEntity?() {
    return BasePriceEntity.create(
      {
        age: this.age,
        city: this.city,
        price: this.price,
      },
      this._id,
    );
  }

  static fromDomainEntity(entity: BasePriceEntity): BasePriceDbEntity {
    return {
      _id: entity.id,
      age: entity.age,
      city: entity.city,
      price: entity.price,
    };
  }
}

export const BasePRiceDBColumns: {
  [key in keyof BasePriceDbEntity]: keyof BasePriceDbEntity;
} = {
  _id: '_id',
  age: 'age',
  city: 'city',
  price: 'price',
};

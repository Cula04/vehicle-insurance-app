import { BaseEntity } from '../../common/base-classes/base.entity';
import { BasePriceRecord } from '../types/base-price.type';

export class BasePriceEntity extends BaseEntity<BasePriceRecord> {
  private constructor(props: BasePriceRecord, id?: string) {
    super(props, id);
  }

  public static create(props: BasePriceRecord, id?: string): BasePriceEntity {
    const entity = new BasePriceEntity(props, id);
    return entity;
  }

  get id() {
    return this._id;
  }

  get city() {
    return this.props.city;
  }

  get age() {
    return this.props.age;
  }

  get price() {
    return this.props.price;
  }
}

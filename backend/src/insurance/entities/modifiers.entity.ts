import { BaseEntity } from '../../common/base-classes/base.entity';
import { ModifiersRecord } from '../types/modifiers-record.type';

export class ModifiersEntity extends BaseEntity<ModifiersRecord> {
  private constructor(props: ModifiersRecord, id?: string) {
    super(props, id);
  }

  public static create(props: ModifiersRecord, id?: string): ModifiersEntity {
    const entity = new ModifiersEntity(props, id);
    return entity;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  get amount() {
    return this.props.amount;
  }

  get category() {
    return this.props.category;
  }
}

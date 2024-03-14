import { Column, Entity, ObjectIdColumn } from 'typeorm';
import {
  ModifierCategory,
  ModifierTitle,
  ModifiersRecord,
} from '../types/modifiers-record.type';
import { ModifiersEntity } from './modifiers.entity';

export const ModifiersDBName = 'modifiers';

@Entity({ name: ModifiersDBName })
export class ModifiersDbEntity implements ModifiersRecord {
  @ObjectIdColumn()
  _id: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: ModifierTitle,
  })
  title: ModifierTitle;

  @Column({
    type: 'enum',
    enum: ModifierCategory,
  })
  category: ModifierCategory;

  toDomainEntity?() {
    return ModifiersEntity.create(
      {
        title: this.title,
        amount: this.amount,
        category: this.category,
      },
      this._id,
    );
  }

  static fromDomainEntity(entity: ModifiersEntity): ModifiersDbEntity {
    return {
      _id: entity.id,
      amount: entity.amount,
      title: entity.title,
      category: entity.category,
    };
  }
}

export const ModifiersDBColumns: {
  [key in keyof ModifiersDbEntity]: keyof ModifiersDbEntity;
} = {
  _id: '_id',
  amount: 'amount',
  title: 'title',
  category: 'category',
};

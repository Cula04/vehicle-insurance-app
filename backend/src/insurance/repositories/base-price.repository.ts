import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { BasePriceDbEntity } from '../entities/base-price.db-entity';
import { BasePriceEntity } from '../entities/base-price.entity';

@Injectable({})
export class BasePriceRepository {
  constructor(
    @InjectRepository(BasePriceDbEntity)
    private readonly basePriceTableRepo: MongoRepository<BasePriceDbEntity>,
  ) {}

  async addBasePrices(entities: BasePriceEntity[]): Promise<BasePriceEntity[]> {
    const dbEntities = entities.map((round) =>
      BasePriceDbEntity.fromDomainEntity(round),
    );
    await this.basePriceTableRepo.save(dbEntities);
    return entities;
  }

  async #checkCity(city: string): Promise<string> {
    const count = await this.basePriceTableRepo.count({ city });
    return count > 0 ? city : 'Other';
  }

  async getBasePrice(age: number, city: string): Promise<BasePriceEntity> {
    const checkedCity = await this.#checkCity(city);
    const closestRecord = await this.basePriceTableRepo
      .aggregateEntity([
        {
          $match: { city: checkedCity },
        },
        {
          $addFields: {
            ageDifference: { $abs: { $subtract: ['$age', age] } },
          },
        },
        {
          $sort: { ageDifference: 1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    return closestRecord[0].toDomainEntity();
  }

  async clearBasePrices(): Promise<void> {
    await this.basePriceTableRepo.clear();
  }
}

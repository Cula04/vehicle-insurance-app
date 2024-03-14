import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { InsurancePolicyDbEntity } from '../entities/insurance-policy.db-entity';
import { InsurancePolicyEntity } from '../entities/insurance-policy.entity';

@Injectable({})
export class InsurancePolicyRepository {
  constructor(
    @InjectRepository(InsurancePolicyDbEntity)
    private readonly insurancePolicyTableRepo: MongoRepository<InsurancePolicyDbEntity>,
  ) {}

  async addInsurancePolicies(
    entities: InsurancePolicyEntity[],
  ): Promise<InsurancePolicyEntity[]> {
    const dbEntities = entities.map((round) =>
      InsurancePolicyDbEntity.fromDomainEntity(round),
    );
    await this.insurancePolicyTableRepo.save(dbEntities);
    return entities;
  }

  async getAll(): Promise<InsurancePolicyEntity[]> {
    const result = await this.insurancePolicyTableRepo.find();

    return result.map((entity) => entity.toDomainEntity());
  }

  async clearInsurancePolicies(): Promise<void> {
    await this.insurancePolicyTableRepo.clear();
  }
}

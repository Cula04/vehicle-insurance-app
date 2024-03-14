import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ModifiersDbEntity } from '../entities/modifiers.db-entity';
import { ModifiersEntity } from '../entities/modifiers.entity';

@Injectable({})
export class ModifiersRepository {
  constructor(
    @InjectRepository(ModifiersDbEntity)
    private readonly modifiersTableRepo: MongoRepository<ModifiersDbEntity>,
  ) {}

  async addModifiers(entities: ModifiersEntity[]): Promise<ModifiersEntity[]> {
    const dbEntities = entities.map((round) =>
      ModifiersDbEntity.fromDomainEntity(round),
    );
    await this.modifiersTableRepo.save(dbEntities);
    return entities;
  }

  async getAll(): Promise<ModifiersEntity[]> {
    const result = await this.modifiersTableRepo.find();

    return result.map((entity) => entity.toDomainEntity());
  }

  async clearModifiers(): Promise<void> {
    await this.modifiersTableRepo.clear();
  }
}

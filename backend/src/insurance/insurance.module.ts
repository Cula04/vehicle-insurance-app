import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasePriceDbEntity } from './entities/base-price.db-entity';
import { InsurancePolicyDbEntity } from './entities/insurance-policy.db-entity';
import { ModifiersDbEntity } from './entities/modifiers.db-entity';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { BasePriceRepository } from './repositories/base-price.repository';
import { InsurancePolicyRepository } from './repositories/insurance-policy.repository';
import { ModifiersRepository } from './repositories/modifiers.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      BasePriceDbEntity,
      ModifiersDbEntity,
      InsurancePolicyDbEntity,
    ]),
  ],
  controllers: [InsuranceController],
  providers: [
    InsuranceService,
    BasePriceDbEntity,
    BasePriceRepository,
    ModifiersDbEntity,
    ModifiersRepository,
    InsurancePolicyRepository,
    InsurancePolicyDbEntity,
  ],
  exports: [BasePriceDbEntity, ModifiersDbEntity, InsurancePolicyDbEntity],
})
export class InsuranceModule {}

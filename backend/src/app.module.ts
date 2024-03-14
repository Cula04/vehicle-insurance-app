import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasePriceDbEntity } from './insurance/entities/base-price.db-entity';
import { InsurancePolicyDbEntity } from './insurance/entities/insurance-policy.db-entity';
import { ModifiersDbEntity } from './insurance/entities/modifiers.db-entity';
import { InsuranceModule } from './insurance/insurance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${process.env.MONGO_DB_URL}`,
      entities: [BasePriceDbEntity, ModifiersDbEntity, InsurancePolicyDbEntity],
      synchronize: true, // Set this to false in production and use migrations
    }),
    InsuranceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

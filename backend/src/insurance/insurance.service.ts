import { Injectable } from '@nestjs/common';
import { BasePriceEntity } from './entities/base-price.entity';
import { InsurancePolicyEntity } from './entities/insurance-policy.entity';
import { ModifiersEntity } from './entities/modifiers.entity';
import { BasePriceRepository } from './repositories/base-price.repository';
import { InsurancePolicyRepository } from './repositories/insurance-policy.repository';
import { ModifiersRepository } from './repositories/modifiers.repository';
import { InsurancePolicy } from './types';
import { ModifierCategory, ModifierTitle } from './types/modifiers-record.type';

@Injectable()
export class InsuranceService {
  constructor(
    private readonly basePriceRepository: BasePriceRepository,
    private readonly modifiersRepository: ModifiersRepository,
    private readonly insurancePolicyRepository: InsurancePolicyRepository,
  ) {}

  async onApplicationBootstrap() {
    await this.#initBasePrices();
    await this.#initModifiers();
    await this.insurancePolicyRepository.clearInsurancePolicies();
  }

  async #initBasePrices() {
    await this.basePriceRepository.clearBasePrices();

    const basePrices: BasePriceEntity[] = [];
    const cities = ['Other', 'Zagreb', 'Split', 'Rijeka', 'Osijek'];

    cities.forEach((city, cityIndex) => {
      for (let age = 0; age <= 100; age += 50) {
        const price = 100 + cityIndex * 10 + age * 5;
        basePrices.push(BasePriceEntity.create({ age, city, price }));
      }
    });
    await this.basePriceRepository.addBasePrices(basePrices);
  }

  async #initModifiers() {
    await this.modifiersRepository.clearModifiers();
    const modifiers: ModifiersEntity[] = [
      // Surcharges
      ModifiersEntity.create({
        title: ModifierTitle.STRONG_CAR_SURCHARGE,
        amount: 0.1,
        category: ModifierCategory.PERCENTAGE,
      }),
      // Coverages
      ModifiersEntity.create({
        title: ModifierTitle.BONUS_PROTECTION,
        amount: 0.12,
        category: ModifierCategory.PERCENTAGE,
      }),
      ModifiersEntity.create({
        title: ModifierTitle.GLASS_PROTECTION,
        amount: 0.8,
        category: ModifierCategory.PERCENTAGE,
      }),
      ModifiersEntity.create({
        title: ModifierTitle.AO_PLUS_OVER,
        amount: 105,
        category: ModifierCategory.FIXED,
      }),
      ModifiersEntity.create({
        title: ModifierTitle.AO_PLUS_UNDER,
        amount: 55,
        category: ModifierCategory.FIXED,
      }),
      // Discounts
      ModifiersEntity.create({
        title: ModifierTitle.COMMERCIAL_DISCOUNT,
        amount: 0.1,
        category: ModifierCategory.PERCENTAGE,
      }),
      ModifiersEntity.create({
        title: ModifierTitle.ADVISER_DISCOUNT,
        amount: 0.2,
        category: ModifierCategory.PERCENTAGE,
      }),
      ModifiersEntity.create({
        title: ModifierTitle.VIP_DISCOUNT,
        amount: 0.05,
        category: ModifierCategory.PERCENTAGE,
      }),
    ];
    await this.modifiersRepository.addModifiers(modifiers);
  }

  async gerInsurancePolicyLogs(): Promise<InsurancePolicy[]> {
    const entities = await this.insurancePolicyRepository.getAll();
    return entities.map((entity) => entity.props);
  }

  async calculateInsurancePolicy(
    policy: InsurancePolicy,
  ): Promise<InsurancePolicy> {
    // Create policy entity
    const policyEntity = InsurancePolicyEntity.create(policy);

    // Calculate new base and total price for policy and all discounts
    const modifierEntities = await this.modifiersRepository.getAll();
    const basePriceEntity = await this.basePriceRepository.getBasePrice(
      policyEntity.age,
      policy.city,
    );
    policyEntity.calculateTotalPrice(modifierEntities, basePriceEntity);

    // Log policy to database
    await this.insurancePolicyRepository.addInsurancePolicies([policyEntity]);

    return policyEntity.props;
  }
}

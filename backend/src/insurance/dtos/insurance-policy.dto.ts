import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { InsurancePolicy, ModifierData } from '../types';

export class ModifierDataDto implements ModifierData {
  @IsBoolean()
  @ApiProperty()
  active: boolean;

  @IsBoolean()
  @ApiProperty()
  available: boolean;

  @IsNumber()
  @ApiProperty()
  amount: number;
}

export class InsurancePolicyDto implements InsurancePolicy {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date })
  birthDate: Date;

  @IsString()
  @ApiProperty()
  city: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  vehiclePower: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  voucher?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceMatch?: number;

  @IsNumber()
  @ApiProperty()
  basePrice: number;

  @IsNumber()
  @ApiProperty()
  totalPrice: number;

  @IsObject()
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object',
      properties: {
        active: { type: 'boolean' },
        available: { type: 'boolean' },
        amount: { type: 'number' },
      },
    },
  })
  discounts: { [key: string]: ModifierData };

  @IsObject()
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object', // assuming PlayerBet is an object
      properties: {
        active: { type: 'boolean' },
        available: { type: 'boolean' },
        amount: { type: 'number' },
      },
    },
  })
  surcharges: { [key: string]: ModifierData };

  @IsObject()
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'object', // assuming PlayerBet is an object
      properties: {
        active: { type: 'boolean' },
        available: { type: 'boolean' },
        amount: { type: 'number' },
      },
    },
  })
  coverages: { [key: string]: ModifierData };
}

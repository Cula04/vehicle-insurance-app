import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOkOutputResponse } from 'src/common/decorators/swagger/api-ok-output-response.decorator';
import { OutputDto } from 'src/common/dto/output.dto';
import { InsurancePolicyDto } from './dtos/insurance-policy.dto';
import { InsuranceService } from './insurance.service';

@Controller('insurance')
@ApiTags('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get('logs')
  @HttpCode(HttpStatus.OK)
  @ApiOkOutputResponse([InsurancePolicyDto])
  async getPolicyLogs(): Promise<OutputDto<InsurancePolicyDto[]>> {
    const data = await this.insuranceService.gerInsurancePolicyLogs();
    return { data };
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOkOutputResponse(InsurancePolicyDto)
  async getRoundHistory(
    @Body() policy: InsurancePolicyDto,
  ): Promise<OutputDto<InsurancePolicyDto>> {
    console.log(policy);
    const data = await this.insuranceService.calculateInsurancePolicy(policy);
    return { data };
  }
}

/*
Zagreb and age 29 - base price = 360
{
   "name":"Luka",
   "birthDate":"1995-03-13T07:29:32.632Z",
   "city":"Zagreb",
   "vehiclePower":50,
   "voucher":0,
   "priceMatch":0,
   "basePrice":0,
   "totalPrice":0,
   "discounts":{
      "Commercial discount":{
         "active":false,
         "available":false,
         "amount":0
      },
      "Adviser discount":{
         "active":false,
         "available":false,
         "amount":0
      },
      "VIP discount":{
         "active":false,
         "available":false,
         "amount":0
      }
   },
   "surcharges":{
      "Strong car surcharge":{
         "active":false,
         "available":false,
         "amount":0
      }
   },
   "coverages":{
      "Bonus Protection":{
         "active":false,
         "available":false,
         "amount":0
      },
      "Glass Protection":{
         "active":false,
         "available":false,
         "amount":0
      },
      "AO Plus":{
         "active":false,
         "available":false,
         "amount":0
      }
   }
}
*/

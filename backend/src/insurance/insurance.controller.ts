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
    const data = await this.insuranceService.calculateInsurancePolicy(policy);
    return { data };
  }
}

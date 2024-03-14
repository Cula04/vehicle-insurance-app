import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';

describe('AppController', () => {
  let appController: InsuranceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceController],
      providers: [InsuranceService],
    }).compile();

    appController = app.get<InsuranceController>(InsuranceController);
  });
  console.log('appController', appController);

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});

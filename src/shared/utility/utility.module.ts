import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';

@Module({
  providers: [UtilityService],
  exports: [UtilityService], //now other module can use this utility service by import UtilityModule
})
export class UtilityModule {}

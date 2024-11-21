import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';

//strength: suitable with connect to DB, logging one time, etc.
//weakness: hard to maintainance
@Global() // Global module -> can use this module (services) in anywhere no need to import this module
@Module({
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}

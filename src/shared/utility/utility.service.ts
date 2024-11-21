import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  getServerData(): string {
    return new Date().toLocaleDateString();
  }
}

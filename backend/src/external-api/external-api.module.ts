import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { SyncService } from './sync.service';

@Module({
  providers: [ExternalApiService, SyncService],
  exports: [ExternalApiService, SyncService],
})
export class ExternalApiModule {}

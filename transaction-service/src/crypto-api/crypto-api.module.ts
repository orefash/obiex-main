import { CacheModule, Module } from '@nestjs/common';
import { CryptoApiService } from './crypto-api.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5
    }),
  ],
  providers: [CryptoApiService],
  exports: [CryptoApiService]
})
export class CryptoApiModule {}

import { Module } from '@nestjs/common';
import { CookiesModule } from './cookies/cookies.module';
@Module({
  imports: [CookiesModule],
  exports: [CookiesModule],
})
export class CommonModule {}

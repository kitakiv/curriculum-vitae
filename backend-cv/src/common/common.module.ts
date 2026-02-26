import { Module } from '@nestjs/common';
import { CookiesModule } from './cookies/cookies.module';
import { DateScalar } from './scalars/datetime.scalar';
@Module({
  providers: [DateScalar],
  imports: [CookiesModule],
  exports: [CookiesModule, DateScalar],
})
export class CommonModule {}

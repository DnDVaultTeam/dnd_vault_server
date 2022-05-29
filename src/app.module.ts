import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AuthModule, PrismaModule, AccountModule],
})
export class AppModule {}

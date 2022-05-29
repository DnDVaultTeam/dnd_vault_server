import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // removes the need to import module every time, making it global
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

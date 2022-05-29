import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthDto } from './data_transfer_object';

/**
 * dto - data transfer object
 */
@Controller('auth') // auth controlls
// endpoints
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: IAuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: IAuthDto) {
    return this.authService.signIn(dto);
  }

  @Delete('signout/:id')
  signOut(@Param('id') id: string, @Body() dto: IAuthDto) {
    return this.authService.signOut(dto, id);
  }
}

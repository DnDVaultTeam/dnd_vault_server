import { Injectable } from '@nestjs/common';
//Business logic
@Injectable({})
export class AuthService {
  signIn() {
    return { msg: 'SignIn' };
  }

  signUp() {
    return { msg: 'SignIn' };
  }
}

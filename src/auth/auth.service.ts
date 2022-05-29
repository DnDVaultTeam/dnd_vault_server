import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAuthDto } from './data_transfer_object';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
//Business logic
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: IAuthDto) {
    // generate the password hash
    try {
      const hash = await argon.hash(dto.password);

      // save new user
      const { name, nickname, email } = dto; // destructure dto

      const user = await this.prisma.user.create({
        data: {
          name,
          nickname,
          email,
          hash,
        },
        select: {
          id: true,
          email: true,
          name: true,
          nickname: true,
        },
      });

      // return saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signIn(dto: IAuthDto) {
    try {
      const { email, password } = dto;

      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) throw new ForbiddenException('Email does not exist');

      const pwMatch = await argon.verify(user.hash, password);
      if (!pwMatch) throw new ForbiddenException('Wrong password');

      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ForbiddenException('Unknown error');
    }
  }

  async signOut(dto: IAuthDto, id: string) {
    try {
      console.log(dto, id);
      return { dto };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new ForbiddenException('Auth error');
    }
  }
}

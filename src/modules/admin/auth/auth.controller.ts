import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Public } from '../../../common/decorators/public.decorator';
import type { Request } from 'express';
import { Roles } from '../../../common/decorators/role.decorator';
import { ERoles } from '../../../common/enums/role.enum';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() authDto: LoginDto) {
    return this.authService.singIn(authDto.email, authDto.password);
  }

  @Get('me')
  @Roles(ERoles.ADMIN)
  me(@Req() req: Request) {
    return req.user;
  }
}

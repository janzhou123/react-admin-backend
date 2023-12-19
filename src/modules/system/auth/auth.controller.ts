import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dtos/register-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from './decorator/public.decorator';

@ApiTags('授权管理')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '注册用户',
    description: '注册用户',
  })
  @Post('sign-up')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.create(registerUserDto);
  }

  @ApiOperation({
    summary: '登录',
    description: '登录',
  })
  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: '删除token，用于踢人',
    description: '删除token，用于踢人',
  })
  @Post('invalidate-token')
  async invalidateToken(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    await this.authService.invalidateToken(token);
    return { message: 'Token invalidated successfully' };
  }

  @ApiOperation({
    summary: '测试接口校验 token',
    description: '测试接口校验 token',
  })
  @Post('getdemo')
  async getdemo() {
    return { message: 'getdemo  successfully' };
  }
}

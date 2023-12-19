import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../constants/jwtConstants';
import { TokenService } from '../token.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    protected reflector: Reflector,
    protected tokenService: TokenService,
  ) {
    super();
  }
  /**
   * 守卫方法
   * @param context
   */
  async canActivate(context: ExecutionContext) {
    // 跳过忽略接口
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // 获取请求头中的 authorization 字段
    const token = context.switchToRpc().getData().headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    console.log(token);
    const accessToken = token.replace('Bearer ', '');

    try {
      //从 reids里面后去token ，判断是否过期
      const res = await this.tokenService.getValue(accessToken);
      console.log('res :>> ', res);
      if (!res) {
        throw new UnauthorizedException();
      }
      const jwtService = new JwtService();
      // 解析token  校验token 是否正确
      const decoded = await jwtService.verifyAsync(accessToken, {
        secret: JWT_SECRET || 'secret',
      });
      console.log('decoded :>> ', JSON.stringify(decoded));
      if (!decoded) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (error) {
      console.log('error :>> ', JSON.stringify(error));
      throw new UnauthorizedException('Invalid access token');
    }
  }
}

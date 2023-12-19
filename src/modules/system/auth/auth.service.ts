import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dtos/register-user.dto';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos/sign-in.dto';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private expire: number;
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private readonly tokenService: TokenService,
    private configService: ConfigService,
  ) {
    this.expire = this.configService.get('redis.expire');
  }

  //创建用户
  async create(registerUserDto: RegisterUserDto): Promise<User> {
    return this.usersService.create(registerUserDto);
  }

  //登录
  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const user = await this.usersService.findByUsername(username);
    console.log('user :>>>>>>>>>>>>>>>>>>>>>> ', user);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid = await user.validatePassword(password);
    console.log('passwordIsValid :>>>>>>>>>>>>>>>>>>>>>> ', passwordIsValid);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, account: user.account };
    console.log('this.expire :>> ', this.expire);
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.expire,
    });

    await this.tokenService.invalidate(accessToken);
    await this.tokenService.invalidate(user.id);
    await this.tokenService.insertAccessToken(accessToken, user.id);

    return {
      access_token: accessToken,
    };
  }

  //校验用户 password username
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await user.validatePassword(password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async invalidateToken(accessToken: string): Promise<void> {
    try {
      await this.tokenService.invalidate(accessToken);
      const decoded = await this.jwtService.verifyAsync(accessToken);
      await this.tokenService.invalidate(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}

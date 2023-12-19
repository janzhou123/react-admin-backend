import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UtilsModule } from 'src/common/utils/Utils.module';
import { TokenService } from './token.service';
import { JWT_SECRET } from './constants/jwtConstants';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    UtilsModule,
  ],
  providers: [AuthService, UsersService, TokenService],
  exports: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}

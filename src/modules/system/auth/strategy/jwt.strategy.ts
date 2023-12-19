// import {
//   ExecutionContext,
//   Injectable,
//   Logger,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { UsersService } from '../../users/users.service';
// import { JwtPayload } from '../interface/jwt-payload.interface';
// import { TokenService } from '../token.service';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   private readonly logger = new Logger(JwtStrategy.name);
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly TokenService: TokenService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET || 'secret',
//     });
//     this.logger.warn('JwtStrategy initialized');
//   }

//   async validate(payload: JwtPayload): Promise<any> {
//     this.logger.warn(`JwtStrategy Payload: ${JSON.stringify(payload)}`);
//     //校验 tolen 是否存在
//     const accessToken = await this.TokenService.getValue(payload.sub);
//     if (!accessToken) {
//       this.logger.error('>>>>>>>>>>>>>>UsaccessToken not found');
//       throw new UnauthorizedException();
//     }

//     const user = await this.usersService.findUser(payload.sub);
//     if (!user) {
//       this.logger.error('>>>>>>>>>>>>>>User not found');
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }

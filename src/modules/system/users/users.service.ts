import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { account, password } = registerUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.account = account;
    user.password = hashedPassword;
    user.salt = salt;

    return this.repo.save(user);
  }

  async findUser(id: string): Promise<User> {
    return this.repo.findOne({ where: { id: id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.repo.findOne({ where: { account: username } });
  }
}

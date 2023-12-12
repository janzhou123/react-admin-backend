import { Injectable, Logger } from '@nestjs/common';
import { Dict } from './Dict.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DictService extends TypeOrmCrudService<Dict> {
  private readonly logger = new Logger(DictService.name);
  constructor(@InjectRepository(Dict) repo: Repository<Dict>) {
    super(repo);
  }
}

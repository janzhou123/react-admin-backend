import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Dict } from './Dict.entity';
import { DictService } from './dict.service';

@Crud({
  model: {
    type: Dict,
  },
})
@Controller('dict')
@ApiTags('dict 系统字典')
@UseInterceptors(ClassSerializerInterceptor)
export class DictController implements CrudController<Dict> {
  constructor(public service: DictService) {}
}

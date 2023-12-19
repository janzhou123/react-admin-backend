import { SetMetadata } from '@nestjs/common';

//定义 忽略JWT校验 装饰器
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
